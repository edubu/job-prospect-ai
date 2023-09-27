"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import LoginButton from "./LoginButton";
import AccountButton from "./AccountButton";

interface NavbarProps {
  isDashboard?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isDashboard = false }) => {
  const [userCount, setUserCount] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 462);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Call handleResize initially to set the initial state
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      const res = await fetch("/api/getAuthenticatedUsers", {
        method: "GET",
      });
      const data = await res.json();
      setUserCount(data.userCount);
    };

    getUsers();
  });

  return (
    <>
      <div
        className={`container flex justify-between mx-auto px-4 py-3 ${
          isDashboard ? "border-b-0.5 border-subHeader" : ""
        }`}
      >
        {/* Left side of navbar */}
        <div className="flex items-center">
          <Logo />
          <Link href="/">
            <h1 className="text-black font-semiBold p-4">Job Prospect AI</h1>
          </Link>

          {!isDashboard ? (
            isMobile ? null : (
              <Link href="#features" className="p-4">
                Features
              </Link>
            )
          ) : (
            <Link href="https://forms.gle/QC5tYibMiUR5RTuR7" className="p-4">
              Support
            </Link>
          )}

          {!isDashboard ? null : (
            <Link href="\dashboard" className="p-4">
              Feedback
            </Link>
          )}
        </div>

        {/* SignIn/Dashboard button */}
        {userCount >= 10 ? null : (
          <div className="flex gap-x-6 text-white items-center">
            {!isDashboard ? <LoginButton /> : <AccountButton />}
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
