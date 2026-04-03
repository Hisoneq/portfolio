import { lazy, memo, Suspense } from 'react'
import { SectionGate } from '../components/lazy/SectionGate'
import { Hero } from '../components/sections/Hero'

const About = lazy(() =>
  import('../components/sections/About').then((m) => ({ default: m.About })),
)
const Skills = lazy(() =>
  import('../components/sections/Skills').then((m) => ({ default: m.Skills })),
)
const Projects = lazy(() =>
  import('../components/sections/Projects').then((m) => ({ default: m.Projects })),
)
const Services = lazy(() =>
  import('../components/sections/Services').then((m) => ({ default: m.Services })),
)
const Testimonials = lazy(() =>
  import('../components/sections/Testimonials').then((m) => ({ default: m.Testimonials })),
)
const ContactCta = lazy(() =>
  import('../components/sections/ContactCta').then((m) => ({ default: m.ContactCta })),
)
const Contact = lazy(() =>
  import('../components/sections/Contact').then((m) => ({ default: m.Contact })),
)

const SectionFallback = memo(function SectionFallback() {
  return (
    <div className="mx-auto h-44 max-w-6xl rounded-2xl bg-white/4 motion-safe:animate-pulse px-4 sm:px-6" />
  )
})

export function Home() {
  return (
    <>
      <Hero />
      <SectionGate minHeight="min(85vh, 42rem)">
        <Suspense fallback={<SectionFallback />}>
          <About />
        </Suspense>
      </SectionGate>
      <SectionGate minHeight="min(72vh, 34rem)">
        <Suspense fallback={<SectionFallback />}>
          <Skills />
        </Suspense>
      </SectionGate>
      <SectionGate minHeight="min(90vh, 48rem)">
        <Suspense fallback={<SectionFallback />}>
          <Projects />
        </Suspense>
      </SectionGate>
      <SectionGate minHeight="min(68vh, 30rem)">
        <Suspense fallback={<SectionFallback />}>
          <Services />
        </Suspense>
      </SectionGate>
      <SectionGate minHeight="min(75vh, 36rem)">
        <Suspense fallback={<SectionFallback />}>
          <Testimonials />
        </Suspense>
      </SectionGate>
      <SectionGate minHeight="min(50vh, 24rem)">
        <Suspense fallback={<SectionFallback />}>
          <ContactCta />
        </Suspense>
      </SectionGate>
      <SectionGate minHeight="min(85vh, 40rem)">
        <Suspense fallback={<SectionFallback />}>
          <Contact />
        </Suspense>
      </SectionGate>
    </>
  )
}
