import { useLayoutEffect } from 'react'
import { createRootRoute, HeadContent, Link, Outlet, useLocation } from '@tanstack/react-router'
import '../components/ljusrum/ljusrum.css'

export const Route = createRootRoute({
  component: Layout,
  head: () => ({ meta: [{ title: 'Ljusrum' }] }),
  notFoundComponent: NotFound,
})

// Ny sida börjar alltid högst upp (logga och meny under statusfältet),
// utom när länken pekar på en plats på sidan (t.ex. #las-mer).
function useScrollToTopOnNavigate() {
  const location = useLocation()
  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'
  }, [])
  useLayoutEffect(() => {
    if (location.hash) return
    const top = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      if (document.scrollingElement) document.scrollingElement.scrollTop = 0
    }
    top()
    // Safari på iPhone kan flytta sidan en bit efter att den ritats (t.ex. när verktygsfältet
    // eller tangentbordet ändrar storlek). Håll sidan högst upp en kort stund, tills man själv rör skärmen.
    let stopped = false
    let frame = 0
    const stop = () => { stopped = true }
    window.addEventListener('touchstart', stop, { passive: true, once: true })
    window.addEventListener('wheel', stop, { passive: true, once: true })
    const started = performance.now()
    const tick = () => {
      if (stopped || performance.now() - started > 900) return
      if (window.scrollY !== 0 && window.scrollY < 150) top()
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => {
      stopped = true
      cancelAnimationFrame(frame)
      window.removeEventListener('touchstart', stop)
      window.removeEventListener('wheel', stop)
    }
  }, [location.pathname, location.searchStr, location.hash])
}

function Layout() {
  useScrollToTopOnNavigate()
  return (
    <>
      <HeadContent />
      <Outlet />
    </>
  )
}

function NotFound() {
  return (
    <div className="ljusrum">
      <div className="admin-page">
        <div className="admin-container">
          <h1 className="admin-h1">Sidan finns inte</h1>
          <p><Link to="/">Gå till startsidan</Link></p>
        </div>
      </div>
    </div>
  )
}
