import axios, { AxiosError, AxiosResponse } from "axios";
import { load as cheerioLoad, CheerioAPI } from "cheerio";
import { PageContent } from ".";

const parseInternalLinks = async (
  $: CheerioAPI,
  baseURL: string
): Promise<string[]> => {
  const anchorElements = $("a[href]");

  const internalLinks = anchorElements.filter((_, element): boolean => {
    const href = $(element).attr("href");
    return (href?.startsWith(baseURL) || href?.startsWith("/")) == true;
  });

  return internalLinks
    .map((_, element): string => {
      const href = $(element).attr("href");
      if (href?.startsWith(baseURL)) {
        return href;
      } else if (href?.startsWith("/")) {
        return `${baseURL}${href}`;
      } else {
        throw new Error(`Unable to parse internal link ${href}`);
      }
    })
    .get();
};

const parseBodyText = async ($: CheerioAPI): Promise<string> => {
  const pElements = $("p");
  const pText = pElements
    .map((_, element): string => {
      return $(element).text();
    })
    .get()
    .join(" ")
    .trim();

  const hElements = $("h1, h2, h3, h4, h5, h6");
  const hText = hElements
    .map((_, element): string => {
      return $(element).text();
    })
    .get()
    .join(" ")
    .trim();

  return `Headers: ${hText} Paragraphs: ${pText}`;
};

const fetchPage = async (url: string): Promise<string | undefined> => {
  try {
    const res: AxiosResponse = await axios.get(url);

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`There was an error fetching ${url}: ${error.message}`);
    } else {
      console.error(`An unknown error occurred while fetching ${url}`);
    }

    return undefined; // Return undefined when an error occurs
  }
};

export const getPageContent = async (url: string): Promise<PageContent> => {
  const pageData = await fetchPage(url);
  if (!pageData) {
    throw new Error(`Unable to fetch page content for ${url}`);
  }

  // Create cheerio object to parse HTML
  const $ = cheerioLoad(pageData);

  const pageContent: PageContent = {
    url,
    bodyText: await parseBodyText($),
    title: $("title").text().trim(),
    links: await parseInternalLinks($, url),
  };

  return pageContent;
};
