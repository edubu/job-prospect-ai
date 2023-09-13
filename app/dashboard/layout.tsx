import React from "react";
import Navbar from "@/components/navbar";
import SideNavbar from "@/components/sideNavbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar isDashboard={true} />

      <div className="container flex m-4">
        <SideNavbar />
        {children}
      </div>
    </>
  );
}
