import { useReducedMotion } from 'framer-motion'
import * as m from 'framer-motion/m'
import { memo, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
}

export const ScrollReveal = memo(function ScrollReveal({
  children,
  className = '',
  delay = 0,
  y = 28,
}: Props) {
  const reduced = useReducedMotion()
  return (
    <m.div
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  )
})
