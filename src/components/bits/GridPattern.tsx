import { memo } from 'react'

type Props = { className?: string }

/** Лёгкая сетка на фоне — аналог DotGrid / Grid из каталогов эффектов. */
export const GridPattern = memo(function GridPattern({ className = '' }: Props) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 ${className}`}
      aria-hidden
      style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '64px 64px',
        maskImage:
          'radial-gradient(ellipse 70% 60% at 50% 40%, black 20%, transparent 70%)',
      }}
    />
  )
})
