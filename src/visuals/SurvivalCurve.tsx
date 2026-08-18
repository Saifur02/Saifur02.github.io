import { motion } from 'motion/react'

/**
 * Kaplan–Meier style step curve for the SEER survival-analysis project.
 *
 * The shape illustrates what a survival function looks like — monotonically
 * decreasing with censoring ticks — and is explicitly labelled as an
 * illustration. The study's numerical estimates are not reproduced here.
 */

const WIDTH = 320
const HEIGHT = 190
const PAD = { top: 12, right: 12, bottom: 26, left: 34 }

// Illustrative step points: [time fraction, survival fraction]
const STEPS: [number, number][] = [
  [0, 1],
  [0.08, 0.97],
  [0.18, 0.93],
  [0.3, 0.88],
  [0.42, 0.84],
  [0.55, 0.79],
  [0.68, 0.75],
  [0.82, 0.72],
  [1, 0.7],
]

const innerW = WIDTH - PAD.left - PAD.right
const innerH = HEIGHT - PAD.top - PAD.bottom

function toXY([t, s]: [number, number]) {
  return { x: PAD.left + t * innerW, y: PAD.top + (1 - s) * innerH }
}

/** Build the staircase path: horizontal hold, then vertical drop. */
const path = STEPS.reduce((acc, point, i) => {
  const { x, y } = toXY(point)
  if (i === 0) return `M${x} ${y}`
  const prev = toXY(STEPS[i - 1])
  return `${acc} L${x} ${prev.y} L${x} ${y}`
}, '')

export function SurvivalCurve() {
  return (
    <div>
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="w-full max-w-sm"
        role="img"
        aria-label="Illustrative Kaplan-Meier survival curve: a staircase declining gradually over time with censoring marks."
      >
        {/* Axes */}
        <line x1={PAD.left} y1={PAD.top} x2={PAD.left} y2={HEIGHT - PAD.bottom} stroke="rgba(148,163,184,0.3)" />
        <line
          x1={PAD.left}
          y1={HEIGHT - PAD.bottom}
          x2={WIDTH - PAD.right}
          y2={HEIGHT - PAD.bottom}
          stroke="rgba(148,163,184,0.3)"
        />
        {[0, 0.5, 1].map((t) => (
          <g key={t}>
            <line
              x1={PAD.left - 3}
              y1={PAD.top + (1 - t) * innerH}
              x2={PAD.left}
              y2={PAD.top + (1 - t) * innerH}
              stroke="rgba(148,163,184,0.4)"
            />
            <text
              x={PAD.left - 6}
              y={PAD.top + (1 - t) * innerH + 3}
              textAnchor="end"
              className="fill-muted font-mono"
              fontSize="7.5"
            >
              {t.toFixed(1)}
            </text>
          </g>
        ))}
        <text x={PAD.left} y={HEIGHT - 8} className="fill-muted font-mono" fontSize="7.5">
          time →
        </text>
        <text
          x={PAD.left - 26}
          y={PAD.top + 6}
          className="fill-muted font-mono"
          fontSize="7.5"
        >
          S(t)
        </text>

        {/* Curve */}
        <motion.path
          d={path}
          fill="none"
          stroke="#22d3ee"
          strokeWidth="2"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        />

        {/* Censoring ticks */}
        {STEPS.slice(1, -1).map((point, i) => {
          const { x, y } = toXY(point)
          return (
            <motion.line
              key={i}
              x1={x + 8}
              y1={y - 4}
              x2={x + 8}
              y2={y + 4}
              stroke="#a78bfa"
              strokeWidth="1.4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.9 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + i * 0.1, duration: 0.3 }}
            />
          )
        })}
      </svg>

      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[0.62rem] text-muted">
        <span className="flex items-center gap-1.5">
          <span aria-hidden="true" className="block h-0.5 w-4 bg-accent" />
          Survival function
        </span>
        <span className="flex items-center gap-1.5">
          <span aria-hidden="true" className="block h-3 w-0.5 bg-highlight" />
          Censored
        </span>
      </div>
      <p className="mt-2 font-mono text-[0.62rem] leading-relaxed text-muted">
        Illustration of the method. No estimates from the study are reproduced.
      </p>
    </div>
  )
}
