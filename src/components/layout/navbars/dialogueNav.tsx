"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, SquarePen } from "lucide-react";

const dialogueNav = () => {
  const [scrolled, setScrolled] = useState(false);

  // Handle navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <nav className="absolute left-0 right-0 top-0 z-50 mx-6 flex flex-row items-center justify-between px-0 py-4">
      <Link href="/" className="">
        <Image src="/WD Icon.svg" alt="Logo" width={40} height={40} />
      </Link>
      <div className="flex flex-row items-center gap-4">
        <Link href="dialogues/write">
        <SquarePen />
        </Link>
        {/* <Search /> */}
        <Link href="/dialogues/profile">
          <Avatar className="bg-orange">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </nav>
  );
};

export default dialogueNav;
