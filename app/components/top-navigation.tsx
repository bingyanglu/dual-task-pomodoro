"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Settings, BarChart3, Brain, Moon, Sun, X, Languages } from "lucide-react"
import type { PomodoroSettings } from "../hooks/use-pomodoro"
import type { Theme } from "../hooks/use-theme"
import type { Language } from "../hooks/use-language"
import { translations } from "../i18n/translations"

interface TopNavigationProps {
  todayCount: number
  currentRound: number
  settings: PomodoroSettings
  onSettingsChange: (settings: PomodoroSettings) => void
  onShowStats: () => void
  theme: Theme
  onToggleTheme: () => void
  language: Language
  onToggleLanguage: () => void
}

export function TopNavigation({
  todayCount,
  currentRound,
  settings,
  onSettingsChange,
  onShowStats,
  theme,
  onToggleTheme,
  language,
  onToggleLanguage,
}: TopNavigationProps) {
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [localSettings, setLocalSettings] = useState<PomodoroSettings>(settings)

  const t = translations[language]

  const handleSave = () => {
    onSettingsChange(localSettings)
    setSettingsOpen(false)
  }

  const resetToDefaults = () => {
    const defaultSettings: PomodoroSettings = {
      pomoDuration: 25,
      shortBreakDuration: 5,
      longBreakDuration: 15,
      soundEnabled: true,
      vibrationEnabled: true,
      switchAfterPomodoros: 2,
      dualTaskMode: true,
    }
    setLocalSettings(defaultSettings)
  }

  const handleOpenSettings = () => {
    setLocalSettings(settings) // 重新同步设置
    setSettingsOpen(true)
  }

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 border-b border-slate-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Title */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800 dark:text-white">{t.appTitle}</h1>
                <p className="text-xs text-slate-600 dark:text-gray-400">{t.appSubtitle}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{todayCount}</div>
                  <div className="text-xs text-slate-600 dark:text-gray-400">{t.todayPomodoros}</div>
                </div>
                <Separator orientation="vertical" className="h-8" />
                <div className="text-center">
                  <div className="text-lg font-bold text-slate-700 dark:text-gray-300">
                    {language === "zh"
                      ? `第 ${Math.floor((currentRound - 1) / 2) + 1} 轮`
                      : `${t.round} ${Math.floor((currentRound - 1) / 2) + 1}`}
                  </div>
                  <div className="text-xs text-slate-600 dark:text-gray-400">{t.currentRound}</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <Button onClick={onShowStats} variant="outline" size="sm">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  {t.statistics}
                </Button>

                {/* Language Toggle */}
                <Button onClick={onToggleLanguage} variant="outline" size="sm" title="Switch Language">
                  <Languages className="w-4 h-4 mr-1" />
                  {language === "en" ? "中文" : "EN"}
                </Button>

                {/* Theme Toggle */}
                <Button onClick={onToggleTheme} variant="outline" size="sm">
                  {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                </Button>

                {/* Settings Button */}
                <Button onClick={handleOpenSettings} variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  {t.settings}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Settings Modal */}
      {settingsOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 border-slate-200 dark:border-gray-700 max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-slate-800 dark:text-white">
                  <Settings className="w-5 h-5" />
                  {t.pomodoroSettings}
                </CardTitle>
                <Button onClick={() => setSettingsOpen(false)} variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <CardDescription className="dark:text-gray-400">{t.adjustTimings}</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Time Settings */}
              <div className="space-y-4">
                <h3 className="font-semibold text-slate-800 dark:text-white">{t.timeSettings}</h3>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="pomoDuration" className="dark:text-gray-300">
                      {t.pomodoroDuration}
                    </Label>
                    <Input
                      id="pomoDuration"
                      type="number"
                      min="5"
                      max="60"
                      value={localSettings.pomoDuration}
                      onChange={(e) =>
                        setLocalSettings((prev) => ({
                          ...prev,
                          pomoDuration: Number.parseInt(e.target.value) || 25,
                        }))
                      }
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="shortBreak" className="dark:text-gray-300">
                      {t.shortBreakDuration}
                    </Label>
                    <Input
                      id="shortBreak"
                      type="number"
                      min="1"
                      max="15"
                      value={localSettings.shortBreakDuration}
                      onChange={(e) =>
                        setLocalSettings((prev) => ({
                          ...prev,
                          shortBreakDuration: Number.parseInt(e.target.value) || 5,
                        }))
                      }
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="longBreak" className="dark:text-gray-300">
                      {t.longBreakDuration}
                    </Label>
                    <Input
                      id="longBreak"
                      type="number"
                      min="5"
                      max="30"
                      value={localSettings.longBreakDuration}
                      onChange={(e) =>
                        setLocalSettings((prev) => ({
                          ...prev,
                          longBreakDuration: Number.parseInt(e.target.value) || 15,
                        }))
                      }
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="switchAfter" className="dark:text-gray-300">
                      {t.switchAfterPomodoros}
                    </Label>
                    <Input
                      id="switchAfter"
                      type="number"
                      min="1"
                      max="4"
                      value={localSettings.switchAfterPomodoros}
                      onChange={(e) =>
                        setLocalSettings((prev) => ({
                          ...prev,
                          switchAfterPomodoros: Number.parseInt(e.target.value) || 2,
                        }))
                      }
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              <Separator className="dark:bg-gray-600" />

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button onClick={handleSave} className="flex-1">
                  {t.saveSettings}
                </Button>
                <Button onClick={resetToDefaults} variant="outline" className="dark:border-gray-600 dark:text-gray-300">
                  {t.resetToDefaults}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
