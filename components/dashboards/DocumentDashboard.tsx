import React, { useState, useEffect } from "react";
import Link from "next/link";
import { cookies } from "next/headers";
//import supabase from "@/lib/utils/supabaseClient";

// Icons
import { AiOutlinePlus } from "react-icons/ai";
import { GrDocumentText } from "react-icons/gr";

import { formatTimestamp } from "@/lib/utils/date";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function DocumentDashboard() {
  const supabase = createServerComponentClient({ cookies });

  const response = await supabase
    .from("documents")
    .select("*")
    .order("created_at", { ascending: false });
  const documents = response.data;

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
        {documents?.length === 0 ? (
          <div className="flex justify-center items-center bg-white p-6 rounded-md border-dotted border-2 border-subHeader w-full max-w-full h-64">
            <div className="flex flex-col items-center justify-center">
              <div className="flex justify-center items-center bg-subBackground rounded-full w-16 h-16 p-3 m-3">
                <GrDocumentText size="3em" className="m-0" />
              </div>
              <p className="font-semibold text-black text-lg">No Documents</p>
              <p className="text-subHeader">
                You don't have any documents yet. Start creating.
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow">
            <div className="grid grid-cols-4 p-4 border-b border-subHeader">
              <p className="text-lg font-semibold">Name</p>
              <p className="text-lg font-semibold">Company Url</p>
              <p className="text-lg font-semibold">Type</p>
              <p className="text-lg font-semibold">Created At</p>
            </div>

            {documents?.map((doc, index) => (
              <Link
                href={{
                  pathname: `/dashboard/documents`,
                  query: { documentId: doc.id },
                }}
                key={index}
              >
                <div className="grid grid-cols-4 gap-x-4 p-4 border-b border-subHeader hover:bg-activeBtn cursor-pointer">
                  <p>{doc.document_name}</p>
                  <p>{doc.company_url}</p>
                  <p>{doc.type}</p>
                  <p>{formatTimestamp(doc.created_at)}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
