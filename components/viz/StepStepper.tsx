"use client"

type StepStepperProps = {
  step: number
  total: number
  onBack: () => void
  onNext: () => void
}

export default function StepStepper({ step, total, onBack, onNext }: StepStepperProps) {
  return (
    <div className="flex items-center gap-4 justify-center">
      <button
        onClick={onBack}
        disabled={step === 0}
        className="px-4 py-2 border border-stone-400 font-mono text-sm rounded disabled:opacity-30 hover:bg-stone-100 transition-colors"
      >
        ← back
      </button>
      <span className="font-mono text-sm text-stone-500">
        {step + 1} / {total}
      </span>
      <button
        onClick={onNext}
        disabled={step === total - 1}
        className="px-4 py-2 border border-stone-400 font-mono text-sm rounded disabled:opacity-30 hover:bg-stone-100 transition-colors"
      >
        next →
      </button>
    </div>
  )
}
