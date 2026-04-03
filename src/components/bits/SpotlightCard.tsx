import { useMotionTemplate, useMotionValue } from 'framer-motion'
import * as m from 'framer-motion/m'
import {
  type MouseEvent,
  type ReactNode,
  memo,
  useCallback,
  useRef,
  useState,
} from 'react'

type Props = {
  children: ReactNode
  className?: string
}

/** Карточка с «прожектором» по курсору — паттерн из React Bits spotlight border. */
export const SpotlightCard = memo(function SpotlightCard({ children, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(-200)
  const my = useMotionValue(-200)
  const [hover, setHover] = useState(false)

  const background = useMotionTemplate`radial-gradient(420px circle at ${mx}px ${my}px, rgba(167,139,250,0.18), transparent 55%)`

  const onMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      mx.set(e.clientX - r.left)
      my.set(e.clientY - r.top)
    },
    [mx, my],
  )

  const onEnter = useCallback(() => setHover(true), [])
  const onLeaveCard = useCallback(() => setHover(false), [])

  return (
    <m.div
      ref={ref}
      className={`relative overflow-hidden rounded-2xl border border-white/8 bg-elevated/80 ${className}`}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeaveCard}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
    >
      <m.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
        style={{
          background,
          opacity: hover ? 1 : 0,
        }}
      />
      <div className="relative z-10">{children}</div>
    </m.div>
  )
})
