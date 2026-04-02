import { About } from '../components/sections/About'
import { Contact } from '../components/sections/Contact'
import { ContactCta } from '../components/sections/ContactCta'
import { Hero } from '../components/sections/Hero'
import { Projects } from '../components/sections/Projects'
import { Services } from '../components/sections/Services'
import { Skills } from '../components/sections/Skills'
import { Testimonials } from '../components/sections/Testimonials'

export function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Services />
      <Testimonials />
      <ContactCta />
      <Contact />
    </>
  )
}
