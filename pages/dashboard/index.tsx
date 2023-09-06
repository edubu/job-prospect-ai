import Navbar from "@/components/navbar";
import React, { useEffect, useState } from "react";

import SideNavbar from "@/components/sideNavbar";
import DocumentDashboard from "@/components/dashboards/DocumentDashboard";

const Dashboard: React.FC = () => {
  return (
    <>
      <Navbar isDashboard={true} />

      <div className="container flex m-4">
        <SideNavbar />
        <DocumentDashboard />
      </div>
    </>
  );
};

export default Dashboard;
