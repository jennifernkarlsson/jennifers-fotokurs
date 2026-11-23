import { createRootRoute, HeadContent, Link, Outlet, useRouterState } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: Layout,
  head: () => ({ meta: [{ title: 'Fotoworkshopen' }] }),
  notFoundComponent: () => <h1>Sidan finns inte</h1>,
})

function Layout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  // Arrangörens vy (/admin) har en egen sidhuvud och fullbreddslayout från Figma.
  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    return (
      <>
        <HeadContent />
        <Outlet />
      </>
    )
  }

  return (
    <div className="site">
      <HeadContent />
      <nav aria-label="Huvudmeny">
        <Link to="/" activeOptions={{ exact: true }}>Hem</Link>
        <Link to="/admin">Admin</Link>
      </nav>
      <main><Outlet /></main>
    </div>
  )
}
