import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'
import type { SectionId } from '../../types'

interface SectionProps {
  id: SectionId
  /** Must match the `id` of the section's <h2>, for aria-labelledby. */
  labelledBy: string
  children: ReactNode
  className?: string
  /** Optional decorative background layer rendered behind the content. */
  backdrop?: ReactNode
}

/**
 * Semantic wrapper for every content section. Vertical rhythm lives here so the
 * page keeps one spacing scale even though each section's inner layout differs.
 */
export function Section({ id, labelledBy, children, className, backdrop }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn('relative scroll-mt-24 py-20 md:py-28', className)}
    >
      {backdrop}
      <div className="shell relative">{children}</div>
    </section>
  )
}
