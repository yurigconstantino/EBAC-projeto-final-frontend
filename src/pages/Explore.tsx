import { api } from '../services/api'
import { useEffect, useState } from 'react'
import { type Post } from '../types/Post'
import { updatePostCommentsCount } from '../utils/posts'
import Aside from '../components/NavMenu'
import { PostCard } from '../components/PostCard'

export default function Explore() {
  const [posts, setPosts] = useState<Post[]>([])

  const token = localStorage.getItem('token')

  const updatePostComments = (postId: number, newCount: number) => {
    setPosts((prev) => updatePostCommentsCount(prev, postId, newCount))
  }

  useEffect(() => {
    const loadPosts = async () => {
      const response = await api.get('/posts/explore/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setPosts(response.data)
    }
    loadPosts()
  }, [token])

  return (
    <div className="min-h-screen bg-[#0B0B15]">
      <div className="flex max-w mx-auto gap-8 p-8 flex-col lg:flex-row">
        <Aside />
        <main className="flex-1 max-w-300">
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
