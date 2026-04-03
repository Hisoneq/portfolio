import { useReducedMotion } from 'framer-motion'
import * as m from 'framer-motion/m'
import { memo } from 'react'
import { skills } from '../../content/site'
import { ScrollReveal } from '../motion/ScrollReveal'

const marqueeItems = [
  'React',
  'TypeScript',
  'Node.js',
  'PostgreSQL',
  'Docker',
  'Tailwind',
  'GraphQL',
  'CI/CD',
]

export const Skills = memo(function Skills() {
  const reduced = useReducedMotion()

  return (
    <section id="skills" className="scroll-mt-24 px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-violet-400">
            {skills.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl">
            {skills.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[#b8b8c8]">{skills.subtitle}</p>
        </ScrollReveal>

        {!reduced ? (
          <div className="relative mt-10 overflow-hidden py-3 mask-[linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
            <m.div
              className="flex w-max gap-8 text-sm font-medium text-[#6b6b7e]"
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
            >
              {[...marqueeItems, ...marqueeItems].map((item, i) => (
                <span
                  key={`${item}-${i}`}
                  className="shrink-0 rounded-full border border-white/10 bg-white/3 px-4 py-1.5 text-[#c4c4d4]"
                >
                  {item}
                </span>
              ))}
            </m.div>
          </div>
        ) : null}

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {skills.groups.map((g, gi) => (
            <ScrollReveal key={g.title} delay={0.05 * gi}>
              <m.div
                className="h-full rounded-2xl border border-white/8 bg-surface p-6"
                whileHover={reduced ? undefined : { y: -4, borderColor: 'rgba(167,139,250,0.35)' }}
                transition={{ type: 'spring', stiffness: 400, damping: 28 }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{g.icon}</span>
                  <h3 className="font-display text-lg font-semibold text-white">
                    {g.title}
                  </h3>
                </div>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {g.items.map((item, ii) => (
                    <m.li
                      key={item}
                      initial={reduced ? false : { opacity: 0, scale: 0.92 }}
                      whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.03 * ii, duration: 0.35 }}
                    >
                      <span className="inline-block rounded-lg border border-white/10 bg-white/4 px-3 py-1.5 text-xs text-[#d4d4e3] transition hover:border-violet-500/40 hover:text-white">
                        {item}
                      </span>
                    </m.li>
                  ))}
                </ul>
              </m.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
})
