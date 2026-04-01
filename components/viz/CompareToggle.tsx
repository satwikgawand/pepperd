"use client"

import { useState } from "react"

type CompareToggleProps = {
  labelA: string
  labelB: string
  children: (active: "A" | "B") => React.ReactNode
}

export default function CompareToggle({ labelA, labelB, children }: CompareToggleProps) {
  const [active, setActive] = useState<"A" | "B">("A")

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-0 border border-stone-300 rounded overflow-hidden w-fit font-mono text-sm">
        <button
          onClick={() => setActive("A")}
          className={`px-4 py-2 transition-colors ${
            active === "A"
              ? "bg-stone-800 text-white"
              : "bg-white text-stone-600 hover:bg-stone-50"
          }`}
        >
          {labelA}
        </button>
        <button
          onClick={() => setActive("B")}
          className={`px-4 py-2 transition-colors border-l border-stone-300 ${
            active === "B"
              ? "bg-stone-800 text-white"
              : "bg-white text-stone-600 hover:bg-stone-50"
          }`}
        >
          {labelB}
        </button>
      </div>
      <div>{children(active)}</div>
    </div>
  )
}
