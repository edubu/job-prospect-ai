import supabase from "../utils/supabaseClient";

export interface IDocumentEntry {
  user_id: string;
  type: string;
  document_path: string;
  name: string;
}

export const insertDocumentEntry = async (documentEntry: IDocumentEntry) => {
  const { error } = await supabase.from("documents").insert(documentEntry);

  if (error) {
    console.error("Error inserting document entry: ", error.message);
  }

  console.log("Document entry inserted successfully: ", documentEntry);
};
