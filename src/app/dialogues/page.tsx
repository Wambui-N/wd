"use client";

// app/dialogues/page.tsx
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/utils/supabaseClient";
import SEO from "@/components/SEO";
import ArticleCard from "@/components/dialogues/article-card";
import { useAuth } from "../lib/utils/authContext";

export default function Dialogues() {
  const { user } = useAuth();
  const [dialogues, setDialogues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchDialogues = useCallback(async () => {
    setLoading(true);
    const { data: dialoguesData, error } = await supabase
      .from("dialogues")
      .select(
        "id, title, description, image_url, read_time, created_at, author_id",
      );

    if (error) {
      console.error("Error fetching dialogues:", error.message);
      return;
    }

    const dialoguesWithAuthors = await Promise.all(
      dialoguesData.map(async (dialogue) => {
        const { data: authorData, error: authorError } = await supabase
          .from("profiles")
          .select("username, avatar_url")
          .eq("id", dialogue.author_id)
          .single();

        return {
          ...dialogue,
          author: authorError
            ? { username: "Unknown", avatar_url: "/default-avatar.png" }
            : authorData,
        };
      }),
    );

    setDialogues(dialoguesWithAuthors);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchDialogues();
  }, [fetchDialogues]);

  return (
    <main className="mx-6 flex-1">
      <SEO
        title="Dialogues"
        description="Explore insightful articles and discussions."
      />
      <div className="flex flex-col gap-4">
        <div className="w-full pt-24">{/* Your Search Section */}</div>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 h-full space-y-6">
            {loading ? (
              <div className="animate-pulse">
                <div className="h-40 rounded-md bg-gray-300"></div>
                <div className="mt-2 h-6 w-3/4 rounded bg-gray-200"></div>
              </div>
            ) : (
              dialogues.map((dialogue) => (
                <ArticleCard
                  key={dialogue.id} // Ensure `id` is passed here
                  author={{
                    name: dialogue.author.username,
                    avatar:
                      dialogue.author.avatar_url ||
                      "https://example.com/default-avatar.png",
                  }}
                  title={dialogue.title}
                  description={dialogue.description}
                  tags={["Caregiving", "Balance"]}
                  readTime={dialogue.read_time}
                  date={dialogue.created_at}
                  image={dialogue.image_url}
                  id={dialogue.id} // Pass `id` here
                />
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
