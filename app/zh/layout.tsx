import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "双任务番茄钟 - ADHD 友好的工作法",
  description: "专为 ADHD 用户设计的任务切换番茄工作法应用",
  generator: 'v0.dev'
}

export default function ZhLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>{children}</body>
    </html>
  )
} 