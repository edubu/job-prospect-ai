import { getPageContent, PageContent } from "../scraper";
import OpenAI from "openai";
import { ErrorGeneratorTypes } from "../utils/errorTypes";

// Configure the OpenAI API client
//console.log(`Using OpenAI API key: ${process.env.OPENAI_API_KEY}`);
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const getCompanySummaryAsMarkdown = async (companyURL: URL) => {
  // Retrieve pages from the website
  let retrievedPages: PageContent[] = [];
  const mainPageContent: PageContent = await getCompanyPageFromURL(companyURL);
  retrievedPages.push(mainPageContent);

  // Figure out which links should be further explored
  const mainPageLinks = mainPageContent.links;
  const linkPrioritizationPrompt = `
    Below are links that were found on the main page of ${companyURL.origin}.
    """${mainPageLinks.map((link) => link).join("\n")}"""
    Please choose a few links that you think are most important to discover more about what the ocmpany does.
    Give a list of only the ones that seem most important. Return a maximum of 3 links below. I want the output
    to be formatted so that I can use JSON.parse() on it to receive an array of links.
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

  const prioritizedPages = await Promise.all(
    prioritizedLinks.map((link) => getPageContent(link))
  );

  retrievedPages = retrievedPages.concat(prioritizedPages);

  console.log(
    "Pages to be used: ",
    retrievedPages.map((page) => page.url).join("\n")
  );

  // Generate a summary of the website
  const prompt = `
    Below is the text scraped from pages within ${companyURL.origin}.
    Use what you already know about this company along with the data below to
    generate a summary of the company.
    
    ${retrievedPages
      .map((page) => {
        return `Page content from ${page.url}:
      """${page.bodyText}"""`;
      })
      .join("\n")}

    Please provide a summary of the company and describe what the company does.
    Provide the following sections and answer the subquestions:
    - Company Overview
    - Core features
    - Target Audience
    - Key Competitors
    - Conclusion Summary
    - Contact Information

    Return the summary as markdown text(usable in a .md file).
  `;

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
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

  console.log(completion);

  const markdownResponse = completion.choices[0].message.content;
  if (!markdownResponse) {
    throw new Error(`Unable to generate summary for ${companyURL.origin}`);
  }

  console.log(
    `Generated summary for ${companyURL.origin} with ${completion.usage?.total_tokens} tokens`
  );

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

// Takes in the company baseURL and returns a summary of the company
// export const getCompanySummary = async (baseURL: string): Promise<string> => {

//     // fetch company page contents
//     const pageContents: PageContent[] = await getCompanyPagesFromURL(baseURL);
//     logger.info(`${pageContents.length} pages fetched from ${baseURL}`);

//     const mainPageContent = pageContents[0];
//     const prompt = `
//     Below is the text scraped from the front page of ${mainPageContent.url}.

//     """${mainPageContent.bodyText}"""

//     Please provide a summary of the website and describe what the website/company does.
//   `;

//     const completion = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: [
//         {
//           role: "system",
//           content:
//             "You are a text analysis and summarization bot for website pages.",
//         },
//         { role: "user", content: prompt },
//       ],
//       temperature: 0.7,
//     });

//     const response = completion.choices[0].message.content;
//     if (!response) {
//       throw new Error(`Unable to generate summary for ${mainPageContent.url}`);
//     }

//     logger.info(
//       `Generated summary for ${mainPageContent.url} with ${completion.usage?.total_tokens} tokens`
//     );

//     return response;
// }
