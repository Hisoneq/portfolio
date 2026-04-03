import { useReducedMotion } from 'framer-motion'
import * as m from 'framer-motion/m'
import { memo } from 'react'
import mePhoto from '../../assets/me.jpeg'
import { about, social } from '../../content/site'
import { ScrollReveal } from '../motion/ScrollReveal'

export const About = memo(function About() {
  const reduced = useReducedMotion()

  return (
    <section id="about" className="scroll-mt-24 px-4 py-24 sm:px-6">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start">
        <ScrollReveal>
          <p className="text-sm font-medium uppercase tracking-widest text-violet-400">
            {about.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-white sm:text-4xl">
            {about.titleLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <div className="mt-6 space-y-4 text-[#b8b8c8]">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <m.a
              href={social.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white transition hover:border-violet-500/50"
              whileHover={reduced ? undefined : { scale: 1.03 }}
              whileTap={reduced ? undefined : { scale: 0.98 }}
            >
              GitHub
            </m.a>
            <m.a
              href={social.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white transition hover:border-violet-500/50"
              whileHover={reduced ? undefined : { scale: 1.03 }}
              whileTap={reduced ? undefined : { scale: 0.98 }}
            >
              LinkedIn
            </m.a>
          </div>
        </ScrollReveal>

        <div className="space-y-6">
          <ScrollReveal delay={0.08}>
            <div className="relative aspect-3/4 w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-elevated shadow-2xl shadow-violet-950/25 ring-1 ring-white/5 lg:ml-auto">
              <img
                src={mePhoto}
                alt={about.photoAlt}
                className="h-full w-full object-cover object-[center_20%]"
                loading="lazy"
                decoding="async"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
})
