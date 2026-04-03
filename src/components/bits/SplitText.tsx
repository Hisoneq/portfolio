import { useReducedMotion } from 'framer-motion'
import * as m from 'framer-motion/m'
import { memo, useMemo } from 'react'

type Props = {
  text: string
  className?: string
  delay?: number
  as?: 'span' | 'p' | 'div'
}

/**
 * Стилизованный сплит по словам в духе React Bits (motion stagger).
 */
export const SplitText = memo(function SplitText({
  text,
  className = '',
  delay = 0,
  as: Tag = 'span',
}: Props) {
  const prefersReduced = useReducedMotion()
  const words = useMemo(() => text.split(' '), [text])

  if (prefersReduced) {
    return <Tag className={className}>{text}</Tag>
  }

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden">
          <m.span
            className="inline-block"
            initial={{ y: '100%', opacity: 0, rotate: 4 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            transition={{
              duration: 0.55,
              delay: delay + i * 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
            {i < words.length - 1 ? '\u00A0' : null}
          </m.span>
        </span>
      ))}
    </Tag>
  )
})
