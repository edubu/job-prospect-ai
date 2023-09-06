import React from "react";
import Link from "next/link";
import Logo from "./Logo";
import LoginButton from "./LoginButton";
import AccountButton from "./AccountButton";

interface NavbarProps {
  isDashboard?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isDashboard = false }) => {
  return (
    <>
      <div
        className={`container flex justify-between mx-auto px-4 py-3 h-full ${
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
            <Link href="#features" className="p-4">
              Features
            </Link>
          ) : (
            <Link href="https://forms.gle/QC5tYibMiUR5RTuR7" className="p-4">
              Support
            </Link>
          )}
        </div>

        {/* Right side of navbar */}
        <div className="flex gap-x-6 text-white items-center">
          {!isDashboard ? <LoginButton /> : <AccountButton />}
        </div>
        {/* </div> */}
      </div>
    </>
  );
};

export default Navbar;
