import React, { useEffect, useState } from "react";
import Link from "next/link";
import supabase from "@/lib/utils/supabaseClient";

const LoginButton = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get the current user
    const user = supabase.auth.getUser();
    setUser(user);

    // Listen to auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const currentUser = session ? session.user : null;
        setUser(currentUser);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <>
      {!user ? (
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
};

export default LoginButton;

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
