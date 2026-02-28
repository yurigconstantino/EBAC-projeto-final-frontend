import type { RegisterData, TokenResponse } from '../types/auth'

const API_URL = 'http://127.0.0.1:8000/api'

export async function registerUser(data: RegisterData) {
  const response = await fetch(`${API_URL}/accounts/register/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    throw await response.json()
  }

  return response.json()
}

export async function loginUser(
  username: string,
  password: string
): Promise<TokenResponse> {
  const response = await fetch(`${API_URL}/token/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  })

  if (!response.ok) {
    throw await response.json()
  }

  return response.json()
}
