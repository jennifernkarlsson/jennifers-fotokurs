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
    const top = () => window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    top()
    // Safari på iPhone kan flytta sidan efter att den ritats; gör om det en gång till.
    const id = requestAnimationFrame(top)
    // ...och när tangentbordet har hunnit stänga (t.ex. efter ett formulär).
    const late = setTimeout(() => {
      if (window.scrollY < 120) top()
    }, 400)
    return () => {
      cancelAnimationFrame(id)
      clearTimeout(late)
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
