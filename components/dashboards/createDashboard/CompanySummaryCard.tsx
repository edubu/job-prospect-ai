"use client";

import React, { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
//import supabase from "@/lib/utils/supabaseClient";
import { createCompanySummary } from "@/lib/documents/summaries";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { useRouter } from "next/navigation";

const CompanySummarizerDescription = [
  "Scrapes company website pages from URL",
  "Generates in-depth summary document",
  "Provides insights into industry, culture, company metrics, etc.",
];

const CompanySummaryCard: React.FC = () => {
  const [companyURL, setCompanyURL] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const validateResponse = await fetch("/api/validateURL", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: companyURL }),
      });

      const validateData = (await validateResponse.json()).data;

      if (validateData[0].isValid) {
        setIsValid(true);
      } else {
        setIsValid(false);
        return;
      }
    } catch (error) {
      console.log("There was an error validating the URL:", error);
    }

    setIsGenerating(true);
    // generate company summary
    try {
      const generateResponse = await fetch("/api/generateCompanySummary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
        body: JSON.stringify({ url: companyURL }),
      });

      const generateData = await generateResponse.json();

      // redirect to document view
      if (generateData.redirectTo) {
        router.push(generateData.redirectTo);
      }

      // console.log(generateData);
    } catch (error) {
      console.log("There was an error generating the company summary:", error);
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col mx-4 h-full border border-black rounded-lg p-3 mb-4">
      <h1 className="text-black font-bold text-md pb-4">Company Summary</h1>
      <ul className="text-subHeader py-3 mb-5">
        {CompanySummarizerDescription.map((description, index) => (
          <li key={index} className="list-disc list-inside py-1">
            {description}
          </li>
        ))}
      </ul>

      {/* Company Summarizer Input Form */}
      <form onSubmit={handleSubmit} method="post">
        <div className="mb-4">
          <label
            htmlFor="companyURL"
            className="block text-sm font-medium text-gray-600"
          >
            Company URL
          </label>
          <input
            type="text"
            id="companyURL"
            name="companyURL"
            className={`mt-1 p-2 w-full border ${
              !isValid ? "border-red" : ""
            } rounded-md`}
            value={companyURL}
            onChange={(e) => setCompanyURL(e.target.value)}
            required
          />
          {!isValid && <p className="text-red text-xs mt-1">Invalid URL</p>}
        </div>
        <button type="submit" className="text-black p-2 border rounded-lg">
          <div className="flex flex-row items-center">
            <AiOutlinePlus size="1em" className="mr-2" />
            <span className="font-semiBold text-sm">
              Create Company Summary
            </span>
          </div>
        </button>
      </form>

      {/* Company Summarizer Loading */}
      {isGenerating && <div className="mt-3 pt-3">Generating document... </div>}
    </div>
  );
};

export default CompanySummaryCard;
