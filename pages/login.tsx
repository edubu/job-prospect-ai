import React from "react";
import supabase from "@/lib/utils/supabaseClient";

import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const LoginPage: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Auth
        supabaseClient={supabase}
        providers={["google", "github"]}
        appearance={{ theme: ThemeSupa }}
      />
    </div>
  );
};

export default LoginPage;
