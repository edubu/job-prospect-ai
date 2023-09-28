"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
//import supabase from "@/lib/utils/supabaseClient";

// Icons
import { AiOutlinePlus } from "react-icons/ai";
import { GrDocumentText } from "react-icons/gr";

import { formatTimestamp } from "@/lib/utils/date";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

const DocumentDashboard: React.FC = () => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [documents, setDocuments] = useState<any[] | null>([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      const { data, error } = await supabase
        .from("documents")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) console.log(error);
      setDocuments(data);
    };

    fetchDocuments();
  }, [supabase]);

  // const response = await supabase
  //   .from("documents")
  //   .select("*")
  //   .order("created_at", { ascending: false });
  // const documents = response.data;

  const goToDocument = (document: any) => {
    router.push(`/dashboard/documents?documentId=${document.id}`);
  };

  return (
    <div className="flex flex-col m-4 w-full">
      <h1 className="text-black font-bold text-2xl md:text-3xl pt-3 pb-2 pl-4 ">
        Welcome to Job Prospect AI
      </h1>
      <div className="container flex items-center">
        <div className="container flex flex-col text-subHeader text-md p-4">
          <p>
            Let us help you generate a prep sheet or company overview with ease.
          </p>
          <p>What do you want to create today?</p>
        </div>
        <Link href="/dashboard/create">
          <div className="bg-newDocBtn rounded-lg flex items-center justify-center text-newDocBtnText cursor-pointer py-1 px-2 ml-10 mr-10">
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
                You don&apos;t have any documents yet. Start creating.
              </p>
            </div>
          </div>
        ) : (
          // <div className="overflow-x-auto max-w-full">
          //   {" "}
          //   {/* Added overflow-auto and max-w-full */}
          //   <table className="min-w-full table-auto">
          //     {" "}
          //     {/* Added min-w-full */}
          //     <thead>
          //       <tr>
          //         <th className="p-4 bg-subBackground text-lg font-semibold">
          //           Name
          //         </th>
          //         <th className="p-4 bg-subBackground text-lg font-semibold">
          //           Company Url
          //         </th>
          //         <th className="p-4 bg-subBackground text-lg font-semibold">
          //           Type
          //         </th>
          //         <th className="p-4 bg-subBackground text-lg font-semibold">
          //           Created At
          //         </th>
          //       </tr>
          //     </thead>
          //     <tbody>
          //       {documents?.map((doc, index) => (
          //         <tr
          //           onClick={() => goToDocument(doc)}
          //           className="cursor-pointer hover:bg-subBackground"
          //           key={index}
          //         >
          //           <td className="p-4">{doc.document_name}</td>
          //           <td className="p-4">{doc.company_url}</td>
          //           <td className="p-4">{doc.type}</td>
          //           <td className="p-4">{formatTimestamp(doc.created_at)}</td>
          //         </tr>
          //       ))}
          //     </tbody>
          //   </table>
          // </div>

          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-black">
              <thead className="text-xs text-darkGray font-bold uppercase bg-subBackground">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Company URL
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Created At
                  </th>
                </tr>
              </thead>
              <tbody>
                {documents?.map((doc, index) => (
                  <tr
                    onClick={() => goToDocument(doc)}
                    className="bg-white border-b hover:bg-subBackground"
                    key={index}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 text-darkGray font-semiBold whitespace-nowrap"
                    >
                      {doc.document_name}
                    </th>
                    <td className="text-subHeader px-6 py-4">
                      {doc.company_url}
                    </td>
                    <td className="text-subHeader px-6 py-4">{doc.type}</td>
                    <td className="text-subHeader px-6 py-4">
                      {formatTimestamp(doc.created_at)}
                    </td>
                  </tr>
                ))}

                {/* <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Apple MacBook Pro 17"
                  </th>
                  <td className="px-6 py-4">Silver</td>
                  <td className="px-6 py-4">Laptop</td>
                  <td className="px-6 py-4">$2999</td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Microsoft Surface Pro
                  </th>
                  <td className="px-6 py-4">White</td>
                  <td className="px-6 py-4">Laptop PC</td>
                  <td className="px-6 py-4">$1999</td>
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Magic Mouse 2
                  </th>
                  <td className="px-6 py-4">Black</td>
                  <td className="px-6 py-4">Accessories</td>
                  <td className="px-6 py-4">$99</td>
                </tr> */}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentDashboard;
