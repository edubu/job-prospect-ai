"use client";

import React, { useEffect } from "react";
import supabase from "@/lib/utils/supabaseClient";

import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";

const LoginPage: React.FC = () => {
  const router = useRouter();

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
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <Auth
        supabaseClient={supabase}
        providers={["google"]}
        appearance={{ theme: ThemeSupa }}
      />
    </div>
  );
};

export default LoginPage;
