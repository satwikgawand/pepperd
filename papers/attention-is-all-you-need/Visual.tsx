"use client"

import { useState } from "react"
import TokenRow from "@/components/viz/TokenRow"
import HeatMap from "@/components/viz/HeatMap"

const TOKENS = ["The", "cat", "sat", "on", "the", "mat"]

const ATTENTION = [
  [0.6, 0.1, 0.05, 0.05, 0.15, 0.05],  // The
  [0.1, 0.5, 0.2, 0.05, 0.05, 0.1],    // cat
  [0.05, 0.3, 0.4, 0.1, 0.05, 0.1],    // sat
  [0.05, 0.05, 0.1, 0.5, 0.2, 0.1],    // on
  [0.2, 0.05, 0.05, 0.1, 0.5, 0.1],    // the
  [0.05, 0.1, 0.1, 0.1, 0.15, 0.5],    // mat
]

export default function AttentionVisual() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const highlightWeights = selectedIndex !== null ? ATTENTION[selectedIndex] : undefined

  return (
    <div className="bg-white border border-stone-200 rounded p-6 space-y-6 shadow-sm">
      <div className="space-y-1">
        <h3 className="font-mono text-xs text-stone-400 uppercase tracking-widest">
          figure 1 — self-attention weights
        </h3>
        <p className="font-serif text-sm text-stone-600">
          click a token to see how much it attends to every other token.
          brighter = higher attention weight.
        </p>
      </div>

      <div className="space-y-2">
        <div className="font-mono text-xs text-stone-400">input sequence:</div>
        <TokenRow
          tokens={TOKENS}
          selectedIndex={selectedIndex}
          highlightWeights={highlightWeights}
          onSelect={(i) => setSelectedIndex(i === selectedIndex ? null : i)}
        />
      </div>

      {selectedIndex !== null ? (
        <div className="space-y-3">
          <div className="font-mono text-xs text-stone-400">
            attention from <span className="text-stone-700 font-bold">"{TOKENS[selectedIndex]}"</span> to all tokens:
          </div>
          <div className="flex gap-2 flex-wrap">
            {TOKENS.map((token, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div
                  className="w-12 h-3 rounded"
                  style={{
                    backgroundColor: `rgba(30, 64, 175, ${ATTENTION[selectedIndex][i]})`,
                    border: "1px solid #e7e5e4"
                  }}
                />
                <span className="font-mono text-xs text-stone-500">{token}</span>
                <span className="font-mono text-xs text-stone-400">
                  {ATTENTION[selectedIndex][i].toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="font-mono text-xs text-stone-400 italic text-center py-2">
          ↑ select a token above
        </div>
      )}

      <div className="border-t border-stone-100 pt-4 space-y-2">
        <div className="font-mono text-xs text-stone-400">full attention matrix (all heads averaged):</div>
        <HeatMap
          data={ATTENTION}
          rowLabels={TOKENS}
          colLabels={TOKENS}
          highlightRow={selectedIndex ?? undefined}
        />
        <div className="font-mono text-xs text-stone-300 text-right">
          row = query token, col = key token
        </div>
      </div>
    </div>
  )
}
