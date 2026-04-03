import { useMotionValue, useSpring } from 'framer-motion'
import * as m from 'framer-motion/m'
import { type MouseEvent, type ReactNode, memo, useCallback, useRef } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

type Props = { children: ReactNode; className?: string; strength?: number }

export const Magnetic = memo(function Magnetic({
  children,
  className = '',
  strength = 0.35,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.12 })
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.12 })

  const onMove = useCallback(
    (e: MouseEvent) => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      x.set((e.clientX - cx) * strength)
      y.set((e.clientY - cy) * strength)
    },
    [x, y, strength],
  )

  const onLeave = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <m.div
      ref={ref}
      className={className}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </m.div>
  )
})
