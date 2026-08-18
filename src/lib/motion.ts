import type { Transition, Variants } from 'motion/react'

/**
 * Shared motion vocabulary. Everything is short, low-travel and eased out —
 * spec §20 asks for subtle, professional motion, never attention-grabbing.
 *
 * Components that animate SVG geometry check `useReducedMotion()` and render a
 * static frame instead of a slowed-down one.
 */

export const easeOutSoft: Transition['ease'] = [0.22, 1, 0.36, 1]

export const springSoft: Transition = { type: 'spring', stiffness: 260, damping: 30, mass: 0.7 }

/** Viewport config used by every scroll reveal, so reveal timing is consistent. */
export const revealViewport = { once: true, amount: 0.2, margin: '0px 0px -12% 0px' } as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easeOutSoft } },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: easeOutSoft } },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: easeOutSoft } },
}

/** Parent wrapper: children animate in sequence. */
export function stagger(step = 0.07, delay = 0): Variants {
  return {
    hidden: {},
    show: { transition: { staggerChildren: step, delayChildren: delay } },
  }
}

/** Collapse/expand used by research entries and project cards. */
export const expand: Variants = {
  collapsed: { height: 0, opacity: 0 },
  open: { height: 'auto', opacity: 1 },
}

export const expandTransition: Transition = { duration: 0.42, ease: easeOutSoft }
