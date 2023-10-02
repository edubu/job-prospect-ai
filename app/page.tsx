"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import FeaturesSection from "@/components/FeaturesSection";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
import WaitlistSignup from "@/components/WaitlistSignup";

const Index: React.FC = () => {
  const [userCount, setUserCount] = useState<number>(0);

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
      <Navbar />
      {/* Hook Section */}
      <div className="container mx-auto pb-10">
        <div id="hook-section" className="">
          <h1 className="text-center text-black font-bold text-3xl md:text-6xl pt-20 md:pt-40 px-5 mx-auto">
            Research companies in minutes, not hours
          </h1>
          <div
            id="sub-text"
            className="text-center py-5 md:py-10 text-subHeader text-base md:text-lg"
          >
            <p>Ultimate research companion for Job Searchers.</p>
            <p>
              Your job just got easier. Cut your prep time. Elevate your
              interview game.
            </p>
          </div>

          {/* Spots remaining */}
          {userCount ? (
            <div className="text-center p-3 text-xs md:text-sm">
              <p className="text-red">
                {userCount ? `${10 - userCount} spots remaining` : ""}
              </p>
            </div>
          ) : null}

          {/* CTA Button */}
          {userCount >= 10 ? (
            <div id="try-now-btn" className="mx-auto text-center">
              <Link
                href="#CTA-section"
                className="rounded-xl bg-ctaBtn py-2 px-4 md:px-7 font-bold text-black text-sm md:text-base"
              >
                Join waitlist
              </Link>
            </div>
          ) : (
            <div id="try-now-btn" className="mx-auto text-center">
              <Link
                href="/login"
                className="rounded-xl bg-ctaBtn py-2 px-4 md:px-7 font-bold text-black text-sm md:text-base"
              >
                Try now for free
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto max-w-full bg-subBackground flex justify-center items-center p-5 md:p-10">
        <div className="relative w-full max-w-2xl">
          <Image
            src="/images/StripeSummary.png"
            alt="image of the document dashboard showcasing company summaries"
            layout="responsive"
            width={800}
            height={800}
            className="max-w-full shadow-xl rounded-lg"
          />
        </div>
      </div>

      {/* Features Section */}
      <FeaturesSection />

      {/*CTA Section */}
      <div
        id="CTA-section"
        className="container mx-auto max-w-full bg-subBackground flex flex-col justify-center items-center p-5 md:p-10"
      >
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-4xl font-bold mb-4 px-5 md:px-10">
            Be the candidate companies remember
          </h1>
          <p className="text-subHeader italic px-5 md:px-20 text-sm md:text-base">
            Seize the advantage. Sign up now for free and kickstart your prep,
            so you can go out and make every interview count!
          </p>
        </div>

        {/* CTA button/form */}
        {userCount >= 10 ? (
          <WaitlistSignup />
        ) : (
          <div className="flex pt-5 md:pt-10">
            <Link
              href="/login"
              className="rounded-xl bg-ctaBtn py-2 px-4 md:px-7 font-bold text-black text-sm md:text-base"
            >
              Get started for free
            </Link>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Index;
