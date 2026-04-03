import { memo, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
}

/** Обычная обёртка без whileInView — меньше подписок и анимаций при скролле. */
export const ScrollReveal = memo(function ScrollReveal({
  children,
  className = '',
}: Props) {
  return <div className={className}>{children}</div>
})
