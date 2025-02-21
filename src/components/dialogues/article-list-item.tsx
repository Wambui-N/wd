
import Image from "next/image"
import Link from "next/link"
import { Star, BookOpen } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Author {
  username: string
  avatar_url: string
}

interface ArticleListItemProps {
  id: string
  title: string
  description: string
  image_url?: string
  read_time: number
  created_at: string
  author: Author
  article?: string // The full article content
}

export function ArticleListItem({
  id,
  title,
  description,
  image_url,
  read_time,
  created_at,
  author,
}: ArticleListItemProps) {
    function formatDistanceToNow(arg0: Date, arg1: { addSuffix: boolean }): import("react").ReactNode {
        throw new Error("Function not implemented.")
    }

  return (
    <article className="group border-b py-6 first:pt-0">
      <div className="flex items-start gap-6">
        <div className="flex-1 space-y-3">
          {/* Author Info */}
          <div className="flex items-center gap-2">
            <Avatar className="h-5 w-5">
              <AvatarImage src={author.avatar_url} alt={author.username} />
              <AvatarFallback>{author.username[0]?.toUpperCase()}</AvatarFallback>
            </Avatar>
            <Link 
              href={`/profile/${author.username}`} 
              className="text-sm font-medium hover:underline"
            >
              {author.username}
            </Link>
          </div>

          {/* Article Content */}
          <Link href={`/dialogues/${id}`} className="block space-y-2">
            <h2 className="line-clamp-2 text-xl font-bold tracking-tight group-hover:text-gray-800">
              {title}
            </h2>
            {description && (
              <p className="line-clamp-2 hidden text-muted-foreground sm:block">
                {description}
              </p>
            )}
          </Link>

          {/* Metadata */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>
              {formatDistanceToNow(new Date(created_at), { addSuffix: true })}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              {read_time} min read
            </span>
          </div>
        </div>

        {/* Article Image */}
        {image_url && (
          <Link 
            href={`/dialogues/${id}`}
            className="relative hidden aspect-square w-24 overflow-hidden rounded-sm sm:block"
          >
            <Image
              src={image_url || "/placeholder.svg"}
              alt=""
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 96px"
            />
          </Link>
        )}
      </div>
    </article>
  )
}
