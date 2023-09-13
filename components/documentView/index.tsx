"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
//import supabase from "@/lib/utils/supabaseClient";

import ReactMarkdown from "react-markdown";
import styles from "./markdown.module.css";

interface DocumentViewProps {
  documentId: string | null;
}

const DocumentView: React.FC<DocumentViewProps> = ({ documentId }) => {
  const supabase = createClientComponentClient();
  const [markdownContent, setMarkdownContent] = useState("");

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

  if (markdownContent === "") {
    return <h1>Loading...</h1>;
  }

  return (
    <div className={`${styles["markdown-container"]} bg-subBackground`}>
      <ReactMarkdown children={markdownContent} />
    </div>
  );
};

export default DocumentView;
