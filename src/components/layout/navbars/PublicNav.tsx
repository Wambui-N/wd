"use client";

import { Button, ButtonLink } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import DropDown from "./Dropdown";

const PublicNav = () => {
  return (
    <nav className="responsive flex flex-row items-center justify-between px-6 py-4">
      <Link href="/" className="transition-transform hover:scale-105">
        <Image src="/WD Icon.svg" alt="Logo" width={45} height={45} priority />
      </Link>

      <div className="flex flex-row items-center gap-6">
        <div className="md:flex md:flex-row md:items-center md:gap-6">
          <Link
            href="/story"
            className="text-sm font-medium hover:text-gray-600 transition-colors"
          >
            Our Story
          </Link>

          <ButtonLink
            variant="default"
            className="bg-black text-white hover:bg-black"
            title="Join the Community"
            href="/dialogues"
          />
        </div>

        <div className="md:hidden">
          <DropDown />
        </div>
      </div>
    </nav>
  );
};

export default PublicNav;
