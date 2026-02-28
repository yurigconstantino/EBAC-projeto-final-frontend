import { GlassCard } from '../GlassCard'
import { Avatar } from '../Avatar'
import { CommentsPostArea } from '../CommentsPostArea'
import type { CommentData, PostCardProps } from '../../types/PostProps'
import * as usePostStats from '../../hooks/usePostStats'
import { PostButtons } from '../PostButtons'

export const PostCard = ({ post, currentUser }: PostCardProps) => {
  const { like, setLike } = usePostStats.useLiked(false)
  const { likes, setLikes } = usePostStats.useLikes(post.stats.likes)
  const { showComments, setShowComments } = usePostStats.useShowComments(false)
  const { commentText, setCommentText } = usePostStats.useCommentsText('')
  const { comments, setComments } = usePostStats.useComments(post.commentsList)

  const toggleLike = () => {
    setLikes(like ? likes - 1 : likes + 1)
    setLike(!like)
  }

  const handleAddComment = () => {
    if (!commentText.trim()) return
    const newComment: CommentData = {
      id: Date.now(),
      name: currentUser.name,
      handle: currentUser.handle,
      avatar: currentUser.avatar,
      content: commentText,
      time: 'Agora'
    }
    setComments([newComment, ...comments])
    setCommentText('')
  }
  return (
    <>
      <GlassCard className="p-6 mb-6 hover:border-violet-500/30">
        <div className="flex gap-4">
          <Avatar alt="" src={post.avatar} />
          <div className="flex-1">
            <div className="flex justify-between mb-2">
              <div>
                <h3 className="font-bold text-white text-lg">{post.name}</h3>
                <span className="text-indigo-300/60 text-sm">
                  {post.handle} • {post.time}
                </span>
              </div>
            </div>
            <p className="text-gray-100 mb-4 font-light">{post.content}</p>
            {post.image && (
              <img
                src={post.image}
                className="rounded-2xl border border-white/5 mb-4 w-full"
              />
            )}
            <div className="flex items-center gap-6 pt-4 border-t border-white/5 text-gray-400">
              <PostButtons
                onClick={() => setShowComments(!showComments)}
                className={`flex items-center gap-2 cursor-pointer transition ${showComments ? 'text-cyan-400' : 'hover:text-cyan-400'}`}
                children={post.stats.comments}
                iconName="message-square"
              />
              <PostButtons
                onClick={toggleLike}
                className={`flex items-center gap-2 cursor-pointer transition ${like ? 'text-pink-500' : 'hover:text-pink-500'}`}
                children={likes}
                iconName="heart"
                fill={like ? 'currentColor' : 'none'}
              />
              <PostButtons
                onClick={() => setShowComments(!showComments)}
                className="ml-auto text-xs flex items-center gap-1 cursor-pointer hover:text-white transition"
                iconName={showComments ? 'chevron-up' : 'chevron-down'}
                children={showComments ? 'Ocultar' : 'Ver comentários'}
              />
            </div>
            {/* Secção de Comentários */}
            {showComments && (
              <CommentsPostArea
                commentText={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onClick={handleAddComment}
                commentList={comments}
              />
            )}
          </div>
        </div>
      </GlassCard>
    </>
  )
}
