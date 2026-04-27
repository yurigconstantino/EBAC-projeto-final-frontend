import { Avatar } from '../Avatar'
import { GlassCard } from '../GlassCard'
import { PostButtons } from '../PostButtons'
import { type Post } from '../../types/Post'
import { useState } from 'react'
import type { Comment } from '../../types/comment'
import { api } from '../../services/api'
import { CommentsPost } from '../CommentsPost'
import { Button } from '../Button'

interface Props {
  post: Post
  onUpdateComments: (id: number, count: number) => void
}

export const PostCard = ({ post, onUpdateComments }: Props) => {
  const [showComments, setShowComments] = useState(false)
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')
  const [likesCount, setLikesCount] = useState(post.likes_count)
  const [liked, setLiked] = useState(post.liked_by_user)

  const token = localStorage.getItem('token')

  async function fetchComments() {
    const response = await api.get(`/posts/${post.id}/comments/`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    setComments(response.data)
    onUpdateComments(post.id, response.data.length)
  }

  async function handleToggleComments() {
    if (!showComments) {
      await fetchComments()
    }
    setShowComments(!showComments)
  }

  async function handleCreateComment(e: React.FormEvent) {
    e.preventDefault()

    if (!newComment.trim()) return

    await api.post(
      `/posts/${post.id}/comment/`,
      { content: newComment },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )
    setNewComment('')
    await fetchComments()
  }

  async function handleLike() {
    try {
      const response = await api.post(
        `/posts/${post.id}/like/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      setLiked(response.data.liked)
      setLikesCount(response.data.likes_count)
    } catch (error) {
      console.error(`Erro ao curtit post. ${error}`)
    }
  }

  return (
    <>
      <GlassCard className="p-6 mb-6 hover:border-violet-500/30">
        <div key={post.id} className="flex gap-4">
          <Avatar
            alt=""
            src={post.author_avatar || 'https://dummyimage.com/80x80.png'}
          />
          <div className="flex-1">
            <div className="flex justify-between items-center mb-5 border-b border-white/5 pb-2">
              <h3 className="font-bold text-white text-lg">
                {post.author_username}
              </h3>
              <Button
                children="Follow"
                variant="follow"
                onClick={() => ''}
                className="p-0.5"
              />
            </div>
            <p className="text-gray-100 mb-4 font-light">{post.content}</p>
            {post.image && (
              <img
                src={post.image}
                className="rounded-2xl border border-white/5 mb-4 w-full object-cover"
              />
            )}
            <div className="flex items-center gap-6 pt-4 border-t border-white/5 text-gray-400">
              <PostButtons
                onClick={handleToggleComments}
                className={
                  showComments
                    ? 'flex items-center gap-2 cursor-pointer transition text-violet-500 fill-violet-900'
                    : 'flex items-center gap-2 cursor-pointer transition hover:text-violet-500'
                }
                children={post.comments_count}
                iconName="message-square"
              />
              <PostButtons
                onClick={handleLike}
                className={
                  liked
                    ? 'flex items-center gap-2 cursor-pointer transition text-violet-700 fill-violet-950'
                    : 'flex items-center gap-2 cursor-pointer transition hover:text-violet-400'
                }
                children={likesCount}
                iconName="heart"
              />
            </div>
            {showComments && (
              <div className="mt-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                {/* Input de Novo Comentário */}
                <div className="flex gap-3 items-start bg-white/5 p-3 rounded-2xl border border-white/5">
                  <Avatar alt="" src="https://dummyimage.com/80x80.png" />
                  <div className="flex-1 flex flex-col gap-2">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Escreve um comentário..."
                      className="w-full bg-transparent border-none text-sm text-white placeholder-gray-500 outline-none resize-none h-12"
                    />
                    <div className="flex justify-end">
                      <button
                        onClick={handleCreateComment}
                        disabled={!newComment}
                        className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-bold py-1.5 px-4 rounded-xl transition"
                      >
                        Comentar
                      </button>
                    </div>
                  </div>
                </div>
                {comments.map((comment) => (
                  <CommentsPost
                    key={comment.id}
                    username={comment.username}
                    avatar={comment.avatar}
                    content={comment.content}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </GlassCard>
    </>
  )
}
