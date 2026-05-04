import { useEffect, useState } from 'react'
import Aside from '../components/NavMenu'
import { api } from '../services/api'
import { type Post } from '../types/Post'
import { PostCard } from '../components/PostCard'
import { GlassCard } from '../components/GlassCard'
import { Button } from '../components/Button'
import { Icon } from '../components/Icon'

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([])
  const [content, setContent] = useState('')
  const [image, setImage] = useState<File | null>(null)

  const token = localStorage.getItem('token')

  const updatePostComments = (postId: number, newCount: number) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, comments_count: newCount } : p
      )
    )
  }

  async function fetchPosts() {
    const response = await api.get('/posts/', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    setPosts(response.data)
  }

  useEffect(() => {
    const loadPosts = async () => {
      const response = await api.get('/posts/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setPosts(response.data)
    }
    loadPosts()
  }, [token])

  async function handleCreatePost(e: React.FormEvent) {
    e.preventDefault()

    const formData = new FormData()
    formData.append('content', content)

    if (image) {
      formData.append('image', image)
    }

    await api.post('/posts/', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    })

    setContent('')
    setImage(null)
    fetchPosts()
  }

  return (
    <div className="min-h-screen bg-[#0B0B15]">
      <div className="flex max-w-350 mx-auto gap-8 p-8 flex-col lg:flex-row">
        <Aside />
        <main className="flex-1 max-w-200">
          <GlassCard className="p-6 mb-8 bg-linear-to-b from-white/10 to-white/5">
            <div className="flex-1">
              <form onSubmit={handleCreatePost}>
                <textarea
                  className="w-full bg-transparent border-none text-white placeholder-indigo-200/50 outline-none h-20 resize-none"
                  placeholder="Novo comentario"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <div className="flex justify-between items-center">
                  <input
                    id="file-input"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files) {
                        setImage(e.target.files[0])
                      }
                    }}
                    className="hidden"
                  />
                  <label
                    htmlFor="file-input"
                    className="cursor-pointer text-gray-500 hover:text-white"
                  >
                    <Icon name="image-up" size={24} fill="transparent" />
                  </label>
                  <Button
                    variant={!content ? 'action' : 'primary'}
                    className=""
                    type="submit"
                    disabled={!content}
                  >
                    Postar
                  </Button>
                </div>
              </form>
            </div>
          </GlassCard>

          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onUpdateComments={updatePostComments}
            />
          ))}
        </main>
      </div>
    </div>
  )
}
