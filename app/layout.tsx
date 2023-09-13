// components/Layout.tsx
import "./globals.css";

import React from "react";
import Head from "next/head";

import dotenv from "dotenv";
dotenv.config();

export const metadata = {
  title: "Job Prospect AI",
  description:
    "Job Search AI tool to do your company and job info research lightning-fast",
};

const Layout: React.FC = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="/images/logo.png" />
      </Head>

      <main className="">{children}</main>
    </div>
  );
};

export default Layout;
