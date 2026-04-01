"use client"

import { useState } from "react"
import Link from "next/link"
import { PaperMeta } from "@/types/paper"

const DIFFICULTY_STYLES: Record<string, string> = {
  "NPC": "bg-green-100 text-green-800 border border-green-300",
  "main character": "bg-amber-100 text-amber-800 border border-amber-300",
  "galaxy brain": "bg-orange-100 text-orange-800 border border-orange-300",
}

type PaperFeedProps = {
  papers: PaperMeta[]
  allTags: string[]
}

export default function PaperFeed({ papers, allTags }: PaperFeedProps) {
  const [activeTag, setActiveTag] = useState<string>("all")

  const filtered = activeTag === "all"
    ? papers
    : papers.filter(p => p.tags.includes(activeTag))

  return (
    <div className="space-y-8">
      {/* Tag filter */}
      <div className="flex flex-wrap gap-2">
        {["all", ...allTags].map(tag => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`px-3 py-1 text-xs font-mono rounded-full border transition-colors ${
              activeTag === tag
                ? "bg-stone-800 text-white border-stone-800"
                : "bg-white text-stone-600 border-stone-300 hover:border-stone-500 hover:bg-stone-50"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Paper cards */}
      <div className="space-y-4">
        {filtered.map(paper => (
          <Link key={paper.slug} href={`/paper/${paper.slug}`} className="block group">
            <article className="bg-white border border-stone-200 rounded p-6 hover:rotate-1 transition-transform duration-200 hover:shadow-md">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1 flex-1 min-w-0">
                  <h2 className="font-serif text-xl text-stone-900 group-hover:text-blue-800 transition-colors leading-snug">
                    {paper.title}
                  </h2>
                  <div className="font-mono text-xs text-stone-500 flex flex-wrap gap-x-3 gap-y-1">
                    <span>{paper.authors}</span>
                    <span className="text-stone-300">·</span>
                    <span>{paper.venue}</span>
                    <span className="text-stone-300">·</span>
                    <span>{paper.readTime}</span>
                  </div>
                </div>
                <span className={`shrink-0 px-2 py-1 text-xs font-mono rounded ${DIFFICULTY_STYLES[paper.difficulty]}`}>
                  {paper.difficulty}
                </span>
              </div>

              <p className="mt-3 font-serif text-sm text-stone-600 leading-relaxed italic">
                "{paper.tldrPreview}"
              </p>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {paper.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-xs font-mono bg-stone-100 text-stone-500 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="font-mono text-xs text-blue-600 group-hover:text-blue-800 transition-colors whitespace-nowrap ml-4">
                  read the breakdown →
                </span>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  )
}
