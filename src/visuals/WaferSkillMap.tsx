import { motion } from 'motion/react'
import type { SkillCategory } from '../types'

interface WaferSkillMapProps {
  categories: SkillCategory[]
  activeCategory: string | null
  onHoverCategory: (name: string | null) => void
}

const GRID = 7 // 7 × 7 candidate die sites
const DIE = 12
const GAP = 1.6
const SPAN = GRID * (DIE + GAP)
const CENTER = SPAN / 2
const WAFER_R = CENTER - 1

// Four hues that stay distinguishable from each other at die size.
const COLORS: Record<number, string> = {
  0: '#22d3ee',
  1: '#6366f1',
  2: '#a78bfa',
  3: '#34d399',
}

/**
 * Skills drawn as a wafer map: every tool is one die, grouped into four
 * category regions with the scribe grid and notch of a real wafer. Hovering a
 * category lights its dies.
 *
 * The map encodes *membership only* — die size and position carry no ranking,
 * because the CV states no proficiency levels.
 */
export function WaferSkillMap({ categories, activeCategory, onHoverCategory }: WaferSkillMapProps) {
  // Candidate die sites that fall inside the wafer, ordered top-left → bottom-right.
  const sites: { x: number; y: number }[] = []
  for (let row = 0; row < GRID; row += 1) {
    for (let col = 0; col < GRID; col += 1) {
      const x = col * (DIE + GAP) + GAP / 2
      const y = row * (DIE + GAP) + GAP / 2
      const cx = x + DIE / 2
      const cy = y + DIE / 2
      const dist = Math.hypot(cx - CENTER, cy - CENTER)
      if (dist + DIE * 0.52 <= WAFER_R) sites.push({ x, y })
    }
  }

  // Lay the categories out in CV order across the available sites.
  const dies: { key: string; label: string; category: string; catIndex: number; x: number; y: number }[] = []
  let cursor = 0
  categories.forEach((category, catIndex) => {
    category.items.forEach((item) => {
      const site = sites[cursor % sites.length]
      cursor += 1
      dies.push({
        key: `${category.name}-${item}`,
        label: item,
        category: category.name,
        catIndex,
        ...site,
      })
    })
  })

  return (
    <div className="mx-auto w-full max-w-[26rem]">
      <svg
        viewBox={`-4 -4 ${SPAN + 8} ${SPAN + 14}`}
        className="w-full"
        role="img"
        aria-label={`Wafer map of ${dies.length} tools and languages, grouped into ${categories.length} categories. The same information is listed beside the figure.`}
      >
        {/* Wafer edge and notch */}
        <circle cx={CENTER} cy={CENTER} r={WAFER_R} fill="rgba(15,23,42,0.55)" stroke="rgba(148,163,184,0.35)" />
        <circle cx={CENTER} cy={CENTER} r={WAFER_R - 3} fill="none" stroke="rgba(148,163,184,0.14)" strokeDasharray="2 4" />
        <path
          d={`M${CENTER - 6} ${CENTER + WAFER_R - 0.5} a6 6 0 0 0 12 0`}
          fill="#050816"
          stroke="rgba(148,163,184,0.35)"
        />

        {dies.map((die, i) => {
          const dim = activeCategory !== null && activeCategory !== die.category
          const lit = activeCategory === die.category
          const color = COLORS[die.catIndex] ?? '#22d3ee'
          return (
            <motion.g
              key={die.key}
              onMouseEnter={() => onHoverCategory(die.category)}
              onMouseLeave={() => onHoverCategory(null)}
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: i * 0.02, duration: 0.35 }}
              style={{ transformOrigin: `${die.x + DIE / 2}px ${die.y + DIE / 2}px` }}
            >
              <motion.rect
                x={die.x}
                y={die.y}
                width={DIE}
                height={DIE}
                rx={1.5}
                animate={{
                  fill: color,
                  fillOpacity: lit ? 0.42 : dim ? 0.06 : 0.16,
                  stroke: color,
                  strokeOpacity: lit ? 0.95 : dim ? 0.18 : 0.5,
                }}
                transition={{ duration: 0.3 }}
                strokeWidth={0.7}
              />
              <title>{`${die.label} — ${die.category}`}</title>
            </motion.g>
          )
        })}

        <text
          x={CENTER}
          y={SPAN + 8}
          textAnchor="middle"
          className="fill-muted font-mono"
          fontSize="3.2"
          letterSpacing="0.9"
        >
          {dies.length} DIES · {categories.length} REGIONS
        </text>
      </svg>
    </div>
  )
}
