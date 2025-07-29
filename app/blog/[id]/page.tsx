"use client"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { Menu, X, ArrowLeft, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getPostById, type BlogPost } from "@/lib/posts"
import { Manrope } from "next/font/google"

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
})

export default function BlogPostPage() {
  const params = useParams()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPost() {
      if (params.id) {
        try {
          setError(null)
          const postId = Number.parseInt(params.id as string)
          const foundPost = await getPostById(postId)
          setPost(foundPost)
          if (!foundPost) {
            setError("Post not found")
          }
        } catch (error) {
          console.error("Error fetching post:", error)
          setError("Unable to load post. Please try again.")
        } finally {
          setLoading(false)
        }
      }
    }

    fetchPost()
  }, [params.id])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Live clock effect
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const timeString = now.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
      setCurrentTime(timeString)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleMenuItemClick = () => {
    setIsMenuOpen(false)
  }

  const headerIsWhite = isMenuOpen || isScrolled

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600" style={{ fontFamily: "Host Grotesk, sans-serif" }}>
            Loading post...
          </p>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4" style={{ fontFamily: "Host Grotesk, sans-serif" }}>
            {error || "Post Not Found"}
          </h1>
          <p className="text-gray-600 mb-6" style={{ fontFamily: "Host Grotesk, sans-serif" }}>
            {error === "Post not found"
              ? "The blog post you're looking for doesn't exist."
              : "There was an error loading the post. Please try again."}
          </p>
          <Button asChild className="bg-black text-white hover:bg-gray-800">
            <a href="/research" style={{ fontFamily: "Host Grotesk, sans-serif" }}>
              Back to Research
            </a>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 text-black min-h-screen">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-20 transition-all duration-500 ease-out ${headerIsWhite ? "bg-white shadow-md" : "bg-gray-50"}`}
      >
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="icon" className="text-black hover:bg-black/10">
              <a href="/research">
                <ArrowLeft className="h-5 w-5" />
              </a>
            </Button>
            <div className="text-lg font-medium text-black" style={{ fontFamily: "Host Grotesk, sans-serif" }}>
              Shashank
            </div>
          </div>

          <div className="flex items-center justify-center">
            <Image src="/emblem.svg" alt="Emblem" width={40} height={40} className="filter-none" />
          </div>

          <div className="flex items-center gap-4">
            <span className="text-black" style={{ fontFamily: "Host Grotesk, sans-serif" }}>
              {currentTime}
            </span>
            <Button variant="ghost" size="icon" className="text-black hover:bg-black/10" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Dropdown Menu */}
        <div
          className={`absolute top-full left-0 right-0 bg-white border-t border-gray-200 transition-all duration-500 ease-out overflow-hidden ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="px-6 py-8">
            <div className="flex justify-center">
              <div className="flex flex-col items-center space-y-6">
                <a
                  href="/"
                  className="text-2xl font-light text-black transition-all duration-300 hover:opacity-70 hover:scale-105"
                  style={{ fontFamily: "Host Grotesk, sans-serif" }}
                  onClick={handleMenuItemClick}
                >
                  Home
                </a>
                <a
                  href="/research"
                  className="text-2xl font-light text-black transition-all duration-300 hover:opacity-70 hover:scale-105"
                  style={{ fontFamily: "Host Grotesk, sans-serif" }}
                  onClick={handleMenuItemClick}
                >
                  Research
                </a>
                <a
                  href="/about"
                  className="text-2xl font-light text-black transition-all duration-300 hover:opacity-70 hover:scale-105"
                  style={{ fontFamily: "Host Grotesk, sans-serif" }}
                  onClick={handleMenuItemClick}
                >
                  About
                </a>
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 pb-16">
        <article className="container mx-auto px-6 max-w-4xl">
          {/* Post Header */}
          <header className="mb-12">
            {/* Category and Meta Info */}
            <div className="flex items-center gap-4 mb-6 text-sm text-gray-500">
              <span
                className="px-3 py-1 bg-gray-200 text-gray-700 text-xs uppercase tracking-wide rounded"
                style={{ fontFamily: "Host Grotesk, sans-serif" }}
              >
                {post.category}
              </span>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span style={{ fontFamily: "Host Grotesk, sans-serif" }}>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span style={{ fontFamily: "Host Grotesk, sans-serif" }}>{post.read_time}</span>
              </div>
            </div>

            {/* Title */}
            <h1
              className="text-4xl md:text-5xl font-light leading-tight mb-6"
              style={{ fontFamily: "Host Grotesk, sans-serif" }}
            >
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className={`text-xl text-gray-600 leading-relaxed mb-8 ${manrope.className}`}>{post.excerpt}</p>

            {/* Featured Image */}
            {post.image && (
              <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden mb-8">
                <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
              </div>
            )}
          </header>

          {/* Post Content */}
          <div className="prose prose-lg max-w-none">
            <div
              className={`text-lg leading-relaxed text-gray-800 whitespace-pre-wrap ${manrope.className}`}
              style={{ lineHeight: "1.8" }}
            >
              {post.content}
            </div>
          </div>

          {/* Post Footer */}
          <footer className="mt-16 pt-8 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <Button
                asChild
                variant="outline"
                className="border-black text-black hover:bg-black hover:text-white bg-transparent"
                style={{ fontFamily: "Host Grotesk, sans-serif" }}
              >
                <a href="/research">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Research
                </a>
              </Button>

              <div className="text-sm text-gray-500" style={{ fontFamily: "Host Grotesk, sans-serif" }}>
                Published on{" "}
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
          </footer>
        </article>
      </main>

      {/* Footer Section */}
      <footer className="bg-black text-white relative z-10">
        <div className="container mx-auto px-6 py-16 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Newsletter Section - Left */}
            <div className="space-y-6">
              <h3 className="text-2xl font-light" style={{ fontFamily: "Host Grotesk, sans-serif" }}>
                Join My Newsletter!
              </h3>
              <form className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  required
                  className="w-full px-4 py-3 bg-transparent border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors duration-300 rounded-none"
                  style={{ fontFamily: "Host Grotesk, sans-serif" }}
                />
                <Button
                  type="submit"
                  className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-none transition-colors duration-300"
                  style={{ fontFamily: "Host Grotesk, sans-serif" }}
                >
                  Join
                </Button>
              </form>
            </div>

            {/* Navigation Links - Right */}
            <div className="flex flex-col space-y-6 md:items-end">
              <nav className="flex flex-col space-y-4 text-right">
                <a
                  href="/"
                  className="text-gray-400 hover:text-white transition-colors text-lg"
                  style={{ fontFamily: "Host Grotesk, sans-serif" }}
                >
                  Home
                </a>
                <a
                  href="/research"
                  className="text-gray-400 hover:text-white transition-colors text-lg"
                  style={{ fontFamily: "Host Grotesk, sans-serif" }}
                >
                  Research
                </a>
                <a
                  href="/about"
                  className="text-gray-400 hover:text-white transition-colors text-lg"
                  style={{ fontFamily: "Host Grotesk, sans-serif" }}
                >
                  About
                </a>
              </nav>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-16 pt-8 border-t border-gray-800">
            <p className="text-gray-500 text-center" style={{ fontFamily: "Host Grotesk, sans-serif" }}>
              © 2025 Shashank. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
