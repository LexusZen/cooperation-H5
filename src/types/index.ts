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
}

export interface AnimationConfig {
  duration: number
  delay?: number
  ease?: string
}
