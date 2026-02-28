import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/profile/$username")({
  component: ProfilePage,
})

function ProfilePage() {
  const { username } = Route.useParams()
  return <div>Perfil de {username}</div>
}
