import { createRootRoute, HeadContent, Link, Outlet } from '@tanstack/react-router'
import '../components/ljusrum/ljusrum.css'

export const Route = createRootRoute({
  component: Layout,
  head: () => ({ meta: [{ title: 'Ljusrum' }] }),
  notFoundComponent: NotFound,
})

function Layout() {
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
