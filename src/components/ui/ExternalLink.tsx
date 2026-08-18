import type { ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '../../lib/cn'

interface ExternalLinkProps {
  href: string
  children: ReactNode
  className?: string
  /** Visible label suffix for screen readers, e.g. "(opens in a new tab)". */
  srSuffix?: string
}

/** Outbound link with a consistent indicator and safe rel attributes. */
export function ExternalLink({
  href,
  children,
  className,
  srSuffix = 'opens in a new tab',
}: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'group inline-flex items-center gap-1.5 text-accent transition-colors hover:text-ink',
        className,
      )}
    >
      {children}
      <ArrowUpRight
        aria-hidden="true"
        className="size-3.5 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
      <span className="sr-only"> ({srSuffix})</span>
    </a>
  )
}
