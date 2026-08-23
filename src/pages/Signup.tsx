import { useState } from 'react'
import { api } from '../services/api'
import type { AxiosError } from 'axios'
import { type RegisterData } from '../types/user'
import { GlassCard } from '../components/GlassCard'
import { Button } from '../components/Button/index'
import { Link } from '@tanstack/react-router'

interface ErrorResponse {
  email?: string[]
  username?: string[]
  password?: string[]
}

export default function Singup() {
  const [formData, setFormData] = useState<RegisterData>({
    username: '',
    email: '',
    password: ''
  })

  const [loading, setLoading] = useState(false)

  const [error, setError] = useState('')

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
      await api.post('/accounts/register/', formData)

      alert('usuario cadastrado!')

      setFormData({
        username: '',
        email: '',
        password: ''
      })
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>

      if (axiosError.response?.status === 400) {
        const data = axiosError.response.data

        if (data?.email?.[0]) {
          setError(data.email[0])
        } else if (data?.username?.[0]) {
          setError(data.username[0])
        } else if (data.password?.[0]) {
          setError(data.password[0])
        } else {
          setError('Não foi possível realizar o cadastro')
        }
      } else {
        setError('Erro ao conectar com o servidor')
      }
    } finally {
      setLoading(false)
    }
  }
  console.log(handleSubmit)
  return (
    <>
      <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-indigo-900 via-slate-900 to-black flex items-center justify-center p-6 relative">
        <div className="absolute top-[-10%] right-[-5%] w-125 h-125 bg-violet-600/20 rounded-full blur-[120px]"></div>
        <GlassCard className="w-full max-w-4xl flex flex-col md:flex-row overflow-hidden border-white/10 bg-black/40">
          <div className="w-full md:w-5/12 bg-linear-to-br from-violet-600/20 to-indigo-900/40 p-12 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-linear-to-tr from-cyan-400 to-violet-500 rounded-xl mb-6"></div>
              <h1 className="text-4xl font-bold mb-4">Cadastro de Conta</h1>
            </div>
          </div>
          <div className="w-full md:w-7/12 p-12 bg-black/20">
            <h2 className="text-2xl font-bold mb-8">
              Insira as informações da conta
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6 ">
              <div className="flex flex-col gap-2">
                <label htmlFor="user">Nome de usuario:</label>
                <input
                  name="username"
                  type="text"
                  placeholder="Nome de ususario"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-violet-500 transition"
                  onChange={handleChange}
                  value={formData.username}
                  required
                />
              </div>
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
              {error && (
                <p className="text-red-700">
                  {error}
                </p>
              )}
              <Button
                onClick={() => ''}
                variant="primary"
                className="w-full"
                disabled={loading}
              >
                Criar conta
              </Button>
            </form>
            <Link to="/login">
              <Button
                onClick={() => ''}
                variant="secondary"
                className="w-full py-2 mt-5"
                disabled={loading}
              >
                Voltar
              </Button>
            </Link>
          </div>
        </GlassCard>
      </div>
    </>
  )
}
