import {
  useInView,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
} from 'framer-motion'
import * as m from 'framer-motion/m'
import { memo, useEffect, useRef, useState } from 'react'

type Props = {
  value: number
  suffix?: string
  className?: string
}

export const AnimatedCounter = memo(
  function AnimatedCounter({ value, suffix = '', className = '' }: Props) {
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
        <m.span>{display}</m.span>
        {suffix}
      </span>
    )
  },
  (a, b) => a.value === b.value && a.suffix === b.suffix && a.className === b.className,
)
