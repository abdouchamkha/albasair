export interface Pillar {
  id: string
  name: string
  icon: string
  color: string
}

export interface Quiz {
  id: string
  text: string
  options: string[]
  correctAnswer: string
  explanation: string
  points?: number
}

export interface Level {
  id: number
  levelNumber: number
  title: string
  category: string
  pillar: string
  type: string
  isExam: boolean
  description: string
  xpReward: number
  starsAvailable: number
  estimatedTime: string
  content?: any
  quiz?: Quiz[]
  passingScore?: number
  unlocksCertificate?: string
  questions?: Quiz[]
}

export interface Phase {
  id: string
  title: string
  ageRange: string
  description: string
  icon: string
  color: string
  levels: Level[]
}

export interface Metadata {
  appName: string
  version: string
  description: string
  tagline: string
  pillars: Pillar[]
}

export interface Curriculum {
  metadata: Metadata
  kidsPath: Phase[]
}
