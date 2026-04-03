import { useReducedMotion } from 'framer-motion'
import * as m from 'framer-motion/m'
import { memo } from 'react'

type Props = { className?: string }

/** Мягкое «северное сияние» без canvas — в духе React Bits Aurora. */
export const AuroraBackground = memo(function AuroraBackground({ className = '' }: Props) {
  const reduced = useReducedMotion()

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      <div className="absolute inset-0 bg-noise opacity-40" />
      {!reduced ? (
        <>
          <m.div
            className="absolute -top-1/2 left-1/4 h-[80%] w-[55%] rounded-full bg-violet-600/25 blur-[120px]"
            animate={{ x: [0, 40, 0], y: [0, 30, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          />
          <m.div
            className="absolute -bottom-1/3 right-0 h-[70%] w-[50%] rounded-full bg-fuchsia-600/20 blur-[100px]"
            animate={{ x: [0, -30, 0], y: [0, -20, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          />
          <m.div
            className="absolute top-1/3 right-1/4 h-[40%] w-[35%] rounded-full bg-cyan-500/15 blur-[90px]"
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </>
      ) : (
        <>
          <div className="absolute -top-1/2 left-1/4 h-[80%] w-[55%] rounded-full bg-violet-600/20 blur-[120px]" />
          <div className="absolute -bottom-1/3 right-0 h-[70%] w-[50%] rounded-full bg-fuchsia-600/15 blur-[100px]" />
        </>
      )}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(167,139,250,0.15),transparent)]" />
    </div>
  )
})
