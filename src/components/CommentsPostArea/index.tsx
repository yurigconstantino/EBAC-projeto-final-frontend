import type { CommentsPostAreaProps } from '../../types/CommentsPostAreaProps'
import { Avatar } from '../Avatar'

export const CommentsPostArea = ({
  commentText,
  onChange,
  onClick,
  commentList
}: CommentsPostAreaProps) => {
  return (
    <>
      {/* Secção de Comentários */}
      <div className="mt-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
        {/* Input de Novo Comentário */}
        <div className="flex gap-3 items-start bg-white/5 p-3 rounded-2xl border border-white/5">
          <Avatar
            alt=""
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
          />
          <div className="flex-1 flex flex-col gap-2">
            <textarea
              value={commentText}
              onChange={onChange}
              placeholder="Escreve um comentário..."
              className="w-full bg-transparent border-none text-sm text-white placeholder-gray-500 outline-none resize-none h-12"
            />
            <div className="flex justify-end">
              <button
                onClick={onClick}
                disabled={!commentText.trim()}
                className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-bold py-1.5 px-4 rounded-xl transition"
              >
                Comentar
              </button>
            </div>
          </div>
        </div>

        {/* Lista de Comentários */}
        <div className="space-y-4 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
          {commentList.length < 1 ? (
            <p className="text-center text-gray-500 text-xs py-4">
              Sê o primeiro a comentar!
            </p>
          ) : (
            commentList.map((comment) => (
              <div key={comment.id} className="flex gap-3 group">
                <Avatar alt="" src={comment.avatar} />
                <div className="flex-1 bg-white/5 p-3 rounded-2xl border border-transparent group-hover:border-white/10 transition">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-xs text-indigo-300">
                      {comment.name}
                    </span>
                    <span className="text-[10px] text-gray-500">
                      {comment.time}
                    </span>
                  </div>
                  <p className="text-xs text-gray-200 font-light">
                    {comment.content}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  )
}
