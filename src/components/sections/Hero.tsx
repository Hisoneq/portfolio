import {
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion'
import * as m from 'framer-motion/m'
import { memo, useCallback } from 'react'
import { AnimatedGradientText } from '../bits/AnimatedGradientText'
import { AuroraBackground } from '../bits/AuroraBackground'
import { GridPattern } from '../bits/GridPattern'
import { SplitText } from '../bits/SplitText'
import { AnimatedCounter } from '../motion/AnimatedCounter'
import { hero, stats } from '../../content/site'

const floatTags = ['Design', 'Build', 'Ship', 'Scale']

const glowSpring = { stiffness: 58, damping: 30, mass: 0.85 }

export const Hero = memo(function Hero() {
  const reduced = useReducedMotion()
  const glowTargetX = useMotionValue(50)
  const glowTargetY = useMotionValue(42)
  const glowX = useSpring(glowTargetX, glowSpring)
  const glowY = useSpring(glowTargetY, glowSpring)
  const glowBackground = useMotionTemplate`radial-gradient(520px circle at ${glowX}% ${glowY}%, rgba(167,139,250,0.2), transparent 52%)`

  const parallaxX = useMotionValue(0)
  const parallaxY = useMotionValue(0)
  const px = useSpring(parallaxX, { stiffness: 28, damping: 22 })
  const py = useSpring(parallaxY, { stiffness: 28, damping: 22 })

  const onHeroMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (reduced) return
      const r = e.currentTarget.getBoundingClientRect()
      glowTargetX.set(((e.clientX - r.left) / r.width) * 100)
      glowTargetY.set(((e.clientY - r.top) / r.height) * 100)
      parallaxX.set(((e.clientX - r.left) / r.width - 0.5) * 22)
      parallaxY.set(((e.clientY - r.top) / r.height - 0.5) * 16)
    },
    [reduced, glowTargetX, glowTargetY, parallaxX, parallaxY],
  )

  const onHeroLeave = useCallback(() => {
    glowTargetX.set(50)
    glowTargetY.set(42)
    parallaxX.set(0)
    parallaxY.set(0)
  }, [glowTargetX, glowTargetY, parallaxX, parallaxY])

  const [line1, line2] = hero.titleLines

  return (
    <section
      className="relative min-h-[100svh] overflow-hidden px-4 pb-28 pt-24 sm:px-6 sm:pt-28 md:pt-32"
      onMouseMove={onHeroMove}
      onMouseLeave={onHeroLeave}
    >
      <AuroraBackground />
      {!reduced ? (
        <m.div
          className="pointer-events-none absolute inset-0"
          style={{ background: glowBackground }}
          aria-hidden
        />
      ) : null}

      <m.div
        className="pointer-events-none absolute inset-0"
        style={reduced ? undefined : { x: px, y: py }}
        aria-hidden
      >
        <GridPattern />
      </m.div>

      {!reduced ? (
        <>
          <div
            className="pointer-events-none absolute -right-32 top-[18%] h-[420px] w-[420px] rounded-full border border-violet-400/15"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-24 top-[22%] h-[340px] w-[340px] rounded-full border border-dashed border-fuchsia-400/20"
            aria-hidden
          />
        </>
      ) : null}

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-16 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <div className="max-w-2xl lg:max-w-[52%]">

          <h1 className="font-display text-[clamp(2.25rem,5vw,3.75rem)] font-semibold leading-[1.03] tracking-tight">
            <span className="block text-white">
              <SplitText text={line1} delay={0.12} />
            </span>
            <span className="mt-1 block sm:mt-2">
              <m.span
                initial={reduced ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.55 }}
                className="inline-block"
              >
                <AnimatedGradientText className="font-semibold">
                  {line2}
                </AnimatedGradientText>
              </m.span>
            </span>
          </h1>

          <m.p
            className="mt-7 max-w-xl text-lg leading-relaxed text-[#b8b8c8] sm:text-xl"
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.55 }}
          >
            {hero.subtitle}
          </m.p>

          <m.div
            className="mt-10 flex flex-wrap gap-3"
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.45 }}
          >
            <m.a
              href={hero.ctaPrimaryHref}
              className="group/cta relative overflow-hidden rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-midnight shadow-xl"
              whileHover={reduced ? undefined : { y: -2 }}
              whileTap={reduced ? undefined : { scale: 0.98 }}
            >
              {!reduced ? (
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-violet-400/25 transition-transform duration-500 ease-out group-hover/cta:translate-x-0" />
              ) : null}
              <span className="relative z-10">{hero.ctaPrimary}</span>
            </m.a>
            <m.a
              href={hero.ctaSecondaryHref}
              className="rounded-full border border-white/20 bg-white/[0.06] px-7 py-3.5 text-sm font-medium text-white backdrop-blur-sm"
              whileHover={reduced ? undefined : { y: -2, borderColor: 'rgba(167,139,250,0.45)' }}
              whileTap={reduced ? undefined : { scale: 0.98 }}
            >
              {hero.ctaSecondary}
            </m.a>
          </m.div>

          <m.div
            className="mt-9 flex flex-wrap gap-2"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85 }}
          >
            {floatTags.map((tag, i) => (
              <m.span
                key={tag}
                className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-muted"
                initial={reduced ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.06 }}
                whileHover={reduced ? undefined : { y: -2, color: '#e8e8ef' }}
              >
                {tag}
              </m.span>
            ))}
          </m.div>
        </div>

        <div className="relative w-full lg:w-[min(100%,440px)] lg:shrink-0">
          <m.div
            className="relative grid h-[min(340px,58svh)] grid-cols-6 grid-rows-2 gap-3 sm:h-[360px]"
            initial={reduced ? false : { opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <m.div
              className="relative col-span-4 row-span-2 overflow-hidden rounded-3xl border border-white/10 bg-elevated/65 p-6 shadow-2xl shadow-violet-950/20 backdrop-blur-xl"
              whileHover={reduced ? undefined : { y: -4 }}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            >
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-violet-500/20 blur-3xl" aria-hidden />
              <p className="text-xs font-medium uppercase tracking-widest text-violet-300/90">
                {stats[0]?.label}
              </p>
              <div className="mt-4 font-display text-5xl font-bold tabular-nums text-white sm:text-6xl">
                <AnimatedCounter value={stats[0]?.value ?? 0} suffix={stats[0]?.suffix ?? ''} />
              </div>
              <div className="mt-5 flex gap-1">
                {[0, 1, 2, 3].map((i) => (
                  <m.span
                    key={i}
                    className="h-1 flex-1 rounded-full bg-white/10"
                    initial={reduced ? false : { scaleX: 0.3 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.9 + i * 0.08, duration: 0.4 }}
                  >
                    <span className="block h-full rounded-full bg-linear-to-r from-violet-500 to-cyan-400 opacity-90" />
                  </m.span>
                ))}
              </div>
            </m.div>

            {[1, 2].map((idx) => {
              const s = stats[idx]
              if (!s) return null
              return (
                <m.div
                  key={s.label}
                  className="col-span-2 row-span-1 flex flex-col justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-md"
                  whileHover={reduced ? undefined : { scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 420, damping: 25 }}
                >
                  <div className="font-display text-2xl font-bold text-white tabular-nums">
                    <AnimatedCounter value={s.value} suffix={s.suffix} />
                  </div>
                  <div className="mt-1 text-[10px] font-medium uppercase tracking-wider text-muted">
                    {s.label}
                  </div>
                </m.div>
              )
            })}
          </m.div>

          <m.div
            className="mt-4 flex items-center justify-center gap-3 rounded-2xl border border-violet-400/15 bg-violet-500/[0.07] px-4 py-3 backdrop-blur-sm"
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.45 }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400/70" />
              <span className="relative h-2 w-2 rounded-full bg-teal-400" />
            </span>
            <span className="text-xs text-[#c8c8d8]">Поток: прототип → прод → метрики</span>
          </m.div>
        </div>
      </div>

      <m.div
        className="relative z-10 mx-auto mt-20 flex max-w-6xl justify-center lg:justify-start"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.5 }}
      >
        <a
          href="#about"
          className="group flex flex-col items-center gap-2 text-xs text-[#6b6b7e] transition hover:text-violet-300"
        >
        </a>
      </m.div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-midnight via-midnight/80 to-transparent" />
    </section>
  )
})
