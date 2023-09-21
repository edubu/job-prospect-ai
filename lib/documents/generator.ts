import { getPageContent, PageContent } from "../scraper";
import OpenAI from "openai";
import { ErrorGeneratorTypes } from "../utils/errorTypes";

// Configure the OpenAI API client
//console.log(`Using OpenAI API key: ${process.env.OPENAI_API_KEY}`);
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const getCompanySummaryAsMarkdown = async (companyURL: URL) => {
  // Variable to store all scraped pages
  let retrievedPages: PageContent[] = [];

  // Retrieve main to get links of depth 1
  const mainPageContent: PageContent = await getCompanyPageFromURL(companyURL);
  retrievedPages.push(mainPageContent);

  // Get all non-duplicate links that are on the main page
  const mainPageLinks = mainPageContent.links;
  const mainPageIndexInLinks = mainPageLinks.indexOf(companyURL.origin);
  if (mainPageIndexInLinks >= 0) {
    mainPageLinks.splice(mainPageIndexInLinks, 1);
  }
  const mainPageIndexInLinksAlt = mainPageLinks.indexOf(
    `${companyURL.origin}/`
  );
  if (mainPageIndexInLinksAlt >= 0) {
    mainPageLinks.splice(mainPageIndexInLinksAlt, 1);
  }

  // Remove all other duplicate links
  const uniqueLinks = [...new Set(mainPageLinks)];

  // Find the 10 most important links
  const prioritizedLinks = await getPrioritizedLinks(
    uniqueLinks,
    companyURL,
    20
  );

  // Scrape all pages that are linked on the main page
  console.log(`[INFO] Scraping ${prioritizedLinks.length} pages...`);
  const scrapedPages: PageContent[] = await Promise.all(
    prioritizedLinks.map((link) => getPageContent(link))
  );
  // Add main page to pages that will be summarized
  scrapedPages.push(mainPageContent);

  console.log(
    "Pages to be used: \n",
    scrapedPages.map((page) => page.url).join("\n")
  );

  console.log(`[INFO] Summarizing ${scrapedPages.length} pages...`);
  const summarizedPages: PageContent[] = await Promise.all(
    scrapedPages.map((page) => getPageSummary(page))
  );

  // Generate a summary of the website
  const prompt = `
    Below is the text scraped from pages within ${companyURL.origin}.
    Use what you already know about this company as a GPT model along with the data below to
    generate a summary of the company.
    
    ${summarizedPages
      .map((page) => {
        return `Page content from ${page.url}:
      """${page.summary}"""`;
      })
      .join("\n")}

    Please provide a summary of the company and describe what the company does.
    Provide the following sections and answer the subquestions(if there is not information on a subsection or question then do not include it):
    - Company Overview(1 paragraph)
    - Company History(1 paragraph)
    - Products and Services(bullet point for each product along with a 2-3 sentence description)
    - Business Model(1-2 paragraphs)
    - Target Audience(1-2 paragraphs)
    - Key Competitors (1-2 paragraphs)
    - Contact Information and Company Details(if the scraped data cannot answer then do not include it)
      - Headquarters
      - Company Size
      - Website
      - Support emails

    Return the summary as markdown text(usable in a .md file).
  `;

  const markdownRawCompletion = await openai.chat.completions.create({
    model: process.env.OPENAI_CHAT_MODEL as string,
    messages: [
      {
        role: "system",
        content:
          "You are a text analysis and summarization bot for website pages.",
      },
      { role: "user", content: prompt },
    ],
    temperature: 0.7,
  });

  console.log(markdownRawCompletion);

  const markdownRawResponse = markdownRawCompletion.choices[0].message.content;
  if (!markdownRawResponse) {
    throw new Error(`Unable to generate summary for ${companyURL.origin}`);
  }

  console.log(
    `[INFO] Generated summary for ${companyURL.origin} with ${markdownRawCompletion.usage?.total_tokens} tokens`
  );

  console.log("[INFO] Cleaning up markdown response...");

  /* 
    Clean up markdown response by removing:
    - Mentions of scraped data
    - Sections that do not provide any information
    - Notes at the end
  */
  const markdownCleanedPrompt = `
    Below is a generating summary of the company ${companyURL.origin} in markdown(a .md file).
    """${markdownRawResponse}"""

    Clean up this summary by:
    - Removing the note at the end if it exists
    - Removing any mentions of scraped data
    - Removing any sections that do not provide any information(ie. if there is no information on the company size then remove the section)
    - Fixing any grammar(such as capitalization, punctuation, etc.)

    Above all, do not take any information out of the summary. Only take out parts that do not give information.

    Return the summary as markdown text(usable in a .md file).
 `;

  const markdownCleanedCompletion = await openai.chat.completions.create({
    model: process.env.OPENAI_CHAT_MODEL as string,
    messages: [
      {
        role: "system",
        content:
          "You are a text analysis and grammar bot for company summaries.",
      },
      { role: "user", content: markdownCleanedPrompt },
    ],
    temperature: 0.7,
  });

  const markdownResponse = markdownCleanedCompletion.choices[0].message.content;

  return {
    data: markdownResponse,
    error: ErrorGeneratorTypes.NONE_TYPE,
  };
};

