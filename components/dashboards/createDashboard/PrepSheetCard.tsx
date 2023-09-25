"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

const PrepSheetDescription = [
  "Scrapes company and job listing from URLs",
  "Generates in-depth summary of company",
  "Provides example questions to display research effort",
  "Explains jargon in job qualifications",
];

const PrepSheetCard: React.FC = () => {
  const [companyURL, setCompanyURL] = useState("");
  const [isCompanyURLValid, setIsCompanyURLValid] = useState(true);
  const [jobURL, setJobURL] = useState("");
  const [isJobURLValid, setIsJobURLValid] = useState(true);
  const [documentName, setDocumentName] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const router = useRouter();

  const handlePrepSheetSubmit = async (e) => {
    e.preventDefault();

    // validate input
    try {
      const validateResponse = await fetch("/api/validateURL", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ urls: [companyURL, jobURL] }),
      });

      const validateData = (await validateResponse.json()).data;

      setIsCompanyURLValid(validateData[0].isValid);
      setIsJobURLValid(validateData[1].isValid);

      if (validateData[0].isValid && validateData[1].isValid) {
        console.log("URLs are valid - submitting prep sheet job");
      } else {
        return;
      }
    } catch (error) {
      console.log("There was an error validating the URL:", error);
    }

    // submission logic
    setIsGenerating(true);
    // generate company summary
    try {
      const generateResponse = await fetch("/api/generatePrepSheet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
        body: JSON.stringify({
          url: companyURL,
          jobURL: jobURL,
          documentName: documentName,
        }),
      });

      const generateData = await generateResponse.json();

      // redirect to document view
      if (generateData.redirectTo) {
        router.push(generateData.redirectTo);
      }

      // console.log(generateData);
    } catch (error) {
      console.log("There was an error generating the prep sheet:", error);
      setIsGenerating(false);
    }
  };

  const handleEmpty = async (e) => {
    e.preventDefault();
    console.log("Prep sheet requested. Still not developed. Doing nothing.");
  };

  return (
    <div className="flex flex-col mx-4 h-full border border-black rounded-lg p-3">
      <h1 className="text-black font-bold text-md pb-4">
        <span className="bg-activeBtn rounded-lg py-1 px-2 font-semiBold">
          Coming Soon
        </span>{" "}
        Interview Prep Sheet
      </h1>
      <ul className="text-subHeader py-3 mb-5">
        {PrepSheetDescription.map((description, index) => (
          <li key={index} className="list-disc list-inside py-1">
            {description}
          </li>
        ))}
      </ul>

      {/* Prep Sheet Input Form */}
      <form onSubmit={handleEmpty}>
        <div className="mb-4">
          <label
            htmlFor="documentName"
            className="block text-sm font-medium text-gray-600"
          >
            Document Name
          </label>
          <input
            type="text"
            id="documentName"
            name="documentName"
            className={`mt-1 p-2 w-full border rounded-md`}
            value={documentName}
            onChange={(e) => setDocumentName(e.target.value)}
            required
          />
        </div>
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
              !isCompanyURLValid ? "border-red" : ""
            } rounded-md`}
            value={companyURL}
            onChange={(e) => setCompanyURL(e.target.value)}
            required
          />
          {!isCompanyURLValid && (
            <p className="text-red text-xs mt-1">Invalid URL</p>
          )}
          <label
            htmlFor="companyURL"
            className="block text-sm font-medium text-gray-600"
          >
            Job URL
          </label>
          <input
            type="text"
            id="jobURL"
            name="jobURL"
            className={`mt-1 p-2 w-full border ${
              !isJobURLValid ? "border-red" : ""
            } rounded-md`}
            value={jobURL}
            onChange={(e) => setJobURL(e.target.value)}
            required
          />
          {!isJobURLValid && (
            <p className="text-red text-xs mt-1">Invalid URL</p>
          )}
        </div>
        <button type="submit" className="text-black p-2 border rounded-lg">
          <div className="flex flex-row items-center">
            <AiOutlinePlus size="1em" className="mr-2" />
            <span className="font-semiBold text-sm">
              Create Interview Prep Sheet
            </span>
          </div>
        </button>
      </form>

      {/* Prep Sheet Generator Loading */}
      {isGenerating && <div className="mt-3 pt-3">Generating document... </div>}
    </div>
  );
};

export default PrepSheetCard;
