import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Sidebar() {
  const staffPicks = [
    {
      title: "The Art of Mindfulness",
      author: "Sarah Chen",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      title: "Building Better Systems",
      author: "Mark Thompson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const recommendedTopics = ["Programming", "Data Science", "Technology", "Writing", "Productivity"]

  const suggestedAuthors = [
    {
      name: "Alex Rivera",
      bio: "Tech enthusiast & writer",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Emma Wilson",
      bio: "Software Engineer",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  return (
    <div className="space-y-8">
      <section>
        <h2 className="mb-4 font-bold">Staff Picks</h2>
        <div className="space-y-4">
          {staffPicks.map((pick) => (
            <article key={pick.title} className="group">
              <Link href="#" className="flex items-start gap-2">
                <Avatar className="h-5 w-5">
                  <AvatarImage src={pick.avatar} alt={pick.author} />
                  <AvatarFallback>{pick.author[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">{pick.author}</p>
                  <p className="text-sm font-medium group-hover:underline">{pick.title}</p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 font-bold">Recommended Topics</h2>
        <div className="flex flex-wrap gap-2">
          {recommendedTopics.map((topic) => (
            <Link
              key={topic}
              href={`/topic/${topic.toLowerCase()}`}
              className="rounded-full bg-muted px-4 py-2 text-sm hover:bg-muted/80"
            >
              {topic}
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 font-bold">Who to follow</h2>
        <div className="space-y-4">
          {suggestedAuthors.map((author) => (
            <div key={author.name} className="flex items-start justify-between">
              <div className="flex items-start gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={author.avatar} alt={author.name} />
                  <AvatarFallback>{author.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{author.name}</p>
                  <p className="text-xs text-muted-foreground">{author.bio}</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Follow
              </Button>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

