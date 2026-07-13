import type { AvatarProps } from '../../types/AvatarProps'

export const Avatar = ({ src, alt, size = 'md', className }: AvatarProps) => {
  const sizes = { sm: 'w-10 h-10', md: 'w-12 h-12', lg: 'w-32 h-32' }
  const imgSrc = src

  if (!src) {
    return (
      <div
        className={`${sizes[size]} ${className} rounded-2xl bg-indigo-900/50 border-2 border-white/10 shadow-lg`}
        aria-hidden="true"
      ></div>
    )
  }

  return (
    <div>
      <img
        src={imgSrc}
        alt={alt}
        className={`${sizes[size]} ${className} rounded-2xl object-cover bg-indigo-900/50 border-2 border-white/10 shadow-lg`}
      />
    </div>
  )
}
