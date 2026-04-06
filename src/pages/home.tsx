import { Button } from '../components/Button'
import { GlassCard } from '../components/GlassCard'
import { Icon } from '../components/Icon'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0B0B15]">
      <div className="max-w-300 mx-auto flex gap-8 p-4 lg:p-8">
        <aside className="hidden lg:flex w-70 flex-col gap-6 sticky top-8 h-fit">
          <GlassCard className="p-6 flex flex-col gap-4 border-violet-500/20">
            <div className="flex items-center gap-3">
              {/* <Avatar alt="avatar" src={avatar} /> */}
              <h2 className="font-bold text-white text-lg"></h2>
            </div>
          </GlassCard>
          <GlassCard className="p-4 flex flex-col gap-2">
            <Button
              variant="ghost"
              onClick={() => ''}
              className="justify-start gap-5"
              disabled
            >
              <Icon name="house" size={24} fill="#1717201d" />
              Feed
            </Button>
            <Button
              variant="ghost"
              onClick={() => ''}
              className="justify-start gap-5"
              disabled
            >
              <Icon name="bell" size={24} fill="#1717201d" />
              Notificações
            </Button>
            <Button
              variant="ghost"
              onClick={() => ''}
              className="justify-start gap-5"
              disabled
            >
              <Icon name="user" size={24} fill="#1717201d" />
              Perfil
            </Button>
            <div className="mt-4 pt-4 border-t border-white/5 cursor-pointer">
              <div className="flex items-center gap-3 ml-8">
                <Icon name="log-out" size={16} />
                <span className="font-bold text-sm">Sair</span>
              </div>
            </div>
          </GlassCard>
        </aside>
      </div>
    </div>
  )
}
