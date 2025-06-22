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
      "ko-KR": "/ko",
      "es-ES": "/es",
      "de-DE": "/de",
      "pt-PT": "/pt",
      "fr-FR": "/fr",
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

// 动态语言检测函数
function getLanguageFromPath(pathname: string): string {
  if (pathname.startsWith('/zh-TW')) return 'zh-TW'
  if (pathname.startsWith('/zh')) return 'zh-CN'
  if (pathname.startsWith('/ja')) return 'ja'
  if (pathname.startsWith('/ko')) return 'ko'
  if (pathname.startsWith('/es')) return 'es'
  if (pathname.startsWith('/de')) return 'de'
  if (pathname.startsWith('/pt')) return 'pt'
  if (pathname.startsWith('/fr')) return 'fr'
  return 'en'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // 注意：在服务器端渲染时，我们无法获取 pathname
  // 所以这里使用默认的英文，语言特定的设置会在各自的 layout.tsx 中处理
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
