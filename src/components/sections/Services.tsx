import { memo } from 'react'
import { services } from '../../content/site'
import { ScrollReveal } from '../motion/ScrollReveal'

export const Services = memo(function Services() {
  return (
    <section id="services" className="scroll-mt-24 px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-violet-400">{services.eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl">
            {services.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[#b8b8c8]">{services.subtitle}</p>
        </ScrollReveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {services.items.map((item) => (
            <ScrollReveal key={item.title}>
              <div className="h-full rounded-2xl border border-white/8 bg-surface p-8 transition hover:-translate-y-1.5">
                <span className="text-3xl">{item.icon}</span>
                <h3 className="mt-4 font-display text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm text-[#9a9aad]">{item.text}</p>
                <ul className="mt-6 space-y-2 border-t border-white/6 pt-6">
                  {item.bullets.map((b) => (
                    <li key={b} className="flex gap-2 text-sm text-[#c4c4d4]">
                      <span className="text-violet-400">◆</span>
                      {b}
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
