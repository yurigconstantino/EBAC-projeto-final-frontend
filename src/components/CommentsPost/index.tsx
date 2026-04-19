import type { Comment } from '../../types/comment'
import { Avatar } from '../Avatar'

export const CommentsPost = ({ id, username, avatar, content }: Comment) => {
  return (
    <div className="space-y-4 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
      <div key={id} className="flex gap-3 group">
        <Avatar alt="" src={avatar || 'https://dummyimage.com/80x80.png'} />
        <div className="flex-1 bg-white/5 p-3 rounded-2xl border border-transparent group-hover:border-white/10 transition">
          <div className="flex justify-between items-center mb-1">
            <span className="font-bold text-xs text-indigo-300">
              {username}
            </span>
          </div>
          <p className="text-xs text-gray-200 font-light">{content}</p>
        </div>
      </div>
    </div>
  )
}
