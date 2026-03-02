import { api } from './api'

export async function getMe() {
  const response = await api.get('accounts/me/')
  return response.data
}

