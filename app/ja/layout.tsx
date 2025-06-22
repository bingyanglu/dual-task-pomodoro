import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../globals.css"

const inter = Inter({ subsets: ["latin"] })

// SEO Metadata for Japanese page
const siteConfig = {
  name: "デュアルタスクポモドーロ - ADHDフレンドリーな作業方法",
  description:
    "2つのタスクを切り替える集中力ツール — 注意力を高め、燃え尽き症候群を減らし、緩やかな構造を構築します。ADHD、学生、リモートワーカーに最適です。",
  url: "https://dual-task-pomodoro.com/ja",
  ogImage: "https://dual-task-pomodoro.com/og-image-ja.png", // 日本語ページ用に別のOG画像を作成することをお勧めします
}

export const metadata: Metadata = {
  metadataBase: new URL("https://dual-task-pomodoro.com"),
  title: {
    default: siteConfig.name,
    template: `%s | デュアルタスクポモドーロ`,
  },
  description: siteConfig.description,
  
  // hreflang for internationalization
  alternates: {
    canonical: "/ja",
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
    locale: "ja_JP",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: "デュアルタスクポモドーロ",
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
    creator: "@your_handle", // あなたのTwitterハンドルに置き換えてください
  },
}

export default function JaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 