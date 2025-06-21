import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "デュアルタスクポモドーロ - ADHDに優しい作業法",
  description: "ADHDユーザー向けに設計されたタスク切り替えポモドーロ作業法アプリケーション",
  generator: 'v0.dev'
}

export default function JaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
} 