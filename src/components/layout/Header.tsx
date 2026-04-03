import {
  AnimatePresence,
  LayoutGroup,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import * as m from 'framer-motion/m'
import { memo, useCallback, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { navItems, siteMeta, type NavItem } from '../../content/site'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const DesktopNavAnchor = memo(function DesktopNavAnchor({
  item,
  hovered,
  onHover,
  onLeave,
}: {
  item: NavItem
  hovered: boolean
  onHover: (href: string) => void
  onLeave: () => void
}) {
  return (
    <a
      href={item.href}
      className="relative px-3 py-2 text-[13px] font-medium text-[#b8b8c8] transition-colors hover:text-white"
      onMouseEnter={() => onHover(item.href)}
      onMouseLeave={onLeave}
    >
      {hovered ? (
        <m.span
          layoutId="navGlow"
          className="absolute inset-0 -z-10 rounded-full bg-white/[0.09] shadow-[0_0_20px_rgba(167,139,250,0.12)] ring-1 ring-violet-400/25"
          transition={{ type: 'spring', stiffness: 420, damping: 34 }}
        />
      ) : null}
      {item.label}
    </a>
  )
})

const MobileNavItem = memo(function MobileNavItem({
  item,
  index,
  onClose,
}: {
  item: NavItem
  index: number
  onClose: () => void
}) {
  return (
    <m.li
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.04 * index, duration: 0.28 }}
    >
      <a
        href={item.href}
        className="block rounded-xl px-4 py-3.5 text-fg transition hover:bg-violet-500/12"
        onClick={onClose}
      >
        {item.label}
      </a>
    </m.li>
  )
})

export const Header = memo(function Header() {
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
  /** MotionValue в style — без setState на каждом тике пружины при скролле. */
  const shellRadiusOuter = useTransform(shellRadius, (v) => `${Math.round(v)}px`)
  const shellRadiusInner = useTransform(shellRadius, (v) => `${Math.max(0, Math.round(v) - 1)}px`)
  const brandScale = useTransform(scrollSpring, [0, 120], [1, 0.94])
  const progressOpacity = useTransform(scrollY, [0, 40], [0.35, 1])

  const onNavHover = useCallback((href: string) => setHoveredNav(href), [])
  const onNavLeave = useCallback(() => setHoveredNav(null), [])
  const closeMenu = useCallback(() => setOpen(false), [])
  const toggleMenu = useCallback(() => setOpen((v) => !v), [])

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex flex-col items-center gap-1 px-3 pt-3 sm:px-5 sm:pt-4">
        {isHome ? (
          <m.div
            className="pointer-events-none h-px w-full max-w-6xl bg-white/5"
            style={{ opacity: progressOpacity }}
            aria-hidden
          >
            <m.div
              className="h-full origin-left bg-linear-to-r from-violet-500 via-fuchsia-400 to-cyan-400"
              style={{ scaleX: scrollYProgress }}
            />
          </m.div>
        ) : null}

        <m.div
          className="header-shell-border pointer-events-auto w-full max-w-5xl p-px shadow-[0_8px_40px_-4px_rgba(88,28,135,0.35)]"
          style={{
            borderRadius: shellRadiusOuter,
          }}
        >
          <m.div
            className="flex w-full min-w-0 items-center gap-1 border border-white/5 bg-midnight/55 backdrop-blur-2xl sm:gap-2"
            style={{
              borderRadius: shellRadiusInner,
              paddingLeft: shellPadX,
              paddingRight: shellPadX,
              paddingTop: shellPadY,
              paddingBottom: shellPadY,
            }}
          >
            <m.div style={{ scale: brandScale }} className="shrink-0">
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
            </m.div>

            <LayoutGroup id="main-nav">
              <nav className="mx-auto hidden items-center gap-0.5 lg:flex">
                {navItems.map((item) => (
                  <DesktopNavAnchor
                    key={item.href}
                    item={item}
                    hovered={hoveredNav === item.href}
                    onHover={onNavHover}
                    onLeave={onNavLeave}
                  />
                ))}
              </nav>
            </LayoutGroup>

            <div className="ml-auto hidden shrink-0 items-center gap-2 lg:flex">
              <m.a
                href="#contact"
                className="relative overflow-hidden rounded-full bg-linear-to-r from-violet-500 to-fuchsia-600 px-4 py-2 text-[13px] font-semibold text-white shadow-lg shadow-violet-600/25"
                initial="rest"
                whileHover={reduced ? undefined : 'hover'}
                whileTap={reduced ? undefined : { scale: 0.98 }}
                animate="rest"
                variants={{ rest: { scale: 1 }, hover: { scale: 1.03 } }}
              >
                {!reduced ? (
                  <m.span
                    className="pointer-events-none absolute inset-0 skew-x-12 bg-linear-to-r from-transparent via-white/30 to-transparent"
                    variants={{
                      rest: { x: '-120%', opacity: 0 },
                      hover: { x: '120%', opacity: 1 },
                    }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  />
                ) : null}
                <span className="relative z-10">Обсудить проект</span>
              </m.a>
            </div>

            <button
              type="button"
              className="relative z-10 ml-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] lg:hidden"
              aria-expanded={open}
              aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
              onClick={toggleMenu}
            >
              <span className="sr-only">Меню</span>
              <m.span
                className="absolute h-0.5 w-5 rounded-full bg-white"
                animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -5 }}
                transition={{ duration: 0.2 }}
              />
              <m.span
                className="absolute h-0.5 w-5 rounded-full bg-white"
                animate={open ? { rotate: -45, y: 0, opacity: 1 } : { rotate: 0, y: 5, opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            </button>
          </m.div>
        </m.div>
      </header>

      <AnimatePresence>
        {open ? (
          <m.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              className="absolute inset-0 bg-black/55 backdrop-blur-md"
              aria-label="Закрыть"
              onClick={closeMenu}
            />
            <m.nav
              className="absolute right-3 top-[5.25rem] w-[min(100%-20px,340px)] overflow-hidden rounded-2xl border border-white/10 bg-surface/95 p-3 shadow-2xl shadow-violet-950/40 backdrop-blur-xl"
              initial={{ opacity: 0, y: -16, rotateX: -8 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, y: -16, rotateX: -8 }}
              transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              style={{ transformPerspective: 900 }}
            >
              <ul className="flex flex-col gap-0.5">
                {navItems.map((item, i) => (
                  <MobileNavItem key={item.href} item={item} index={i} onClose={closeMenu} />
                ))}
              </ul>
              <m.a
                href="#contact"
                className="mt-2 flex w-full items-center justify-center rounded-xl bg-linear-to-r from-violet-500 to-fuchsia-600 py-3.5 text-sm font-semibold text-white shadow-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                onClick={closeMenu}
              >
                Обсудить проект
              </m.a>
            </m.nav>
          </m.div>
        ) : null}
      </AnimatePresence>
    </>
  )
})
