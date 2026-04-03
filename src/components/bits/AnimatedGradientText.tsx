import { memo, type ReactNode } from 'react'

type Props = { children: ReactNode; className?: string }

export const AnimatedGradientText = memo(function AnimatedGradientText({
  children,
  className = '',
}: Props) {
  return (
    <span
      className={`inline-block bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage: 'linear-gradient(105deg, #c4b5fd, #f0abfc, #67e8f9)',
      }}
    >
      {children}
    </span>
  )
})
