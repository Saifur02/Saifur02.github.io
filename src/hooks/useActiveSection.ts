import { useEffect, useState } from 'react'
import type { SectionId } from '../types'

/**
 * Track which section owns the viewport, for the navigation indicator.
 *
 * Uses a scroll-position read rather than raw IntersectionObserver ratios:
 * sections differ wildly in height here (the hero is one screen, Projects is
 * several), so "closest section top above the reading line" gives a far more
 * stable answer than "most visible section".
 */
export function useActiveSection(ids: SectionId[]): SectionId {
  const [active, setActive] = useState<SectionId>(ids[0])

  useEffect(() => {
    let frame = 0

    const measure = () => {
      frame = 0
      // Reading line sits a third of the way down the viewport.
      const line = window.scrollY + window.innerHeight * 0.33
      let current = ids[0]

      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        if (el.offsetTop <= line) current = id
      }

      // Bottom of the page always resolves to the last section, however short.
      const atBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 2
      if (atBottom) current = ids[ids.length - 1]

      setActive((prev) => (prev === current ? prev : current))
    }

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ids])

  return active
}
