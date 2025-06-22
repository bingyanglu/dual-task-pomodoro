import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../globals.css"

const inter = Inter({ subsets: ["latin"] })

// SEO Metadata for Traditional Chinese page
const siteConfig = {
  name: "雙任務番茄鐘 - ADHD 友善工作法",
  description:
    "一款在兩個任務間輪換的專注工具——為更好的注意力、更少的倦怠和溫和的結構而設計。專為ADHD、學生和遠程工作者打造。",
  url: "https://dual-task-pomodoro.com/zh-TW",
  ogImage: "https://dual-task-pomodoro.com/og-image-zh.png", // 建议为繁体中文页面创建单独的OG图
}

export const metadata: Metadata = {
  metadataBase: new URL("https://dual-task-pomodoro.com"),
  title: {
    default: siteConfig.name,
    template: `%s | 雙任務番茄鐘`,
  },
  description: siteConfig.description,
  
  // hreflang for internationalization
  alternates: {
    canonical: "/zh-TW",
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
    locale: "zh_TW",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: "雙任務番茄鐘",
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
}

export default function ZhTwLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 