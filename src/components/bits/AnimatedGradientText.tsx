import { useReducedMotion } from 'framer-motion'
import { memo, type ReactNode } from 'react'

type Props = { children: ReactNode; className?: string }

/** «Живой» градиент по тексту — движение без тяжёлого canvas. */
export const AnimatedGradientText = memo(function AnimatedGradientText({
  children,
  className = '',
}: Props) {
  const reduced = useReducedMotion()

  return (
    <span
      className={`inline-block bg-clip-text text-transparent ${className}`}
      style={
        reduced
          ? {
              backgroundImage:
                'linear-gradient(105deg, #c4b5fd, #f0abfc, #67e8f9)',
            }
          : {
              backgroundImage:
                'linear-gradient(90deg, #c4b5fd, #e879f9, #22d3ee, #e879f9, #c4b5fd)',
              backgroundSize: '200% auto',
              animation: 'gradient-flow 5.5s ease infinite',
            }
      }
    >
      {children}
    </span>
  )
})
