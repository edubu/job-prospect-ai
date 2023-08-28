import "../styles/globals.css"; // Import global styles
import type { AppProps } from "next/app";
import Layout from "@/components/layout"; // Import the Layout component

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout title="My Next App">
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
