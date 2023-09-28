import React from "react";
import Navbar from "@/components/navbar";
import DashboardNavbar from "@/components/dashboardNavbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar isDashboard={true} />

      <div className="container flex mb-10">
        <DashboardNavbar />
        {children}
      </div>
    </>
  );
}
