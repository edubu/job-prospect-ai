import React from "react";

import Navbar from "@/components/navbar";
import SideNavbar from "@/components/sideNavbar";
import CreateDashboard from "@/components/dashboards/CreateDashboard";

const Create: React.FC = () => {
  return (
    <>
      <Navbar isDashboard={true} />

      <div className="container flex m-4">
        <SideNavbar />
        <CreateDashboard />
      </div>
    </>
  );
};

export default Create;
