"use client"

import { useState } from "react"
import StepStepper from "@/components/viz/StepStepper"
import SliderControl from "@/components/viz/SliderControl"

const LOOP_STEPS = [
  {
    title: "task agent runs",
    description: "the task agent attempts the problem and produces an output. its performance is scored and logged for the meta agent to read.",
    activeBoxes: ["task"],
    activeArrows: ["task-output"],
  },
  {
    title: "meta agent observes",
    description: "the meta agent reads the task agent's full code and performance history — it has complete visibility into how the task agent is working and where it's failing.",
    activeBoxes: ["meta"],
    activeArrows: ["meta-reads"],
  },
  {
    title: "meta agent edits the task agent",
    description: "the meta agent rewrites parts of the task agent's code to improve future performance. next run, the task agent is a different program.",
    activeBoxes: ["task", "meta"],
    activeArrows: ["meta-edits-task"],
  },
  {
    title: "meta agent edits itself",
    description: "crucially: the meta agent also rewrites its own improvement procedure. not just what to improve — but how it decides what to improve. this is the recursive step that separates hyperagents from everything before.",
    activeBoxes: ["meta"],
    activeArrows: ["meta-edits-self"],
  },
]

// Illustrative performance curves across 10 runs (based on paper trends, not exact numbers)
const BASELINE = [55, 55, 56, 55, 56, 55, 56, 55, 56, 55]
const DGM      = [55, 58, 61, 63, 65, 67, 69, 70, 71, 72]
const DGM_H    = [55, 58, 62, 67, 72, 77, 81, 85, 89, 93]

export default function HyperagentsVisual() {
  const [step, setStep] = useState(0)
  const [run, setRun] = useState(5)

  const { title, description, activeBoxes, activeArrows } = LOOP_STEPS[step]
  const isBox = (key: string) => activeBoxes.includes(key)
  const isArrow = (key: string) => activeArrows.includes(key)

  return (
    <div className="space-y-6">
      {/* Figure 1: The self-improvement loop */}
      <div className="bg-white border border-stone-200 rounded p-6 space-y-6 shadow-sm">
        <div className="space-y-1">
          <h3 className="font-mono text-xs text-stone-400 uppercase tracking-widest">
            figure 1 — the self-improvement loop
          </h3>
          <p className="font-serif text-sm text-stone-600">
            step through the cycle to see how a hyperagent improves itself.
          </p>
        </div>

        {/* Architecture diagram */}
        <div className="flex flex-col items-center gap-2 py-2 select-none">
          {/* Task agent */}
          <div className={`w-56 rounded border-2 px-4 py-3 text-center transition-all duration-300 ${
            isBox("task")
              ? "border-blue-400 bg-blue-50 shadow-sm"
              : "border-stone-200 bg-stone-50"
          }`}>
            <div className={`font-mono text-xs font-bold transition-colors duration-300 ${isBox("task") ? "text-blue-700" : "text-stone-500"}`}>
              task agent
            </div>
            <div className={`font-mono text-xs mt-0.5 transition-colors duration-300 ${isBox("task") ? "text-blue-400" : "text-stone-400"}`}>
              solves the problem
            </div>
          </div>

          <div className="flex flex-col items-center gap-0.5">
            <div className={`font-mono text-xs transition-colors duration-300 ${isArrow("task-output") ? "text-blue-400" : "text-stone-200"}`}>
              ↓ performance score logged
            </div>
            <div className={`font-mono text-xs transition-colors duration-300 ${isArrow("meta-reads") ? "text-amber-400" : "text-stone-200"}`}>
              ↓ meta agent reads code + history
            </div>
          </div>

          {/* Meta agent */}
          <div className={`w-56 rounded border-2 px-4 py-3 text-center transition-all duration-300 ${
            isBox("meta")
              ? "border-amber-400 bg-amber-50 shadow-sm"
              : "border-stone-200 bg-stone-50"
          }`}>
            <div className={`font-mono text-xs font-bold transition-colors duration-300 ${isBox("meta") ? "text-amber-700" : "text-stone-500"}`}>
              meta agent
            </div>
            <div className={`font-mono text-xs mt-0.5 transition-colors duration-300 ${isBox("meta") ? "text-amber-400" : "text-stone-400"}`}>
              improves the system
            </div>
          </div>

          {/* Outgoing arrows from meta */}
          <div className="flex gap-12 mt-1">
            <div className={`font-mono text-xs text-center leading-relaxed transition-colors duration-300 ${isArrow("meta-edits-task") ? "text-blue-400" : "text-stone-200"}`}>
              ↙<br />edits task agent
            </div>
            <div className={`font-mono text-xs text-center leading-relaxed transition-colors duration-300 ${isArrow("meta-edits-self") ? "text-amber-400" : "text-stone-200"}`}>
              ↺<br />edits itself
            </div>
          </div>
        </div>

        {/* Step description */}
        <div className="bg-stone-50 border border-stone-200 rounded p-4 space-y-1">
          <div className="font-mono text-xs font-bold text-stone-700">{title}</div>
          <p className="font-serif text-sm text-stone-600 leading-relaxed">{description}</p>
        </div>

        <StepStepper
          step={step}
          total={LOOP_STEPS.length}
          onBack={() => setStep(s => Math.max(0, s - 1))}
          onNext={() => setStep(s => Math.min(LOOP_STEPS.length - 1, s + 1))}
        />
      </div>

      {/* Figure 2: Compounding gains */}
      <div className="bg-white border border-stone-200 rounded p-6 space-y-5 shadow-sm">
        <div className="space-y-1">
          <h3 className="font-mono text-xs text-stone-400 uppercase tracking-widest">
            figure 2 — gains compound across runs
          </h3>
          <p className="font-serif text-sm text-stone-600">
            drag the slider to see how performance diverges as improvement cycles stack up.
          </p>
        </div>

        <SliderControl
          label="improvement runs completed"
          min={1}
          max={10}
          value={run}
          onChange={setRun}
        />

        <div className="space-y-3 pt-1">
          {[
            { label: "baseline (no self-improvement)", data: BASELINE, barColor: "bg-stone-300", textColor: "text-stone-500" },
            { label: "DGM (task-level only)", data: DGM, barColor: "bg-blue-300", textColor: "text-blue-600" },
            { label: "DGM-H (hyperagent)", data: DGM_H, barColor: "bg-amber-400", textColor: "text-amber-700" },
          ].map(({ label, data, barColor, textColor }) => {
            const score = data[run - 1]
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
