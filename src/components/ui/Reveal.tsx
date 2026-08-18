import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { fadeUp, revealViewport, stagger } from '../../lib/motion'
import { cn } from '../../lib/cn'

interface RevealProps {
  children: ReactNode
  className?: string
  /** Delay before this element starts, in seconds. */
  delay?: number
  as?: 'div' | 'li' | 'article' | 'section' | 'header' | 'figure'
}

/** Single element that fades up once it scrolls into view. */
export function Reveal({ children, className, delay = 0, as = 'div' }: RevealProps) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={revealViewport}
      transition={{ delay }}
    >
      {children}
    </Tag>
  )
}

interface RevealGroupProps {
  children: ReactNode
  className?: string
  step?: number
  delay?: number
  as?: 'div' | 'ul' | 'ol' | 'dl'
}

/**
 * Parent for staggered reveals. Children should be `motion` elements using the
 * `fadeUp` variant with no `initial`/`whileInView` of their own — the group
 * drives them.
 */
export function RevealGroup({
  children,
  className,
  step = 0.07,
  delay = 0,
  as = 'div',
}: RevealGroupProps) {
  const Tag = motion[as]
  return (
    <Tag
      className={cn(className)}
      variants={stagger(step, delay)}
      initial="hidden"
      whileInView="show"
      viewport={revealViewport}
    >
      {children}
    </Tag>
  )
}
