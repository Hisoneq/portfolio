import { memo } from 'react'

type Props = { className?: string }

/** Статичные слои без бесконечных motion-циклов — меньше нагрузка на GPU/CPU. */
export const AuroraBackground = memo(function AuroraBackground({ className = '' }: Props) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      <div className="absolute inset-0 bg-noise opacity-40" />
      <div className="absolute -top-1/2 left-1/4 h-[80%] w-[55%] rounded-full bg-violet-600/20 blur-[120px]" />
      <div className="absolute -bottom-1/3 right-0 h-[70%] w-[50%] rounded-full bg-fuchsia-600/15 blur-[100px]" />
      <div className="absolute top-1/3 right-1/4 h-[40%] w-[35%] rounded-full bg-cyan-500/12 blur-[90px] opacity-70" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(167,139,250,0.15),transparent)]" />
    </div>
  )
})
