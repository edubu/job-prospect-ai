import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import supabase from "@/lib/utils/supabaseClient";

import ReactMarkdown from "react-markdown";
import styles from "./markdown.module.css";

const DocumentView: React.FC = () => {
  const router = useRouter();
  const documentId = router.query.id;

  const [markdownContent, setMarkdownContent] = useState("# Example Markdown");

  useEffect(() => {
    if (!documentId) return;

    const fetchDocumentInfo = async () => {
      console.log(documentId);
      const { data, error } = await supabase
        .from("documents")
        .select("*")
        .eq("id", documentId);

      if (error) {
        console.error("Error fetching document info", error);
        return;
      }

      const documentInfo = data[0];
      return documentInfo;
    };

    const fetchDocument = async () => {
      const documentInfo = await fetchDocumentInfo();
      // Fecth document from supabase bucket
      const documentPath = documentInfo.document_path;

      // Fetch document from supabase bucket
      const { data, error } = await supabase.storage
        .from("user-documents")
        .download(documentPath);

      if (error) {
        console.error("Error fetching document:", error);
        return;
      }

      // Convert Blob to text
      const text = await data.text();
      console.log(text);

      setMarkdownContent(text);
    };

    fetchDocument();
  }, [documentId]);

  return (
    <div className={`${styles["markdown-container"]} bg-subBackground`}>
      <ReactMarkdown children={markdownContent} />
    </div>
  );
};

export default DocumentView;
