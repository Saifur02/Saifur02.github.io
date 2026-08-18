import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { cn } from '../lib/cn'

/**
 * Residential demand figure for the thesis entry.
 *
 * The profile is a hand-drawn illustration of the *concepts* the CV names —
 * forecasting, disaggregation, load shifting — not measured or simulated data,
 * and it is labelled as such. The toggle moves demand out of the evening peak
 * to show what "load shifting" means; it does not report a result.
 */

// 24 hourly values, illustrative only.
const BASE = [
  32, 28, 25, 24, 26, 34, 48, 62, 58, 50, 46, 44, 45, 47, 52, 60, 74, 92, 96, 88, 74, 60, 48, 38,
]
const SHIFTED = [
  46, 44, 42, 40, 42, 48, 54, 62, 58, 52, 50, 50, 51, 52, 55, 60, 66, 70, 70, 66, 62, 56, 50, 46,
]

const WIDTH = 600
const HEIGHT = 200
const PADDING = { top: 14, right: 12, bottom: 26, left: 30 }
const MAX = 100

function pointsFor(values: number[]) {
  const innerW = WIDTH - PADDING.left - PADDING.right
  const innerH = HEIGHT - PADDING.top - PADDING.bottom
  const step = innerW / (values.length - 1)
  return values
    .map((value, i) => {
      const x = PADDING.left + i * step
      const y = PADDING.top + innerH * (1 - value / MAX)
      return `${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')
}

export function LoadCurve() {
  const [shifted, setShifted] = useState(false)
  const reduced = useReducedMotion()
  const values = shifted ? SHIFTED : BASE

  const innerW = WIDTH - PADDING.left - PADDING.right
  const innerH = HEIGHT - PADDING.top - PADDING.bottom
  const barStep = innerW / values.length

  return (
    <div>
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="w-full"
        role="img"
        aria-label={
          shifted
            ? 'Illustrative daily residential demand profile after load shifting: the evening peak is flattened and demand is spread across off-peak hours.'
            : 'Illustrative daily residential demand profile with a pronounced evening peak.'
        }
      >
        <defs>
          <linearGradient id="load-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Baseline grid */}
        {[0, 0.25, 0.5, 0.75, 1].map((t) => {
          const y = PADDING.top + innerH * t
          return (
            <line
              key={t}
              x1={PADDING.left}
              y1={y}
              x2={WIDTH - PADDING.right}
              y2={y}
              stroke="rgba(148,163,184,0.12)"
              strokeWidth="1"
            />
          )
        })}

        {/* Hourly demand bars — the disaggregated household load */}
        {values.map((value, i) => {
          const barH = innerH * (value / MAX)
          return (
            <motion.rect
              key={i}
              x={PADDING.left + i * barStep + barStep * 0.18}
              width={barStep * 0.64}
              rx={1.5}
              fill="rgba(99,102,241,0.35)"
              initial={false}
              animate={{ y: PADDING.top + innerH - barH, height: barH }}
              transition={{
                duration: reduced ? 0 : 0.6,
                delay: reduced ? 0 : i * 0.012,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          )
        })}

        {/* Forecast curve. SVG `points` is not interpolatable, so the two
            profiles are drawn once and crossfaded instead of morphed. */}
        {[
          { key: 'base', values: BASE, visible: !shifted },
          { key: 'shifted', values: SHIFTED, visible: shifted },
        ].map((curve) => (
          <motion.polyline
            key={curve.key}
            points={pointsFor(curve.values)}
            fill="none"
            stroke="#22d3ee"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
            initial={false}
            animate={{ opacity: curve.visible ? 1 : 0 }}
            transition={{ duration: reduced ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}

        {/* Axis labels */}
        <text x={PADDING.left} y={HEIGHT - 8} className="fill-muted font-mono" fontSize="9">
          00:00
        </text>
        <text
          x={PADDING.left + innerW / 2}
          y={HEIGHT - 8}
          textAnchor="middle"
          className="fill-muted font-mono"
          fontSize="9"
        >
          12:00
        </text>
        <text
          x={WIDTH - PADDING.right}
          y={HEIGHT - 8}
          textAnchor="end"
          className="fill-muted font-mono"
          fontSize="9"
        >
          24:00
        </text>
        <text
          x={PADDING.left - 6}
          y={PADDING.top + 4}
          textAnchor="end"
          className="fill-muted font-mono"
          fontSize="9"
        >
          kW
        </text>
      </svg>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-4 font-mono text-[0.65rem] text-muted">
          <span className="flex items-center gap-1.5">
            <span aria-hidden="true" className="block h-0.5 w-4 bg-accent" />
            Forecast profile
          </span>
          <span className="flex items-center gap-1.5">
            <span aria-hidden="true" className="block size-2.5 rounded-sm bg-accent-2/60" />
            Disaggregated load
          </span>
        </div>

        <button
          type="button"
          onClick={() => setShifted((value) => !value)}
          aria-pressed={shifted}
          className={cn(
            'rounded-full border px-3.5 py-1.5 text-[0.72rem] transition-colors',
            shifted
              ? 'border-accent/60 bg-accent/10 text-accent'
              : 'border-line text-muted hover:border-accent/40 hover:text-ink',
          )}
        >
          {shifted ? 'Load shifting applied' : 'Apply load shifting'}
        </button>
      </div>

      <p className="mt-3 font-mono text-[0.65rem] leading-relaxed text-muted">
        Schematic daily profile — shows how load shifting flattens an evening peak.
      </p>
    </div>
  )
}
