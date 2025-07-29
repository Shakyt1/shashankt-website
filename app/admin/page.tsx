"use client"
import { useState, useEffect } from "react"
import type React from "react"

import { getAllPosts, addPost, deletePost, type BlogPost, updatePost } from "@/lib/posts"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, Lock, Edit } from "lucide-react"

export default function AdminPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [showForm, setShowForm] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "Philosophy",
    image: "/placeholder.svg?height=250&width=400",
  })

  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [showEditForm, setShowEditForm] = useState(false)

  // Simple password - you can change this to whatever you want
  const ADMIN_PASSWORD = "your_new_secure_password_here"

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setFormData({ ...formData, image: result })
      }
      reader.readAsDataURL(file)
    }
  }

  useEffect(() => {
    // Check if user is already authenticated (stored in sessionStorage)
    const authenticated = sessionStorage.getItem("adminAuthenticated")
    if (authenticated === "true") {
      setIsAuthenticated(true)
      fetchPosts()
    }
  }, [])

  const fetchPosts = async () => {
    try {
      setError(null)
      setLoading(true)
      const allPosts = await getAllPosts()
      setPosts(allPosts)
    } catch (error) {
      console.error("Error fetching posts:", error)
      setError("Unable to load posts. Please check your database setup.")
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      setLoginError("")
      // Store authentication in session (will be lost when browser closes)
      sessionStorage.setItem("adminAuthenticated", "true")
      fetchPosts()
    } else {
      setLoginError("Incorrect password. Please try again.")
      setPassword("")
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem("adminAuthenticated")
    setPassword("")
    setPosts([])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const newPost = await addPost({
        ...formData,
        date: new Date().toISOString().split("T")[0], // Format as YYYY-MM-DD
        read_time: `${Math.ceil(formData.content.split(" ").length / 200)} min read`,
      })

      if (newPost) {
        await fetchPosts() // Refresh the posts list
        setFormData({
          title: "",
          excerpt: "",
          content: "",
          category: "Philosophy",
          image: "/placeholder.svg?height=250&width=400",
        })
        setShowForm(false)
      } else {
        setError("Failed to create post. Please try again.")
      }
    } catch (error) {
      console.error("Error creating post:", error)
      setError("Failed to create post. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this post?")) {
      setLoading(true)
      try {
        const success = await deletePost(id)
        if (success) {
          await fetchPosts() // Refresh the posts list
        } else {
          setError("Failed to delete post. Please try again.")
        }
      } catch (error) {
        console.error("Error deleting post:", error)
        setError("Failed to delete post. Please try again.")
      } finally {
        setLoading(false)
      }
    }
  }

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post)
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      image: post.image || "/placeholder.svg?height=250&width=400",
    })
    setShowEditForm(true)
    setShowForm(false) // Hide new post form if open
  }

  const handleUpdatePost = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingPost) return

    setLoading(true)
    try {
      const updatedPost = await updatePost(editingPost.id, {
        ...formData,
        read_time: `${Math.ceil(formData.content.split(" ").length / 200)} min read`,
      })

      if (updatedPost) {
        await fetchPosts() // Refresh the posts list
        setFormData({
          title: "",
          excerpt: "",
          content: "",
          category: "Philosophy",
          image: "/placeholder.svg?height=250&width=400",
        })
        setShowEditForm(false)
        setEditingPost(null)
      } else {
        setError("Failed to update post. Please try again.")
      }
    } catch (error) {
      console.error("Error updating post:", error)
      setError("Failed to update post. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const cancelEdit = () => {
    setShowEditForm(false)
    setEditingPost(null)
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      category: "Philosophy",
      image: "/placeholder.svg?height=250&width=400",
    })
  }

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-black rounded-full flex items-center justify-center mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-black" style={{ fontFamily: "Host Grotesk, sans-serif" }}>
              Admin Access
            </h1>
            <p className="text-gray-600 mt-2" style={{ fontFamily: "Host Grotesk, sans-serif" }}>
              Enter password to access blog admin
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ fontFamily: "Host Grotesk, sans-serif" }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
                style={{ fontFamily: "Host Grotesk, sans-serif" }}
                placeholder="Enter admin password"
                required
              />
            </div>

            {loginError && (
              <div className="text-red-600 text-sm text-center" style={{ fontFamily: "Host Grotesk, sans-serif" }}>
                {loginError}
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-black text-white hover:bg-gray-800"
              style={{ fontFamily: "Host Grotesk, sans-serif" }}
            >
              Login
            </Button>
          </form>

          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-gray-500 hover:text-gray-700 text-sm"
              style={{ fontFamily: "Host Grotesk, sans-serif" }}
            >
              ← Back to Website
            </a>
          </div>
        </div>
      </div>
    )
  }

  // Admin Dashboard (only shown after authentication)
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold" style={{ fontFamily: "Host Grotesk, sans-serif" }}>
            Blog Admin
          </h1>
          <div className="flex items-center gap-4">
            <Button
              onClick={() => {
                if (showEditForm) {
                  cancelEdit()
                } else {
                  setShowForm(!showForm)
                  if (showEditForm) setShowEditForm(false)
                }
              }}
              className="bg-black text-white hover:bg-gray-800"
              style={{ fontFamily: "Host Grotesk, sans-serif" }}
              disabled={loading}
            >
              <Plus className="w-4 h-4 mr-2" />
              {showEditForm ? "Cancel Edit" : "New Post"}
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-red-500 text-red-500 hover:bg-red-50 bg-transparent"
              style={{ fontFamily: "Host Grotesk, sans-serif" }}
            >
              Logout
            </Button>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-600" style={{ fontFamily: "Host Grotesk, sans-serif" }}>
              {error}
            </p>
            <Button
              onClick={() => setError(null)}
              variant="ghost"
              size="sm"
              className="mt-2 text-red-600 hover:text-red-700"
            >
              Dismiss
            </Button>
          </div>
        )}

        {/* New/Edit Post Form */}
        {(showForm || showEditForm) && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4" style={{ fontFamily: "Host Grotesk, sans-serif" }}>
              {showEditForm ? `Edit Post: ${editingPost?.title}` : "Write New Post"}
            </h2>
            <form onSubmit={showEditForm ? handleUpdatePost : handleSubmit} className="space-y-4">
              {/* All the existing form fields remain the same */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ fontFamily: "Host Grotesk, sans-serif" }}>
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
                  style={{ fontFamily: "Host Grotesk, sans-serif" }}
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ fontFamily: "Host Grotesk, sans-serif" }}>
                  Excerpt (Short description)
                </label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 h-20"
                  style={{ fontFamily: "Host Grotesk, sans-serif" }}
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ fontFamily: "Host Grotesk, sans-serif" }}>
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
                  style={{ fontFamily: "Host Grotesk, sans-serif" }}
                  disabled={loading}
                >
                  <option value="Philosophy">Philosophy</option>
                  <option value="Research">Research</option>
                  <option value="Finance">Finance</option>
                  <option value="Technology">Technology</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ fontFamily: "Host Grotesk, sans-serif" }}>
                  Title Image
                </label>
                <div className="space-y-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
                    style={{ fontFamily: "Host Grotesk, sans-serif" }}
                    disabled={loading}
                  />
                  {formData.image && formData.image !== "/placeholder.svg?height=250&width=400" && (
                    <div className="relative w-32 h-24 rounded-lg overflow-hidden border border-gray-300">
                      <img
                        src={formData.image || "/placeholder.svg"}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, image: "/placeholder.svg?height=250&width=400" })}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                        disabled={loading}
                      >
                        ×
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ fontFamily: "Host Grotesk, sans-serif" }}>
                  Content (Write your full blog post here)
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 h-64"
                  style={{ fontFamily: "Host Grotesk, sans-serif" }}
                  placeholder="Write your blog post content here..."
                  required
                  disabled={loading}
                />
              </div>

              <div className="flex gap-4">
                <Button
                  type="submit"
                  className="bg-black text-white hover:bg-gray-800"
                  style={{ fontFamily: "Host Grotesk, sans-serif" }}
                  disabled={loading}
                >
                  {loading
                    ? showEditForm
                      ? "Updating..."
                      : "Publishing..."
                    : showEditForm
                      ? "Update Post"
                      : "Publish Post"}
                </Button>
                <Button
                  type="button"
                  onClick={showEditForm ? cancelEdit : () => setShowForm(false)}
                  variant="outline"
                  style={{ fontFamily: "Host Grotesk, sans-serif" }}
                  disabled={loading}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Posts List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold" style={{ fontFamily: "Host Grotesk, sans-serif" }}>
            Your Posts ({loading ? "Loading..." : posts.length})
          </h2>

          {loading && posts.length === 0 ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto mb-4"></div>
              <p className="text-gray-600" style={{ fontFamily: "Host Grotesk, sans-serif" }}>
                Loading posts...
              </p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600" style={{ fontFamily: "Host Grotesk, sans-serif" }}>
                No posts found. Create your first post!
              </p>
            </div>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: "Host Grotesk, sans-serif" }}>
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-2" style={{ fontFamily: "Host Grotesk, sans-serif" }}>
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="px-2 py-1 bg-gray-200 rounded text-xs">{post.category}</span>
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                      <span>{post.read_time}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      onClick={() => handleEdit(post)}
                      variant="outline"
                      size="sm"
                      className="text-blue-600 hover:text-blue-700 border-blue-200 hover:border-blue-300"
                      disabled={loading}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => handleDelete(post.id)}
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                      disabled={loading}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

