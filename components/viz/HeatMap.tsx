"use client"

type HeatMapProps = {
  data: number[][]
  rowLabels: string[]
  colLabels: string[]
  highlightRow?: number
}

export default function HeatMap({ data, rowLabels, colLabels, highlightRow }: HeatMapProps) {
  return (
    <div className="overflow-x-auto">
      <table className="border-collapse text-xs font-mono">
        <thead>
          <tr>
            <th className="w-12" />
            {colLabels.map((label, j) => (
              <th
                key={j}
                className="px-2 py-1 text-center text-stone-500 font-normal w-12"
              >
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              <td
                className={`px-2 py-1 text-right pr-3 font-mono text-xs whitespace-nowrap ${
                  highlightRow === i ? "text-stone-900 font-bold" : "text-stone-500"
                }`}
              >
                {rowLabels[i]}
              </td>
              {row.map((val, j) => {
                const intensity = Math.round(val * 255)
                const isHighlighted = highlightRow === i
                const bg = isHighlighted
                  ? `rgba(30, 64, 175, ${val})`
                  : `rgba(120, 113, 108, ${val})`
                return (
                  <td
                    key={j}
                    className="w-12 h-8 text-center border border-stone-200"
                    style={{ backgroundColor: bg }}
                    title={`${rowLabels[i]} → ${colLabels[j]}: ${val.toFixed(2)}`}
                  >
                    <span
                      className="text-xs"
                      style={{ color: val > 0.4 ? "white" : "#1a1a1a" }}
                    >
                      {val.toFixed(2)}
                    </span>
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
