import { type MouseEvent, memo, useCallback, useState } from 'react'
import { testimonials } from '../../content/site'
import { ScrollReveal } from '../motion/ScrollReveal'

export const Testimonials = memo(function Testimonials() {
  const [active, setActive] = useState(0)
  const t = testimonials.items[active]

  const onDotClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    const i = Number(e.currentTarget.dataset.index)
    if (!Number.isNaN(i)) setActive(i)
  }, [])

  return (
    <section id="testimonials" className="scroll-mt-24 px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-violet-400">
            {testimonials.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl">
            {testimonials.title}
          </h2>
        </ScrollReveal>

        <ScrollReveal className="mt-12">
          <div className="mx-auto max-w-3xl rounded-3xl border border-white/8 bg-linear-to-br from-elevated to-surface p-8 sm:p-12">
            <div className="flex gap-1 text-amber-300">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i}>★</span>
              ))}
            </div>

            <blockquote
              key={t.quote}
              className="mt-6 text-lg leading-relaxed text-fg sm:text-xl"
            >
              {t.quote}
            </blockquote>

            <div className="mt-8 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-500/25 text-sm font-bold text-violet-200">
                {t.initials}
              </div>
              <div>
                <div className="font-semibold text-white">{t.name}</div>
                <div className="text-sm text-muted">{t.role}</div>
              </div>
            </div>

            <div className="mt-8 flex justify-center gap-2">
              {testimonials.items.map((_, i) => (
                <button
                  key={String(i)}
                  type="button"
                  data-index={i}
                  aria-label={`Отзыв ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    i === active ? 'w-8 bg-violet-400' : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                  onClick={onDotClick}
                />
              ))}
            </div>
            <p className="mt-4 text-center text-[10px] text-[#6b6b7e]">
              Листайте точками ниже
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
})
