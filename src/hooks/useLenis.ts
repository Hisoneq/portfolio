import Lenis from 'lenis'
import { useEffect } from 'react'
import { useReducedMotion } from './useReducedMotion'

import 'lenis/dist/lenis.css'

export function useLenis(enabled = true) {
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (!enabled || reducedMotion) return

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
    })

    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [enabled, reducedMotion])
}
