// This will store your posts (in a real app, this would be a database)
export interface BlogPost {
  id: number
  title: string
  excerpt: string
  content: string
  date: string
  readTime: string
  category: string
  image: string
}

// Your posts will be stored here - I've removed the sample posts
const posts: BlogPost[] = [
  {
    id: 1,
    title: "Welcome to Curiosity Lair",
    excerpt:
      "First Post - Hey everyone, I'm Shashank — and welcome to Curiosity Lair. This is my personal thinkpad. A space where curiosity leads the way...",
    content: `Hey everyone, I'm Shashank — and welcome to Curiosity Lair.

This is my personal thinkpad. A space where curiosity leads the way — where I dive into questions that often go unasked, explore uncharted ideas, sketch bold predictions, and spark conversations around the unexpected.

Here, you'll find reflections that span philosophy, technology, markets, cultural trends, and most deeply — finance and investing. The common thread? A relentless pursuit of understanding. Curiosity is the engine that powers this space. The desire to know more. To ask why. And to write about it with depth and clarity.

If that sounds like your kind of thing, I hope you enjoy reading as much as I enjoy writing.

For regular thoughts, threads, and musings, check out my Twitter and other socials.

This site is where I post the deeper dives — long-form essays, explorations, and thought pieces I can't stop thinking about.

Welcome aboard. Let's stay curious.`,
    date: "January 29, 2025",
    readTime: "3 min read",
    image: "/welcome-post-image.png",
    category: "Philosophy",
  },
]

export function getAllPosts(): BlogPost[] {
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostById(id: number): BlogPost | undefined {
  return posts.find((post) => post.id === id)
}

export function addPost(post: Omit<BlogPost, "id">): BlogPost {
  const newPost = {
    ...post,
    id: Math.max(...posts.map((p) => p.id), 0) + 1,
  }
  posts.unshift(newPost) // Add to beginning for chronological order
  return newPost
}

export function updatePost(id: number, updatedPost: Partial<BlogPost>): BlogPost | null {
  const index = posts.findIndex((post) => post.id === id)
  if (index === -1) return null

  posts[index] = { ...posts[index], ...updatedPost }
  return posts[index]
}

export function deletePost(id: number): boolean {
  const index = posts.findIndex((post) => post.id === id)
  if (index === -1) return false

  posts.splice(index, 1)
  return true
}

// Helper function to get the latest posts for homepage
export function getLatestPosts(limit = 2): BlogPost[] {
  return getAllPosts().slice(0, limit)
}

