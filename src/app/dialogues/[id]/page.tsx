'use client'

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "../../lib/utils/supabaseClient";
import SEO from "@/components/SEO";

export default function ArticlePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); // Get the ID from the URL

  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return; // If `id` is not available, don't run the fetch

    async function fetchArticle() {
      const { data, error } = await supabase
        .from("dialogues")
        .select("id, title, description, image_url, read_time, created_at, article, author_id")
        .eq("id", id)
        .single(); // Get a single article

      if (error) {
        console.error("Error fetching article:", error.message);
        return;
      }

      const { data: authorData, error: authorError } = await supabase
        .from("profiles")
        .select("username, avatar_url")
        .eq("id", data.author_id)
        .single(); // Get the author data

      setArticle({
        ...data,
        author: authorError ? { username: "Unknown", avatar_url: "/default-avatar.png" } : authorData,
      });

      setLoading(false);
    }

    fetchArticle();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!article) return <p>Article not found</p>;

  return (
    <main className="mx-6 flex-1">
      <SEO title={article.title} description={article.description} />
      <article className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold">{article.title}</h1>
        <p className="text-gray-500">{new Date(article.created_at).toLocaleDateString()}</p>
        <img src={article.image_url} alt={article.title} className="w-full my-4 rounded-md" />
        <div className="flex items-center gap-4 mt-4">
          <img src={article.author.avatar_url} alt={article.author.username} className="w-10 h-10 rounded-full" />
          <p className="text-gray-700">{article.author.username}</p>
        </div>
        <div className="mt-6">{article.article}</div>
      </article>
    </main>
  );
}
