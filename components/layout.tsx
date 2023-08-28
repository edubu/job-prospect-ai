// components/Layout.tsx

import React from "react";
import Head from "next/head";

interface LayoutProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({
  title = "Job Prospect AI",
  description = "Job Search AI tool to do your company and job info research lightning-fast",
  children,
}) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/images/logo.png" />
      </Head>

      <header className="bg-blue-500 p-4 text-white shadow-md">
        <h1 className="text-xl font-bold">{title}</h1>
      </header>

      <main className="p-4">{children}</main>

      <footer className="bg-blue-500 p-4 text-white mt-auto">
        <p>© {new Date().getFullYear()} Job Prospect AI</p>
      </footer>
    </div>
  );
};

export default Layout;
