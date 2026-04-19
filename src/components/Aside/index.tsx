import { Avatar } from '../../components/Avatar'
import { Button } from '../../components/Button'
import { GlassCard } from '../../components/GlassCard'
import { Icon } from '../../components/Icon'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from '@tanstack/react-router'

export default function Aside() {
  const { user } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    localStorage.removeItem('token')
    navigate({ to: '/login' })
  }
  return (
    <aside className="hidden lg:flex w-70 flex-col gap-6 sticky top-8 h-fit">
      <GlassCard className="p-6 flex flex-col gap-4 border-violet-500/20">
        <div className="flex items-center gap-3">
          <Avatar
            alt="avatar"
            src={user?.avatar || 'https://dummyimage.com/80x80.png'}
          />
          <h2 className="font-bold text-white text-lg">{user?.username}</h2>
        </div>
      </GlassCard>
      <GlassCard className="p-4 flex flex-col gap-2">
        <Button
          variant="ghost"
          onClick={() => navigate({ to: '/' })}
          className="justify-start gap-5"
        >
          <Icon name="house" size={24} fill="#1717201d" />
          Feed
        </Button>
        <Button
          variant="ghost"
          onClick={() => navigate({ to: '/me' })}
          className="justify-start gap-5"
        >
          <Icon name="user" size={24} fill="#1717201d" />
          Perfil
        </Button>
        <div className="mt-4 pt-4 border-t border-white/5 cursor-pointer">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="justify-start gap-5"
          >
            <Icon name="log-out" size={16} />
            <span className="font-bold text-sm">Sair</span>
          </Button>
        </div>
      </GlassCard>
    </aside>
  )
}
