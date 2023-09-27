"use client";

import React, { useEffect } from "react";
//import supabase from "@/lib/utils/supabaseClient";

import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    "http://localhost:3000/";
  // Make sure to include `https://` when not localhost.
  url = url.includes("http") ? url : `https://${url}`;
  // Make sure to include a trailing `/`.
  url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
  return url;
};

const LoginPage: React.FC = () => {
  const router = useRouter();

  const supabase = createClientComponentClient();

  useEffect(() => {
    const checkIfSessionExists = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.log("Error finding session", error);
      }
      const session = data.session;

      if (session) {
        router.push("/dashboard");
      }
    };

    checkIfSessionExists();
  }, [router, supabase.auth]);

  return (
    <div className="flex justify-center items-center h-screen">
      <Auth
        supabaseClient={supabase}
        providers={["google"]}
        appearance={{ theme: ThemeSupa }}
        redirectTo={getURL()}
      />
    </div>
  );
};

export default LoginPage;
