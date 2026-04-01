import { papers } from "@/papers"
import { PaperMeta } from "@/types/paper"

export function getAllPapers(): PaperMeta[] {
  return [...papers].sort((a, b) =>
    new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime()
  )
}

export function getPaperBySlug(slug: string): PaperMeta | undefined {
  return papers.find(p => p.slug === slug)
}

export function getAllTags(): string[] {
  const tagSet = new Set<string>()
  papers.forEach(p => p.tags.forEach(t => tagSet.add(t)))
  return Array.from(tagSet).sort()
}

export function getAllCategories(): string[] {
  const catSet = new Set<string>()
  papers.forEach(p => catSet.add(p.category))
  return Array.from(catSet).sort()
}
