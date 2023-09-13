"use client";

import React, { useState, useEffect, useRef } from "react";
//import supabase from "@/lib/utils/supabaseClient";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";

const AccountButton: React.FC = () => {
  const [session, setSession] = useState<Session | null>();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  const supabase = createClientComponentClient();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
      }
    );

    // Unsubscribe on component unmount
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    // Click outside handler
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/"); // Redirect to the root URL
  };

  return (
    <div ref={dropdownRef} className="relative">
      {session?.user?.user_metadata?.avatar_url && (
        <Image
          src={session.user.user_metadata.avatar_url}
          alt="User Avatar"
          width={40}
          height={40}
          className={`rounded-full cursor-pointer ${
            dropdownOpen ? "ring-2 ring-blue-500" : ""
          }`}
          onClick={() => setDropdownOpen(!dropdownOpen)}
        />
      )}
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-subBackground opacity-100 border border-gray-200 rounded shadow-lg">
          <form action="/auth/sign-out" method="post">
            <button className="block w-full px-4 py-2 text-left hover:bg-gray-100">
              Logout
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AccountButton;
