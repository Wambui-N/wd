import { Heart, Bookmark, MoreHorizontal } from 'lucide-react'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Image from "next/image"

interface ArticleCardProps {
  author: {
    name: string
    avatar: string
  }
  title: string
  description: string
  tags: string[]
  readTime: string
  date: string
  image: string
}

export default function ArticleCard({
  author,
  title,
  description,
  tags,
  readTime,
  date,
  image
}: ArticleCardProps) {
  return (
    <Card className="overflow-hidden border-b border-muted-foreground/30 pb-3 shadow-none bg-transparent">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
        <div className="flex-1 space-y-4">
          <CardHeader className="space-y-4 p-0">
            <div className="flex items-center gap-2">
              <Avatar className="h-4 w-4 bg-orange">
                <AvatarFallback>{author.name[0]}</AvatarFallback>
              </Avatar>
              <span className="font-medium text-sm">{author.name}</span>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-base font-semibold tracking-tight">{title}</h4>
              <p className="text-foreground text-xl">{description}</p>
            </div>
          </CardHeader>

          <CardFooter className="flex items-center gap-4 p-0">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{tags.join(" | ")}</span>
              <span>•</span>
              <span>{readTime}</span>
              <span>•</span>
              <span>{date}</span>
            </div>
          </CardFooter>

          <CardContent className="flex items-center gap-4 p-0">
            <button className="text-foreground hover:text-foreground transition-colors">
              <Heart className="h-4 w-4" strokeWidth={1} />
            </button>
            <button className="text-foreground hover:text-foreground transition-colors">
              <Bookmark className="h-4 w-4" strokeWidth={1} />
            </button>
            <button className="text-foreground hover:text-foreground transition-colors ml-auto">
              <MoreHorizontal className="h-4 w-4" strokeWidth={1} />
            </button>
          </CardContent>
        </div>

        <div className="relative aspect-[4/3] md:w-72">
          <Image
            src={image}
            alt={title}
            fill
            className="rounded-lg object-cover"
          />
        </div>
      </div>
    </Card>
  )
}

