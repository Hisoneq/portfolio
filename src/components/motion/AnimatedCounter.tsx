import {
  motion,
  useInView,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
} from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

type Props = {
  value: number
  suffix?: string
  className?: string
}

export function AnimatedCounter({ value, suffix = '', className = '' }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-20px' })
  const reduced = useReducedMotion()
  const spring = useSpring(0, { stiffness: 90, damping: 28 })
  const [display, setDisplay] = useState(0)

  useMotionValueEvent(spring, 'change', (v) => setDisplay(Math.round(v)))

  useEffect(() => {
    if (reduced) {
      spring.set(value)
      return
    }
    if (inView) spring.set(value)
  }, [inView, value, spring, reduced])

  return (
    <span ref={ref} className={className}>
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  )
}
