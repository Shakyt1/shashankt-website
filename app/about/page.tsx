"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Menu, X, Twitter, Instagram, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Manrope } from "next/font/google"

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
})

export default function AboutPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 50)
      setScrollY(scrollPosition) // Add this line for parallax
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleMenuItemClick = () => {
    setIsMenuOpen(false)
  }

  return (
    <div className="bg-gray-50 text-black min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-20 bg-gray-50">
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
              13:30:24
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
                  className="text-2xl font-light text-black transition-all duration-300 hover:opacity-70 hover:scale-105 opacity-50"
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
          {/* Profile Section - Image and Text Side by Side */}
          <div className="grid md:grid-cols-2 gap-8 items-center mt-16 mb-12">
            {/* Profile Image - Left with Parallax */}
            <div className="flex justify-start">
              <div
                className="relative w-96 h-96 overflow-hidden transition-transform duration-75 ease-out group"
                style={{
                  transform: `translateY(${scrollY * 0.1}px)`, // Subtle parallax effect
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                <Image
                  src="/profile-image.jpeg"
                  alt="Shashank Profile"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
              </div>
            </div>

            {/* Name and Description - Right with Animation */}
            <div className="space-y-6">
              <h1
                className="text-4xl md:text-5xl font-medium leading-tight text-black"
                style={{ fontFamily: "Host Grotesk, sans-serif" }}
              >
                Shashank
              </h1>
              <p className={`text-lg md:text-xl text-gray-600 font-light leading-relaxed ${manrope.className}`}>
                With roots in finance and research, I write to navigate the grey areas of thought
              </p>

              {/* Social Media Icons */}
              <div className="flex items-center space-x-4 pt-2">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-3 rounded-full border border-gray-300 hover:border-gray-500 transition-all duration-300 hover:scale-110"
                >
                  <Twitter className="w-5 h-5 text-gray-600 group-hover:text-black transition-colors duration-300" />
                </a>
                <a
                  href="https://substack.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-3 rounded-full border border-gray-300 hover:border-gray-500 transition-all duration-300 hover:scale-110"
                >
                  <FileText className="w-5 h-5 text-gray-600 group-hover:text-black transition-colors duration-300" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-3 rounded-full border border-gray-300 hover:border-gray-500 transition-all duration-300 hover:scale-110"
                >
                  <Instagram className="w-5 h-5 text-gray-600 group-hover:text-black transition-colors duration-300" />
                </a>
              </div>
            </div>
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
              <p className="text-gray-300" style={{ fontFamily: "Host Grotesk, sans-serif" }}>
                newsletter@shashank.com
              </p>
              <Button
                className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-none"
                style={{ fontFamily: "Host Grotesk, sans-serif" }}
              >
                Join
              </Button>
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
