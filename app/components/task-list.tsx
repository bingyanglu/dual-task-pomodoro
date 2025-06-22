"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Edit2, Trash2, CheckCircle2, Circle, Clock, GripVertical } from "lucide-react"
import type { Task } from "../types/task"
import { translations } from "@/app/i18n/translations"

export type Language = "en" | "zh" | "ja" | "zh-TW"

interface TaskListProps {
  tasks: Task[]
  activeTasks: Task[]
  onAddTask: (title: string) => void
  onToggleTask: (id: string) => void
  onDeleteTask: (id: string) => void
  onEditTask: (id: string, newTitle: string) => void
  onReorderTasks: (startIndex: number, endIndex: number) => void
  language: Language
  dualTaskMode: boolean
  todayCount: number
  currentRound: number
}

// 添加格式化时间的函数
const formatTime = (minutes: number, language: Language) => {
  if (minutes === 0) return ""
  const t = translations[language.replace("-", "") as keyof typeof translations]
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  if (hours > 0) {
    return `${hours}${t.hour}${mins > 0 ? ` ${mins}${t.minute}` : ""}`
  }
  return `${mins}${t.minute}`
}

export function TaskList({
  tasks,
  activeTasks,
  onAddTask,
  onToggleTask,
  onDeleteTask,
  onEditTask,
  onReorderTasks,
  language,
  dualTaskMode,
  todayCount,
  currentRound,
}: TaskListProps) {
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingTitle, setEditingTitle] = useState("")
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)

  const t = translations[language.replace("-", "") as keyof typeof translations]

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      onAddTask(newTaskTitle)
      setNewTaskTitle("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddTask()
    }
  }

  const startEditing = (task: Task) => {
    setEditingId(task.id)
    setEditingTitle(task.title)
  }

  const saveEdit = () => {
    if (editingId && editingTitle.trim()) {
      onEditTask(editingId, editingTitle)
    }
    setEditingId(null)
    setEditingTitle("")
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditingTitle("")
  }

  const handleEditKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      saveEdit()
    } else if (e.key === "Escape") {
      cancelEdit()
    }
  }

  // 拖拽处理函数 - 完全重写
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index)
    e.dataTransfer.effectAllowed = "move"
    // 添加拖拽样式
    e.currentTarget.classList.add("opacity-50")
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleDragEnter = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (draggedIndex !== null && draggedIndex !== index) {
      setDragOverIndex(index)
    }
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    // 只有当离开整个元素时才清除
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setDragOverIndex(null)
    }
  }

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()
    if (draggedIndex !== null && draggedIndex !== dropIndex) {
      console.log("Reordering from", draggedIndex, "to", dropIndex)
      // 计算在原始 tasks 数组中未完成任务的索引
      const incompleteTaskIds = tasks.filter(task => !task.completed).map(task => task.id)
      const draggedTaskId = incompleteTaskIds[draggedIndex]
      const dropTaskId = incompleteTaskIds[dropIndex]
      
      // 找到这些任务在原始数组中的索引
      const originalDraggedIndex = tasks.findIndex(task => task.id === draggedTaskId)
      const originalDropIndex = tasks.findIndex(task => task.id === dropTaskId)
      
      if (originalDraggedIndex !== -1 && originalDropIndex !== -1) {
        onReorderTasks(originalDraggedIndex, originalDropIndex)
      }
    }
    setDraggedIndex(null)
    setDragOverIndex(null)
  }

  const handleDragEnd = (e: React.DragEvent) => {
    e.currentTarget.classList.remove("opacity-50")
    setDraggedIndex(null)
    setDragOverIndex(null)
  }

  const completedTasks = tasks.filter((task) => task.completed)
  const incompleteTasks = tasks.filter((task) => !task.completed)

  return (
    <Card className="h-fit bg-white dark:bg-gray-800 border-slate-200 dark:border-gray-700">
      {/* 统计信息 */}
      <div className="p-4 border-b border-slate-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{todayCount}</div>
            <div className="text-sm text-slate-600 dark:text-gray-400">
              {t.todayPomodoros}
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-700 dark:text-gray-300">
              {t.round.replace("{round}", `${Math.floor((currentRound - 1) / 2) + 1}`)}
            </div>
            <div className="text-sm text-slate-600 dark:text-gray-400">
              {t.currentRound}
            </div>
          </div>
        </div>
      </div>

      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-slate-800 dark:text-white">
          <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          {t.taskList}
        </CardTitle>
        <CardDescription className="dark:text-gray-400">
          {dualTaskMode ? t.taskListDescription : t.taskListDescriptionSingle}
          {dualTaskMode && activeTasks.length >= 2 && (
            <div className="flex gap-2 mt-2">
              <Badge className="bg-blue-500 text-white">
                {t.taskA}: {activeTasks[0]?.title}
              </Badge>
              <Badge className="bg-purple-500 text-white">
                {t.taskB}: {activeTasks[1]?.title}
              </Badge>
            </div>
          )}
          {!dualTaskMode && activeTasks.length >= 1 && (
            <div className="flex gap-2 mt-2">
              <Badge className="bg-blue-500 text-white">
                {t.currentTask}: {activeTasks[0]?.title}
              </Badge>
            </div>
          )}
          {incompleteTasks.length > 1 && (
            <div className="text-xs text-muted-foreground mt-2 dark:text-gray-500">{t.dragToReorder}</div>
          )}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* 添加新任务 */}
        <div className="flex gap-2">
          <Input
            placeholder={t.addNewTask}
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <Button onClick={handleAddTask} size="sm">
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {/* 任务列表 */}
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {/* 未完成的任务 */}
          {incompleteTasks.map((task, index) => (
            <div
              key={task.id}
              draggable={incompleteTasks.length > 1 && editingId !== task.id}
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDragEnter={(e) => handleDragEnter(e, index)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
              className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                incompleteTasks.length > 1 && editingId !== task.id ? "cursor-move" : ""
              } ${dragOverIndex === index ? "border-blue-400 bg-blue-100 dark:bg-blue-900/30" : ""} ${
                (!dualTaskMode && index === 0) || (dualTaskMode && index < 2)
                  ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
                  : "bg-slate-50 dark:bg-gray-700 border-slate-200 dark:border-gray-600"
              }`}
            >
              {/* 拖拽手柄 */}
              {incompleteTasks.length > 1 && (
                <GripVertical className="w-4 h-4 text-gray-400 dark:text-gray-500 cursor-grab active:cursor-grabbing" />
              )}

              <Checkbox
                checked={task.completed}
                onCheckedChange={() => onToggleTask(task.id)}
                className="flex-shrink-0"
              />

              {((dualTaskMode && index < 2) || (!dualTaskMode && index === 0)) && (
                <Badge variant="outline" className="text-xs dark:border-gray-600 dark:text-gray-300">
                  {dualTaskMode ? (index === 0 ? "A" : "B") : "●"}
                </Badge>
              )}

              <div className="flex-1 min-w-0">
                {editingId === task.id ? (
                  <Input
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                    onKeyPress={handleEditKeyPress}
                    onBlur={saveEdit}
                    className="h-8 text-sm dark:bg-gray-600 dark:border-gray-500"
                    autoFocus
                  />
                ) : (
                  <div>
                    <span className="text-sm text-slate-800 dark:text-gray-200 truncate block">{task.title}</span>
                    {task.totalTime > 0 && (
                      <div className="flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3 text-slate-500 dark:text-gray-400" />
                        <span className="text-xs text-slate-500 dark:text-gray-400">
                          {formatTime(task.totalTime, language)}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="flex gap-1 flex-shrink-0">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => startEditing(task)}
                  className="h-8 w-8 p-0 dark:hover:bg-gray-600"
                >
                  <Edit2 className="w-3 h-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDeleteTask(task.id)}
                  className="h-8 w-8 p-0 text-red-500 hover:text-red-700 dark:hover:bg-gray-600"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}

          {/* 分隔线 */}
          {completedTasks.length > 0 && incompleteTasks.length > 0 && (
            <div className="flex items-center gap-2 py-2">
              <div className="flex-1 h-px bg-slate-200 dark:bg-gray-600"></div>
              <span className="text-xs text-slate-500 dark:text-gray-400">{t.completed}</span>
              <div className="flex-1 h-px bg-slate-200 dark:bg-gray-600"></div>
            </div>
          )}

          {/* 已完成的任务 */}
          {completedTasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
            >
              <Checkbox checked={task.completed} onCheckedChange={() => onToggleTask(task.id)} />

              <div className="flex-1 min-w-0">
                {editingId === task.id ? (
                  <Input
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                    onKeyPress={handleEditKeyPress}
                    onBlur={saveEdit}
                    className="h-8 text-sm dark:bg-gray-600 dark:border-gray-500"
                    autoFocus
                  />
                ) : (
                  <div>
                    <span className="text-sm line-through text-slate-500 dark:text-gray-400 truncate block">
                      {task.title}
                    </span>
                    {task.totalTime > 0 && (
                      <div className="flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3 text-green-600 dark:text-green-400" />
                        <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                          {t.totalTime}: {formatTime(task.totalTime, language)}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="flex gap-1 flex-shrink-0">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => startEditing(task)}
                  className="h-8 w-8 p-0 dark:hover:bg-gray-600"
                >
                  <Edit2 className="w-3 h-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDeleteTask(task.id)}
                  className="h-8 w-8 p-0 text-red-500 hover:text-red-700 dark:hover:bg-gray-600"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {tasks.length === 0 && (
          <div className="text-center py-8 text-slate-500 dark:text-gray-400">
            <Circle className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>{t.noTasks}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
