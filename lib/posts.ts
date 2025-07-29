import { supabase, type BlogPost } from "./supabase"

// This will store your posts (in a real app, this would be a database)
// Your posts will be stored here - I've removed the sample posts

// Get all posts from Supabase
export async function getAllPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching posts:", error)
    return []
  }

  return data || []
}

// Get a single post by ID
export async function getPostById(id: number): Promise<BlogPost | null> {
  const { data, error } = await supabase.from("blog_posts").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching post:", error)
    return null
  }

  return data
}

// Add a new post
export async function addPost(post: Omit<BlogPost, "id" | "created_at" | "updated_at">): Promise<BlogPost | null> {
  const { data, error } = await supabase.from("blog_posts").insert([post]).select().single()

  if (error) {
    console.error("Error adding post:", error)
    return null
  }

  return data
}

// Update an existing post
export async function updatePost(id: number, updatedPost: Partial<BlogPost>): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from("blog_posts")
    .update({ ...updatedPost, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single()

  if (error) {
    console.error("Error updating post:", error)
    return null
  }

  return data
}

// Delete a post
export async function deletePost(id: number): Promise<boolean> {
  const { error } = await supabase.from("blog_posts").delete().eq("id", id)

  if (error) {
    console.error("Error deleting post:", error)
    return false
  }

  return true
}

// Helper function to get the latest posts for homepage
export async function getLatestPosts(limit = 2): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit)

  if (error) {
    console.error("Error fetching latest posts:", error)
    return []
  }

  return data || []
}

// Export the BlogPost type for backward compatibility
export type { BlogPost }
