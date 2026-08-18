import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { fadeUp, revealViewport } from '../../lib/motion'
import { cn } from '../../lib/cn'

interface SectionHeaderProps {
  /** Two-digit section index, e.g. "03". */
  index: string
  /** DOM id for the heading — the parent Section references it. */
  headingId: string
  title: string
  /** Short line under the title. */
  lede?: ReactNode
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeader({
  index,
  headingId,
  title,
  lede,
  align = 'left',
  className,
}: SectionHeaderProps) {
  return (
    <motion.header
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={revealViewport}
      className={cn('mb-12 md:mb-16', align === 'center' && 'text-center', className)}
    >
      <div
        className={cn(
          'flex items-center gap-3',
          align === 'center' && 'justify-center',
        )}
      >
        <span className="gradient-text font-mono text-sm font-medium tracking-[0.2em]">{index}</span>
        <span
          aria-hidden="true"
          className="h-px w-10 bg-linear-to-r from-accent/70 to-transparent"
        />
      </div>

      <h2
        id={headingId}
        className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl md:text-[2.75rem] md:leading-[1.1]"
      >
        {title}
      </h2>

      {lede ? (
        <p
          className={cn(
            'mt-4 max-w-2xl text-[0.975rem] leading-relaxed text-muted',
            align === 'center' && 'mx-auto',
          )}
        >
          {lede}
        </p>
      ) : null}
    </motion.header>
  )
}
