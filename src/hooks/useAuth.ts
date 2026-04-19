import { useEffect, useState } from 'react'
import { api } from '../services/api'

interface User {
  id: number
  username: string
  email: string
  avatar: string | null
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  async function fetchUser() {
    const token = localStorage.getItem('token')

    if (!token) {
      setLoading(false)
      return
    }
    try {
      const response = await api.get('/accounts/me/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setUser(response.data)
    } catch {
      setUser(null)
    }
    setLoading(false)
  }
  useEffect(() => {
    (async () => {
      await fetchUser()
    })()
  }, [])

  return { user, loading }
}
