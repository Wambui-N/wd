import { supabase } from "./supabaseClient"; // Supabase client initialization

// Define a type for Post
type Post = {
  id: string; // Include the id property
  author_id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  cover_image: string;
  tags: string[];
  read_time: number;
  published: boolean;
};

export const createPost = async (
  userId: string,
  title: string,
  slug: string,
  content: string,
  excerpt: string,
  coverImage: string,
  tags: string[],
  readTime: number,
): Promise<Post> => {
  // Specify return type
  const { data, error } = await supabase
    .from("posts")
    .insert([
      {
        author_id: userId,
        title,
        slug,
        content,
        excerpt,
        cover_image: coverImage,
        tags,
        read_time: readTime,
        published: false,
      },
    ])
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as Post; // Cast data to Post type
};
