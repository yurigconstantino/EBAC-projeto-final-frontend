import { createFileRoute } from '@tanstack/react-router'
import Signup from '../pages/Signup'

export const Route = createFileRoute('/signup')({
  component: SignupPage,
})

function SignupPage() {
  return (
    <Signup />
  )
}
