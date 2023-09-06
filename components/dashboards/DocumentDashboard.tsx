import React from "react";
import Link from "next/link";

import { AiOutlinePlus } from "react-icons/ai";

const DocumentDashboard: React.FC = () => {
  // Sample data; replace with your actual data fetched from a database or API
  const documents = [
    { name: "Document 1", type: "Resume", createdAt: "2021-01-01 12:30:45" },
    {
      name: "Document 2",
      type: "Cover Letter",
      createdAt: "2021-02-15 14:22:10",
    },
    { name: "Document 3", type: "Proposal", createdAt: "2021-07-21 09:45:00" },
    // ... more documents
  ];

  return (
    <div className="flex flex-col mx-4 h-full">
      <h1 className="text-black font-bold text-3xl pt-3 pb-2 pl-4">
        Welcome to Job Prospect AI
      </h1>
      <div className="container flex items-center flex-grow h-full">
        <div className="container flex flex-col text-subHeader text-md p-4">
          <p>
            Let us help you generate a prep sheet or company overview with ease.
          </p>
          <p>What do you want to create today?</p>
        </div>
        <Link href="/dashboard/create">
          <div className="bg-newDocBtn rounded-lg flex items-center justify-center text-newDocBtnText cursor-pointer w-40 py-1 px-2 ml-10 mr-4">
            <AiOutlinePlus size="1.5em" className="mr-2" />
            <span className="text-md whitespace-nowrap">New Document</span>
          </div>
        </Link>
      </div>

      {/* Recently Created Documents */}
      <div className="mt-8 p-4">
        <h2 className="text-black font-bold text-2xl mb-4">Recently Created</h2>

        <div className="bg-white rounded-lg shadow">
          <div className="grid grid-cols-3 p-4 border-b border-subHeader">
            <p className="text-lg font-semibold">Name</p>
            <p className="text-lg font-semibold">Type</p>
            <p className="text-lg font-semibold">Created At</p>
          </div>

          {documents.map((doc, index) => (
            <Link href={`/dashboard/documents/${doc.name}`} key={index}>
              <div className="grid grid-cols-3 p-4 border-b border-subHeader hover:bg-activeBtn cursor-pointer">
                <p>{doc.name}</p>
                <p>{doc.type}</p>
                <p>{doc.createdAt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DocumentDashboard;
