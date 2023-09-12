import supabase from "../utils/supabaseClient";
import { ErrorGeneratorTypes } from "../utils/errorTypes";
import { insertDocumentEntry } from "./databaseHelpers";
import { getCompanySummaryAsMarkdown } from "./generator";

interface ICompanySummary {
  companyURL: URL;
  userId: string;
}

interface ICompanySummaryResponse {
  message: string;
  error?: ErrorGeneratorTypes;
}

const companySummaryExists = async (companyURL: URL) => {
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

const userHasCompanySummary = async (userId: string, companyURL: URL) => {
  const { data, error } = await supabase
    .from("documents")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    throw new Error(`Error fetching users summaries: ${error.message}`);
  }

  if (!data) {
    return false;
  }

  for (let i = 0; i < data.length; ++i) {
    if (data[i].name === companyURL.hostname) {
      return true;
    }
  }

  return false;
};

export const createCompanySummary = async ({
  companyURL,
  userId,
}: ICompanySummary): Promise<ICompanySummaryResponse> => {
  // Check if user already has the company summary
  if (await userHasCompanySummary(userId, companyURL)) {
    const response: ICompanySummaryResponse = {
      message: "User already has a summary for this company.",
      error: ErrorGeneratorTypes.USER_ALREADY_OWNS,
    };

    return response;
  }

  // Check if the company summary already exists
  if (await companySummaryExists(companyURL)) {
    // Add user to company summary ownerships -- 'documents' table
    await insertDocumentEntry({
      user_id: userId,
      type: "Company Summary",
      document_path: `companies/${new URL(companyURL).hostname}.md`,
      name: new URL(companyURL).hostname,
    });

    const response: ICompanySummaryResponse = {
      message: "Company summary already exists. User added to ownership.",
      error: ErrorGeneratorTypes.NONE_TYPE,
    };

    return response;
  }

  // Call generator to generate new company summary
  const companySummaryMarkdown = await getCompanySummaryAsMarkdown(companyURL);

  // Save the company summary to the database

  // add company summary to users documents
};

function removeMdExtension(str: string) {
  return str.replace(/\.md$/, ""); // Removes ".md" if it appears at the end of the string
}
