"use client";

import "../styles/globals.css"; // Import global styles
import type { AppProps } from "next/app";
import Layout from "@/components/layout"; // Import the Layout component

import dotenv from "dotenv";
import { useState } from "react";
dotenv.config();

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
