// components/Layout.tsx

import React from "react";
import Head from "next/head";
//import Navigation from "./navigation";

interface LayoutProps {
  title?: string;
  description?: string;
  includeNavbar?: boolean;
  includeFooter?: boolean;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({
  title = "Job Prospect AI",
  description = "Job Search AI tool to do your company and job info research lightning-fast",
  children,
}) => {
  return (
    <div className="min-h-screen">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/images/logo.png" />
      </Head>

      {/* <Navigation /> */}

      <main className="">{children}</main>
    </div>
  );
};

export default Layout;
