import { memo } from 'react'
import { AuroraBackground } from '../bits/AuroraBackground'
import { GridPattern } from '../bits/GridPattern'
import { hero, stats } from '../../content/site'

const floatTags = ['Design', 'Build', 'Ship', 'Scale']

export const Hero = memo(function Hero() {
  const [line1, line2] = hero.titleLines

  return (
    <section className="relative min-h-[100svh] overflow-hidden px-4 pb-28 pt-24 sm:px-6 sm:pt-28 md:pt-32">
      <AuroraBackground />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(520px_circle_at_50%_42%,rgba(167,139,250,0.14),transparent_52%)]"
        aria-hidden
      />

      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <GridPattern />
      </div>

      <div className="pointer-events-none absolute -right-32 top-[18%] h-[420px] w-[420px] rounded-full border border-violet-400/15" aria-hidden />
      <div
        className="pointer-events-none absolute -right-24 top-[22%] h-[340px] w-[340px] rounded-full border border-dashed border-fuchsia-400/20"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-16 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <div className="max-w-2xl lg:max-w-[52%]">
          <h1 className="font-display text-[clamp(2.25rem,5vw,3.75rem)] font-semibold leading-[1.03] tracking-tight">
            <span className="block text-white">{line1}</span>
            <span className="mt-1 block bg-linear-to-r from-violet-300 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent sm:mt-2">
              {line2}
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-[#b8b8c8] sm:text-xl">{hero.subtitle}</p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={hero.ctaPrimaryHref}
              className="group/cta relative overflow-hidden rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-midnight shadow-xl transition hover:-translate-y-0.5"
            >
              <span className="relative z-10">{hero.ctaPrimary}</span>
            </a>
            <a
              href={hero.ctaSecondaryHref}
              className="rounded-full border border-white/20 bg-white/[0.06] px-7 py-3.5 text-sm font-medium text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-violet-400/40"
            >
              {hero.ctaSecondary}
            </a>
          </div>

          <div className="mt-9 flex flex-wrap gap-2">
            {floatTags.map((tag) => (
              <span
                key={tag}
                className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-muted transition hover:text-[#e8e8ef]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="relative w-full lg:w-[min(100%,440px)] lg:shrink-0">
          <div className="relative grid h-[min(340px,58svh)] grid-cols-6 grid-rows-2 gap-3 sm:h-[360px]">
            <div className="relative col-span-4 row-span-2 overflow-hidden rounded-3xl border border-white/10 bg-elevated/65 p-6 shadow-2xl shadow-violet-950/20 backdrop-blur-xl transition hover:-translate-y-1">
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-violet-500/20 blur-3xl" aria-hidden />
              <p className="text-xs font-medium uppercase tracking-widest text-violet-300/90">
                {stats[0]?.label}
              </p>
              <div className="mt-4 font-display text-5xl font-bold tabular-nums text-white sm:text-6xl">
                {stats[0]?.value ?? 0}
                {stats[0]?.suffix ?? ''}
              </div>
              <div className="mt-5 flex gap-1">
                {[0, 1, 2, 3].map((i) => (
                  <span key={i} className="h-1 flex-1 rounded-full bg-white/10">
                    <span className="block h-full rounded-full bg-linear-to-r from-violet-500 to-cyan-400 opacity-90" />
                  </span>
                ))}
              </div>
            </div>

            {[1, 2].map((idx) => {
              const s = stats[idx]
              if (!s) return null
              return (
                <div
                  key={s.label}
                  className="col-span-2 row-span-1 flex flex-col justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-md transition hover:scale-[1.02]"
                >
                  <div className="font-display text-2xl font-bold text-white tabular-nums">
                    {s.value}
                    {s.suffix}
                  </div>
                  <div className="mt-1 text-[10px] font-medium uppercase tracking-wider text-muted">
                    {s.label}
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-4 flex items-center justify-center gap-3 rounded-2xl border border-violet-400/15 bg-violet-500/[0.07] px-4 py-3 backdrop-blur-sm">
            <span className="h-2 w-2 shrink-0 rounded-full bg-teal-400" aria-hidden />
            <span className="text-xs text-[#c8c8d8]">Поток: прототип → прод → метрики</span>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-20 flex max-w-6xl justify-center lg:justify-start">
        <a
          href="#about"
          className="group flex flex-col items-center gap-2 text-xs text-[#6b6b7e] transition hover:text-violet-300"
        />
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-midnight via-midnight/80 to-transparent" />
    </section>
  )
})
