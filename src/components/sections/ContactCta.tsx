import { useReducedMotion } from 'framer-motion'
import * as m from 'framer-motion/m'
import { memo } from 'react'
import { contactCta } from '../../content/site'
import { AuroraBackground } from '../bits/AuroraBackground'
import { ScrollReveal } from '../motion/ScrollReveal'

export const ContactCta = memo(function ContactCta() {
  const reduced = useReducedMotion()

  return (
    <section className="relative overflow-hidden px-4 py-20 sm:px-6">
      <AuroraBackground className="opacity-60" />
      <ScrollReveal className="relative z-10 mx-auto max-w-4xl rounded-3xl border border-white/10 bg-surface/80 p-10 text-center backdrop-blur-md sm:p-14">
        <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
          {contactCta.title}
        </h2>
        <p className="mt-2 text-xl text-violet-200 sm:text-2xl">{contactCta.subtitle}</p>
        <p className="mx-auto mt-4 max-w-lg text-[#b8b8c8]">{contactCta.text}</p>
        <m.a
          href={contactCta.href}
          className="mt-8 inline-flex rounded-full bg-white px-8 py-3 text-sm font-semibold text-midnight shadow-xl transition hover:bg-violet-100"
          whileHover={reduced ? undefined : { scale: 1.04 }}
          whileTap={reduced ? undefined : { scale: 0.98 }}
        >
          {contactCta.button}
        </m.a>
      </ScrollReveal>
    </section>
  )
})
