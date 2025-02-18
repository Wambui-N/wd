// components/navigation/NavBar.tsx
"use client";

import { useAuth } from "@/app/lib/utils/authContext";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import AuthenticatedNav from "./AuthenticatedNav";
import PublicNav from "./PublicNav";

const NavBar = () => {
  const { user } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navClasses = `absolute left-0 right-0 top-0 z-50 
    ${scrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : ""} 
    transition-all duration-300`;

  return (
    <div className={navClasses}>
      {user ? <AuthenticatedNav /> : <PublicNav />}
    </div>
  );
};

export default NavBar;
