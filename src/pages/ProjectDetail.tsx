import { useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import * as m from 'framer-motion/m'
import { memo } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { getProjectBySlug, projects } from '../content/site'
import { GridPattern } from '../components/bits/GridPattern'
import { ScrollReveal } from '../components/motion/ScrollReveal'

export const ProjectDetail = memo(function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const project = slug ? getProjectBySlug(slug) : undefined
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 })
  const glow = useTransform(scrollYProgress, [0, 0.5, 1], [0.25, 0.5, 0.2])

  if (!project) {
    return <Navigate to="/" replace />
  }

  const idx = projects.findIndex((p) => p.slug === project.slug)
  const next = projects[(idx + 1) % projects.length]
  const prev = projects[idx === 0 ? projects.length - 1 : idx - 1]

  const { casePage: c } = project

  return (
    <>
      <m.div
        className="fixed left-0 right-0 top-0 z-60 h-0.5 origin-left bg-linear-to-r from-violet-500 via-fuchsia-400 to-cyan-400"
        style={{ scaleX }}
      />

      <main>
        <section className="relative overflow-hidden px-4 pb-8 pt-24 sm:px-6 sm:pt-28">
          <GridPattern />
          <m.div
            className="pointer-events-none absolute inset-0 bg-violet-600/10 blur-[120px]"
            style={{ opacity: reduced ? 0.2 : glow }}
          />

          <div className="relative z-10 mx-auto max-w-3xl">
            <m.div
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link
                to="/#projects"
                className="inline-flex items-center gap-2 text-sm text-violet-300 transition hover:text-white"
              >
                ← Все проекты
              </Link>
              <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-muted">
                <span className="rounded-full bg-violet-500/15 px-3 py-1 text-violet-200">
                  {project.tagLabel}
                </span>
                <span>{project.year}</span>
              </div>
              <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-white sm:text-5xl">
                {project.title}
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-[#b8b8c8]">{c.lead}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg border border-white/10 bg-white/4 px-3 py-1.5 text-xs text-[#d4d4e3]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </m.div>
          </div>
        </section>

        <section className="mx-auto max-w-3xl space-y-8 px-4 pb-8 sm:px-6">
          <ScrollReveal>
            <div className="rounded-2xl border border-white/8 bg-surface p-8">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📌</span>
                <h2 className="font-display text-xl font-semibold text-white">В двух словах</h2>
              </div>
              <p className="mt-4 leading-relaxed text-[#b8b8c8]">{project.task}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.05}>
            <div className="rounded-2xl border border-white/8 bg-surface p-8">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🧭</span>
                <h2 className="font-display text-xl font-semibold text-white">Контекст</h2>
              </div>
              <p className="mt-4 leading-relaxed text-[#b8b8c8]">{c.context}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <div className="rounded-2xl border border-violet-400/15 bg-violet-500/[0.06] p-8">
              <div className="flex items-center gap-3">
                <span className="text-2xl">✓</span>
                <h2 className="font-display text-xl font-semibold text-white">Что было важно учесть</h2>
              </div>
              <ul className="mt-5 space-y-3 text-[#c8c8d8]">
                {c.highlights.map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed sm:text-base">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="rounded-2xl border border-white/8 bg-surface p-8">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🛠</span>
                <h2 className="font-display text-xl font-semibold text-white">Как делали</h2>
              </div>
              <div className="mt-5 space-y-4">
                {c.narrative.map((paragraph, i) => (
                  <p key={i} className="leading-relaxed text-[#b8b8c8]">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.12}>
            <div className="rounded-2xl border border-amber-400/20 bg-amber-500/[0.05] p-8">
              <div className="flex items-center gap-3">
                <span className="text-2xl">⚡</span>
                <h2 className="font-display text-xl font-semibold text-white">Сложности и риски</h2>
              </div>
              <p className="mt-4 leading-relaxed text-[#b8b8c8]">{c.challenges}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.14}>
            <div className="rounded-2xl border border-white/8 bg-surface p-8">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📈</span>
                <h2 className="font-display text-xl font-semibold text-white">Результат</h2>
              </div>
              <p className="mt-4 leading-relaxed text-[#b8b8c8]">{project.result}</p>
              <ul className="mt-6 space-y-3 border-t border-white/6 pt-6 text-[#c8c8d8]">
                {c.outcomes.map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed sm:text-base">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-400" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </section>

        <section className="border-t border-white/6 px-4 py-16 sm:px-6">
          <div className="mx-auto flex max-w-4xl flex-col gap-6 sm:flex-row sm:justify-between">
            <Link
              to={`/projects/${prev.slug}`}
              className="group flex flex-1 flex-col rounded-2xl border border-white/10 bg-surface p-6 transition hover:border-violet-500/40"
            >
              <span className="text-xs text-muted">Предыдущий</span>
              <span className="mt-2 font-display text-lg font-semibold text-white group-hover:text-violet-200">
                {prev.title}
              </span>
            </Link>
            <Link
              to={`/projects/${next.slug}`}
              className="group flex flex-1 flex-col rounded-2xl border border-white/10 bg-surface p-6 text-right transition hover:border-violet-500/40 sm:items-end"
            >
              <span className="text-xs text-muted">Следующий</span>
              <span className="mt-2 font-display text-lg font-semibold text-white group-hover:text-violet-200">
                {next.title}
              </span>
            </Link>
          </div>

        </section>
      </main>
    </>
  )
})
