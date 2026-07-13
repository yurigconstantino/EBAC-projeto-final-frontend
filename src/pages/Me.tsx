import { useEffect, useState } from 'react'
import { GlassCard } from '../components/GlassCard'
import { Icon } from '../components/Icon'
import Aside from '../components/NavMenu'
import { type Post } from '../types/Post'
import { PostCard } from '../components/PostCard'
import { api } from '../services/api'
import { MeFollowingListCard } from '../components/MeFollowingList'
import type { MeFollowingList } from '../types/MeFollowingList'
import { Button } from '../components/Button'
import { Avatar } from '../components/Avatar'
import { useAuth } from '../hooks/useAuth'

export default function Me() {
  const [edit, setEdit] = useState(false)
  const [posts, setPosts] = useState<Post[]>([])
  const [followingList, setFollowingList] = useState<MeFollowingList[]>([])
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [avatar, setAvatar] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState('')

  const token = localStorage.getItem('token')
  const { user } = useAuth()

  useEffect(() => {
    if (!token) return

    async function loadUser() {
      try {
        const response = await api.get('/accounts/me', {
          headers: { Authorization: `Bearer ${token}` }
        })

        setUsername(response.data.username)
        setEmail(response.data.email)

        if (response.data.avatar) {
          const avatarUrl = response.data.avatar.startsWith('http')
            ? response.data.avatar
            : `http://localhost:8000${response.data.avatar}`

          setAvatarPreview(avatarUrl)
        }
      } catch (error) {
        console.error(error)
      }
    }

    loadUser()
  }, [token])

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]

    if (!file) return
    if (!file.type.startsWith('image/')) {
      alert('Selecione apenas imagens')
      return
    }

    setAvatar(file)
    setAvatarPreview(URL.createObjectURL(file))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    try {
      const formData = new FormData()

      formData.append('username', username)
      formData.append('email', email)

      if (password) {
        formData.append('password', password)
      }

      if (avatar) {
        formData.append('avatar', avatar)
      }

      await api.put('/accounts/me/update/', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      alert('perfil atualizado com sucesso')
      setPassword('')
    } catch (error) {
      console.error(error)
      alert('error ao atualizar Perfil')
    }
  }

  const inputProps = edit ? {} : { disabled: true }

  const updatePostComments = (postId: number, newCount: number) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, comments_count: newCount } : p
      )
    )
  }

  useEffect(() => {
    const loadPosts = async () => {
      const response = await api.get('/posts/my_posts/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setPosts(response.data)
    }
    loadPosts()
  }, [token])

  useEffect(() => {
    const loadFollowingList = async () => {
      const response = await api.get('/accounts/following/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setFollowingList(response.data)
    }
    loadFollowingList()
  }, [token])

  async function handleDeletePost(postId: number) {
    try {
      await api.delete(`/posts/${postId}/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setPosts((prev) => prev.filter((p) => p.id !== postId))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="min-h-screen bg-[#0B0B15]">
        <div className="flex max-w mx-auto gap-8 p-8 flex-col lg:flex-row">
          <Aside />
          <main className="flex-1">
            <div className="flex max-w-350 mx-auto gap-8 flex-col">
              <GlassCard className="p-6 mb-8 bg-linear-to-b from-white/10 to-white/5">
                <div className="flex justify-between mb-3">
                  <h2 className="text-3xl">Meus Dados:</h2>
                  <button
                    onClick={() => setEdit(true)}
                    className="cursor-pointer"
                  >
                    <Icon name="pencil" size={24} fill="transparent" />
                  </button>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col">
                  <div className="flex justify-around items-center lg:justify-evenly">
                    <div className="flex flex-col items-center gap-2">
                      <div>
                        <Avatar
                          size="lg"
                          src={avatarPreview || user?.avatar || undefined}
                          alt=""
                          className="border-0"
                        />
                      </div>
                      <input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleAvatarChange}
                        disabled={!edit}
                      />
                      <div>
                        <label
                          htmlFor="avatar-upload"
                          className={
                            !edit
                              ? 'opacity-50'
                              : 'text-gray-200 cursor-pointer hover:text-white'
                          }
                        >
                          Adicionar Avatar
                        </label>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 mb-2 p-2 border-b border-white/5 w-100 lg:w-200">
                      <div className="flex flex-col gap-2 mb-2 p-2 border-b border-white/5">
                        <label>Nome de Usuario:</label>
                        <input
                          type="text"
                          placeholder={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className={
                            edit ? 'text-white pl-2' : 'text-gray-500 pl-2'
                          }
                          {...inputProps}
                        ></input>
                      </div>
                      <div className="flex flex-col gap-2 mb-2 p-2 border-b border-white/5">
                        <label>Email:</label>
                        <input
                          type="email"
                          placeholder={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className={
                            edit ? 'text-white pl-2' : 'text-gray-500 pl-2'
                          }
                          {...inputProps}
                        ></input>
                      </div>
                      <div className="flex flex-col gap-2 mb-2 p-2 border-b border-white/5">
                        <label>Senha:</label>
                        <input
                          type="password"
                          placeholder={"************************"}
                          onChange={(e) => setPassword(e.target.value)}
                          className={
                            edit ? 'text-white pl-2' : 'text-gray-500 pl-2'
                          }
                          {...inputProps}
                        ></input>
                      </div>
                    </div>
                  </div>
                  <div className="flex mt-3 gap-3">
                    <Button
                      children={'Salvar'}
                      type="submit"
                      variant="primary"
                      disabled={!edit}
                    />
                    <Button
                      children={'Cancelar'}
                      variant="secondary"
                      className="px-2"
                      disabled={!edit}
                    />
                  </div>
                </form>
              </GlassCard>
              <div className="flex justify-around gap-5">
                <div className="w-300">
                  <h2 className="font-bold mb-3 lg:text-lg">Meus Posts</h2>
                  <GlassCard className="flex flex-col gap-3 max-h-200 p-2 mb-8 bg-linear-to-b from-white/5 to-white/1 overflow-auto scrollbar-custom">
                    {posts.map((post) => (
                      <div key={post.id} className="relative gap-2 border-b-2">
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className="absolute top-2 right-4 z-10 cursor-pointer hover:text-red-600"
                        >
                          <Icon name="trash" size={20} fill="transparent" />
                        </button>
                        <PostCard
                          key={post.id}
                          post={post}
                          onUpdateComments={updatePostComments}
                        />
                      </div>
                    ))}
                  </GlassCard>
                </div>
                <div className="w-200">
                  <h2 className="font-bold mb-3  lg:text-lg">Following</h2>
                  <GlassCard className="flex flex-col p-2 mb-8 bg-linear-to-b from-white/5 to-white/1 overflow-auto">
                    {followingList.map((following) => (
                      <div key={following.id}>
                        <MeFollowingListCard mefollowinglist={following} />
                      </div>
                    ))}
                  </GlassCard>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
