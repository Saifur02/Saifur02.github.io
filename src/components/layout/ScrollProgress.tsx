import { motion, useScroll, useSpring } from 'motion/react'

/** Hairline reading-progress bar pinned to the top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 })

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-60 h-0.5 origin-left bg-linear-to-r from-accent via-accent-2 to-highlight"
    />
  )
}
