import { useEffect, useState } from 'react'
import { Avatar } from '../Avatar'
import { Button } from '../Button'
import { GlassCard } from '../GlassCard'
import { Icon } from '../Icon'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from '@tanstack/react-router'

export default function NavMenu() {
  const [showMenu, setShowMenu] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)

    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const { user, loading } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    localStorage.removeItem('token')
    navigate({ to: '/login' })
  }

  if (loading) return null
  if (!user) return null
  return (
    <>
      {isMobile ? (
        <nav className="max-w-200">
          <GlassCard className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar alt="avatar" src={user?.avatar} />
                <h2 className="font-bold text-white text-lg">
                  {user?.username}
                </h2>
              </div>
              <button
                onClick={() => setShowMenu((prev) => !prev)}
                className="cursor-pointer"
              >
                {!showMenu ? (
                  <Icon name="menu" size={24} fill="#1717201d" />
                ) : (
                  <Icon name="x" size={24} fill="#1717201d" />
                )}
              </button>
            </div>
            <div
              className={`overflow-hidden transform transition-all duration-200 ease-out
    ${showMenu ? 'mt-5 max-h-96 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-2'}
  `}
            >
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
                onClick={() => navigate({ to: '/explore' })}
                className="justify-start gap-5"
              >
                <Icon name="search" size={24} fill="#1717201d" />
                Explore
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
            </div>
          </GlassCard>
        </nav>
      ) : (
        <aside className="flex w-70 flex-col gap-6 sticky top-8 h-fit">
          <GlassCard className="p-6 flex flex-col gap-4 border-violet-500/20">
            <div className="flex items-center gap-3">
              <Avatar alt="avatar" src={user?.avatar || ''} />
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
              onClick={() => navigate({ to: '/explore' })}
              className="justify-start gap-5"
            >
              <Icon name="search" size={24} fill="#1717201d" />
              Explore
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
      )}
    </>
  )
}
