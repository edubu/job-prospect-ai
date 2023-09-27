"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { User } from "@supabase/auth-helpers-nextjs";

const LoginButton = () => {
  const [user, setUser] = useState<User | null>(null);

  // Create a Supabase client configured to use cookies
  const supabase = createClientComponentClient();

  useEffect(() => {
    // Get the current user
    supabase.auth.getUser().then((response) => {
      //console.log(response);
      setUser(response.data.user);
    });
  }, [supabase]);

  return (
    <>
      {!user ? (
        <Link href="/login">
          <button className="h-8 md:h-10 text-sm rounded-lg bg-activeBtn font-bold px-3 md:px-5">
            Sign In
          </button>
        </Link>
      ) : (
        <Link href="/dashboard">
          <button className="h-8 md:h-10 rounded-lg bg-activeBtn font-bold px-3 md:px-5">
            Dashboard
          </button>
        </Link>
      )}
    </>
  );
};

export default LoginButton;
