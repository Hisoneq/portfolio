import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { navItems, siteMeta } from '../../content/site'

export function Footer() {
  const reduced = useReducedMotion()

  return (
    <footer className="border-t border-white/6 bg-midnight">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-14 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <Link
            to="/"
            className="font-display text-lg font-semibold text-white"
          >
            <motion.span
              className="font-mono text-violet-300"
              whileHover={
                reduced
                  ? undefined
                  : {
                      scale: 1.02,
                      textShadow: '0 0 20px rgba(167,139,250,0.5)',
                    }
              }
            >
              {siteMeta.brand}
            </motion.span>
          </Link>
          <p className="mt-2 max-w-sm text-sm text-muted">{siteMeta.role}</p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-[#b8b8c8] transition hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="border-t border-white/6 py-6 text-center text-xs text-[#6b6b7e]">
        © {siteMeta.footerYear} {siteMeta.name}. Сделано с ❤️
      </div>
    </footer>
  )
}
