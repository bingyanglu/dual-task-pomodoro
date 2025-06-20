"use client"

import { useState, useEffect } from "react"

export type Language = "en" | "zh"

export function useLanguage() {
  const [language, setLanguage] = useState<Language>("en") // 默认英文

  useEffect(() => {
    // 从 localStorage 加载语言设置
    try {
      const savedLanguage = localStorage.getItem("pomodoro-language") as Language
      if (savedLanguage && (savedLanguage === "en" || savedLanguage === "zh")) {
        setLanguage(savedLanguage)
      }
    } catch (error) {
      console.error("Error loading language:", error)
    }
  }, [])

  useEffect(() => {
    // 保存语言设置
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
