"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Menu, X, Github, Linkedin, Twitter, Mail, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 50)
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

  const headerIsWhite = isMenuOpen || isScrolled

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-20 transition-all duration-500 ease-out ${
          headerIsWhite ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className={`transition-colors duration-500 ease-out ${
                headerIsWhite ? "text-black hover:bg-black/10" : "text-white hover:bg-white/10"
              }`}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div
              className={`text-lg font-medium transition-colors duration-500 ease-out ${
                headerIsWhite ? "text-black" : "text-white"
              }`}
              style={{ fontFamily: "Host Grotesk, sans-serif" }}
            >
              Shashank
            </div>
          </div>

          <div className="flex items-center justify-center">
            <Image
              src="/emblem.svg"
              alt="Emblem"
              width={40}
              height={40}
              className={`transition-all duration-500 ease-out ${
                headerIsWhite ? "filter-none" : "filter brightness-0 invert"
              }`}
            />
          </div>

          <div className="flex items-center gap-4">
            <span
              className={`transition-colors duration-500 ease-out ${headerIsWhite ? "text-black" : "text-white"}`}
              style={{ fontFamily: "Host Grotesk, sans-serif" }}
            >
              11:59:26
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
            <div className="flex justify-center">
              <div className="flex flex-col items-center space-y-6">
                <a
                  href="#"
                  className="text-2xl font-light text-black transition-all duration-300 hover:opacity-70 hover:scale-105"
                  style={{ fontFamily: "Host Grotesk, sans-serif" }}
                  onClick={handleMenuItemClick}
                >
                  Home
                </a>
                <a
                  href="#"
                  className="text-2xl font-light text-black transition-all duration-300 hover:opacity-70 hover:scale-105"
                  style={{ fontFamily: "Host Grotesk, sans-serif" }}
                  onClick={handleMenuItemClick}
                >
                  Research
                </a>
                <a
                  href="#"
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
      <main className="relative pt-20">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-6">
          {/* Subtle star background */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-10 w-1 h-1 bg-white rounded-full animate-pulse"></div>
            <div className="absolute top-40 right-20 w-1 h-1 bg-white rounded-full animate-pulse delay-1000"></div>
            <div className="absolute top-60 left-1/4 w-1 h-1 bg-white rounded-full animate-pulse delay-2000"></div>
            <div className="absolute bottom-40 right-1/3 w-1 h-1 bg-white rounded-full animate-pulse delay-500"></div>
            <div className="absolute bottom-60 left-1/2 w-1 h-1 bg-white rounded-full animate-pulse delay-1500"></div>
          </div>

          <div className="max-w-4xl mx-auto text-center space-y-12">
            {/* Profile Image */}
            <div className="relative w-48 h-48 mx-auto mb-8">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 p-1">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                  <Image
                    src="/placeholder.svg?height=180&width=180"
                    alt="Shashank Profile"
                    width={180}
                    height={180}
                    className="rounded-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Name and Title */}
            <div className="space-y-4">
              <h1
                className="text-5xl md:text-7xl font-light leading-tight"
                style={{ fontFamily: "Host Grotesk, sans-serif" }}
              >
                Shashank
              </h1>
              <p
                className="text-xl md:text-2xl text-gray-300 font-light"
                style={{ fontFamily: "Host Grotesk, sans-serif" }}
              >
                Researcher • Developer • Cosmic Explorer
              </p>
            </div>

            {/* Bio */}
            <div className="max-w-2xl mx-auto space-y-6">
              <p
                className="text-lg md:text-xl leading-relaxed text-gray-200"
                style={{ fontFamily: "Host Grotesk, sans-serif" }}
              >
                I'm a passionate researcher exploring the intersection of technology and the cosmos. My work focuses on
                finding patterns in complex systems and translating abstract concepts into meaningful insights.
              </p>
              <p
                className="text-lg md:text-xl leading-relaxed text-gray-200"
                style={{ fontFamily: "Host Grotesk, sans-serif" }}
              >
                When I'm not diving deep into research, you'll find me contemplating the vastness of space and seeking
                signals in the stillness of the universe.
              </p>
            </div>

            {/* Social Media Icons */}
            <div className="flex justify-center space-x-8 pt-8">
              <a
                href="#"
                className="group p-4 rounded-full border border-gray-600 hover:border-white transition-all duration-300 hover:scale-110"
              >
                <Github className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors duration-300" />
              </a>
              <a
                href="#"
                className="group p-4 rounded-full border border-gray-600 hover:border-white transition-all duration-300 hover:scale-110"
              >
                <Linkedin className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors duration-300" />
              </a>
              <a
                href="#"
                className="group p-4 rounded-full border border-gray-600 hover:border-white transition-all duration-300 hover:scale-110"
              >
                <Twitter className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors duration-300" />
              </a>
              <a
                href="#"
                className="group p-4 rounded-full border border-gray-600 hover:border-white transition-all duration-300 hover:scale-110"
              >
                <Mail className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors duration-300" />
              </a>
            </div>
          </div>
        </section>

        {/* Skills/Interests Section */}
        <section className="py-20 px-6 border-t border-gray-800">
          <div className="max-w-4xl mx-auto">
            <h2
              className="text-3xl md:text-4xl font-light text-center mb-16"
              style={{ fontFamily: "Host Grotesk, sans-serif" }}
            >
              Areas of Focus
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                  <div className="w-8 h-8 bg-white rounded-full"></div>
                </div>
                <h3 className="text-xl font-medium" style={{ fontFamily: "Host Grotesk, sans-serif" }}>
                  Research
                </h3>
                <p className="text-gray-400 leading-relaxed" style={{ fontFamily: "Host Grotesk, sans-serif" }}>
                  Exploring complex systems and finding meaningful patterns in data and phenomena.
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center">
                  <div className="w-8 h-8 bg-white rounded-full"></div>
                </div>
                <h3 className="text-xl font-medium" style={{ fontFamily: "Host Grotesk, sans-serif" }}>
                  Development
                </h3>
                <p className="text-gray-400 leading-relaxed" style={{ fontFamily: "Host Grotesk, sans-serif" }}>
                  Building innovative solutions that bridge the gap between theory and practical application.
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-pink-400 to-red-500 flex items-center justify-center">
                  <div className="w-8 h-8 bg-white rounded-full"></div>
                </div>
                <h3 className="text-xl font-medium" style={{ fontFamily: "Host Grotesk, sans-serif" }}>
                  Philosophy
                </h3>
                <p className="text-gray-400 leading-relaxed" style={{ fontFamily: "Host Grotesk, sans-serif" }}>
                  Contemplating the deeper questions about existence, consciousness, and our cosmic purpose.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 px-6 border-t border-gray-800">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-gray-500" style={{ fontFamily: "Host Grotesk, sans-serif" }}>
              © 2025 Shashank. All rights reserved.
            </p>
          </div>
        </footer>
      </main>
    </div>
  )
}
