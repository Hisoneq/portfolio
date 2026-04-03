import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from 'react'

type SectionGateProps = {
  children: ReactNode
  /** Заранее подгружаем чанк за N px до появления секции */
  rootMargin?: string
  /** Резерв высоты до монтирования — снижает сдвиг вёрстки */
  minHeight?: string
}

export function SectionGate({
  children,
  rootMargin = '280px 0px 400px 0px',
  minHeight = 'min(70vh, 36rem)',
}: SectionGateProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (active) return
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setActive(true)
          obs.disconnect()
        }
      },
      { rootMargin, threshold: 0.01 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [active, rootMargin])

  return (
    <div
      ref={ref}
      style={
        {
          contentVisibility: active ? 'visible' : 'auto',
          contain: 'content',
        } satisfies CSSProperties
      }
    >
      {active ? (
        children
      ) : (
        <div
          className="rounded-3xl bg-white/2 motion-safe:animate-pulse"
          style={{ minHeight }}
          aria-hidden
        />
      )}
    </div>
  )
}
