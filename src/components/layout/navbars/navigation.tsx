'use client'

import { useAuth } from '@/app/lib/utils/authContext';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { SquarePen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const navigation = () => {
  const { user } = useAuth();

  return (
    <nav>
      {user ? (
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
      ) : (
        <nav className="responsive absolute left-0 right-0 top-0 z-50 flex flex-row items-center justify-between px-0 py-4">
      <Link href="/" className="">
        <Image src="/WD Icon.svg" alt="Logo" width={45} height={45} />
      </Link>
      <div className="flex flex-row items-center gap-6">
        <Link href="/story" className="text-sm">
          Our Story
        </Link>
        <Button
          variant="default"
          className="bg-black text-white hover:bg-black"
          title="Join the dialogue"
          href="/dialogues"
        />

        {/* <DropDown /> */}
      </div>
    </nav>
      )}
    </nav>
  )
}

export default navigation