import { Outlet } from 'react-router-dom'
import { Footer } from './Footer'
import { Header } from './Header'

export function Layout() {
  return (
    <div className="min-h-svh bg-midnight text-fg">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
