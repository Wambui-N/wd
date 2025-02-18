"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SquarePen, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/app/lib/utils/authContext";

const AuthenticatedNav = () => {
  const { profile } = useAuth();

  return (
    <nav className="mx-6 flex flex-row items-center justify-between px-0 py-4">
      <Link href="/dialogues" className="transition-transform hover:scale-105">
        <Image src="/WD Icon.svg" alt="Logo" width={40} height={40} priority />
      </Link>

      <div className="flex flex-row items-center gap-4">
        <Link
          href="/dialogues/write"
          className="rounded-full p-2 transition-colors hover:bg-gray-100"
        >
          <SquarePen className="h-4 w-4" />
        </Link>

        <Link href="/dialogues/profile" className="transition-transform hover:scale-105">
          <Avatar className="h-9 w-9 border-2 border-transparent hover:border-blue-300">
            <AvatarImage src={profile?.avatar} />
            <AvatarFallback>
              {profile?.username?.substring(0, 2).toUpperCase() || "WD"}
            </AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </nav>
  );
};

export default AuthenticatedNav;
