"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    // 根据路径设置HTML的lang属性
    if (pathname.startsWith("/zh")) {
      document.documentElement.lang = "zh-CN"
    } else if (pathname.startsWith("/ja")) {
      document.documentElement.lang = "ja"
    } else {
      document.documentElement.lang = "en"
    }
  }, [pathname])

  return <>{children}</>
} 