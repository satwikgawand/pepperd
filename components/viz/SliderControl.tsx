"use client"

type SliderControlProps = {
  label: string
  min: number
  max: number
  value: number
  onChange: (v: number) => void
}

export default function SliderControl({ label, min, max, value, onChange }: SliderControlProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between font-mono text-xs text-stone-500">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full accent-stone-700"
      />
    </div>
  )
}
