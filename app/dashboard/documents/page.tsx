"use client";

import React from "react";

import DocumentView from "@/components/documentView";
import { useSearchParams } from "next/navigation";

const DocumentPage: React.FC = () => {
  const searchParams = useSearchParams();

  const documentId = searchParams.get("documentId");

  return <DocumentView documentId={documentId} />;
};

export default DocumentPage;
