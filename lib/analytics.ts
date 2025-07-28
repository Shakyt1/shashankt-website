// Google Analytics 4 integration
declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

export const GA_TRACKING_ID = "G-XXXXXXXXXX" // Replace with your GA4 Measurement ID

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || []
    window.gtag = function gtag() {
      window.dataLayer.push(arguments)
    }
    window.gtag("js", new Date())
    window.gtag("config", GA_TRACKING_ID, {
      page_title: document.title,
      page_location: window.location.href,
    })
  }
}

// Track page views
export const trackPageView = (url: string, title: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", GA_TRACKING_ID, {
      page_title: title,
      page_location: url,
    })
  }
}

// Track custom events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Track newsletter signups
export const trackNewsletterSignup = (email: string) => {
  trackEvent("newsletter_signup", "engagement", "footer_form")
}

// Track blog post views
export const trackBlogView = (postTitle: string, postId: string) => {
  trackEvent("blog_view", "content", postTitle, Number.parseInt(postId))
}
