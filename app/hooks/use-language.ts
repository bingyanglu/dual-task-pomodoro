"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

export type Language = "en" | "zh" | "ja"

export function useLanguage() {
  const pathname = usePathname()
  const [language, setLanguage] = useState<Language>("en") // 默认英文

  useEffect(() => {
    // 根据路径自动检测语言
    if (pathname.startsWith("/zh")) {
      setLanguage("zh")
    } else if (pathname.startsWith("/ja")) {
      setLanguage("ja")
    } else {
      setLanguage("en")
    }
  }, [pathname])

  useEffect(() => {
    // 保存语言设置到 localStorage
    try {
      localStorage.setItem("pomodoro-language", language)
    } catch (error) {
      console.error("Error saving language:", error)
    }
  }, [language])

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "zh" : "en"))
  }

  return { language, setLanguage, toggleLanguage }
}
