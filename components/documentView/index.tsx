"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import html2pdf from "html2pdf.js";

import ReactMarkdown from "react-markdown";
import styles from "./markdown.module.css";

interface DocumentViewProps {
  documentId: string | null;
}

// const downloadDocument = async (markdownContent: string) => {
//   console.log("Downloading document...");
//   const supabase = createClientComponentClient();

//   const;
// };

const DocumentView: React.FC<DocumentViewProps> = ({ documentId }) => {
  const supabase = createClientComponentClient();
  const [markdownContent, setMarkdownContent] = useState("");
  const [documentTitle, setDocumentTitle] = useState("");

  useEffect(() => {
    if (!documentId) return;

    const fetchDocumentInfo = async () => {
      const { data, error } = await supabase
        .from("documents")
        .select("*")
        .eq("id", documentId);

      if (error) {
        console.error("Error fetching document info", error);
        return;
      }

      const documentInfo = data[0];
      setDocumentTitle(documentInfo.document_name);
      return documentInfo;
    };

    const fetchDocumentVersion = async (documentInfo) => {
      const { data, error } = await supabase
        .from("document-versions")
        .select("*")
        .eq("company_url", documentInfo.company_url)
        .limit(1);

      if (error) {
        throw new Error(`Error fetching document version: ${error}`);
      }

      return data[0].version;
    };

    const fetchDocument = async () => {
      const documentInfo = await fetchDocumentInfo();
      const documentVersion = await fetchDocumentVersion(documentInfo);
      // Fetch document from supabase bucket
      const documentPath = documentInfo.document_path;

      // Fetch document from supabase bucket
      const { data, error } = await supabase.storage
        .from("user-documents")
        .download(`${documentPath}?version=${documentVersion}`);

      if (error) {
        console.error("Error fetching document:", error);
        return;
      }

      // Convert Blob to text
      const text = await data.text();

      setMarkdownContent(text);
    };

    fetchDocument();
  }, [documentId, supabase]);

  const handleDownload = async (markdownContent) => {
    const documentViewElement = document.getElementById(
      "document-viewer-container"
    );

    const opt = {
      margin: 10,
      filename: `${documentTitle}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    // Create a PDF with the provided element
    html2pdf().from(documentViewElement).set(opt).save();
  };

  if (markdownContent === "") {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="flex flex-col">
      {markdownContent === "" ? null : (
        <button
          onClick={() => handleDownload(markdownContent)}
          className="w-60 bg-ctaBtn rounded-lg px-3 font-semiBold m-3"
        >
          Download as PDF
        </button>
      )}
      <div
        id="document-viewer-container"
        className={`${styles["markdown-container"]} bg-subBackground`}
      >
        <ReactMarkdown>{markdownContent}</ReactMarkdown>
      </div>
    </div>
  );
};

export default DocumentView;
