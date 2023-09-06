"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import supabase from "@/lib/utils/supabaseClient";

const LoginButton = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    console.log(session);
  }, []);

  return (
    <>
      {!session ? (
        <Link href="/login">
          <button className="h-10 rounded-lg bg-activeBtn font-bold px-5">
            Sign In
          </button>
        </Link>
      ) : (
        <Link href="/dashboard">
          <button className="h-10 rounded-lg bg-activeBtn font-bold px-5">
            Dashboard
          </button>
        </Link>
      )}
    </>
  );

  // return (
  //   <div>
  //     {!session ? (
  //       <Button
  //         className="h-10 rounded-lg bg-activeBtn font-bold px-5"
  //         colorScheme="teal"
  //         onClick={() => signIn("google")}
  //       >
  //         Sign in
  //       </Button>
  //     ) : (
  //       <>
  //         {/* <p>Welcome, {session.user?.name}!</p>
  //         <Button
  //           className="h-10 rounded-lg bg-activeBtn font-bold px-5"
  //           colorScheme="teal"
  //           onClick={() => signOut()}
  //         >
  //           Sign out
  //         </Button> */}
  //         <Link href="/dashboard">
  //           <Button
  //             className="h-10 rounded-lg bg-activeBtn font-bold px-5"
  //             colorScheme="teal"
  //           >
  //             Dashboard
  //           </Button>
  //         </Link>
  //       </>
  //     )}
  //   </div>
  // );
};

export default LoginButton;
