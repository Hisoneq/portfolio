import { type MouseEvent, memo, useCallback, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import type { ProjectTag } from '../../content/site'
import { projectFilters, projects } from '../../content/site'
import { ScrollReveal } from '../motion/ScrollReveal'

export const Projects = memo(function Projects() {
  const [filter, setFilter] = useState<ProjectTag | 'all'>('all')

  const filtered = useMemo(() => {
    if (filter === 'all') return projects
    return projects.filter((p) => p.tag === filter)
  }, [filter])

  const onFilterClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.dataset.filter as ProjectTag | 'all'
    setFilter(id)
  }, [])

  return (
    <section id="projects" className="scroll-mt-24 px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal className="flex flex-col gap-4 text-center sm:text-left">
          <p className="text-sm font-medium uppercase tracking-widest text-violet-400">Кейсы</p>
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
                Избранные проекты
              </h2>
              <p className="mt-3 max-w-xl text-[#b8b8c8]">Реальные задачи — реальные результаты</p>
            </div>

            <div className="flex flex-wrap justify-center gap-2 sm:justify-end">
              {projectFilters.map((f) => {
                const active = filter === f.id
                return (
                  <button
                    key={f.id}
                    type="button"
                    data-filter={f.id}
                    onClick={onFilterClick}
                    className={`relative rounded-full px-4 py-2 text-xs font-medium transition-colors ${
                      active
                        ? 'bg-violet-500/25 text-white ring-1 ring-violet-400/40'
                        : 'text-muted hover:text-white'
                    }`}
                  >
                    {f.label}
                  </button>
                )
              })}
            </div>
          </div>
        </ScrollReveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {filtered.map((project, index) => (
            <article
              key={project.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-surface"
            >
              <Link
                to={`/projects/${project.slug}`}
                className="block flex-1 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-violet-500"
              >
                <div
                  className={`relative h-44 overflow-hidden bg-linear-to-br ${project.coverGradient} transition duration-500 group-hover:scale-[1.03]`}
                >
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(7,7,12,0.85))]" />
                  <span className="absolute left-4 top-4 rounded-full bg-black/40 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
                    <span className="rounded-md bg-violet-500/15 px-2 py-0.5 text-violet-200">
                      {project.tagLabel}
                    </span>
                    <span>{project.year}</span>
                  </div>
                  <h3 className="mt-3 font-display text-xl font-semibold text-white transition group-hover:text-violet-200">
                    {project.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-[#9a9aad]">{project.task}</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.stack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-white/10 bg-white/3 px-2 py-1 text-[10px] text-[#c4c4d4]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <span className="mt-6 inline-flex w-full items-center justify-center rounded-lg border border-white/15 py-2 text-xs font-medium text-white transition group-hover:scale-[1.01] group-hover:border-violet-400/50 group-hover:bg-violet-500/10">
                    Подробнее о кейсе
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
})
