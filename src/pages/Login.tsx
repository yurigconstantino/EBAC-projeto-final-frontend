import { useState } from 'react'
import { api } from '../services/api'
import { Button } from '../components/Button'
import { GlassCard } from '../components/GlassCard'
import { type LoginResponse, type LoginData } from '../types/auth'
import { useNavigate } from '@tanstack/react-router'

export default function Login() {
  const [formData, setFormData] = useState<LoginData>({
    email: '',
    password: ''
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const navigate = useNavigate()

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await api.post<LoginResponse>(
        'accounts/login/',
        formData
      )
      const { access } = response.data
      localStorage.setItem('token', access)
      navigate({ to: '/' })
    } catch {
      setError('email ou senha invalida')
    }

    setLoading(false)
  }

  return (
    <>
      <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-indigo-900 via-slate-900 to-black flex items-center justify-center p-6 relative">
        <div className="absolute top-[-10%] right-[-5%] w-125 h-125 bg-violet-600/20 rounded-full blur-[120px]"></div>
        <GlassCard className="w-full max-w-4xl flex flex-col md:flex-row overflow-hidden border-white/10 bg-black/40">
          <div className="w-full md:w-5/12 bg-linear-to-br from-violet-600/20 to-indigo-900/40 p-12 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-linear-to-tr from-cyan-400 to-violet-500 rounded-xl mb-6"></div>
              <h1 className="text-4xl font-bold mb-4">Bem-vindo à InterKnot</h1>
            </div>
          </div>
          <div className="w-full md:w-7/12 p-12 bg-black/20">
            <h2 className="text-2xl font-bold mb-8">Login</h2>
            <form onSubmit={handleSubmit} className="space-y-6 ">
              <div className="flex flex-col gap-2">
                <label htmlFor="Email">Email:</label>
                <input
                  name="email"
                  type="email"
                  placeholder="E-mail"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-violet-500 transition"
                  onChange={handleChange}
                  value={formData.email}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="password">Senha:</label>
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-violet-500 transition"
                  onChange={handleChange}
                  value={formData.password}
                  required
                />
              </div>
              {error && <span className="text-red-500 font-bold">{error}</span>}
              <Button
                onClick={() => ''}
                variant="primary"
                className="w-full mt-5"
                disabled={loading}
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>
          </div>
        </GlassCard>
      </div>
    </>
  )
}
