"use client";

import React, { useState, useEffect } from "react";
import NavbarButton from "./NavbarButton";

// Logos
import { IoDocumentTextOutline } from "react-icons/io5";
import { VscTools } from "react-icons/vsc";

export const DashboardNavbar: React.FC = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 821); // Adjust the breakpoint as needed
    };

    // Listen for window resize events
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    // Cleanup the event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={`lg:ml-20 md:ml-10 ${
        isSmallScreen
          ? "fixed bottom-0 left-0 z-50 h-50 w-full bg-subBackground ml-0 px-4 border-t-2 border-subHeader"
          : "h-screen w-1/7 pt-6"
      }`}
    >
      <ul className={`${isSmallScreen ? "flex" : ""}`}>
        <li className={`${isSmallScreen ? "block" : ""}`}>
          <NavbarButton
            isBottomBar={isSmallScreen}
            text="Documents"
            path="/dashboard"
            logo={<IoDocumentTextOutline size="1.5em" />}
          />
        </li>
        <li className={`${isSmallScreen ? "block" : ""}`}>
          <NavbarButton
            isBottomBar={isSmallScreen}
            text="Create"
            path="/dashboard/create"
            logo={<VscTools size="1.5em" />}
          />
        </li>
      </ul>
    </div>
  );
};

export default DashboardNavbar;
