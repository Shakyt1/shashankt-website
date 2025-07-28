"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Menu, X, Calendar, ArrowRight, Search, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Manrope } from "next/font/google"
import { getAllPosts, type BlogPost } from "@/lib/posts"

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
})

export default function ResearchPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [posts, setPosts] = useState<BlogPost[]>([])

  // Get unique categories from posts
  const categories = ["All", ...Array.from(new Set(posts.map((post) => post.category)))]

  useEffect(() => {
    setPosts(getAllPosts())
  }, [])

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

  // Filter posts based on search query and category
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleMenuItemClick = () => {
    setIsMenuOpen(false)
  }

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category)
    setIsFilterOpen(false)
  }

  const headerIsWhite = isMenuOpen || isScrolled

  return (
    <div className="bg-gray-50 text-black min-h-screen">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-20 transition-all duration-500 ease-out ${headerIsWhite ? "bg-white shadow-md" : "bg-gray-50"}`}
      >
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center">
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
                  className="text-2xl font-light text-black transition-all duration-300 hover:opacity-70 hover:scale-105 opacity-50"
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
        <div className="container mx-auto px-6 max-w-6xl">
          {/* Hero Section */}
          <div className="text-center py-16 border-b border-gray-200">
            <p
              className={`text-xl md:text-2xl text-gray-600 font-light leading-relaxed max-w-4xl mx-auto ${manrope.className}`}
            >
              Every post here begins with curiosity, not certainty. These are not conclusions, but explorations —
              fragments of thought shaped by data, logic, and doubt. Research is rarely final, and each piece is a step
              into the unknown, backed by reason.
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="py-8">
            <div className="flex items-center justify-center gap-4 max-w-2xl mx-auto">
              {/* Search Bar */}
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 text-black placeholder-gray-500 focus:outline-none focus:border-gray-500 transition-colors duration-300 rounded-lg text-sm"
                  style={{ fontFamily: "Host Grotesk, sans-serif" }}
                />
              </div>

              {/* Filter Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-black hover:bg-gray-50 focus:outline-none focus:border-gray-500 transition-colors duration-300 rounded-lg text-sm"
                  style={{ fontFamily: "Host Grotesk, sans-serif" }}
                >
                  {selectedCategory}
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${isFilterOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isFilterOpen && (
                  <div className="absolute top-full right-0 mt-1 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => handleCategorySelect(category)}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg ${
                          selectedCategory === category ? "bg-gray-100 font-medium" : ""
                        }`}
                        style={{ fontFamily: "Host Grotesk, sans-serif" }}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Results Count */}
            <div className="text-center mt-4">
              <p className="text-sm text-gray-500" style={{ fontFamily: "Host Grotesk, sans-serif" }}>
                {filteredPosts.length} {filteredPosts.length === 1 ? "post" : "posts"} found
              </p>
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="py-8">
            {filteredPosts.length > 0 ? (
              <div className="grid gap-6">
                {filteredPosts.map((post) => (
                  <article key={post.id} className="grid md:grid-cols-[1fr_1.5fr] gap-0 items-center">
                    {/* Blog Image - Left */}
                    <div className="relative w-3/4 h-40 md:h-48 overflow-hidden group">
                      <Image
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300"></div>
                    </div>

                    {/* Blog Content - Right */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <span
                          className="px-2 py-1 bg-gray-200 text-gray-700 text-xs uppercase tracking-wide"
                          style={{ fontFamily: "Host Grotesk, sans-serif" }}
                        >
                          {post.category}
                        </span>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3 h-3" />
                          <span style={{ fontFamily: "Host Grotesk, sans-serif" }}>{post.date}</span>
                        </div>
                        <span style={{ fontFamily: "Host Grotesk, sans-serif" }}>{post.readTime}</span>
                      </div>

                      <a href={`/blog/${post.id}`}>
                        <h2
                          className="text-xl md:text-2xl font-light leading-tight text-black hover:text-gray-700 transition-colors duration-300 cursor-pointer"
                          style={{ fontFamily: "Host Grotesk, sans-serif" }}
                        >
                          {post.title}
                        </h2>
                      </a>

                      <p className={`text-sm text-gray-600 leading-relaxed ${manrope.className}`}>{post.excerpt}</p>

                      <Button
                        asChild
                        variant="ghost"
                        className="group p-0 h-auto text-black hover:bg-transparent hover:text-gray-700 transition-colors duration-300"
                        style={{ fontFamily: "Host Grotesk, sans-serif" }}
                      >
                        <a href={`/blog/${post.id}`}>
                          Read More
                          <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                        </a>
                      </Button>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg" style={{ fontFamily: "Host Grotesk, sans-serif" }}>
                  No posts found matching your search criteria.
                </p>
              </div>
            )}
          </div>
        </div>
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
