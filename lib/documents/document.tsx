import supabase from "../utils/supabaseClient";

interface createCompanySummaryProps {
  userId: string;
  companyURL: string;
}

interface getDocumentsFromUserProps {
  userId: string;
}

/*
    Creates a new company summary for the user
*/
export const createCompanySummary = async ({
  userId,
  companyURL,
}: createCompanySummaryProps) => {
  // Check if the company already has a generated summary
  // if it does, add an entry to the 'documents' table with the user_id
  // that points to the company summary in supabase storage
  // if it doesn't, then scrape the company's website and generate a summary
};

/*
    Fetches all documents that the user has created
*/
export const getDocumentsFromUser = async ({
  userId,
}: getDocumentsFromUserProps) => {
  // Get all documents from the 'documents' table that have the user_id
  const { data, error } = await supabase
    .from("documents")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching documents from user: ", error);
    return null;
  }

  // Fetch all of the documents from supabase storage with bucket 'user-documents'

  // return all documents
};
