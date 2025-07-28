"use client"
import { useState } from "react"
import type React from "react"

import { Button } from "@/components/ui/button"
import { subscribeToNewsletter } from "@/lib/convertkit"
import { trackNewsletterSignup } from "@/lib/analytics"

interface NewsletterFormProps {
  className?: string
}

export function NewsletterForm({ className = "" }: NewsletterFormProps) {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    try {
      const result = await subscribeToNewsletter(email)

      if (result.success) {
        setStatus("success")
        setMessage(result.message)
        setEmail("")
        trackNewsletterSignup(email)
      } else {
        setStatus("error")
        setMessage(result.message)
      }
    } catch (error) {
      setStatus("error")
      setMessage("Something went wrong. Please try again.")
    }

    // Reset status after 5 seconds
    setTimeout(() => {
      setStatus("idle")
      setMessage("")
    }, 5000)
  }

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          required
          disabled={status === "loading"}
          className="w-full px-4 py-3 bg-transparent border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors duration-300 rounded-none disabled:opacity-50"
          style={{ fontFamily: "Host Grotesk, sans-serif" }}
        />
        <Button
          type="submit"
          disabled={status === "loading"}
          className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-none transition-colors duration-300 disabled:opacity-50"
          style={{ fontFamily: "Host Grotesk, sans-serif" }}
        >
          {status === "loading" ? "Joining..." : "Join"}
        </Button>
      </form>

      {/* Status Messages */}
      {message && (
        <div
          className={`mt-4 text-sm ${status === "success" ? "text-green-400" : "text-red-400"}`}
          style={{ fontFamily: "Host Grotesk, sans-serif" }}
        >
          {message}
        </div>
      )}
    </div>
  )
}
