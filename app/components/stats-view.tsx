"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, TrendingUp, Clock, Target } from "lucide-react"
import type { PomodoroSession } from "../hooks/use-pomodoro"
import type { Language } from "../hooks/use-language"
import { translations } from "../i18n/translations"

interface StatsViewProps {
  language: Language
}

export function StatsView({ language }: StatsViewProps) {
  const [sessions, setSessions] = useState<PomodoroSession[]>([])
  const t = translations[language]

  useEffect(() => {
    const savedSessions = localStorage.getItem("pomodoro-sessions")
    if (savedSessions) {
      setSessions(JSON.parse(savedSessions))
    }
  }, [])

  const today = new Date().toISOString().split("T")[0]
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split("T")[0]

  // Get week start (Monday)
  const now = new Date()
  const weekStart = new Date(now.setDate(now.getDate() - now.getDay() + 1)).toISOString().split("T")[0]

  const todaySessions = sessions.filter((s) => s.date === today && s.completed)
  const yesterdaySessions = sessions.filter((s) => s.date === yesterday && s.completed)
  const weekSessions = sessions.filter((s) => s.date >= weekStart && s.completed)

  const taskAToday = todaySessions.filter((s) => s.taskType === "A").length
  const taskBToday = todaySessions.filter((s) => s.taskType === "B").length

  const taskAWeek = weekSessions.filter((s) => s.taskType === "A").length
  const taskBWeek = weekSessions.filter((s) => s.taskType === "B").length

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours}${t.hours}${mins}${t.minutes}` : `${mins}${t.minutes}`
  }

  const getRecentSessions = () => {
    return sessions
      .filter((s) => s.completed)
      .sort((a, b) => new Date(b.endTime).getTime() - new Date(a.endTime).getTime())
      .slice(0, 10)
  }

  return (
    <div className="space-y-6">
      {/* Today's Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white dark:bg-gray-800 border-slate-200 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium dark:text-white">{t.todayPomodoro}</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold dark:text-white">{todaySessions.length}</div>
            <p className="text-xs text-muted-foreground dark:text-gray-400">
              {t.yesterday}: {yesterdaySessions.length}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-slate-200 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium dark:text-white">{t.focusTime}</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold dark:text-white">{formatTime(todaySessions.length * 25)}</div>
            <p className="text-xs text-muted-foreground dark:text-gray-400">{t.todayTotal}</p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-slate-200 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium dark:text-white">{t.taskA}</CardTitle>
            <Target className="h-4 w-4 text-blue-500 dark:text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{taskAToday}</div>
            <p className="text-xs text-muted-foreground dark:text-gray-400">{t.todayCompleted}</p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-slate-200 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium dark:text-white">{t.taskB}</CardTitle>
            <Target className="h-4 w-4 text-purple-500 dark:text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{taskBToday}</div>
            <p className="text-xs text-muted-foreground dark:text-gray-400">{t.todayCompleted}</p>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Overview */}
      <Card className="bg-white dark:bg-gray-800 border-slate-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 dark:text-white">
            <TrendingUp className="h-5 w-5" />
            {t.weeklyStats}
          </CardTitle>
          <CardDescription className="dark:text-gray-400">{t.weeklyStatsDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">{weekSessions.length}</div>
              <p className="text-sm text-muted-foreground dark:text-gray-400">{t.totalPomodoros}</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{taskAWeek}</div>
              <p className="text-sm text-muted-foreground dark:text-gray-400">{t.taskA}</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">{taskBWeek}</div>
              <p className="text-sm text-muted-foreground dark:text-gray-400">{t.taskB}</p>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-muted-foreground dark:text-gray-400">
              {t.thisWeekFocusTime}: {formatTime(weekSessions.length * 25)}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Recent Sessions */}
      <Card className="bg-white dark:bg-gray-800 border-slate-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="dark:text-white">{t.recentSessions}</CardTitle>
          <CardDescription className="dark:text-gray-400">{t.recentSessionsDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {getRecentSessions().length === 0 ? (
              <p className="text-center text-muted-foreground dark:text-gray-400 py-4">{t.noSessionsYet}</p>
            ) : (
              getRecentSessions().map((session, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-slate-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Badge className={`${session.taskType === "A" ? "bg-blue-500" : "bg-purple-500"} text-white`}>
                      {t[`task${session.taskType}` as keyof typeof t]}
                    </Badge>
                    <div>
                      <p className="font-medium dark:text-white">25{t.minutesFocus}</p>
                      <p className="text-sm text-muted-foreground dark:text-gray-400">
                        {new Date(session.endTime).toLocaleDateString(language === "zh" ? "zh-CN" : "en-US")}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground dark:text-gray-400">
                    {new Date(session.endTime).toLocaleTimeString(language === "zh" ? "zh-CN" : "en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
