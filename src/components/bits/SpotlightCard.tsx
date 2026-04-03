import { type ReactNode, memo } from 'react'

type Props = {
  children: ReactNode
  className?: string
}

/** Карточка без spotlight-трека по курсору — дешевле по CPU/GPU. */
export const SpotlightCard = memo(function SpotlightCard({ children, className = '' }: Props) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-white/8 bg-elevated/80 transition hover:-translate-y-1 ${className}`}
    >
      <div className="relative z-10">{children}</div>
    </div>
  )
})
