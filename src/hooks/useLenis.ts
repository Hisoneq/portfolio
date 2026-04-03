import type Lenis from 'lenis'
import { useEffect } from 'react'
import { useReducedMotion } from './useReducedMotion'

function scheduleIdle(cb: () => void) {
  if (typeof requestIdleCallback !== 'undefined') {
    const id = requestIdleCallback(cb, { timeout: 2000 })
    return () => cancelIdleCallback(id)
  }
  const t = window.setTimeout(cb, 1)
  return () => clearTimeout(t)
}

export function useLenis(enabled = true) {
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (!enabled || reducedMotion) return

    let cancelled = false
    let raf = 0
    let lenis: Lenis | null = null

    const start = async () => {
      await import('lenis/dist/lenis.css')
      const { default: LenisCtor } = await import('lenis')
      if (cancelled) return
      lenis = new LenisCtor({ duration: 1.1, smoothWheel: true })
      const loop = (time: number) => {
        lenis?.raf(time)
        raf = requestAnimationFrame(loop)
      }
      raf = requestAnimationFrame(loop)
    }

    const cancelSchedule = scheduleIdle(() => {
      void start()
    })

    return () => {
      cancelled = true
      cancelSchedule?.()
      cancelAnimationFrame(raf)
      lenis?.destroy()
    }
  }, [enabled, reducedMotion])
}
