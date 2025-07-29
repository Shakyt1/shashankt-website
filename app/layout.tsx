import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Analytics } from "@/components/analytics"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Shashank - Research & Writing",
  description: "Exploring the intersection of finance, research, and cosmic curiosity",
  keywords: "research, finance, writing, philosophy, data science",
  authors: [{ name: "Shashank" }],
  openGraph: {
    title: "Shashank - Research & Writing",
    description: "Exploring the intersection of finance, research, and cosmic curiosity",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>
        <Suspense fallback={<div>Loading...</div>}>
          {children}
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
