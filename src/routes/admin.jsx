import { createFileRoute, Outlet } from '@tanstack/react-router'
import '../components/ljusrum/ljusrum.css'

// Gemensam ram för arrangörens sidor: /admin, /admin/workshop/… och /admin/bokning/…
export const Route = createFileRoute('/admin')({
  component: AdminLayout,
  head: () => ({ meta: [{ title: 'Admin · Ljusrum' }] }),
})

function AdminLayout() {
  return (
    <div className="ljusrum">
      <Outlet />
    </div>
  )
}
