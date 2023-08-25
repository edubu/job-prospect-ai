import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Navbar: React.FC<{ isSignedIn: boolean }> = ({ isSignedIn }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="Job Prospect AI Logo"
            width={40}
            height={40}
          />
          <span className="ml-4 text-black text-lg font-bold">
            Job Prospect AI
          </span>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={() => {
              /* TODO: scroll to features section */
            }}
            className="text-black"
          >
            Features
          </button>
          {isSignedIn ? (
            <Link href="/dashboard">
              <a className="text-black">Dashboard</a>
            </Link>
          ) : (
            <button className="text-black">Sign In</button>
          )}
        </div>

        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden mt-4">
          <button
            onClick={() => {
              /* TODO: scroll to features section */
            }}
            className="block w-full text-left mb-2 text-black"
          >
            Features
          </button>
          {isSignedIn ? (
            <Link href="/dashboard">
              <a className="block w-full text-left mb-2 text-black">
                Dashboard
              </a>
            </Link>
          ) : (
            <button className="block w-full text-left text-black">
              Sign In
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
