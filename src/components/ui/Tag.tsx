import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

interface TagProps {
  children: ReactNode
  tone?: 'default' | 'accent' | 'violet' | 'quiet'
  className?: string
  mono?: boolean
}

const tones: Record<NonNullable<TagProps['tone']>, string> = {
  default: 'border-line text-ink/85 bg-white/[0.03]',
  accent: 'border-accent/35 text-accent bg-accent/[0.07]',
  violet: 'border-highlight/35 text-highlight bg-highlight/[0.07]',
  quiet: 'border-line text-muted bg-transparent',
}

/** Small metadata chip — tools, courses, concepts, skill names. */
export function Tag({ children, tone = 'default', className, mono = false }: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-1 text-xs leading-none whitespace-nowrap',
        mono && 'font-mono tracking-tight',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
