import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { navItems, siteMeta } from '../../content/site'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export function Header() {
  const reduced = useReducedMotion()
  const { pathname } = useLocation()
  const isHome = pathname === '/' || pathname === ''
  const [open, setOpen] = useState(false)
  const [hoveredNav, setHoveredNav] = useState<string | null>(null)
  const { scrollY, scrollYProgress } = useScroll()

  const scrollSpring = useSpring(scrollY, { stiffness: 120, damping: 32 })
  const shellPadY = useTransform(scrollSpring, [0, 120], [11, 7])
  const shellPadX = useTransform(scrollSpring, [0, 120], [14, 10])
  const shellRadius = useTransform(scrollSpring, [0, 140], [22, 999])
  const brandScale = useTransform(scrollSpring, [0, 120], [1, 0.94])
  const progressOpacity = useTransform(scrollY, [0, 40], [0.35, 1])

  const [radiusPx, setRadiusPx] = useState(22)
  useMotionValueEvent(shellRadius, 'change', (v) => setRadiusPx(Math.round(v)))

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex flex-col items-center gap-1 px-3 pt-3 sm:px-5 sm:pt-4">
        {isHome ? (
          <motion.div
            className="pointer-events-none h-px w-full max-w-6xl bg-white/5"
            style={{ opacity: progressOpacity }}
            aria-hidden
          >
            <motion.div
              className="h-full origin-left bg-linear-to-r from-violet-500 via-fuchsia-400 to-cyan-400"
              style={{ scaleX: scrollYProgress }}
            />
          </motion.div>
        ) : null}

        <motion.div
          className="header-shell-border pointer-events-auto w-full max-w-5xl p-px shadow-[0_8px_40px_-4px_rgba(88,28,135,0.35)]"
          style={{
            borderRadius: `${radiusPx}px`,
          }}
        >
          <motion.div
            className="flex w-full min-w-0 items-center gap-1 border border-white/5 bg-midnight/55 backdrop-blur-2xl sm:gap-2"
            style={{
              borderRadius: `${Math.max(0, radiusPx - 1)}px`,
              paddingLeft: shellPadX,
              paddingRight: shellPadX,
              paddingTop: shellPadY,
              paddingBottom: shellPadY,
            }}
          >
            <motion.div style={{ scale: brandScale }} className="shrink-0">
              <Link
                to="/"
                className="group relative flex items-center gap-2 px-1.5 py-1 sm:px-2"
              >
                <span
                  className="font-mono text-sm font-bold tracking-tight sm:text-base"
                  style={{
                    backgroundImage:
                      'linear-gradient(120deg, #c4b5fd, #f0abfc, #67e8f9, #c4b5fd)',
                    backgroundSize: reduced ? '100% 100%' : '300% 100%',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                    animation: reduced ? undefined : 'gradient-flow 4s ease infinite',
                  }}
                >
                  {siteMeta.brand}
                </span>
                {!reduced ? (
                  <span className="absolute -inset-1 -z-10 rounded-xl bg-violet-500/0 opacity-0 blur-md transition group-hover:bg-violet-500/25 group-hover:opacity-100" />
                ) : null}
              </Link>
            </motion.div>

            <LayoutGroup id="main-nav">
              <nav className="mx-auto hidden items-center gap-0.5 lg:flex">
                {navItems.map((item) => {
                  const activeHover = hoveredNav === item.href
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      className="relative px-3 py-2 text-[13px] font-medium text-[#b8b8c8] transition-colors hover:text-white"
                      onMouseEnter={() => setHoveredNav(item.href)}
                      onMouseLeave={() => setHoveredNav(null)}
                    >
                      {activeHover ? (
                        <motion.span
                          layoutId="navGlow"
                          className="absolute inset-0 -z-10 rounded-full bg-white/[0.09] shadow-[0_0_20px_rgba(167,139,250,0.12)] ring-1 ring-violet-400/25"
                          transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                        />
                      ) : null}
                      {item.label}
                    </a>
                  )
                })}
              </nav>
            </LayoutGroup>

            <div className="ml-auto hidden shrink-0 items-center gap-2 lg:flex">
              <motion.a
                href="#contact"
                className="relative overflow-hidden rounded-full bg-linear-to-r from-violet-500 to-fuchsia-600 px-4 py-2 text-[13px] font-semibold text-white shadow-lg shadow-violet-600/25"
                initial="rest"
                whileHover={reduced ? undefined : 'hover'}
                whileTap={reduced ? undefined : { scale: 0.98 }}
                animate="rest"
                variants={{ rest: { scale: 1 }, hover: { scale: 1.03 } }}
              >
                {!reduced ? (
                  <motion.span
                    className="pointer-events-none absolute inset-0 skew-x-12 bg-linear-to-r from-transparent via-white/30 to-transparent"
                    variants={{
                      rest: { x: '-120%', opacity: 0 },
                      hover: { x: '120%', opacity: 1 },
                    }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  />
                ) : null}
                <span className="relative z-10">Обсудить проект</span>
              </motion.a>
            </div>

            <button
              type="button"
              className="relative z-10 ml-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] lg:hidden"
              aria-expanded={open}
              aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">Меню</span>
              <motion.span
                className="absolute h-0.5 w-5 rounded-full bg-white"
                animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -5 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="absolute h-0.5 w-5 rounded-full bg-white"
                animate={open ? { rotate: -45, y: 0, opacity: 1 } : { rotate: 0, y: 5, opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            </button>
          </motion.div>
        </motion.div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              className="absolute inset-0 bg-black/55 backdrop-blur-md"
              aria-label="Закрыть"
              onClick={() => setOpen(false)}
            />
            <motion.nav
              className="absolute right-3 top-[5.25rem] w-[min(100%-20px,340px)] overflow-hidden rounded-2xl border border-white/10 bg-surface/95 p-3 shadow-2xl shadow-violet-950/40 backdrop-blur-xl"
              initial={{ opacity: 0, y: -16, rotateX: -8 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, y: -16, rotateX: -8 }}
              transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              style={{ transformPerspective: 900 }}
            >
              <ul className="flex flex-col gap-0.5">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.28 }}
                  >
                    <a
                      href={item.href}
                      className="block rounded-xl px-4 py-3.5 text-fg transition hover:bg-violet-500/12"
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <motion.a
                href="#contact"
                className="mt-2 flex w-full items-center justify-center rounded-xl bg-linear-to-r from-violet-500 to-fuchsia-600 py-3.5 text-sm font-semibold text-white shadow-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                onClick={() => setOpen(false)}
              >
                Обсудить проект
              </motion.a>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
