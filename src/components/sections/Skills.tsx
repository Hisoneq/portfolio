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

        <div className="relative mt-10 flex flex-wrap justify-center gap-3 py-3">
          {marqueeItems.map((item) => (
            <span
              key={item}
              className="shrink-0 rounded-full border border-white/10 bg-white/3 px-4 py-1.5 text-sm font-medium text-[#c4c4d4]"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {skills.groups.map((g) => (
            <ScrollReveal key={g.title}>
              <div className="h-full rounded-2xl border border-white/8 bg-surface p-6 transition hover:-translate-y-1 hover:border-violet-500/35">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{g.icon}</span>
                  <h3 className="font-display text-lg font-semibold text-white">{g.title}</h3>
                </div>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {g.items.map((item) => (
                    <li key={item}>
                      <span className="inline-block rounded-lg border border-white/10 bg-white/4 px-3 py-1.5 text-xs text-[#d4d4e3] transition hover:border-violet-500/40 hover:text-white">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
})
