"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface NavbarButtonProps {
  text: string;
  path: string;
  logo: React.ReactNode;
}

const NavbarButton: React.FC<NavbarButtonProps> = ({ text, path, logo }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [currentPath, setCurrentPath] = useState(pathname);

  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname]);

  return (
    <div
      className={`container flex hover:bg-activeBtn hover:rounded-lg my-2 pl-3 pr-6 py-1 ${
        currentPath === path ? "bg-activeBtn rounded-lg" : ""
      }`}
    >
      {logo}
      <Link href={path} className="pl-2">
        {text}
      </Link>
    </div>
  );
};

export default NavbarButton;
