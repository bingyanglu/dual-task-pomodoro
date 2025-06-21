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
import { useRouter } from "next/navigation"
import { Language } from "../hooks/use-language"
import type { PomodoroSettings } from "../hooks/use-pomodoro"
import type { Theme } from "../hooks/use-theme"
import { translations } from "../i18n/translations"

interface TopNavigationProps {
  settings: PomodoroSettings
  onSettingsChange: (settings: PomodoroSettings) => void
  onShowStats: () => void
  theme: Theme
  onToggleTheme: () => void
  language: Language
  onToggleLanguage: () => void
}

export function TopNavigation({
  settings,
  onSettingsChange,
  onShowStats,
  theme,
  onToggleTheme,
  language,
  onToggleLanguage,
}: TopNavigationProps) {
  const [showSettings, setShowSettings] = useState(false)
  const router = useRouter()

  const t = translations[language]

  const handleLanguageChange = (newLanguage: Language) => {
    if (newLanguage === "en") {
      router.push("/")
    } else if (newLanguage === "zh") {
      router.push("/zh")
    } else if (newLanguage === "ja") {
      router.push("/ja")
    }
  }

  const getLanguageLabel = (lang: Language) => {
    switch (lang) {
      case "en":
        return "English"
      case "zh":
        return "中文"
      case "ja":
        return "日本語"
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
      case "ja":
        return "🇯🇵"
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
                  <span className="sm:hidden">{language === "zh" ? "双任务番茄" : language === "ja" ? "デュアルタスクポモドーロ" : "Dual Pomodoro"}</span>
                </div>
                <div className="text-xs text-slate-600 dark:text-gray-400">
                  <span className="hidden sm:inline">{t.appSubtitle}</span>
                  <span className="sm:hidden">{language === "zh" ? "ADHD 友好" : language === "ja" ? "ADHDに優しい作業法" : "ADHD Friendly"}</span>
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
                  <span className="text-lg">{getLanguageFlag(language)}</span>
                  <span className="hidden sm:inline">{getLanguageLabel(language)}</span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem onClick={() => handleLanguageChange("en")} className="gap-2">
                  <span className="text-lg">🇺🇸</span>
                  <span>English</span>
                  {language === "en" && <Check className="w-4 h-4 ml-auto" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange("zh")} className="gap-2">
                  <span className="text-lg">🇨🇳</span>
                  <span>中文</span>
                  {language === "zh" && <Check className="w-4 h-4 ml-auto" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange("ja")} className="gap-2">
                  <span className="text-lg">🇯🇵</span>
                  <span>日本語</span>
                  {language === "ja" && <Check className="w-4 h-4 ml-auto" />}
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
                {language === "en" && "Statistics"}
                {language === "zh" && "统计"}
                {language === "ja" && "統計"}
              </span>
            </Button>

            {/* Settings Button */}
            <Button onClick={() => setShowSettings(!showSettings)} variant="outline" size="sm" title="Settings">
              <Settings className="w-4 h-4 sm:mr-1" />
              <span className="hidden sm:inline">
                {language === "en" && "Settings"}
                {language === "zh" && "设置"}
                {language === "ja" && "設定"}
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
                  {language === "en" && "Pomodoro Duration (minutes)"}
                  {language === "zh" && "番茄时长 (分钟)"}
                  {language === "ja" && "ポモドーロ時間（分）"}
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
                  {language === "en" && "Short Break (minutes)"}
                  {language === "zh" && "短休息 (分钟)"}
                  {language === "ja" && "短い休憩（分）"}
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
                  {language === "en" && "Long Break (minutes)"}
                  {language === "zh" && "长休息 (分钟)"}
                  {language === "ja" && "長い休憩（分）"}
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
                  {language === "en" && "Switch after pomodoros"}
                  {language === "zh" && "每几个番茄后切换任务"}
                  {language === "ja" && "何個のポモドーロ後にタスクを切り替える"}
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
