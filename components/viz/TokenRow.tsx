"use client"

type TokenRowProps = {
  tokens: string[]
  selectedIndex: number | null
  highlightWeights?: number[]
  onSelect: (i: number) => void
}

export default function TokenRow({ tokens, selectedIndex, highlightWeights, onSelect }: TokenRowProps) {
  return (
    <div className="flex gap-2 flex-wrap justify-center">
      {tokens.map((token, i) => {
        const isSelected = selectedIndex === i
        const weight = highlightWeights ? highlightWeights[i] : 1
        const opacity = highlightWeights && selectedIndex !== null ? Math.max(0.15, weight) : 1

        return (
          <button
            key={i}
            onClick={() => onSelect(i)}
            style={{ opacity }}
            className={`
              font-mono text-sm px-3 py-2 border-2 rounded transition-all duration-200 cursor-pointer
              ${isSelected
                ? "bg-stone-800 text-white border-stone-800 scale-105"
                : "bg-white text-stone-800 border-stone-300 hover:border-stone-500"
              }
            `}
          >
            {token}
          </button>
        )
      })}
    </div>
  )
}
