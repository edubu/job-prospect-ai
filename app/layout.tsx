// components/Layout.tsx
import "./globals.css";

import React from "react";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/react";

import dotenv from "dotenv";
dotenv.config();

export const revalidate = 0;

export const metadata = {
  title: "Job Prospect AI",
  description:
    "Job Search AI tool to do your company and job info research lightning-fast",
};

const Layout: React.FC = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {/* <link rel="icon" href="/images/logo.png" /> */}
        {/* <link rel="icon" type="image/png" href="/images/logo.png" /> */}
      </Head>

      <body className="min-h-screen">
        {children}
        <Analytics />
      </body>
    </html>
  );
};

export default Layout;
