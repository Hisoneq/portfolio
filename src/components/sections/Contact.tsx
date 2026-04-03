import { useAnimation, useReducedMotion } from 'framer-motion'
import * as m from 'framer-motion/m'
import { type ChangeEvent, type FormEvent, memo, useCallback, useState } from 'react'
import { budgetOptions, contact } from '../../content/site'
import { Magnetic } from '../motion/Magnetic'
import { ScrollReveal } from '../motion/ScrollReveal'

const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${encodeURIComponent(contact.email)}`

function parseFormSubmitJson(v: unknown): { message?: string } | null {
  if (v && typeof v === 'object' && !Array.isArray(v)) {
    return v as { message?: string }
  }
  return null
}

export const Contact = memo(function Contact() {
  const reduced = useReducedMotion()
  const controls = useAnimation()
  const [toast, setToast] = useState<{ text: string; variant: 'ok' | 'err' } | null>(null)
  const [triedSubmit, setTriedSubmit] = useState(false)
  const [sending, setSending] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [budget, setBudget] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()
      setTriedSubmit(true)
      if (!name.trim() || !email.trim() || !message.trim()) {
        await controls.start({
          x: [0, -6, 6, -4, 4, 0],
          transition: { duration: 0.4 },
        })
        return
      }

      const budgetLabel = budgetOptions.find((o) => o.value === budget)?.label ?? 'не указан'

      setSending(true)
      setToast(null)

      try {
        const res = await fetch(FORMSUBMIT_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            message: message.trim(),
            budget: budgetLabel,
            _subject: 'Портфолио: заявка с сайта',
            _template: 'table',
            _captcha: 'false',
          }),
        })

        const data = parseFormSubmitJson(await res.json())

        if (!res.ok) {
          const msg =
            typeof data?.message === 'string'
              ? data.message
              : 'Не удалось отправить. Проверьте соединение или попробуйте позже.'
          setToast({ text: msg, variant: 'err' })
          return
        }

        setToast({ text: 'Спасибо! Сообщение отправлено — скоро отвечу.', variant: 'ok' })
        setName('')
        setEmail('')
        setBudget('')
        setMessage('')
        setTriedSubmit(false)
        setTimeout(() => setToast(null), 5000)
      } catch {
        setToast({
          text: 'Ошибка сети. Напишите напрямую на почту или в Telegram.',
          variant: 'err',
        })
      } finally {
        setSending(false)
      }
    },
    [name, email, budget, message, controls],
  )

  const onNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }, [])
  const onEmailChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }, [])
  const onBudgetChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setBudget(e.target.value)
  }, [])
  const onMessageChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
  }, [])

  return (
    <section id="contact" className="scroll-mt-24 px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start">
          <ScrollReveal>
            <p className="text-sm font-medium uppercase tracking-widest text-violet-400">{contact.eyebrow}</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl">
              {contact.title}
            </h2>
            <p className="mt-4 text-[#b8b8c8]">{contact.intro}</p>

            <div className="mt-8 space-y-4 text-sm">
              <Magnetic className="inline-block w-full max-w-sm">
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/3 px-4 py-3 text-fg transition hover:border-violet-500/40"
                >
                  <span aria-hidden>✉️</span>
                  <span>
                    <span className="font-semibold text-white">Email</span>
                    <br />
                    {contact.email}
                  </span>
                </a>
              </Magnetic>
              <Magnetic className="inline-block w-full max-w-sm">
                <a
                  href={contact.telegramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/3 px-4 py-3 text-fg transition hover:border-violet-500/40"
                >
                  <span aria-hidden>📩</span>
                  <span>
                    <span className="font-semibold text-white">Telegram</span>
                    <br />
                    {contact.telegram}
                  </span>
                </a>
              </Magnetic>
              <Magnetic className="inline-block w-full max-w-sm">
                <a
                  href={contact.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/3 px-4 py-3 text-fg transition hover:border-violet-500/40"
                >
                  <span aria-hidden>💼</span>
                  <span>
                    <span className="font-semibold text-white">LinkedIn</span>
                    <br />
                    {contact.linkedin}
                  </span>
                </a>
              </Magnetic>
            </div>

            <p className="mt-8 flex items-center gap-2 text-sm text-muted">
              <span aria-hidden>⏱</span>
              {contact.responseTime}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <m.form
              animate={controls}
              onSubmit={handleSubmit}
              className="rounded-2xl border border-white/8 bg-surface p-6 sm:p-8"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm">
                  <span className="text-[#b8b8c8]">Ваше имя</span>
                  <input
                    value={name}
                    onChange={onNameChange}
                    className={`mt-2 w-full rounded-xl border bg-elevated px-4 py-3 text-white outline-none ring-violet-500/40 transition placeholder:text-[#5c5c6c] focus:ring-2 ${
                      triedSubmit && !name.trim()
                        ? 'border-red-500/50'
                        : 'border-white/10 focus:border-violet-500/50'
                    }`}
                    placeholder="Иван"
                    autoComplete="name"
                  />
                </label>
                <label className="block text-sm">
                  <span className="text-[#b8b8c8]">Email</span>
                  <input
                    type="email"
                    value={email}
                    onChange={onEmailChange}
                    className={`mt-2 w-full rounded-xl border bg-elevated px-4 py-3 text-white outline-none ring-violet-500/40 transition placeholder:text-[#5c5c6c] focus:ring-2 ${
                      triedSubmit && !email.trim()
                        ? 'border-red-500/50'
                        : 'border-white/10 focus:border-violet-500/50'
                    }`}
                    placeholder="you@mail.com"
                    autoComplete="email"
                  />
                </label>
              </div>

              <label className="mt-4 block text-sm">
                <span className="text-[#b8b8c8]">Бюджет проекта</span>
                <select
                  value={budget}
                  onChange={onBudgetChange}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-elevated px-4 py-3 text-white outline-none ring-violet-500/40 focus:ring-2"
                >
                  {budgetOptions.map((o) => (
                    <option key={o.value || 'empty'} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="mt-4 block text-sm">
                <span className="text-[#b8b8c8]">Опишите задачу</span>
                <textarea
                  value={message}
                  onChange={onMessageChange}
                  rows={5}
                  className={`mt-2 w-full resize-none rounded-xl border bg-elevated px-4 py-3 text-white outline-none ring-violet-500/40 transition placeholder:text-[#5c5c6c] focus:ring-2 ${
                    triedSubmit && !message.trim()
                      ? 'border-red-500/50'
                      : 'border-white/10 focus:border-violet-500/50'
                  }`}
                  placeholder="Коротко о целях, сроках и стеке…"
                />
              </label>

              <m.button
                type="submit"
                disabled={sending}
                className="mt-6 w-full rounded-xl bg-violet-500 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-60"
                whileHover={reduced || sending ? undefined : { scale: 1.01 }}
                whileTap={reduced || sending ? undefined : { scale: 0.98 }}
              >
                {sending ? 'Отправка…' : 'Отправить сообщение'}
              </m.button>

              <p className="mt-4 text-center text-xs text-[#6b6b7e]">{contact.formNote}</p>
            </m.form>

            {toast ? (
              <m.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={
                  toast.variant === 'ok'
                    ? 'mt-4 rounded-xl border border-teal-500/30 bg-teal-500/10 px-4 py-3 text-center text-sm text-teal-100'
                    : 'mt-4 rounded-xl border border-red-500/35 bg-red-500/10 px-4 py-3 text-center text-sm text-red-100'
                }
                role="status"
              >
                {toast.text}
              </m.div>
            ) : null}
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
})
