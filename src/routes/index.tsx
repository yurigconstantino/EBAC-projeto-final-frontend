import { createFileRoute, redirect } from '@tanstack/react-router'
import { Feed } from '../pages/HomeFeed'


export const Route = createFileRoute('/')({
  beforeLoad: () => {
    const token = localStorage.getItem('access')

    if (!token) {
      throw redirect({ to: '/login' })
    }
  },

  component: FeedPage
})

function FeedPage() {
  return <Feed />
}
