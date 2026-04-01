"use client"

import { useState } from "react"

type Annotation = {
  x: number
  y: number
  label: string
}

type AnnotatedDiagramProps = {
  src: string
  annotations: Annotation[]
}

export default function AnnotatedDiagram({ src, annotations }: AnnotatedDiagramProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className="relative inline-block">
      <img src={src} alt="diagram" className="block max-w-full" />
      {annotations.map((ann, i) => (
        <div
          key={i}
          className="absolute"
          style={{ left: ann.x, top: ann.y }}
          onMouseEnter={() => setHoveredIndex(i)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div className="w-4 h-4 rounded-full bg-blue-600 border-2 border-white cursor-pointer hover:scale-125 transition-transform" />
          {hoveredIndex === i && (
            <div className="absolute left-5 top-0 z-10 bg-stone-800 text-white text-xs font-mono px-2 py-1 rounded whitespace-nowrap shadow-lg">
              {ann.label}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
