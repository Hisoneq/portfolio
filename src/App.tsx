import { lazy, memo, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { useLenis } from './hooks/useLenis'
import { Home } from './pages/Home'

const ProjectDetail = lazy(() =>
  import('./pages/ProjectDetail').then((m) => ({ default: m.ProjectDetail })),
)

const RouteFallback = memo(function RouteFallback() {
  return <div className="min-h-[50svh] bg-midnight" aria-hidden />
})

export default function App() {
  useLenis(true)

  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="projects/:slug" element={<ProjectDetail />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
