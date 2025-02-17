"use client";

import { Search, Plus, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function SearchSection() {
  const topics = [
    "Mental Health",
    "Nutrition",
    "Exercise",
    "Sleep",
    "Meditation",
  ];

  return (
    <div className="mx-auto w-full max-w-4xl p-4">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
            <Input
              className="pl-12"
              placeholder="Search articles, topics, or keywords..."
              type="search"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" title="Filter by Topic" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              {topics.map((topic) => (
                <DropdownMenuItem key={topic}>{topic}</DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {topics.map((topic) => (
            <Button
              key={topic}
              variant="secondary"
              size="sm"
              className="rounded-full bg-black text-white hover:bg-black"
              title={topic}
            />
          ))}
          <button className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-white">
            <Plus className="h-3 w-3" />
          </button>
          {/* <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            icon={<Plus className="h-4 w-4" />}
          /> */}
        </div>
      </div>
    </div>
  );
}
