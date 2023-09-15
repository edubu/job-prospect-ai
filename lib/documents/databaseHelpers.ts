import { SupabaseClient } from "@supabase/supabase-js";

export interface IDocumentEntry {
  user_id: string | undefined;
  type: string;
  document_path: string;
  name: string;
}

export interface IInsertDocumentEntryProps {
  supabase: SupabaseClient;
  documentEntry: IDocumentEntry;
}

export const insertDocumentEntry = async ({
  supabase,
  documentEntry,
}: IInsertDocumentEntryProps) => {
  const { error } = await supabase.from("documents").insert(documentEntry);

  if (error) {
    console.error("Error inserting document entry: ", error.message);
  }

  console.log("Document entry inserted successfully: ", documentEntry);
};
