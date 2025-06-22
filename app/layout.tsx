import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

// SEO Metadata
const siteConfig = {
  name: "Dual-Task Pomodoro",
  description:
    "A focus tool that rotates between two tasks, built for better attention, less burnout, and gentle structure. Perfect for ADHD minds, students, and remote workers.",
  url: "https://dual-task-pomodoro.com",
  ogImage: "https://dual-task-pomodoro.com/og-image.png",
}

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Pomodoro",
    "ADHD",
    "Focus",
    "Timer",
    "Productivity",
    "Dual Task",
  ],
  authors: [{ name: "Your Name", url: "https://your-link.com" }], // 请替换为您的信息
  creator: "Your Name", // 请替换为您的信息
  
  // hreflang for internationalization
  alternates: {
    canonical: "/",
    languages: {
      "en": "/",
      "zh-CN": "/zh",
      "zh-TW": "/zh-TW",
      "ja-JP": "/ja",
    },
  },
  
  // Open Graph
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },

  // Twitter
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@your_handle", // 请替换为您的Twitter handle
  },

  // Icons
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  // Manifest
  manifest: "/site.webmanifest",
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
