import { api } from './api'

export async function login(email: string, password: string) {
  const response = await api.post('/accounts/token/', {
    email,
    password
  })
  return response.data
}
