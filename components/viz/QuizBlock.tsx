"use client"

import { useState } from "react"
import { QuizQuestion } from "@/types/paper"

type QuizBlockProps = {
  questions: QuizQuestion[]
}

function QuizItem({ q, index }: { q: QuizQuestion; index: number }) {
  const [selected, setSelected] = useState<number | null>(null)

  const handleSelect = (optionIndex: number) => {
    if (selected !== null) return
    setSelected(optionIndex)
  }

  return (
    <div className="border border-stone-300 rounded-sm p-5 bg-white space-y-4">
      <div className="font-mono text-xs text-stone-400 uppercase tracking-widest">
        question {index + 1}
      </div>
      <p className="font-serif text-base text-stone-800 leading-relaxed">
        {q.question}
      </p>
      <div className="space-y-2">
        {q.options.map((option, i) => {
          let style = "border border-stone-300 text-stone-700 hover:border-stone-500 hover:bg-stone-50"

          if (selected !== null) {
            if (i === q.answer) {
              style = "border-2 border-green-600 bg-green-50 text-green-800"
            } else if (i === selected && selected !== q.answer) {
              style = "border-2 border-red-500 bg-red-50 text-red-800"
            } else {
              style = "border border-stone-200 text-stone-400"
            }
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={selected !== null}
              className={`w-full text-left px-4 py-3 rounded text-sm font-mono transition-all ${style} disabled:cursor-default`}
            >
              <span className="text-stone-400 mr-2">{String.fromCharCode(65 + i)}.</span>
              {option}
            </button>
          )
        })}
      </div>

      {selected !== null && (
        <div
          className={`mt-3 p-4 rounded text-sm font-mono border-l-4 ${
            selected === q.answer
              ? "bg-green-50 border-green-500 text-green-800"
              : "bg-amber-50 border-amber-500 text-amber-800"
          }`}
        >
          <div className="font-bold mb-1">
            {selected === q.answer ? "correct." : "not quite."}
          </div>
          {q.explanation}
        </div>
      )}
    </div>
  )
}

export default function QuizBlock({ questions }: QuizBlockProps) {
  return (
    <div className="space-y-6">
      <div className="border-b border-stone-300 pb-3 mb-6">
        <h3 className="font-serif text-lg text-stone-700">peer review quiz</h3>
        <p className="font-mono text-xs text-stone-400 mt-1">
          [REVIEWER 2 DEMANDS YOU ANSWER THESE]
        </p>
      </div>
      {questions.map((q, i) => (
        <QuizItem key={i} q={q} index={i} />
      ))}
    </div>
  )
}
