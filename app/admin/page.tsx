"use client"
import { useState, useEffect } from "react"
import type React from "react"

import { getAllPosts, addPost, deletePost, type BlogPost } from "@/lib/posts"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, Lock } from "lucide-react"

export default function AdminPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [showForm, setShowForm] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState("")
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "Philosophy",
    image: "/placeholder.svg?height=250&width=400",
  })

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
      setPosts(getAllPosts())
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      setLoginError("")
      // Store authentication in session (will be lost when browser closes)
      sessionStorage.setItem("adminAuthenticated", "true")
      setPosts(getAllPosts())
    } else {
      setLoginError("Incorrect password. Please try again.")
      setPassword("")
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem("adminAuthenticated")
    setPassword("")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newPost = addPost({
      ...formData,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      readTime: `${Math.ceil(formData.content.split(" ").length / 200)} min read`,
    })

    setPosts(getAllPosts())
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      category: "Philosophy",
      image: "/placeholder.svg?height=250&width=400",
    })
    setShowForm(false)
  }

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this post?")) {
      deletePost(id)
      setPosts(getAllPosts())
    }
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
              onClick={() => setShowForm(!showForm)}
              className="bg-black text-white hover:bg-gray-800"
              style={{ fontFamily: "Host Grotesk, sans-serif" }}
            >
              <Plus className="w-4 h-4 mr-2" />
              New Post
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

        {/* New Post Form */}
        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4" style={{ fontFamily: "Host Grotesk, sans-serif" }}>
              Write New Post
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                />
              </div>

              <div className="flex gap-4">
                <Button
                  type="submit"
                  className="bg-black text-white hover:bg-gray-800"
                  style={{ fontFamily: "Host Grotesk, sans-serif" }}
                >
                  Publish Post
                </Button>
                <Button
                  type="button"
                  onClick={() => setShowForm(false)}
                  variant="outline"
                  style={{ fontFamily: "Host Grotesk, sans-serif" }}
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
            Your Posts ({posts.length})
          </h2>
          {posts.map((post) => (
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
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    onClick={() => handleDelete(post.id)}
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
