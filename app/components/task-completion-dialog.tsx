"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Coffee, Plus } from "lucide-react"
import { translations } from "@/app/i18n/translations"
import type { Language } from "@/app/types/language"

interface TaskCompletionDialogProps {
  isOpen: boolean
  currentTaskName: string
  currentTaskType: "A" | "B"
  timeLeft: number
  onExtend: () => void
  onBreak: () => void
  language: Language
}

export function TaskCompletionDialog({
  isOpen,
  currentTaskName,
  currentTaskType,
  timeLeft,
  onExtend,
  onBreak,
  language,
}: TaskCompletionDialogProps) {
  if (!isOpen) return null

  const t = translations[language.replace("-", "") as keyof typeof translations]
  const progressPercentage = ((10 - timeLeft) / 10) * 100

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md mx-auto animate-in zoom-in-95 duration-200 bg-white dark:bg-gray-800 border-slate-200 dark:border-gray-700">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <Badge
              className={`${currentTaskType === "A" ? "bg-blue-500" : "bg-purple-500"} text-white text-lg px-4 py-2`}
            >
              {t[`task${currentTaskType}` as keyof typeof t]}
              {t.taskCompleted}
            </Badge>
          </div>
          <CardTitle className="text-xl text-slate-800 dark:text-white">{currentTaskName}</CardTitle>
          <CardDescription className="dark:text-gray-400">{t.congratulations}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* 自动倒计时提示 */}
          <div className="text-center space-y-2">
            <div className="text-sm text-muted-foreground dark:text-gray-400">
              {timeLeft}
              {t.autoBreakIn}
            </div>
            <Progress value={progressPercentage} className="w-full h-2" />
          </div>

          {/* 操作按钮 */}
          <div className="grid grid-cols-1 gap-3">
            <Button onClick={onExtend} size="lg" className="bg-orange-500 hover:bg-orange-600 text-white h-14">
              <Plus className="w-5 h-5 mr-2" />
              <div className="text-left">
                <div className="font-semibold">{t.extend5Minutes}</div>
                <div className="text-xs opacity-90">{t.continueCurrentTask}</div>
              </div>
            </Button>

            <Button
              onClick={onBreak}
              size="lg"
              variant="outline"
              className="bg-green-50 hover:bg-green-100 border-green-200 text-green-700 h-14 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400 dark:hover:bg-green-900/30"
            >
              <Coffee className="w-5 h-5 mr-2" />
              <div className="text-left">
                <div className="font-semibold">{t.startBreak}</div>
                <div className="text-xs opacity-70">{t.enterBreakTime}</div>
              </div>
            </Button>
          </div>

          {/* 提示信息 */}
          <div className="text-center">
            <p className="text-xs text-muted-foreground dark:text-gray-400">{t.focusingTip}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
