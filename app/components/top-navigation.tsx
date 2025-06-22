"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Settings,
  BarChart3,
  Sun,
  Moon,
  Languages,
  ChevronDown,
  Check,
  Brain,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter, usePathname } from "next/navigation"
import type { PomodoroSettings } from "../hooks/use-pomodoro"
import type { Theme } from "../hooks/use-theme"
import { translations } from "@/app/i18n/translations"
import type { Language } from "@/app/types/language"

interface TopNavigationProps {
  settings: PomodoroSettings
  onSettingsChange: (settings: PomodoroSettings) => void
  onShowStats: () => void
  theme: Theme
  onToggleTheme: () => void
  language: Language
}

export function TopNavigation({
  settings,
  onSettingsChange,
  onShowStats,
  theme,
  onToggleTheme,
  language,
}: TopNavigationProps) {
  const [showSettings, setShowSettings] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const currentLanguage = language

  const t = translations[currentLanguage.replace("-", "") as keyof typeof translations]

  const handleLanguageChange = (newLanguage: Language) => {
    if (newLanguage === "en") {
      router.push("/")
    } else if (newLanguage === "zh") {
      router.push("/zh")
    } else if (newLanguage === "ja") {
      router.push("/ja")
    } else if (newLanguage === "zh-TW") {
      router.push("/zh-TW")
    } else if (newLanguage === "ko") {
      router.push("/ko")
    } else if (newLanguage === "es") {
      router.push("/es")
    } else if (newLanguage === "de") {
      router.push("/de")
    } else if (newLanguage === "pt") {
      router.push("/pt")
    } else if (newLanguage === "fr") {
      router.push("/fr")
    }
  }

  const getLanguageLabel = (lang: Language) => {
    switch (lang) {
      case "en":
        return "English"
      case "zh":
        return "简体中文"
      case "zh-TW":
        return "繁體中文"
      case "ja":
        return "日本語"
      case "ko":
        return "한국어"
      case "es":
        return "Español"
      case "de":
        return "Deutsch"
      case "pt":
        return "Português"
      case "fr":
        return "Français"
      default:
        return "English"
    }
  }

  const getLanguageFlag = (lang: Language) => {
    switch (lang) {
      case "en":
        return "🇺🇸"
      case "zh":
        return "🇨🇳"
      case "zh-TW":
        return "🇨🇳"
      case "ja":
        return "🇯🇵"
      case "ko":
        return "🇰🇷"
      case "es":
        return "🇪🇸"
      case "de":
        return "🇩🇪"
      case "pt":
        return "🇵🇹"
      case "fr":
        return "🇫🇷"
      default:
        return "🇺🇸"
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-slate-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left side - App title and stats */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <div className="font-semibold text-slate-800 dark:text-white text-lg">
                  <span className="hidden sm:inline">{t.appTitle}</span>
                  <span className="sm:hidden">
                    {language === "zh" ? "双任务番茄" : 
                     language === "ja" ? "デュアルタスクポモドーロ" : 
                     language === "ko" ? "듀얼 태스크 뽀모도로" :
                     language === "es" ? "Pomodoro Dual-Task" :
                     language === "de" ? "Dual-Task Pomodoro" :
                     language === "pt" ? "Pomodoro Dual-Task" :
                     language === "fr" ? "Pomodoro Dual-Task" :
                     "Dual Pomodoro"}
                  </span>
                </div>
                <div className="text-xs text-slate-600 dark:text-gray-400">
                  <span className="hidden sm:inline">{t.appSubtitle}</span>
                  <span className="sm:hidden">
                    {language === "zh" ? "ADHD 友好" : 
                     language === "ja" ? "ADHDに優しい作業法" : 
                     language === "ko" ? "ADHD 친화적" :
                     language === "es" ? "ADHD-Friendly" :
                     language === "de" ? "ADHD-freundlich" :
                     language === "pt" ? "ADHD-Friendly" :
                     language === "fr" ? "ADHD-Friendly" :
                     "ADHD Friendly"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center gap-2">
            {/* Language Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <span className="text-lg">{getLanguageFlag(currentLanguage)}</span>
                  <span className="hidden sm:inline">{getLanguageLabel(currentLanguage)}</span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem onClick={() => handleLanguageChange("en")} className="gap-2">
                  <span className="text-lg">🇺🇸</span>
                  <span>English</span>
                  {currentLanguage === "en" && <Check className="w-4 h-4 ml-auto" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange("zh")} className="gap-2">
                  <span className="text-lg">🇨🇳</span>
                  <span>简体中文</span>
                  {currentLanguage === "zh" && <Check className="w-4 h-4 ml-auto" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange("zh-TW")} className="gap-2">
                  <span className="text-lg">🇨🇳</span>
                  <span>繁體中文</span>
                  {currentLanguage === "zh-TW" && <Check className="w-4 h-4 ml-auto" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange("ja")} className="gap-2">
                  <span className="text-lg">🇯🇵</span>
                  <span>日本語</span>
                  {currentLanguage === "ja" && <Check className="w-4 h-4 ml-auto" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange("ko")} className="gap-2">
                  <span className="text-lg">🇰🇷</span>
                  <span>한국어</span>
                  {currentLanguage === "ko" && <Check className="w-4 h-4 ml-auto" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange("es")} className="gap-2">
                  <span className="text-lg">🇪🇸</span>
                  <span>Español</span>
                  {currentLanguage === "es" && <Check className="w-4 h-4 ml-auto" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange("de")} className="gap-2">
                  <span className="text-lg">🇩🇪</span>
                  <span>Deutsch</span>
                  {currentLanguage === "de" && <Check className="w-4 h-4 ml-auto" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange("pt")} className="gap-2">
                  <span className="text-lg">🇵🇹</span>
                  <span>Português</span>
                  {currentLanguage === "pt" && <Check className="w-4 h-4 ml-auto" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange("fr")} className="gap-2">
                  <span className="text-lg">🇫🇷</span>
                  <span>Français</span>
                  {currentLanguage === "fr" && <Check className="w-4 h-4 ml-auto" />}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle */}
            <Button onClick={onToggleTheme} variant="outline" size="sm" title="Toggle Theme">
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>

            {/* Statistics Button */}
            <Button onClick={onShowStats} variant="outline" size="sm" title="View Statistics">
              <BarChart3 className="w-4 h-4 sm:mr-1" />
              <span className="hidden sm:inline">
                {t.statistics}
              </span>
            </Button>

            {/* Settings Button */}
            <Button onClick={() => setShowSettings(!showSettings)} variant="outline" size="sm" title="Settings">
              <Settings className="w-4 h-4 sm:mr-1" />
              <span className="hidden sm:inline">
                {t.settings}
              </span>
            </Button>
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="mt-4 p-4 bg-slate-50 dark:bg-gray-700 rounded-lg border border-slate-200 dark:border-gray-600">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pomoDuration">
                  {t.pomodoroDuration}
                </Label>
                <Input
                  id="pomoDuration"
                  type="number"
                  value={settings.pomoDuration}
                  onChange={(e) =>
                    onSettingsChange({
                      ...settings,
                      pomoDuration: parseInt(e.target.value),
                    })
                  }
                  min="1"
                  max="60"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="shortBreakDuration">
                  {t.shortBreakDuration}
                </Label>
                <Input
                  id="shortBreakDuration"
                  type="number"
                  value={settings.shortBreakDuration}
                  onChange={(e) =>
                    onSettingsChange({
                      ...settings,
                      shortBreakDuration: parseInt(e.target.value),
                    })
                  }
                  min="1"
                  max="30"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="longBreakDuration">
                  {t.longBreakDuration}
                </Label>
                <Input
                  id="longBreakDuration"
                  type="number"
                  value={settings.longBreakDuration}
                  onChange={(e) =>
                    onSettingsChange({
                      ...settings,
                      longBreakDuration: parseInt(e.target.value),
                    })
                  }
                  min="1"
                  max="60"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="switchAfterPomodoros">
                  {t.switchAfterPomodoros}
                </Label>
                <Input
                  id="switchAfterPomodoros"
                  type="number"
                  value={settings.switchAfterPomodoros}
                  onChange={(e) =>
                    onSettingsChange({
                      ...settings,
                      switchAfterPomodoros: parseInt(e.target.value),
                    })
                  }
                  min="1"
                  max="10"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
