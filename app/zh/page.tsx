"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Play,
  Pause,
  RotateCcw,
  Brain,
  RefreshCw,
  Coffee,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  SkipForward,
} from "lucide-react"
import { StatsView } from "../components/stats-view"
import { TaskList } from "../components/task-list"
import { TopNavigation } from "../components/top-navigation"
import { usePomodoro } from "../hooks/use-pomodoro"
import { useTasks } from "../hooks/use-tasks"
import { useTheme } from "../hooks/use-theme"
import { useLanguage } from "../hooks/use-language"
import { TaskCompletionDialog } from "../components/task-completion-dialog"
import { translations } from "../i18n/translations"
import { Switch } from "@/components/ui/switch"

export default function PomodoroAppZh() {
  const { tasks, activeTasks, addTask, toggleTask, deleteTask, editTask, addTimeToTask, reorderTasks } = useTasks()
  const { theme, toggleTheme } = useTheme()
  const { language, toggleLanguage } = useLanguage()

  // 强制设置为中文
  const t = translations["zh"]

  const {
    currentTask,
    currentTaskType,
    timeLeft,
    isRunning,
    isBreak,
    currentRound,
    todayCount,
    settings,
    startTimer,
    pauseTimer,
    resetTimer,
    updateSettings,
    showConfirmation,
    confirmationTimeLeft,
    extendCurrentTask,
    confirmBreak,
    skipBreak,
    hasValidTasks,
  } = usePomodoro(activeTasks, addTimeToTask)

  const [showStats, setShowStats] = useState(false)

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const getProgressPercentage = () => {
    const totalTime = isBreak
      ? (currentRound % 4 === 0 ? settings.longBreakDuration : settings.shortBreakDuration) * 60
      : settings.pomoDuration * 60
    return ((totalTime - timeLeft) / totalTime) * 100
  }

  const getTaskTypeColor = () => {
    if (isBreak) return "bg-green-500"
    return currentTaskType === "A" ? "bg-blue-500" : "bg-purple-500"
  }

  if (showStats) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800">
        <TopNavigation
          settings={settings}
          onSettingsChange={updateSettings}
          onShowStats={() => setShowStats(false)}
          theme={theme}
          onToggleTheme={toggleTheme}
          language={language}
          onToggleLanguage={toggleLanguage}
        />
        <div className="max-w-6xl mx-auto p-4">
          <StatsView language="zh" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800">
      {/* Top Navigation */}
      <TopNavigation
        settings={settings}
        onSettingsChange={updateSettings}
        onShowStats={() => setShowStats(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
        language={language}
        onToggleLanguage={toggleLanguage}
      />

      <div className="max-w-7xl mx-auto p-4">
        {/* Main H1 Title - Hidden for screen readers but visible for SEO */}
        <h1 className="sr-only">{t.appTitle} - {t.appSubtitle}</h1>
        
        {/* Main Layout - Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Timer */}
          <div className="lg:col-span-2 space-y-6">
            {/* 双任务模式开关 */}
            <Card className="bg-white dark:bg-gray-800 border-slate-200 dark:border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="font-medium text-slate-800 dark:text-white">{t.dualTaskMode}</div>
                    <div className="text-sm text-slate-600 dark:text-gray-400">{t.dualTaskModeDescription}</div>
                  </div>
                  <Switch
                    checked={settings.dualTaskMode}
                    onCheckedChange={(checked) =>
                      updateSettings({
                        ...settings,
                        dualTaskMode: checked,
                      })
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* Task Validation Warning */}
            {!hasValidTasks && settings.dualTaskMode && (
              <Card className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-900/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-orange-800 dark:text-orange-300">
                    <AlertCircle className="w-5 h-5" />
                    <span className="font-medium">{t.validationWarning}</span>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Single Task Mode Info */}
            {!settings.dualTaskMode && tasks.length === 0 && (
              <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-blue-800 dark:text-blue-300">
                    <AlertCircle className="w-5 h-5" />
                    <span className="font-medium">{t.validationWarningSingle}</span>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Main Timer */}
            <Card className="shadow-lg bg-white dark:bg-gray-800 border-slate-200 dark:border-gray-700">
              <CardHeader className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Badge variant="secondary" className={`${getTaskTypeColor()} text-white`}>
                    {isBreak
                      ? t.break
                      : settings.dualTaskMode
                        ? `${t[`task${currentTaskType}` as keyof typeof t]}`
                        : t.focusSession}
                  </Badge>
                  <Badge variant="outline" className="dark:border-gray-600 dark:text-gray-300">
                    {isBreak
                      ? `${currentRound % 4 === 0 ? t.longBreak : t.shortBreak}`
                      : `${language === "zh" ? "第 " : ""}${((currentRound - 1) % 2) + 1}${language === "zh" ? " 个番茄" : " Pomodoro"}`}
                  </Badge>
                </div>
                <CardTitle className="text-3xl text-slate-800 dark:text-white">{currentTask}</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <div className="text-7xl font-mono font-bold text-slate-800 dark:text-white tracking-wider">
                  {formatTime(timeLeft)}
                </div>

                <Progress value={getProgressPercentage()} className="w-full h-4" />

                <div className="flex justify-center gap-4">
                  <Button
                    onClick={isRunning ? pauseTimer : startTimer}
                    size="lg"
                    disabled={!hasValidTasks && settings.dualTaskMode && !isBreak}
                    className={`${isRunning ? "bg-orange-500 hover:bg-orange-600" : "bg-green-500 hover:bg-green-600"} text-white px-8 py-3 text-lg disabled:opacity-50`}
                  >
                    {isRunning ? (
                      <>
                        <Pause className="w-6 h-6 mr-2" />
                        {t.pause}
                      </>
                    ) : (
                      <>
                        <Play className="w-6 h-6 mr-2" />
                        {t.start}
                      </>
                    )}
                  </Button>

                  <Button
                    onClick={resetTimer}
                    size="lg"
                    variant="outline"
                    className="px-6 py-3 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    <RotateCcw className="w-5 h-5 mr-2" />
                    {t.reset}
                  </Button>

                  {/* 休息时显示跳过按钮 */}
                  {isBreak && !isRunning && (
                    <Button
                      onClick={skipBreak}
                      size="lg"
                      variant="outline"
                      className="px-6 py-3 text-blue-600 dark:text-blue-400 dark:border-gray-600 dark:hover:bg-gray-700"
                    >
                      <SkipForward className="w-5 h-5 mr-2" />
                      {t.skipBreak}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Task List */}
          <div className="lg:col-span-1 space-y-6">
            <TaskList
              tasks={tasks}
              activeTasks={activeTasks}
              onAddTask={addTask}
              onToggleTask={toggleTask}
              onDeleteTask={deleteTask}
              onEditTask={editTask}
              onReorderTasks={reorderTasks}
              language="zh"
              dualTaskMode={settings.dualTaskMode}
              todayCount={todayCount}
              currentRound={currentRound}
            />
          </div>
        </div>

        {/* 任务完成确认对话框 */}
        <TaskCompletionDialog
          isOpen={showConfirmation}
          currentTaskName={currentTask}
          currentTaskType={currentTaskType}
          timeLeft={confirmationTimeLeft}
          onExtend={extendCurrentTask}
          onBreak={confirmBreak}
          language="zh"
        />
      </div>
    </div>
  )
} 