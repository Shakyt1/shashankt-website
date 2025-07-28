"use client"
import { useEffect } from "react"
import Script from "next/script"
import { usePathname } from "next/navigation"
import { trackPageView, GA_TRACKING_ID } from "@/lib/analytics"

export function Analytics() {
  const pathname = usePathname()

  useEffect(() => {
    // Track page views when route changes
    if (pathname) {
      trackPageView(window.location.href, document.title)
    }
  }, [pathname])

  return (
    <>
      {/* Google Analytics */}
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} strategy="afterInteractive" />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_title: document.title,
              page_location: window.location.href,
            });
          `,
        }}
      />
    </>
  )
}
