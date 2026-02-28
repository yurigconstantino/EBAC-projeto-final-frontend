import { useState } from 'react'
import { Button } from '../../components/Button'
import { GlassCard } from '../../components/GlassCard'
import { registerUser } from '../../services/auth'

export const SignupCard = () => {
  const create = false
  // --------------------Fazer logica de criação de conta--------------------

  const [username, setUsename] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      await registerUser({ username, email, password })
    } catch (error) {
      console.error(error)
    }
  }

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
                  type="text"
                  placeholder="Nome de ususario"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-violet-500 transition"
                  onChange={(e) => setUsename(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="Email">Email:</label>
                <input
                  type="text"
                  placeholder="E-mail"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-violet-500 transition"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="password">Senha:</label>
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-violet-500 transition"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button
                onClick={() => ''}
                variant="primary"
                className="w-full"
                disabled={create}
              >
                {create ? 'Criando...' : 'Criar conta'}
              </Button>
            </form>
          </div>
        </GlassCard>
      </div>
    </>
  )
}
