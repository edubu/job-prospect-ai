"use client";
import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

const PrepSheetDescription = [
  "Scrapes company and job listing from URLs",
  "Generates in-depth summary of company",
  "Provides example questions to display research effort",
  "Explains jargon in job qualifications",
];

const PrepSheetCard: React.FC = () => {
  const [prepSheetCompanyURL, setPrepSheetCompanyURL] = useState("");
  const [isCompanyURLValid, setIsCompanyURLValid] = useState(true);
  const [prepSheetJobURL, setPrepSheetJobURL] = useState("");
  const [isJobURLValid, setIsJobURLValid] = useState(true);

  const handlePrepSheetSubmit = (e) => {
    e.preventDefault();

    fetch("/api/validateURL", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ urls: [prepSheetCompanyURL, prepSheetJobURL] }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data[0].isValid) {
          setIsCompanyURLValid(false);
        } else {
          setIsCompanyURLValid(true);
        }

        if (!data[1].isValid) {
          setIsJobURLValid(false);
        } else {
          setIsJobURLValid(true);
        }

        if (data[0].isValid && data[1].isValid) {
          console.log(
            "Created Prep Sheet with: ",
            prepSheetCompanyURL,
            "and",
            prepSheetJobURL
          );
          // submission logic here
        }
      })
      .catch((error) => {
        console.error("There was an error validating the URL:", error);
      });
  };

  return (
    <div className="flex flex-col mx-4 h-full border border-black rounded-lg p-3">
      <h1 className="text-black font-bold text-md pb-4">
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
      <form onSubmit={handlePrepSheetSubmit}>
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
            value={prepSheetCompanyURL}
            onChange={(e) => setPrepSheetCompanyURL(e.target.value)}
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
            value={prepSheetJobURL}
            onChange={(e) => setPrepSheetJobURL(e.target.value)}
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
    </div>
  );
};

export default PrepSheetCard;
