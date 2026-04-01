export type Difficulty = "NPC" | "main character" | "galaxy brain"

export type PaperMeta = {
  slug: string
  title: string
  authors: string
  venue: string
  year: number
  arxiv: string
  category: string
  tags: string[]
  difficulty: Difficulty
  readTime: string
  hasQuiz: boolean
  addedDate: string
  tldrPreview: string  // first sentence of TLDR for card preview
}

export type QuizQuestion = {
  question: string
  options: string[]
  answer: number
  explanation: string
}
