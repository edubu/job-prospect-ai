import React from "react";

import Navbar from "@/components/navbar";
import SideNavbar from "@/components/sideNavbar";
import DocumentView from "@/components/documentView";

const DocumentPage: React.FC = () => {
  return (
    <>
      <Navbar isDashboard={true} />

      <div className="container flex m-4">
        <SideNavbar />
        <DocumentView />
      </div>
    </>
  );
};

export default DocumentPage;
