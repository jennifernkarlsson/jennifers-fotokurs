import { createFileRoute, redirect } from '@tanstack/react-router'

// Startsidan skickar vidare till arrangörens vy. Den gamla testsidan används inte längre.
export const Route = createFileRoute('/')({
  beforeLoad: () => {
    throw redirect({ to: '/admin', replace: true })
  },
})
