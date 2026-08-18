import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'

/**
 * 4-bit serial-in serial-out shift register. A single bit is clocked in and
 * walks across the four stages, which is exactly what the timing diagrams in
 * the project measured. Purely a demonstration of the topology.
 */

const STAGES = 4
const PATTERN = [1, 0, 1, 1, 0, 0] // arbitrary serial input stream

export function ShiftRegister() {
  const reduced = useReducedMotion()
  const [tick, setTick] = useState(0)

  useEffect(() => {
    if (reduced) return
    const id = window.setInterval(() => setTick((t) => t + 1), 900)
    return () => window.clearInterval(id)
  }, [reduced])

  // Contents of each flip-flop at the current clock edge.
  const bits = Array.from({ length: STAGES }, (_, i) => {
    const index = tick - i
    return index >= 0 ? PATTERN[index % PATTERN.length] : 0
  })

  return (
    <div>
      {/* The stage row is wider than a 320px card, so it scrolls inside itself
          rather than pushing the page sideways. */}
      <div className="-mx-1 flex items-center gap-2 overflow-x-auto px-1 pb-6 sm:gap-3">
        <span className="font-mono text-[0.62rem] tracking-wide text-muted">SIN</span>
        <span aria-hidden="true" className="h-px w-3 bg-line-strong sm:w-4" />

        {bits.map((bit, i) => (
          <div key={i} className="flex items-center gap-2 sm:gap-3">
            <div className="relative">
              <div
                className={
                  bit
                    ? 'grid size-9 place-items-center rounded-md border border-accent/60 bg-accent/15 font-mono text-sm text-accent transition-colors duration-300 sm:size-11'
                    : 'grid size-9 place-items-center rounded-md border border-line bg-white/[0.02] font-mono text-sm text-muted transition-colors duration-300 sm:size-11'
                }
              >
                {bit}
              </div>
              <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 font-mono text-[0.58rem] text-muted">
                Q{i}
              </span>
            </div>
            {i < STAGES - 1 ? <span aria-hidden="true" className="h-px w-3 bg-line-strong sm:w-4" /> : null}
          </div>
        ))}

        <span aria-hidden="true" className="h-px w-3 bg-line-strong sm:w-4" />
        <span className="font-mono text-[0.62rem] tracking-wide text-muted">SOUT</span>
      </div>

      {/* Clock waveform */}
      <svg viewBox="0 0 300 34" className="mt-3 w-full" role="img" aria-label="Square-wave clock signal driving the register">
        <text x="0" y="22" className="fill-muted font-mono" fontSize="8">
          CLK
        </text>
        <motion.path
          d="M24 26 h14 v-16 h14 v16 h14 v-16 h14 v16 h14 v-16 h14 v16 h14 v-16 h14 v16 h14 v-16 h14 v16 h14 v-16 h14 v16 h14"
          fill="none"
          stroke="#22d3ee"
          strokeWidth="1.6"
          strokeOpacity="0.8"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
        />
      </svg>

      <p className="mt-2 font-mono text-[0.62rem] leading-relaxed text-muted">
        Serial input clocked through four stages — the topology built with transmission gate, pass
        transistor and NAND implementations.
      </p>
    </div>
  )
}
