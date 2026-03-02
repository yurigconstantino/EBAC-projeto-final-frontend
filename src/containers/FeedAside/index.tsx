import { useEffect, useState } from 'react'
import { Avatar } from '../../components/Avatar'
import { Button } from '../../components/Button'
import { GlassCard } from '../../components/GlassCard'
import { Icon } from '../../components/Icon'
import { getMe } from '../../lib/user'

export const FeedAside = () => {
  const [user, setUser] = useState<string | undefined>('')
  const [avatar, setAvatar] = useState<string>('')

  useEffect(() => {
    async function fetchUser() {
      const data = await getMe()
      setUser(data.username ?? '')
      setAvatar(data.avatar ?? undefined)

    }
    fetchUser()
  }, [])

  return (
    <aside className="hidden lg:flex w-70 flex-col gap-6 sticky top-8 h-fit">
      <GlassCard className="p-6 flex flex-col gap-4 border-violet-500/20">
        <div className="flex items-center gap-3">
          <Avatar alt="avatar" src={avatar} />
          <h2 className="font-bold text-white text-lg">{user}</h2>
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
  )
}
