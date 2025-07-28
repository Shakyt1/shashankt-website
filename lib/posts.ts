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

// Your posts will be stored here
const posts: BlogPost[] = [
  {
    id: 1,
    title: "The Art of Finding Meaning in the Cosmos",
    excerpt:
      "Exploring how ancient wisdom and modern science converge in our quest to understand the universe and our place within it...",
    content: "Full blog content goes here. You can write as much as you want...",
    date: "March 15, 2024",
    readTime: "8 min read",
    image: "/placeholder.svg?height=250&width=400",
    category: "Philosophy",
  },
  {
    id: 2,
    title: "Signals in the Noise: A Data Scientist's Journey",
    excerpt:
      "From financial markets to cosmic phenomena, the art of finding meaningful patterns in seemingly random data...",
    content: "Full blog content goes here...",
    date: "March 8, 2024",
    readTime: "12 min read",
    image: "/placeholder.svg?height=250&width=400",
    category: "Research",
  },
  {
    id: 3,
    title: "The Grey Areas of Financial Innovation",
    excerpt:
      "Navigating the complex intersection of traditional finance and emerging technologies. An analysis of regulatory frameworks...",
    content: "Full blog content goes here...",
    date: "February 28, 2024",
    readTime: "10 min read",
    image: "/placeholder.svg?height=250&width=400",
    category: "Finance",
  },
  {
    id: 4,
    title: "Contemplating Consciousness in the Digital Age",
    excerpt:
      "As artificial intelligence advances, we must grapple with fundamental questions about consciousness and awareness...",
    content: "Full blog content goes here...",
    date: "February 20, 2024",
    readTime: "15 min read",
    image: "/placeholder.svg?height=250&width=400",
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
  posts.unshift(newPost)
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
