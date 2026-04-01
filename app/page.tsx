import { getAllPapers, getAllTags } from "@/lib/papers"
import PaperFeed from "./PaperFeed"

export default function Home() {
  const papers = getAllPapers()
  const allTags = getAllTags()

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      {/* Header */}
      <header className="mb-12 space-y-3 border-b border-stone-300 pb-10">
        <div className="font-mono text-xs text-stone-400 uppercase tracking-widest">
          vol. I — 2026
        </div>
        <h1 className="font-serif text-5xl text-stone-900 tracking-tight">
          pepperd
        </h1>
        <p className="font-serif text-lg text-stone-600 leading-relaxed">
          research papers, but you'll actually finish them.
        </p>
        <p className="font-mono text-xs text-stone-400">
          {papers.length} paper{papers.length !== 1 ? "s" : ""} and counting
          <span className="ml-3 text-stone-300">·</span>
          <span className="ml-3">hand-curated. no AI slop.</span>
        </p>
      </header>

      {/* Feed */}
      <main>
        <PaperFeed papers={papers} allTags={allTags} />
      </main>

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-stone-200 font-mono text-xs text-stone-400 text-center space-y-1">
        <p>pepperd — a hand-crafted academic paper breakdown site</p>
        <p className="text-stone-300">not affiliated with any institution. purely vibes-driven research dissemination.</p>
      </footer>
    </div>
  )
}
