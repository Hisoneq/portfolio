import type Lenis from 'lenis'
import { useEffect, useSyncExternalStore } from 'react'
import { useReducedMotion } from './useReducedMotion'

function subscribeLenisViewport(cb: () => void) {
  const mq1 = window.matchMedia('(pointer: coarse)')
  const mq2 = window.matchMedia('(max-width: 768px)')
  mq1.addEventListener('change', cb)
  mq2.addEventListener('change', cb)
  return () => {
    mq1.removeEventListener('change', cb)
    mq2.removeEventListener('change', cb)
  }
}

function getLenisViewportSkip() {
  if (typeof window === 'undefined') return true
  return (
    window.matchMedia('(pointer: coarse)').matches ||
    window.matchMedia('(max-width: 768px)').matches
  )
}

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
  const skipMobileLayout = useSyncExternalStore(
    subscribeLenisViewport,
    getLenisViewportSkip,
    () => true,
  )

  useEffect(() => {
    if (!enabled || reducedMotion || skipMobileLayout) return

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
  }, [enabled, reducedMotion, skipMobileLayout])
}
