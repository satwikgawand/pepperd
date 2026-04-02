"use client"

import { useState } from "react"
import SliderControl from "@/components/viz/SliderControl"
import StepStepper from "@/components/viz/StepStepper"

const PROTOCOLS = [
  {
    title: "centralized — one boss, predefined roles",
    score: 61,
    description: "a coordinator agent breaks the task into subtasks, assigns roles to workers, and aggregates results. clean and predictable, but the coordinator is a bottleneck and role mismatches are common.",
    agentLayout: ["coordinator", "worker", "worker", "worker"],
    color: "bg-blue-400",
    textColor: "text-blue-600",
    label: "centralized",
  },
  {
    title: "sequential — fixed order, self-selected roles",
    score: 75,
    description: "agents speak in a fixed sequence, but each one chooses its own role before contributing. nobody is in charge — but nobody goes twice before everyone has gone once. this is the winner.",
    agentLayout: ["agent 1", "agent 2", "agent 3", "agent 4"],
    color: "bg-emerald-400",
    textColor: "text-emerald-600",
    label: "sequential ★",
  },
  {
    title: "fully autonomous — no structure at all",
    score: 52,
    description: "agents coordinate freely, self-assign roles, and decide when to act. sounds like maximum intelligence — in practice, they step on each other, duplicate effort, and miss gaps. freedom without a scaffold collapses.",
    agentLayout: ["agent", "agent", "agent", "agent"],
    color: "bg-rose-400",
    textColor: "text-rose-600",
    label: "autonomous",
  },
]

// Illustrative performance vs agent count (4–256 agents)
// Shows sub-linear scaling — gains keep coming but diminish
const AGENT_COUNTS = [4, 8, 16, 32, 64, 128, 256]
const PERF_SEQ  = [62, 70, 75, 79, 82, 84, 85]
const PERF_CENT = [58, 62, 64, 65, 66, 66, 67]
const PERF_AUTO = [48, 50, 51, 51, 52, 52, 52]

export default function SelfOrganizingVisual() {
  const [step, setStep] = useState(0)
  const [scaleIdx, setScaleIdx] = useState(2) // default: 16 agents

  const proto = PROTOCOLS[step]

  return (
    <div className="space-y-6">
      {/* Figure 1: Protocol comparison */}
      <div className="bg-white border border-stone-200 rounded p-6 space-y-6 shadow-sm">
        <div className="space-y-1">
          <h3 className="font-mono text-xs text-stone-400 uppercase tracking-widest">
            figure 1 — coordination protocols compared
          </h3>
          <p className="font-serif text-sm text-stone-600">
            step through the three main architectures and see how they stack up.
          </p>
        </div>

        {/* Performance bar */}
        <div className="space-y-2">
          <div className="flex justify-between font-mono text-xs text-stone-500">
            <span>task performance</span>
            <span className={`font-bold ${proto.textColor}`}>{proto.score}%</span>
          </div>
          <div className="h-5 bg-stone-100 rounded overflow-hidden">
            <div
              className={`h-full rounded transition-all duration-700 ${proto.color}`}
              style={{ width: `${proto.score}%` }}
            />
          </div>
        </div>

        {/* Agent diagram */}
        <div className="flex gap-2 justify-center py-2">
          {proto.agentLayout.map((label, i) => (
            <div
              key={i}
              className={`rounded border-2 px-3 py-2 text-center transition-all duration-300 ${
                step === 1
                  ? "border-emerald-300 bg-emerald-50"
                  : step === 0 && i === 0
                  ? "border-blue-400 bg-blue-50"
                  : step === 0
                  ? "border-blue-200 bg-stone-50"
                  : "border-rose-200 bg-rose-50"
              }`}
            >
              <div className={`font-mono text-xs font-bold ${
                step === 1 ? "text-emerald-700"
                : step === 0 && i === 0 ? "text-blue-700"
                : step === 0 ? "text-blue-400"
                : "text-rose-400"
              }`}>
                {label}
              </div>
              {step === 1 && (
                <div className="font-mono text-xs text-emerald-400 mt-0.5">turn {i + 1}</div>
              )}
              {step === 0 && i === 0 && (
                <div className="font-mono text-xs text-blue-400 mt-0.5">assigns</div>
              )}
            </div>
          ))}
        </div>

        {/* Description */}
        <div className="bg-stone-50 border border-stone-200 rounded p-4 space-y-1">
          <div className="font-mono text-xs font-bold text-stone-700">{proto.title}</div>
          <p className="font-serif text-sm text-stone-600 leading-relaxed">{proto.description}</p>
        </div>

        <StepStepper
          step={step}
          total={PROTOCOLS.length}
          onBack={() => setStep(s => Math.max(0, s - 1))}
          onNext={() => setStep(s => Math.min(PROTOCOLS.length - 1, s + 1))}
        />
      </div>

      {/* Figure 2: Scaling behavior */}
      <div className="bg-white border border-stone-200 rounded p-6 space-y-5 shadow-sm">
        <div className="space-y-1">
          <h3 className="font-mono text-xs text-stone-400 uppercase tracking-widest">
            figure 2 — sub-linear scaling to 256 agents
          </h3>
          <p className="font-serif text-sm text-stone-600">
            drag to see how each protocol scales. more agents keep helping — but with diminishing returns.
          </p>
        </div>

        <SliderControl
          label={`agent count: ${AGENT_COUNTS[scaleIdx - 1]}`}
          min={1}
          max={7}
          value={scaleIdx}
          onChange={setScaleIdx}
        />

        <div className="space-y-3 pt-1">
          {[
            { label: "sequential (winner)", data: PERF_SEQ, barColor: "bg-emerald-400", textColor: "text-emerald-600" },
            { label: "centralized", data: PERF_CENT, barColor: "bg-blue-400", textColor: "text-blue-600" },
            { label: "fully autonomous", data: PERF_AUTO, barColor: "bg-rose-400", textColor: "text-rose-600" },
          ].map(({ label, data, barColor, textColor }) => {
            const score = data[scaleIdx - 1]
            return (
              <div key={label} className="space-y-1">
                <div className="flex justify-between font-mono text-xs">
                  <span className="text-stone-500">{label}</span>
                  <span className={`font-bold ${textColor}`}>{score}%</span>
                </div>
                <div className="h-4 bg-stone-100 rounded overflow-hidden">
                  <div
                    className={`h-full rounded transition-all duration-500 ${barColor}`}
                    style={{ width: `${score}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>

        <p className="font-mono text-xs text-stone-400 italic">
          illustrative curves based on paper trends — not exact reported numbers
        </p>
      </div>
    </div>
  )
}
