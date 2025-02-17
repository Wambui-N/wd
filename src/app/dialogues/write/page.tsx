"use client";

import { useState } from "react";
import { useAuth } from "../../lib/utils/authContext";
import { useRouter } from "next/router"; // To redirect after success
import { createPost } from "@/app/lib/utils/postUtils";

const WritePage = () => {
  const { user } = useAuth(); // Get user from context
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [tags, setTags] = useState("");
  const [readTime, setReadTime] = useState(0);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (!user) {
    return <div>Please log in to write a story.</div>; // Redirect or show a message if not authenticated
  }

  // Function to handle the form submission
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    // Convert tags string to an array
    const tagsArray = tags.split(",").map(tag => tag.trim());

    try {
      const post = await createPost(
        user.id,
        title,
        slug,
        content,
        excerpt,
        coverImage,
        tagsArray,
        readTime
      );

      if (post) {
        // Redirect to the post page after success
        router.push(`/posts/${post.id}`);
      } else {
        alert("Failed to create post.");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      alert("An error occurred while creating the post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Create a New Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="slug">Slug:</label>
          <input
            type="text"
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="excerpt">Excerpt:</label>
          <textarea
            id="excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="coverImage">Cover Image URL:</label>
          <input
            type="url"
            id="coverImage"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="tags">Tags (comma separated):</label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="readTime">Read Time (minutes):</label>
          <input
            type="number"
            id="readTime"
            value={readTime}
            onChange={(e) => setReadTime(Number(e.target.value))}
            min="1"
            required
          />
        </div>
        <div>
          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default WritePage;
