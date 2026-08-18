import { motion, useReducedMotion } from 'motion/react'

/**
 * Ensemble diagram for the phishing-page classifier: the three algorithms the
 * CV names feed a majority vote. Structure only — the reported accuracy and
 * precision are rendered on the project card, so they appear without needing to
 * expand anything.
 */

const MODELS = ['SVM', 'Logistic Regression', 'Random Forest'] as const

export function PhishingEnsemble() {
  const reduced = useReducedMotion()

  return (
    <div>
      <div className="grid items-center gap-3 sm:grid-cols-[1fr_auto_auto]">
        {/* Classifiers */}
        <ul className="space-y-2">
          {MODELS.map((model, i) => (
            <motion.li
              key={model}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.4 }}
              className="flex items-center gap-2.5 rounded-md border border-line bg-white/[0.02] px-3 py-2"
            >
              <motion.span
                aria-hidden="true"
                className="block size-1.5 shrink-0 rounded-full bg-accent"
                animate={reduced ? undefined : { opacity: [0.35, 1, 0.35] }}
                transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.5 }}
              />
              <span className="font-mono text-[0.7rem] text-ink/90">{model}</span>
            </motion.li>
          ))}
        </ul>

        {/* Vote junction */}
        <svg viewBox="0 0 60 90" className="hidden h-24 w-14 sm:block" aria-hidden="true">
          <path
            d="M2 14 C30 14 30 45 56 45 M2 45 H56 M2 76 C30 76 30 45 56 45"
            fill="none"
            stroke="rgba(148,163,184,0.4)"
            strokeWidth="1.4"
          />
          <circle cx="56" cy="45" r="3.5" fill="#22d3ee" />
        </svg>

        {/* Ensemble verdict */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.45 }}
          className="rounded-xl border border-accent/40 bg-accent/[0.06] px-4 py-3 text-center"
        >
          <p className="font-mono text-[0.6rem] tracking-[0.14em] text-muted uppercase">Ensemble</p>
          <p className="mt-1.5 text-sm font-medium text-accent">Majority vote</p>
        </motion.div>
      </div>

      <p className="mt-4 font-mono text-[0.62rem] leading-relaxed text-muted">
        Three classifiers, one majority vote — the ensemble described in the project.
      </p>
    </div>
  )
}
