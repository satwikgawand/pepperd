import { notFound } from "next/navigation"
import Link from "next/link"
import { MDXRemote } from "next-mdx-remote/rsc"
import fs from "fs"
import path from "path"
import { getAllPapers, getPaperBySlug } from "@/lib/papers"
import { PaperMeta } from "@/types/paper"
import QuizBlock from "@/components/viz/QuizBlock"

const DIFFICULTY_STYLES: Record<string, string> = {
  "NPC": "bg-green-100 text-green-800 border border-green-300",
  "main character": "bg-amber-100 text-amber-800 border border-amber-300",
  "galaxy brain": "bg-orange-100 text-orange-800 border border-orange-300",
}

export async function generateStaticParams() {
  const papers = getAllPapers()
  return papers.map(p => ({ slug: p.slug }))
}

async function getMDXContent(slug: string): Promise<string> {
  const contentPath = path.join(process.cwd(), "papers", slug, "content.mdx")
  return fs.readFileSync(contentPath, "utf-8")
}

/**
 * Split MDX source into named sections by ## heading.
 * Returns a map of lowercase heading text → section content (excluding the heading line itself).
 */
function splitMDXSections(source: string): Record<string, string> {
  const lines = source.split("\n")
  const sections: Record<string, string> = {}
  let currentKey: string | null = null
  let currentLines: string[] = []

  for (const line of lines) {
    const h2Match = line.match(/^##\s+(.+)$/)
    if (h2Match) {
      if (currentKey !== null) {
        sections[currentKey] = currentLines.join("\n").trim()
      }
      currentKey = h2Match[1].trim().toLowerCase()
      currentLines = []
    } else {
      currentLines.push(line)
    }
  }

  if (currentKey !== null) {
    sections[currentKey] = currentLines.join("\n").trim()
  }

  return sections
}

function PaperHeader({ meta }: { meta: PaperMeta }) {
  return (
    <header className="space-y-4 border-b border-stone-300 pb-8 mb-10">
      <Link
        href="/"
        className="group font-mono text-xs text-stone-400 hover:text-stone-600 transition-colors inline-flex items-center gap-1"
      >
        <span className="transition-transform duration-150 group-hover:-translate-x-1">←</span>
        back to pepperd
      </Link>

      <div className="space-y-2">
        <div className="font-mono text-xs text-stone-400 tracking-widest">
          {meta.venue}
        </div>
        <h1 className="font-serif text-4xl text-stone-900 leading-tight">
          {meta.title}
        </h1>
        <div className="font-mono text-sm text-stone-500 flex flex-wrap items-center gap-x-3 gap-y-1">
          <span>{meta.authors}</span>
          <span className="text-stone-300">·</span>
          <span>{meta.year}</span>
          <span className="text-stone-300">·</span>
          <span>{meta.readTime}</span>
          <span className="text-stone-300">·</span>
          <a
            href={meta.arxiv}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            arxiv ↗
          </a>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 pt-1">
        <span className={`px-2 py-1 text-xs font-mono rounded ${DIFFICULTY_STYLES[meta.difficulty]}`}>
          {meta.difficulty}
        </span>
        {meta.tags.map(tag => (
          <span
            key={tag}
            className="px-2 py-0.5 text-xs font-mono bg-white border border-stone-300 text-stone-600 rounded-full transition-colors hover:border-stone-500"
          >
            {tag}
          </span>
        ))}
      </div>
    </header>
  )
}

function SectionLabel({ number, label }: { number: string; label: string }) {
  return (
    <div className="font-mono text-xs text-stone-400 uppercase tracking-widest flex items-center gap-3 mb-4">
      <span className="text-stone-300">{number}</span>
      <span>{label}</span>
      <div className="flex-1 h-px bg-stone-200" />
    </div>
  )
}

type PageProps = {
  params: Promise<{ slug: string }>
}

export default async function PaperPage({ params }: PageProps) {
  const { slug } = await params
  const meta = getPaperBySlug(slug)
  if (!meta) notFound()

  const mdxSource = await getMDXContent(slug)
  const sections = splitMDXSections(mdxSource)

  // Dynamically import the visual component
  let VisualComponent: React.ComponentType | null = null
  let quizQuestions = null

  try {
    const visualModule = await import(`@/papers/${slug}/Visual`)
    VisualComponent = visualModule.default
  } catch {
    // no visual for this paper
  }

  if (meta.hasQuiz) {
    try {
      const quizModule = await import(`@/papers/${slug}/Quiz`)
      quizQuestions = quizModule.questions
    } catch {
      // no quiz found
    }
  }

  const tldrSource = sections["tldr"] ?? ""
  const findingsSource = sections["key findings"] ?? ""

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <PaperHeader meta={meta} />

      {/* Section 1: TLDR */}
      {tldrSource && (
        <section className="mb-10">
          <SectionLabel number="§1" label="brainrot tldr" />
          <div className="bg-stone-50 border border-stone-200 rounded p-6">
            <MDXRemote
              source={tldrSource}
              components={{
                p: ({ children }) => (
                  <p className="font-serif text-base text-stone-700 leading-relaxed m-0 mb-3 last:mb-0">
                    {children}
                  </p>
                ),
              }}
            />
          </div>
        </section>
      )}

      {/* Section 2: Key findings */}
      {findingsSource && (
        <section className="mb-10">
          <SectionLabel number="§2" label="key findings" />
          <div className="bg-white border border-stone-200 rounded p-6">
            <MDXRemote
              source={findingsSource}
              components={{
                ul: ({ children }) => (
                  <ul className="space-y-3 list-none p-0 m-0">{children}</ul>
                ),
                li: ({ children }) => (
                  <li className="flex gap-3 items-start">
                    <span className="font-mono text-stone-300 shrink-0 mt-1 select-none">—</span>
                    <span className="font-serif text-sm text-stone-700 leading-relaxed">{children}</span>
                  </li>
                ),
                p: ({ children }) => (
                  <p className="font-serif text-sm text-stone-600 leading-relaxed mb-3">{children}</p>
                ),
              }}
            />
          </div>
        </section>
      )}

      {/* Section 3: Interactive visual */}
      {VisualComponent && (
        <section className="mb-10">
          <SectionLabel number="§3" label="interactive visual" />
          <VisualComponent />
        </section>
      )}

      {/* Section 4: Quiz */}
      {quizQuestions && (
        <section className="mb-10">
          <SectionLabel number="§4" label="comprehension check" />
          <QuizBlock questions={quizQuestions} />
        </section>
      )}

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-stone-200 font-mono text-xs text-stone-400 flex justify-between items-center">
        <span>added {meta.addedDate}</span>
        <Link href="/" className="hover:text-stone-600 transition-colors">
          ← more papers
        </Link>
      </footer>
    </div>
  )
}
