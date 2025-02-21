"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import SEO from "@/components/SEO";

export default function ArticlePage() {
  const router = useRouter();
  const searchParams = useSearchParams(); // Use searchParams to get query params
  const id = searchParams.get("id"); // Get the `id` query parameter
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return; // If `id` is not available, don't run the fetch

    async function fetchArticle() {
      setLoading(true); // Set loading to true at the beginning

      const { data, error } = await supabase
        .from("dialogues")
        .select(
          "id, title, description, image_url, read_time, created_at, article, author_id",
        )
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching article:", error.message);
        setLoading(false);
        return;
      }

      const { data: authorData, error: authorError } = await supabase
        .from("profiles")
        .select("username, avatar_url")
        .eq("id", data.author_id)
        .single();

      setArticle({
        ...data,
        author: authorError
          ? { username: "Unknown", avatar_url: "/default-avatar.png" }
          : authorData,
      });

      setLoading(false); // Ensure loading is set to false
    }

    fetchArticle();
  }, [id]); // Only trigger useEffect if `id` changes

  if (loading) return <p>Loading article...</p>;
  if (!article) return <p>Article not found or failed to load</p>;

  return (
    <main className="mx-6 flex-1">
      <SEO title={article.title} description={article.description} />
      <article className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold">{article.title}</h1>
        <p className="text-gray-500">
          {new Date(article.created_at).toLocaleDateString()}
        </p>
        <img
          src={article.image_url}
          alt={article.title}
          className="my-4 w-full rounded-md"
        />
        <div className="mt-4 flex items-center gap-4">
          <img
            src={article.author.avatar_url}
            alt={article.author.username}
            className="h-10 w-10 rounded-full"
          />
          <p className="text-gray-700">{article.author.username}</p>
        </div>
        <div
          className="mt-6"
          dangerouslySetInnerHTML={{ __html: article.article }}
        />
      </article>
    </main>
  );
}
