import { Button } from '../../components/Button'
import { GlassCard } from '../../components/GlassCard'
import { Avatar } from '../../components/Avatar'
import type { CreatePostCardProps } from '../../types/CreatePostCard'

export const CreatePostCard = ({ post, text, onChange }: CreatePostCardProps) => {
  return (
    <GlassCard className="p-6 mb-8 bg-linear-to-b from-white/10 to-white/5">
      <div className="flex gap-4">
        <Avatar
          alt="aa"
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
        />
        <div className="flex-1">
          <textarea
            className="w-full bg-transparent border-none text-white placeholder-indigo-200/50 outline-none h-20 resize-none"
            placeholder="O que estás a pensar?"
            value={text}
            onChange={onChange}
          />
          <div className="flex justify-end pt-4 border-t border-white/10">
            <Button
              variant="primary"
              className="px-8 py-2 text-sm"
              onClick={post}
              disabled={!text}
            >
              Publicar
            </Button>
          </div>
        </div>
      </div>
    </GlassCard>
  )
}
