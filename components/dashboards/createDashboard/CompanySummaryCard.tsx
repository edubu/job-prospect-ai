"use client";

import React, { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
//import supabase from "@/lib/utils/supabaseClient";
import { createCompanySummary } from "@/lib/documents/summaries";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const CompanySummarizerDescription = [
  "Scrapes company website pages from URL",
  "Generates in-depth summary document",
  "Provides insights into industry, culture, company metrics, etc.",
];

const CompanySummaryCard: React.FC = () => {
  const [companyURL, setCompanyURL] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [userId, setUserId] = useState("1");

  const supabase = createClientComponentClient();

  // Fetch user to retrieve Id
  useEffect(() => {
    const fetchUserId = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("There was an error fetching the user: ", error);
      }

      const session = data.session;
      if (!session) {
        console.error(
          "User does not have a session -- please log in. How did they get here?"
        );
      }

      const id = session.user.id;
      setUserId(id);
    };

    fetchUserId();
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("/api/validateURL", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ urls: [companyURL] }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data[0].isValid) {
          setIsValid(true);
          console.log("Creating company summary with URL: ", companyURL);
          // submission logic here
          const url = new URL(companyURL);
          console.log(
            `URL: ${url}, host: ${url.host}, path: ${url.pathname}, hostname: ${url.hostname}, origin: ${url.origin}`
          );
          createCompanySummary({
            companyURL: new URL(companyURL),
            userId,
          }).then((response) => {
            console.log("Response from createCompanySummary: ", response);
          });
        } else {
          setIsValid(false);
          console.log("The URL is invalid.");
        }
      })
      .catch((error) => {
        console.error("There was an error validating the URL:", error);
      });
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
      <form onSubmit={handleSubmit}>
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
    </div>
  );
};

export default CompanySummaryCard;
