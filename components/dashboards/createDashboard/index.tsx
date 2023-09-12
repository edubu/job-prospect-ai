import React, { useState } from "react";
import CompanySummaryCard from "./CompanySummaryCard";
import PrepSheetCard from "./PrepSheetCard";

const CreateDashboard: React.FC = () => {
  return (
    <div className="flex flex-col mx-4 h-full">
      <h1 className="text-black font-bold text-3xl pt-3 pb-2 pl-4">
        Create a Document
      </h1>
      <div className="container flex items-center flex-grow h-full">
        <div className="container flex flex-col text-subHeader text-md p-4">
          <p>
            See our products below to choose which document you'd like to
            create.
          </p>
        </div>
      </div>

      {/* Products Section */}
      <h1 className="text-black font-bold text-2xl pt-3 pb-2 pl-4">Products</h1>
      <div className="lg:flex md:grid-cols-1 sm:grid-cols-1 m-4 ml-0 h-full gap-4">
        {/* Product: Company Summary */}
        <CompanySummaryCard />

        {/* Product: Interview Prep Sheet */}
        <PrepSheetCard />
      </div>
    </div>
  );
};

export default CreateDashboard;
