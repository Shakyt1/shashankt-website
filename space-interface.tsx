"use client"
import { useState, useEffect, useRef } from "react"

import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NewsletterForm } from "@/components/newsletter-form"
import { Inter } from "next/font/google"

// Add Host Grotesk font
const hostGrotesk = Inter({
  subsets: ["latin"],
  variable: "--font-host-grotesk",
})

export default function Component() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const [currentTime, setCurrentTime] = useState("")
  const [displayedText, setDisplayedText] = useState("")
  const [showCursor, setShowCursor] = useState(true)
  const [cursorDisappearing, setCursorDisappearing] = useState(false)
  const [typingComplete, setTypingComplete] = useState(false)

  const fullText = "Curious minds find signals in stillness."

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const viewportHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight - viewportHeight

      // Header color change trigger
      setIsScrolled(scrollPosition > viewportHeight * 0.5)

      // Calculate scroll progress for animations (0 to 1)
      const progress = Math.min(scrollPosition / (viewportHeight * 2), 1)
      setScrollProgress(progress)
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

    // Update immediately
    updateTime()

    // Then update every second
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  // Typing effect
  useEffect(() => {
    let currentIndex = 0
    const typingSpeed = 80 // milliseconds per character
    const startDelay = 1000 // delay before typing starts

    const startTyping = () => {
      const typingInterval = setInterval(() => {
        if (currentIndex <= fullText.length) {
          setDisplayedText(fullText.slice(0, currentIndex))
          currentIndex++
        } else {
          clearInterval(typingInterval)
          setTypingComplete(true)
        }
      }, typingSpeed)

      return typingInterval
    }

    const delayTimeout = setTimeout(() => {
      const interval = startTyping()
      return () => clearInterval(interval)
    }, startDelay)

    return () => clearTimeout(delayTimeout)
  }, [])

  // Final cursor blinking sequence with inconsistent timing
  useEffect(() => {
    if (!typingComplete) return

    let blinkCount = 0
    const maxBlinks = 5
    // Inconsistent timing intervals (in milliseconds)
    const blinkIntervals = [400, 800, 300, 600, 450]

    const performFinalBlinks = () => {
      const nextBlink = () => {
        if (blinkCount >= maxBlinks) {
          // Start static effect after final blinks
          setTimeout(() => {
            setCursorDisappearing(true)
            // Hide cursor completely after static effect
            setTimeout(() => setShowCursor(false), 300)
          }, 200)
          return
        }

        // Toggle cursor visibility
        setShowCursor(false)

        setTimeout(() => {
          setShowCursor(true)
          blinkCount++

          // Schedule next blink with inconsistent timing
          if (blinkCount < maxBlinks) {
            setTimeout(nextBlink, blinkIntervals[blinkCount] || 500)
          } else {
            // Final blink before static
            setTimeout(() => {
              setCursorDisappearing(true)
              setTimeout(() => setShowCursor(false), 300)
            }, 200)
          }
        }, 150) // Short off duration
      }

      // Start the blinking sequence
      setTimeout(nextBlink, 500) // Initial delay after typing
    }

    performFinalBlinks()
  }, [typingComplete])

  // Regular cursor blinking effect (during typing)
  useEffect(() => {
    if (typingComplete || cursorDisappearing) return // Don't blink during final sequence

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530) // Blink every 530ms

    return () => clearInterval(cursorInterval)
  }, [typingComplete, cursorDisappearing])

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isMenuOpen])

  // Calculate transform values based on scroll progress
  const galaxyScale = 1 + scrollProgress * 0.5 // Scale from 1 to 1.5
  const textTranslateY = scrollProgress * -200 // Move text up by 200px
  const textOpacity = Math.max(1 - scrollProgress * 1.5, 0) // Fade out text

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleMenuItemClick = () => {
    setIsMenuOpen(false)
  }

  // Determine header styling - white when menu is open OR when scrolled
  const headerIsWhite = isMenuOpen || isScrolled

  return (
    <div className="bg-black text-white relative">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-20 transition-all duration-500 ease-out ${
          headerIsWhite ? "bg-white shadow-md" : "bg-transparent"
        }`}
        ref={menuRef}
      >
        <div className="flex items-center justify-between px-6 py-4">
          <div
            className={`text-lg font-medium transition-colors duration-500 ease-out font-sans ${headerIsWhite ? "text-black" : "text-white"}`}
            style={{ fontFamily: "Host Grotesk, sans-serif" }}
          >
            Shashank
          </div>

          <div className="flex items-center justify-center">
            <Image
              src="/emblem.svg"
              alt="Emblem"
              width={40}
              height={40}
              className={`transition-all duration-500 ease-out ${headerIsWhite ? "filter-none" : "filter brightness-0 invert"}`}
            />
          </div>

          <div className="flex items-center gap-4">
            <span
              className={`transition-colors duration-500 ease-out ${headerIsWhite ? "text-black" : "text-white"}`}
              style={{ fontFamily: "Host Grotesk, sans-serif" }}
            >
              {currentTime}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className={`transition-colors duration-500 ease-out ${
                headerIsWhite ? "text-black hover:bg-black/10" : "text-white hover:bg-white/10"
              }`}
              onClick={toggleMenu}
            >
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
            {/* Center the menu items relative to the emblem position */}
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
      <main className="relative">
        {/* Galaxy Background Section */}
        <div className="relative w-full h-[200vh] overflow-hidden">
          {/* Fixed Galaxy Background */}
          <div className="fixed inset-0 w-full h-screen">
            <div
              className="w-full h-full origin-center transition-transform duration-75 ease-out"
              style={{
                transform: `scale(${galaxyScale})`,
              }}
            >
              <Image
                src="/galaxy-background.png"
                alt="Spiral galaxy in deep space with stars"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/10"></div>
          </div>

          {/* Animated Quote Text with Typing Effect */}
          <div
            className="fixed bottom-16 left-6 right-6 z-10 transition-all duration-75 ease-out"
            style={{
              transform: `translateY(${textTranslateY}px)`,
              opacity: textOpacity,
              fontFamily: "Host Grotesk, sans-serif",
            }}
          >
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight"
              style={{ fontFamily: "Host Grotesk, sans-serif" }}
            >
              {displayedText}
              {showCursor && (
                <span
                  className={`inline-block w-1 h-[1em] bg-white ml-1 ${
                    cursorDisappearing ? "animate-pulse opacity-0" : showCursor ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    animation: cursorDisappearing ? "staticDisappear 300ms ease-out forwards" : "none",
                  }}
                />
              )}
            </h1>
          </div>
        </div>

        {/* Blog Section */}
        <section className="bg-white text-black relative z-10">
          {/* Gradient overlay for smooth transition */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none"></div>
          <div className="container mx-auto px-6 pt-24 pb-16 max-w-6xl">
            {/* Section Title */}
            <div className="text-center mb-12">
              <h2
                className="text-3xl md:text-4xl font-light text-black"
                style={{ fontFamily: "Host Grotesk, sans-serif" }}
              >
                Read My Blogs
              </h2>
            </div>

            {/* Read More Button - Top Right */}
            <div className="flex justify-end mb-8">
              <Button
                asChild
                variant="outline"
                className="border-black text-black hover:bg-black hover:text-white bg-transparent"
                style={{ fontFamily: "Host Grotesk, sans-serif" }}
              >
                <a href="/research">Read More</a>
              </Button>
            </div>

            {/* Blog Previews Grid - 2 Posts */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* First Blog Post */}
              <article className="group cursor-pointer">
                <a href="/blog/1" className="block">
                  {/* Blog Image */}
                  <div className="relative w-full h-48 rounded-lg overflow-hidden mb-4">
                    <Image
                      src="/placeholder.svg?height=300&width=500"
                      alt="Telescope pointing towards a starry night sky"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300"></div>
                  </div>

                  {/* Blog Content */}
                  <div className="space-y-3">
                    <div
                      className="text-sm text-gray-600 uppercase tracking-wide"
                      style={{ fontFamily: "Host Grotesk, sans-serif" }}
                    >
                      March 15, 2024
                    </div>
                    <h3
                      className="text-xl md:text-2xl font-light leading-tight group-hover:text-gray-700 transition-colors duration-300"
                      style={{ fontFamily: "Host Grotesk, sans-serif" }}
                    >
                      The Art of Finding Meaning in the Cosmos
                    </h3>
                    <p
                      className="text-sm text-gray-700 leading-relaxed"
                      style={{ fontFamily: "Host Grotesk, sans-serif" }}
                    >
                      Exploring how ancient wisdom and modern science converge in our quest to understand the universe
                      and our place within it. In the vast expanse of the cosmos...
                    </p>
                  </div>
                </a>
              </article>

              {/* Second Blog Post */}
              <article className="group cursor-pointer">
                <a href="/blog/2" className="block">
                  {/* Blog Image */}
                  <div className="relative w-full h-48 rounded-lg overflow-hidden mb-4">
                    <Image
                      src="/placeholder.svg?height=300&width=500"
                      alt="Data visualization with cosmic background"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300"></div>
                  </div>

                  {/* Blog Content */}
                  <div className="space-y-3">
                    <div
                      className="text-sm text-gray-600 uppercase tracking-wide"
                      style={{ fontFamily: "Host Grotesk, sans-serif" }}
                    >
                      March 8, 2024
                    </div>
                    <h3
                      className="text-xl md:text-2xl font-light leading-tight group-hover:text-gray-700 transition-colors duration-300"
                      style={{ fontFamily: "Host Grotesk, sans-serif" }}
                    >
                      Signals in the Noise: A Data Scientist's Journey
                    </h3>
                    <p
                      className="text-sm text-gray-700 leading-relaxed"
                      style={{ fontFamily: "Host Grotesk, sans-serif" }}
                    >
                      From financial markets to cosmic phenomena, the art of finding meaningful patterns in seemingly
                      random data. Every dataset tells a story waiting to be discovered...
                    </p>
                  </div>
                </a>
              </article>
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <footer className="bg-black text-white relative z-10">
          <div className="container mx-auto px-6 py-16 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-8 items-start">
              {/* Newsletter Section - Left */}
              <div className="space-y-6">
                <h3 className="text-2xl font-light" style={{ fontFamily: "Host Grotesk, sans-serif" }}>
                  Join My Newsletter!
                </h3>

                {/* ConvertKit Newsletter Form */}
                <NewsletterForm />
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

            {/* Spotify Player - Compact */}
            <div className="mt-12 pt-8 border-t border-gray-800">
              <div className="flex justify-center">
                <iframe
                  src="https://open.spotify.com/embed/playlist/1HRrDmi58VPxvt78Od3sw4?utm_source=generator&theme=0"
                  width="100%"
                  height="152"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="rounded-lg max-w-sm"
                ></iframe>
              </div>
            </div>

            {/* Copyright */}
            <div className="mt-8 pt-8 border-t border-gray-800">
              <p className="text-gray-500 text-center" style={{ fontFamily: "Host Grotesk, sans-serif" }}>
                © 2025 Shashank. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </main>

      {/* CSS for static disappear effect */}
      <style jsx>{`
        @keyframes staticDisappear {
          0% {
            opacity: 1;
            transform: scaleY(1);
          }
          20% {
            opacity: 0.8;
            transform: scaleY(0.9) scaleX(1.1);
          }
          40% {
            opacity: 0.6;
            transform: scaleY(1.1) scaleX(0.9);
          }
          60% {
            opacity: 0.4;
            transform: scaleY(0.8) scaleX(1.2);
          }
          80% {
            opacity: 0.2;
            transform: scaleY(1.3) scaleX(0.7);
          }
          100% {
            opacity: 0;
            transform: scaleY(0) scaleX(2);
          }
        }
      `}</style>
    </div>
  )
}
