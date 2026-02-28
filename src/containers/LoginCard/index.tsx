import { Button } from '../../components/Button'
import { GlassCard } from '../../components/GlassCard'
import { Link } from '@tanstack/react-router'

export const LoginCard = () => {
  return (
    <>
      <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-indigo-900 via-slate-900 to-black flex items-center justify-center p-6 relative">
        <div className="absolute top-[-10%] right-[-5%] w-125 h-125 bg-violet-600/20 rounded-full blur-[120px]"></div>
        <GlassCard className="w-full max-w-4xl flex flex-col md:flex-row overflow-hidden border-white/10 bg-black/40">
          <div className="w-full md:w-5/12 bg-linear-to-br from-violet-600/20 to-indigo-900/40 p-12 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-linear-to-tr from-cyan-400 to-violet-500 rounded-xl mb-6"></div>
              <h1 className="text-4xl leading-16 font-bold mb-4 cursor-default">
                Bem-vindo à <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-violet-500">
                  InterKnot
                </span>
              </h1>
            </div>
          </div>
          <div className="w-full md:w-7/12 p-12 bg-black/20">
            <h2 className="text-2xl font-bold mb-8">Assece à sua conta</h2>
            <form className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="E-mail ou Usuario"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-violet-500 transition"
                  required
                />
                {/* <span className="text-red-500 font-extralight text-sm ml-2">
                  Nome de usuario ou email incorreto
                </span> */}
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-violet-500 transition"
                  required
                />
                {/* <span className="text-red-500 font-extralight text-sm ml-2">
                  Senha incorreta
                </span> */}
              </div>
              <Button onClick={() => ''} variant="primary" className="w-full">
                'Entrar'
                {/* {loading ? 'Carregando...' : 'Entrar'} */}
              </Button>
              {/* mudar para a pagina de cadatros */}
              <Link to="/signup">
                <Button onClick={() => ''} variant="ghost" className="w-full">
                  'Criar a sua conta'
                </Button>
              </Link>
            </form>
          </div>
        </GlassCard>
      </div>
    </>
  )
}
