import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../globals.css"

const inter = Inter({ subsets: ["latin"] })

// SEO Metadata for Chinese page
const siteConfig = {
  name: "双任务番茄钟 - ADHD友好工作法",
  description:
    "一款在两个任务间轮换的专注工具——为更好的注意力、更少的倦怠和温和的结构而设计。专为ADHD、学生和远程工作者打造。",
  url: "https://dual-task-pomodoro.com/zh",
  ogImage: "https://dual-task-pomodoro.com/og-image-zh.png", // 建议为中文页面创建单独的OG图
}

export const metadata: Metadata = {
  metadataBase: new URL("https://dual-task-pomodoro.com"),
  title: {
    default: siteConfig.name,
    template: `%s | 双任务番茄钟`,
  },
  description: siteConfig.description,
  
  // hreflang for internationalization
  alternates: {
    canonical: "/zh",
    languages: {
      "en": "/",
      "zh-CN": "/zh",
      "ja-JP": "/ja",
    },
  },
  
  // Open Graph
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: "双任务番茄钟",
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

export default function ZhLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
} 