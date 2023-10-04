import { SupabaseClient } from "@supabase/supabase-js";
import { ErrorTypes } from "../utils/errorTypes";
import { getPageInternalLinks } from "../scraper";

import puppeteer, { Browser } from "puppeteer";

interface ICompanySummaryProps {
  companyURL: URL;
}

export interface ICompanySummaryResponse {
  message: string;
  error?: ErrorTypes;
}

export const createCompanySummary = async ({
  companyURL,
}: ICompanySummaryProps): Promise<ICompanySummaryResponse> => {
  let browser: Browser;

  try {
    // Create browser instance
    browser = await puppeteer.launch({ headless: true });

    // Get Links from main page
    const mainPageLinks = await getPageInternalLinks(
      browser,
      companyURL.origin
    );

    // Remove duplicates and origin
    const links = [...new Set(mainPageLinks)].filter(
      (link) => link !== companyURL.origin
    );

    // Check if each links return a 200 status code and filter for valid links
    const linkStatuses = await Promise.all(
      links.map(async (link) => {
        try {
          const response = await fetch(link);
          return response.status === 200;
        } catch (error) {
          return false;
        }
      })
    );

    const validURLs = links.filter((_, index) => linkStatuses[index]);
  } catch (error) {
    console.log("Error creating company summary: ", error);
  } finally {
    if (browser!) {
      await browser.close();
    }
  }

  // // Call generator to generate new company summary
  // const { data: markDownResponse, error } = await getCompanySummaryAsMarkdown(
  //   companyURL
  // );
  // if (error) {
  //   console.log("Error generating company summary: ", error);
  // }

  // if (!markDownResponse) {
  //   throw new Error(`Error generating company summary: ${error}`);
  // }

  // // Save the company summary to the database
  // if (!options["replaceDocument"] || !doesCompanySummaryExist) {
  //   const { data, error: uploadError } = await supabase.storage
  //     .from("user-documents")
  //     .upload(`companies/${companyURL.hostname}.md`, markDownResponse);

  //   if (data) {
  //     console.log("Company summary uploaded to storage at: ", data.path);
  //   }
  //   if (uploadError) {
  //     console.log("Error uploading company summary: ", uploadError);
  //   }

  //   // Add company to document-versions
  //   const { data: versionData, error: documentError } = await supabase
  //     .from("document-versions")
  //     .insert({
  //       company_url: companyURL.hostname,
  //       version: 1,
  //       document_path: `companies/${companyURL.hostname}.md`,
  //       type: "Company Summary",
  //     });

  //   if (documentError) {
  //     console.log("Error inserting document version: ", documentError);
  //   }

  //   // Add user to company summary ownerships -- 'documents' table
  //   const documentEntry = {
  //     user_id: user?.id,
  //     type: "Company Summary",
  //     document_path: `companies/${companyURL.hostname}.md`,
  //     company_url: companyURL.hostname,
  //     document_name: documentName,
  //   };
  //   await insertDocumentEntry({ supabase, documentEntry });
  // } else {
  //   console.log("Replacing company summary... for ", companyURL.hostname);

  //   // Updating the storage bucket
  //   const { data, error: UpdateError } = await supabase.storage
  //     .from("user-documents")
  //     .update(`companies/${companyURL.hostname}.md`, markDownResponse, {
  //       cacheControl: "3600",
  //       upsert: true,
  //     });

  //   if (data) {
  //     console.log("Company summary updated in storage at: ", data.path);
  //   }
  //   if (UpdateError) {
  //     console.log("Error updating company summary: ", UpdateError);
  //   }

  //   // Retrieve and update the document version
  //   const { data: versionData, error: documentError } = await supabase
  //     .from("document-versions")
  //     .select("*")
  //     .eq("company_url", companyURL.hostname)
  //     .limit(1);

  //   if (documentError) {
  //     console.log("Error fetching document version: ", documentError);
  //   }

  //   const version = versionData?.[0].version;
  //   await supabase
  //     .from("document-versions")
  //     .update({ version: version + 1 })
  //     .eq("company_url", companyURL.hostname);
  //   console.log(
  //     "Version number for ",
  //     companyURL.hostname,
  //     " updated to ",
  //     version + 1
  //   );
  // }

  // add company summary to users documents
  return {
    message: "Document Created Sucessfully",
    error: ErrorTypes.NONE_TYPE,
  };
};

const companySummaryExists = async (
  companyURL: URL,
  supabase: SupabaseClient
) => {
  const { data, error } = await supabase.storage
    .from("user-documents")
    .list("companies");

  if (error) {
    throw new Error(`Error checking for existing summaries: ${error.message}`);
  }

  if (!data) {
    return false;
  }

  for (let i = 0; i < data.length; ++i) {
    if (removeMdExtension(data[i].name) === companyURL.hostname) {
      return true;
    }
  }

  return false;
};

const userHasCompanySummary = async (
  companyURL: URL,
  supabase: SupabaseClient
) => {
  const { data, error } = await supabase.from("documents").select("*");

  if (error) {
    throw new Error(`Error fetching users summaries: ${error.message}`);
  }

  if (!data) {
    return false;
  }

  for (let i = 0; i < data.length; ++i) {
    if (data[i].company_url === companyURL.hostname) {
      return true;
    }
  }

  return false;
};

function removeMdExtension(str: string) {
  return str.replace(/\.md$/, ""); // Removes ".md" if it appears at the end of the string
}
