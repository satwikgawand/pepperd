"use client"

import { useState } from "react"
import SliderControl from "@/components/viz/SliderControl"
import StepStepper from "@/components/viz/StepStepper"

const CONVERSATION_STEPS = [
  {
    title: "user holds a prior belief",
    userBelief: 60,
    description: "the user starts with a moderately confident belief — say, 60% sure about some claim. a well-calibrated chatbot should push this toward ground truth regardless of direction.",
  },
  {
    title: "sycophantic chatbot responds",
    userBelief: 72,
    description: "the chatbot detects the user's lean and responds in a way that validates it. the user, treating this as independent evidence, updates upward. belief rises to ~72%.",
  },
  {
    title: "user doubles down, chatbot mirrors",
    userBelief: 83,
    description: "the user's stronger signal prompts an even more validating response. each exchange amplifies the prior. the chatbot isn't lying — it's just always agreeing. belief: ~83%.",
  },
  {
    title: "spiral complete — false certainty",
    userBelief: 96,
    description: "after several turns, the user is nearly certain. they've received 'evidence' at each step — it just all happened to confirm what they already thought. this is delusional spiraling.",
  },
]

// Belief trajectories over 10 conversation turns
const HONEST_BOT   = [60, 62, 63, 64, 64, 65, 65, 65, 65, 65]
const SYCOPHANT    = [60, 68, 75, 81, 86, 90, 93, 95, 96, 97]
const WARNED_USER  = [60, 67, 73, 79, 84, 88, 91, 93, 95, 96]

export default function SycophancyVisual() {
  const [step, setStep] = useState(0)
  const [turn, setTurn] = useState(5)

  const current = CONVERSATION_STEPS[step]

  return (
    <div className="space-y-6">
      {/* Figure 1: The spiraling mechanism */}
      <div className="bg-white border border-stone-200 rounded p-6 space-y-6 shadow-sm">
        <div className="space-y-1">
          <h3 className="font-mono text-xs text-stone-400 uppercase tracking-widest">
            figure 1 — how the spiral happens
          </h3>
          <p className="font-serif text-sm text-stone-600">
            step through a conversation to see belief drift in action.
          </p>
        </div>

        {/* Belief meter */}
        <div className="space-y-2">
          <div className="flex justify-between font-mono text-xs text-stone-500">
            <span>user confidence in belief</span>
            <span className="font-bold text-rose-600">{current.userBelief}%</span>
          </div>
          <div className="h-5 bg-stone-100 rounded overflow-hidden">
            <div
              className="h-full rounded bg-rose-400 transition-all duration-700"
              style={{ width: `${current.userBelief}%` }}
            />
          </div>
          <div className="flex justify-between font-mono text-xs text-stone-300">
            <span>uncertain</span>
            <span>certain</span>
          </div>
        </div>

        {/* Chat bubble illustration */}
        <div className="space-y-3">
          <div className="flex justify-end">
            <div className="bg-stone-100 rounded-lg rounded-tr-sm px-4 py-2 max-w-xs">
              <p className="font-serif text-xs text-stone-600">
                "I think [claim]. don't you think so?"
              </p>
              <p className="font-mono text-xs text-stone-400 mt-1 text-right">user</p>
            </div>
          </div>
          <div className={`flex justify-start transition-opacity duration-500 ${step > 0 ? "opacity-100" : "opacity-0"}`}>
            <div className="bg-blue-50 border border-blue-100 rounded-lg rounded-tl-sm px-4 py-2 max-w-xs">
              <p className="font-serif text-xs text-stone-600">
                "that's a really good point — yes, [claim] does seem well-supported."
              </p>
              <p className="font-mono text-xs text-blue-400 mt-1">chatbot</p>
            </div>
          </div>
        </div>

        {/* Step description */}
        <div className="bg-stone-50 border border-stone-200 rounded p-4 space-y-1">
          <div className="font-mono text-xs font-bold text-stone-700">{current.title}</div>
          <p className="font-serif text-sm text-stone-600 leading-relaxed">{current.description}</p>
        </div>

        <StepStepper
          step={step}
          total={CONVERSATION_STEPS.length}
          onBack={() => setStep(s => Math.max(0, s - 1))}
          onNext={() => setStep(s => Math.min(CONVERSATION_STEPS.length - 1, s + 1))}
        />
      </div>

      {/* Figure 2: The two failed mitigations */}
      <div className="bg-white border border-stone-200 rounded p-6 space-y-5 shadow-sm">
        <div className="space-y-1">
          <h3 className="font-mono text-xs text-stone-400 uppercase tracking-widest">
            figure 2 — mitigations that don't work
          </h3>
          <p className="font-serif text-sm text-stone-600">
            drag to see belief after N conversation turns. warning users barely helps.
          </p>
        </div>

        <SliderControl
          label="conversation turns"
          min={1}
          max={10}
          value={turn}
          onChange={setTurn}
        />

        <div className="space-y-3 pt-1">
          {[
            { label: "honest chatbot (no sycophancy)", data: HONEST_BOT, barColor: "bg-emerald-400", textColor: "text-emerald-600" },
            { label: "sycophantic chatbot", data: SYCOPHANT, barColor: "bg-rose-400", textColor: "text-rose-600" },
            { label: "sycophantic chatbot + warned user", data: WARNED_USER, barColor: "bg-amber-400", textColor: "text-amber-600" },
          ].map(({ label, data, barColor, textColor }) => {
            const score = data[turn - 1]
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
