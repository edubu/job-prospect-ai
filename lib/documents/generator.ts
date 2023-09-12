import { getPageContent, PageContent } from "../scraper";
import OpenAI from "openai";

// Configure the OpenAI API client
//console.log(`Using OpenAI API key: ${process.env.OPENAI_API_KEY}`);
//const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const getCompanySummaryAsMarkdown = async (companyURL: URL) => {
  // Retrieve pages from the website
  const pageContents: PageContent[] = await getCompanyPagesFromURL(companyURL);
  console.log(
    `${pageContents.length} pages fetched from ${companyURL}, ${pageContents}`
  );

  return "Working on it";
};

export const getCompanyPagesFromURL = async (companyURL: URL) => {
  const pageContents: PageContent[] = [];

  console.log(`Getting data for ${companyURL.origin}...`);

  const mainPageContent = await getPageContent(companyURL.origin);
  if (!mainPageContent) {
    throw new Error(`Unable to fetch page content for ${companyURL.origin}`);
  }

  pageContents.push(mainPageContent);

  return pageContents;
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
