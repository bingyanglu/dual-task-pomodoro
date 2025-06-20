"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { PomodoroSettings } from "../hooks/use-pomodoro"

interface SettingsDialogProps {
  settings: PomodoroSettings
  onSettingsChange: (settings: PomodoroSettings) => void
}

export function SettingsDialog({ settings, onSettingsChange }: SettingsDialogProps) {
  const [localSettings, setLocalSettings] = useState<PomodoroSettings>(settings)

  const handleSave = () => {
    onSettingsChange(localSettings)
  }

  const handleReset = () => {
    const defaultSettings: PomodoroSettings = {
      taskAName: "创造性任务",
      taskBName: "处理性任务",
      pomoDuration: 25,
      shortBreakDuration: 5,
      longBreakDuration: 15,
      soundEnabled: true,
      vibrationEnabled: true,
      switchAfterPomodoros: 2,
    }
    setLocalSettings(defaultSettings)
    onSettingsChange(defaultSettings)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>任务设置</CardTitle>
          <CardDescription>自定义您的两个任务类型</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="taskA">任务 A 名称</Label>
              <Input
                id="taskA"
                value={localSettings.taskAName}
                onChange={(e) => setLocalSettings((prev) => ({ ...prev, taskAName: e.target.value }))}
                placeholder="例如：写作、设计"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="taskB">任务 B 名称</Label>
              <Input
                id="taskB"
                value={localSettings.taskBName}
                onChange={(e) => setLocalSettings((prev) => ({ ...prev, taskBName: e.target.value }))}
                placeholder="例如：邮件、整理"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="switchAfter">每几个番茄后切换任务</Label>
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
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>时间设置</CardTitle>
          <CardDescription>调整番茄钟和休息时间</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pomoDuration">番茄时长 (分钟)</Label>
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
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="shortBreak">短休息 (分钟)</Label>
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
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="longBreak">长休息 (分钟)</Label>
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
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>提醒设置</CardTitle>
          <CardDescription>配置音效和振动提醒</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="sound">音效提醒</Label>
              <p className="text-sm text-muted-foreground">番茄钟结束时播放提示音</p>
            </div>
            <Switch
              id="sound"
              checked={localSettings.soundEnabled}
              onCheckedChange={(checked) =>
                setLocalSettings((prev) => ({
                  ...prev,
                  soundEnabled: checked,
                }))
              }
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="vibration">振动提醒</Label>
              <p className="text-sm text-muted-foreground">在支持的设备上启用振动</p>
            </div>
            <Switch
              id="vibration"
              checked={localSettings.vibrationEnabled}
              onCheckedChange={(checked) =>
                setLocalSettings((prev) => ({
                  ...prev,
                  vibrationEnabled: checked,
                }))
              }
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button onClick={handleSave} className="flex-1">
          保存设置
        </Button>
        <Button onClick={handleReset} variant="outline">
          恢复默认
        </Button>
      </div>
    </div>
  )
}
