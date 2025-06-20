"use client"

import { useState, useEffect } from "react"
import type { Task } from "../types/task"

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [dragOrder, setDragOrder] = useState<string[]>([]) // 新增：跟踪拖拽顺序

  // Load tasks from localStorage on mount
  useEffect(() => {
    try {
      const savedTasks = localStorage.getItem("pomodoro-tasks")
      const savedDragOrder = localStorage.getItem("pomodoro-drag-order")
      
      if (savedTasks) {
        const parsedTasks = JSON.parse(savedTasks)
        setTasks(parsedTasks)
        
        // 加载拖拽顺序，如果没有保存的则使用任务ID数组
        if (savedDragOrder) {
          setDragOrder(JSON.parse(savedDragOrder))
        } else {
          setDragOrder(parsedTasks.map((task: Task) => task.id))
        }
      }
      // 移除默认任务创建逻辑
    } catch (error) {
      console.error("Error loading tasks from localStorage:", error)
      // 如果加载失败，设置为空数组而不是默认任务
      setTasks([])
      setDragOrder([])
    }
  }, [])

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    try {
      localStorage.setItem("pomodoro-tasks", JSON.stringify(tasks))
    } catch (error) {
      console.error("Error saving tasks to localStorage:", error)
    }
  }, [tasks])

  // Save drag order to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("pomodoro-drag-order", JSON.stringify(dragOrder))
    } catch (error) {
      console.error("Error saving drag order to localStorage:", error)
    }
  }, [dragOrder])

  const addTask = (title: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: title.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
      totalTime: 0,
    }
    setTasks((prev) => [...prev, newTask])
    setDragOrder((prevOrder) => [...prevOrder, newTask.id]) // 将新任务添加到拖拽顺序
  }

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === id) {
          const updatedTask = {
            ...task,
            completed: !task.completed,
            completedAt: !task.completed ? new Date().toISOString() : undefined,
          }
          return updatedTask
        }
        return task
      }),
    )
  }

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
    setDragOrder((prevOrder) => prevOrder.filter((taskId) => taskId !== id)) // 从拖拽顺序中移除
  }

  const editTask = (id: string, newTitle: string) => {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, title: newTitle.trim() } : task)))
  }

  // 添加新的函数来增加任务时间
  const addTimeToTask = (taskTitle: string, minutes: number) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.title === taskTitle) {
          return {
            ...task,
            totalTime: task.totalTime + minutes,
          }
        }
        return task
      }),
    )
  }

  // 新增：重新排序任务
  const reorderTasks = (startIndex: number, endIndex: number) => {
    setDragOrder((prevOrder) => {
      // 确保索引在有效范围内
      if (startIndex < 0 || startIndex >= prevOrder.length || endIndex < 0 || endIndex >= prevOrder.length) {
        return prevOrder
      }

      // 创建新数组并执行重排序
      const result = Array.from(prevOrder)
      const [removed] = result.splice(startIndex, 1)
      result.splice(endIndex, 0, removed)

      return result
    })
  }

  // 获取排序后的任务列表：未完成的在前，已完成的在后，同时考虑拖拽顺序
  const sortedTasks = [...tasks].sort((a, b) => {
    // 首先按完成状态排序：未完成的在前
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1
    }
    
    // 如果都是未完成的任务，按拖拽顺序排序
    if (!a.completed && !b.completed) {
      const aIndex = dragOrder.indexOf(a.id)
      const bIndex = dragOrder.indexOf(b.id)
      if (aIndex !== -1 && bIndex !== -1) {
        return aIndex - bIndex
      }
    }
    
    // 如果都是已完成的任务，按创建时间排序
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  })

  // 获取前两个未完成的任务
  const activeTasks = sortedTasks.filter((task) => !task.completed).slice(0, 2)

  return {
    tasks: sortedTasks,
    activeTasks,
    addTask,
    toggleTask,
    deleteTask,
    editTask,
    addTimeToTask,
    reorderTasks, // 新增
  }
}
