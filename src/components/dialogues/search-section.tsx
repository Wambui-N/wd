"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface SearchSectionProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
}

export function SearchSection({ searchQuery, setSearchQuery }: SearchSectionProps) {
  return (
    <div className="relative mb-8">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search articles..."
          className="w-full max-w-md pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  )
}

