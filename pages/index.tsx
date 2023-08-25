import Layout from "@/components/layout";
import Navbar from "@/components/navbar";

export const siteTitle = "Next.js Sample Website";

export default function Home() {
  const isSignedIn = false;

  return (
    <Layout>
      <Navbar isSignedIn={isSignedIn} />
    </Layout>
  );
}
