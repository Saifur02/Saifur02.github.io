import { useRef } from 'react'
import { motion, useInView, useMotionValue, useReducedMotion, useSpring } from 'motion/react'

/**
 * Cross-section of a gate-all-around FET: source and drain pads, three stacked
 * nanosheet channels threaded through a wrap-around gate, and electrons
 * drifting source → drain.
 *
 * Geometry is schematic, not simulated — no numerical values are shown, because
 * the CV reports none.
 *
 * The electron animation only runs while the figure is on screen, and is
 * replaced by a static frame under prefers-reduced-motion.
 */

const SHEETS = [140, 210, 280]
const SHEET_HEIGHT = 26
const CHANNEL_START = 92
const CHANNEL_END = 508

export function GaafetHero() {
  const wrap = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const inView = useInView(wrap, { amount: 0.25 })
  const animating = !reduced && inView

  // Pointer parallax — a few pixels of depth, mouse only.
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const px = useSpring(rawX, { stiffness: 60, damping: 20 })
  const py = useSpring(rawY, { stiffness: 60, damping: 20 })

  const onPointerMove = (event: React.PointerEvent) => {
    if (reduced || event.pointerType !== 'mouse' || !wrap.current) return
    const rect = wrap.current.getBoundingClientRect()
    rawX.set(((event.clientX - rect.left) / rect.width - 0.5) * 16)
    rawY.set(((event.clientY - rect.top) / rect.height - 0.5) * 12)
  }

  const onPointerLeave = () => {
    rawX.set(0)
    rawY.set(0)
  }

  return (
    <div
      ref={wrap}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="relative w-full"
    >
      {/* Ambient field behind the device */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_55%_at_50%_45%,rgba(34,211,238,0.12)_0%,rgba(99,102,241,0.08)_45%,transparent_75%)] blur-xl"
      />

      <motion.svg
        viewBox="0 0 600 420"
        role="img"
        aria-label="Schematic cross-section of a gate-all-around field-effect transistor: source and drain contacts joined by three stacked nanosheet channels passing through a wrap-around gate, with electrons drifting from source to drain."
        style={{ x: px, y: py }}
        className="w-full max-w-[36rem] overflow-visible"
      >
        <defs>
          <linearGradient id="gaafet-sheet" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.75" />
          </linearGradient>
          <linearGradient id="gaafet-gate" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.55" />
          </linearGradient>
          <radialGradient id="gaafet-electron">
            <stop offset="0%" stopColor="#e0fbff" />
            <stop offset="60%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
          </radialGradient>
          <filter id="gaafet-soft" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        {/* Substrate plate */}
        <motion.g
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <path
            d="M60 356 L540 356 L560 392 L40 392 Z"
            fill="rgba(148,163,184,0.06)"
            stroke="rgba(148,163,184,0.22)"
          />
          <text
            x="300"
            y="381"
            textAnchor="middle"
            className="fill-muted font-mono"
            fontSize="11"
            letterSpacing="3"
          >
            SUBSTRATE
          </text>
        </motion.g>

        {/* Source and drain contacts */}
        {[
          { x: 40, label: 'S', anchor: 62 },
          { x: 508, label: 'D', anchor: 530 },
        ].map((pad, i) => (
          <motion.g
            key={pad.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.25 + i * 0.1 }}
            style={{ transformOrigin: `${pad.anchor}px 235px` }}
          >
            <rect
              x={pad.x}
              y={118}
              width={52}
              height={234}
              rx={8}
              fill="rgba(148,163,184,0.1)"
              stroke="rgba(148,163,184,0.4)"
            />
            <text
              x={pad.anchor + (pad.label === 'S' ? 4 : -6)}
              y={104}
              textAnchor="middle"
              className="fill-muted font-mono"
              fontSize="13"
            >
              {pad.label}
            </text>
          </motion.g>
        ))}

        {/* Nanosheet channels */}
        {SHEETS.map((y, i) => (
          <motion.rect
            key={y}
            x={CHANNEL_START}
            y={y}
            width={CHANNEL_END - CHANNEL_START}
            height={SHEET_HEIGHT}
            rx={SHEET_HEIGHT / 2}
            fill="url(#gaafet-sheet)"
            fillOpacity={0.14}
            stroke="url(#gaafet-sheet)"
            strokeWidth={1.6}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.35 + i * 0.12 }}
          />
        ))}

        {/* Wrap-around gate: outer gate metal + inner high-k dielectric outline */}
        <motion.g
          initial={{ opacity: 0, scaleY: 0.85 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          style={{ transformOrigin: '300px 235px' }}
        >
          <rect
            x={244}
            y={88}
            width={112}
            height={256}
            rx={22}
            fill="rgba(167,139,250,0.07)"
            stroke="url(#gaafet-gate)"
            strokeWidth={2}
          />
          <rect
            x={256}
            y={100}
            width={88}
            height={232}
            rx={16}
            fill="none"
            stroke="rgba(167,139,250,0.35)"
            strokeWidth={1}
            strokeDasharray="4 5"
          />
          <text
            x={300}
            y={74}
            textAnchor="middle"
            className="fill-highlight font-mono"
            fontSize="13"
          >
            G
          </text>
          <text
            x={300}
            y={56}
            textAnchor="middle"
            className="fill-muted font-mono"
            fontSize="9.5"
            letterSpacing="2.4"
          >
            GATE-ALL-AROUND
          </text>
        </motion.g>

        {/* Gate field pulse — reads as the gate modulating the channel */}
        {animating ? (
          <motion.rect
            x={244}
            y={88}
            width={112}
            height={256}
            rx={22}
            fill="rgba(167,139,250,0.16)"
            filter="url(#gaafet-soft)"
            animate={{ opacity: [0.15, 0.5, 0.15] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        ) : null}

        {/* Electrons drifting source → drain */}
        {SHEETS.map((y, sheet) =>
          [0, 1, 2].map((n) => {
            const cy = y + SHEET_HEIGHT / 2
            const delay = sheet * 0.55 + n * 1.15
            if (!animating) {
              // Static frame: electrons parked at distinct points along each sheet.
              const t = 0.22 + sheet * 0.18 + n * 0.2
              return (
                <circle
                  key={`${y}-${n}`}
                  cx={CHANNEL_START + (CHANNEL_END - CHANNEL_START) * (t % 1)}
                  cy={cy}
                  r={4}
                  fill="url(#gaafet-electron)"
                />
              )
            }
            return (
              <motion.circle
                key={`${y}-${n}`}
                cy={cy}
                r={4}
                fill="url(#gaafet-electron)"
                initial={{ cx: CHANNEL_START, opacity: 0 }}
                animate={{
                  cx: [CHANNEL_START, CHANNEL_END],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 3.4,
                  times: [0, 0.12, 0.86, 1],
                  repeat: Infinity,
                  delay,
                  ease: 'linear',
                }}
              />
            )
          }),
        )}

        {/* Dimension annotation, unitless on purpose */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="fill-muted"
        >
          <line x1={244} y1={404} x2={356} y2={404} stroke="rgba(148,163,184,0.4)" />
          <line x1={244} y1={398} x2={244} y2={410} stroke="rgba(148,163,184,0.4)" />
          <line x1={356} y1={398} x2={356} y2={410} stroke="rgba(148,163,184,0.4)" />
          <text x={300} y={418} textAnchor="middle" className="font-mono" fontSize="9.5" letterSpacing="1.5">
            GATE LENGTH
          </text>
        </motion.g>
      </motion.svg>
    </div>
  )
}
