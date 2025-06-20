"use client"

import { useState, useEffect } from "react"

export type Theme = "light" | "dark"

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("light")

  useEffect(() => {
    // 从 localStorage 加载主题设置
    try {
      const savedTheme = localStorage.getItem("pomodoro-theme") as Theme
      if (savedTheme && (savedTheme === "light" || savedTheme === "dark")) {
        setTheme(savedTheme)
      } else {
        // 检查系统偏好
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
        setTheme(prefersDark ? "dark" : "light")
      }
    } catch (error) {
      console.error("Error loading theme:", error)
    }
  }, [])

  useEffect(() => {
    // 应用主题到 document
    if (theme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }

    // 保存主题设置
    try {
      localStorage.setItem("pomodoro-theme", theme)
    } catch (error) {
      console.error("Error saving theme:", error)
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"))
  }

  return { theme, toggleTheme }
}
