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
  // Empty array - no default posts!
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
