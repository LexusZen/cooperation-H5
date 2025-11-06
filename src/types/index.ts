// 类型定义文件
export interface SectionData {
  id: number
  title: string
  subtitle?: string
  route: string
}

export interface InterviewPerson {
  id: number
  name: string
  role: string
  avatar: string
  quote: string
  background?: string
}

export interface AnimationConfig {
  duration: number
  delay?: number
  ease?: string
}

// 板块3柱状图相关类型
export interface ChartDataItem {
  year: string
  value: number
  color: string
  detail: string // 点击后显示的详细说明
}

export interface ChartModule {
  id: string
  title: string
  unit: string
  icon: string // emoji 图标
  description: string // 右侧文字介绍
  highlights?: string[] // 关键亮点（可选）
  data: ChartDataItem[]
}
