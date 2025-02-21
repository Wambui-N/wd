"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabaseClient";
import SEO from "@/components/SEO";
import { ArticleListItem } from "@/components/dialogues/article-list-item";
import { Sidebar } from "@/components/dialogues/sidebar";
import { useAuth } from "@/lib/authContext";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dialogues() {
  const { user } = useAuth();
  const [dialogues, setDialogues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDialogues = useCallback(async () => {
    setLoading(true);
    const { data: dialoguesData, error } = await supabase
      .from("dialogues")
      .select(
        `
        id,
        title,
        description,
        image_url,
        read_time,
        created_at,
        author_id
      `,
      )
      .order("created_at", { ascending: false });

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
    <main className="mx-auto max-w-[1336px] px-4 sm:px-6 lg:px-8">
      <SEO
        title="Dialogues"
        description="Explore insightful articles and discussions."
      />
      <div className="py-4 lg:py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr,352px]">
          <div>
            {loading ? (
              <div className="space-y-6">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex gap-6 border-b pb-6">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-5 w-5 rounded-full" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                      <Skeleton className="h-7 w-full" />
                      <Skeleton className="h-5 w-full" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                    <Skeleton className="hidden aspect-square w-24 sm:block" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="divide-y divide-border">
                {dialogues.map((dialogue) => (
                  <ArticleListItem
                    key={dialogue.id}
                    id={dialogue.id}
                    title={dialogue.title}
                    description={dialogue.description}
                    image_url={dialogue.image_url}
                    read_time={dialogue.read_time}
                    created_at={dialogue.created_at}
                    author={dialogue.author}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="hidden lg:block">
            <div className="sticky top-8">
              <Sidebar />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
