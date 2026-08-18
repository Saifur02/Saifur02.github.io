import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'

/**
 * SAP-1 datapath. The blocks and the W-bus are the standard SAP-1 architecture;
 * the highlight walks the fetch/execute sequence so the bus traffic is legible.
 * No program or timing figures are claimed — the project built the machine in
 * Proteus.
 */

const BLOCKS = [
  { id: 'pc', label: 'PC', row: 0, col: 0 },
  { id: 'mar', label: 'MAR', row: 1, col: 0 },
  { id: 'ram', label: 'RAM', row: 2, col: 0 },
  { id: 'ir', label: 'IR', row: 3, col: 0 },
  { id: 'acc', label: 'ACC', row: 0, col: 1 },
  { id: 'alu', label: 'ALU', row: 1, col: 1 },
  { id: 'breg', label: 'B REG', row: 2, col: 1 },
  { id: 'out', label: 'OUT', row: 3, col: 1 },
] as const

/** Fetch–decode–execute order used for the walk-through highlight. */
const SEQUENCE = ['pc', 'mar', 'ram', 'ir', 'acc', 'breg', 'alu', 'out'] as const

export function SapDatapath() {
  const reduced = useReducedMotion()
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (reduced) return
    const id = window.setInterval(() => setStep((s) => (s + 1) % SEQUENCE.length), 850)
    return () => window.clearInterval(id)
  }, [reduced])

  const activeId = reduced ? null : SEQUENCE[step]

  return (
    <div>
      <div className="relative rounded-xl border border-line bg-white/[0.015] p-4">
        {/* W bus */}
        <div className="absolute inset-y-4 left-1/2 w-1.5 -translate-x-1/2 rounded-full bg-linear-to-b from-accent/50 via-accent-2/40 to-highlight/40" />
        <span className="absolute top-1 left-1/2 -translate-x-1/2 bg-bg px-1 font-mono text-[0.58rem] tracking-[0.12em] text-muted">
          W BUS
        </span>

        <div className="relative grid grid-cols-2 gap-x-10 gap-y-2.5 sm:gap-x-16">
          {[0, 1, 2, 3].map((row) =>
            [0, 1].map((col) => {
              const block = BLOCKS.find((b) => b.row === row && b.col === col)
              if (!block) return <div key={`${row}-${col}`} />
              const isActive = activeId === block.id
              return (
                <motion.div
                  key={block.id}
                  animate={{
                    borderColor: isActive ? 'rgba(34,211,238,0.7)' : 'rgba(148,163,184,0.18)',
                    backgroundColor: isActive ? 'rgba(34,211,238,0.1)' : 'rgba(255,255,255,0.02)',
                  }}
                  transition={{ duration: 0.3 }}
                  className="rounded-md border px-2.5 py-2 text-center"
                >
                  <span
                    className={
                      isActive
                        ? 'font-mono text-[0.7rem] text-accent'
                        : 'font-mono text-[0.7rem] text-muted'
                    }
                  >
                    {block.label}
                  </span>
                </motion.div>
              )
            }),
          )}
        </div>
      </div>

      <p className="mt-3 font-mono text-[0.62rem] leading-relaxed text-muted">
        SAP-1 block diagram with the fetch–execute path highlighted in sequence.
      </p>
    </div>
  )
}