export const getCompanyPageFromURL = async (companyURL: URL) => {
  console.log(`Getting data for ${companyURL.origin}...`);

  const pageContent = await getPageContent(companyURL.origin);
  if (!pageContent) {
    throw new Error(`Unable to fetch page content for ${companyURL.origin}`);
  }

  return pageContent;
};

const getPageSummary = async (pageContent: PageContent) => {
  const pageSummaryPrompt = `
    You are a text summarization bot.
    Below is the text scraped from ${pageContent.url}.
    """${pageContent.bodyText}"""

    Summarize this text to fit within 2 paragraphs. Summarize the details that are most important based upon the url. 
    As Examples:
    - if you are summarizing a url of https://epic.com/solutions/eletronic-health-records, your summary will be explaining the solution of electronic health records that the company epic provides.
    - if you are summarizing a url of https://www.athenahealth.com/careers/locations, your summary will include a bulleted list of the locations that the company athenahealth has offices in.
    - if you are summarizing a url of https://www.athenahealth.com/about/who-we-are, your summary will include facts and details about the company athenhealth. Such as when it was founded, their culture, etc.
  `;
  const pageSummaryCompletion = await openai.chat.completions.create({
    model: process.env.OPENAI_CHAT_MODEL as string,
    messages: [
      {
        role: "system",
        content: "You are a text summarization bot",
      },
      { role: "user", content: pageSummaryPrompt },
    ],
    temperature: 0.7,
  });

  const pageSummarizationCompletion =
    pageSummaryCompletion.choices[0].message.content;

  if (!pageSummaryCompletion) {
    throw new Error(`Unable to generate page summary for ${pageContent.url}`);
  }

  pageContent.summary = pageSummarizationCompletion;

  return pageContent;
};

const getPrioritizedLinks = async (
  links: string[],
  companyURL: URL,
  numLinks: number = 10
) => {
  const linkPrioritizationPrompt = `
  Below are links that were found on the main page of ${companyURL.origin}.
  """${links.map((link) => link).join("\n")}"""
  Please choose a few links that you think are most important to discover more about what the company does. Include a few that give information on their products, along with a few that tell more about the company.
  For examples: 
  - I may choose 4 links that have /solutions in the title so that I can learn more about their products.
  - I may choose 2 links that have /about or /who-we-are in the title so that I can learn more about the company.
  - I may choose 2 links that have /careers in the title so that I can learn more about the company culture.
  Give a list of only the ones that seem most important. Return a maximum of ${numLinks} links below. Include as many as possible within the maximum limit.
  The links should that you choose should all be within the same domain as the main page. 
  For example, if the main page is https://www.athenahealth.com, then all of the links should be within the domain of athenahealth.com.
  I want the output to be formatted so that I can use JSON.parse() on it to receive an array of links.
`;

  const linkPrioritizationCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are a link analysis bot for company researcher.",
      },
      { role: "user", content: linkPrioritizationPrompt },
    ],
    temperature: 0.7,
  });

  const prioritizedLinksResponse =
    linkPrioritizationCompletion.choices[0].message.content;
  if (!prioritizedLinksResponse) {
    throw new Error(
      `Unable to generate prioritized links for ${companyURL.origin}`
    );
  }
  console.log("Prioritized links response: ", prioritizedLinksResponse);

  const prioritizedLinks: string[] = JSON.parse(prioritizedLinksResponse);
  console.log("Prioritized links: ", prioritizedLinks);

  return prioritizedLinks;
};
