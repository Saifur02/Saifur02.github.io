import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Copy text and report a short-lived "copied" state. Falls back to a hidden
 * textarea + execCommand where the async clipboard API is unavailable (older
 * Safari, or any non-secure context).
 */
export function useCopyToClipboard(resetAfter = 2000) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | null>(null)

  useEffect(
    () => () => {
      if (timer.current) window.clearTimeout(timer.current)
    },
    [],
  )

  const copy = useCallback(
    async (text: string) => {
      let ok = false

      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(text)
          ok = true
        } else {
          const area = document.createElement('textarea')
          area.value = text
          area.setAttribute('readonly', '')
          area.style.position = 'fixed'
          area.style.opacity = '0'
          document.body.appendChild(area)
          area.select()
          ok = document.execCommand('copy')
          document.body.removeChild(area)
        }
      } catch {
        ok = false
      }

      if (ok) {
        setCopied(true)
        if (timer.current) window.clearTimeout(timer.current)
        timer.current = window.setTimeout(() => setCopied(false), resetAfter)
      }

      return ok
    },
    [resetAfter],
  )

  return { copied, copy }
}
