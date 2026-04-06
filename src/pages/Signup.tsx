import { useState } from 'react'
import { api } from '../services/api'
import { type RegisterData } from '../types/user'
import { GlassCard } from '../components/GlassCard'
import { Button } from '../components/Button/index'

export default function Singup() {
  const [formData, setFormData] = useState<RegisterData>({
    username: '',
    email: '',
    password: ''
  })

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    setLoading(true)

    try {
      await api.post('/accounts/register/', formData)

      setMessage('usuario criado com sucesso')

      setFormData({
        username: '',
        email: '',
        password: ''
      })
    } catch (error) {
      setMessage(`erro ao criar usuario | ${error}`)
    }
    setLoading(false)
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
              <Button
                onClick={() => ''}
                variant="primary"
                className="w-full"
                disabled={loading}
              >
                {loading ? `${message}` : 'Criar conta'}
              </Button>
            </form>
          </div>
        </GlassCard>
      </div>
    </>
  )
}
