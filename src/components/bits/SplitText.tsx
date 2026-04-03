import { memo } from 'react'

type Props = {
  text: string
  className?: string
  delay?: number
  as?: 'span' | 'p' | 'div'
}

export const SplitText = memo(function SplitText({
  text,
  className = '',
  as: Tag = 'span',
}: Props) {
  return <Tag className={className}>{text}</Tag>
})
