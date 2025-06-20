export interface Task {
  id: string
  title: string
  completed: boolean
  createdAt: string
  completedAt?: string
  totalTime: number // 累计耗时，以分钟为单位
}
