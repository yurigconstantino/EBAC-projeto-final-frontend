import type { AvatarProps } from '../../types/AvatarProps'

export const Avatar = ({
  src,
  alt,
  size = 'md',
  glowing = true
}: AvatarProps) => {
  const sizes = { sm: 'w-10 h-10', md: 'w-12 h-12', lg: 'w-16 h-16' }
  return (
    <div
      className={`relative h-full ${glowing ? 'after:absolute after:inset-0 after:rounded-full after:shadow-[0_0_15px_rgba(139,92,246,0.5)]' : ''}`}
    >
      <img
        src={src}
        alt={alt}
        className={`${sizes[size]} rounded-2xl object-cover bg-indigo-900/50 border-2 border-white/10 shadow-lg`}
      />
    </div>
  )
}
