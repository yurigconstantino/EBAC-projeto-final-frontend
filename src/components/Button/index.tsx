import type { ButtonProps } from '../../types/ButtonProps'

export const Button = ({
  children,
  onClick,
  variant = 'primary',
  className = '',
  disabled = false
}: ButtonProps) => {
  const baseStyle =
    'font-bold rounded-2xl transition-all duration-300 px-6 py-3 flex items-center justify-center cursor-pointer transform active:scale-95'
  const variants = {
    primary:
      'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg shadow-indigo-500/30 disabled:opacity-50',
    secondary:
      'bg-white/10 hover:bg-white/20 text-white border border-white/10 backdrop-blur-md',
    ghost:
      'text-gray-300 hover:text-white hover:bg-white/5 px-4 py-3 w-full  text-lg rounded-xl',
    action:
      'p-2 rounded-xl hover:bg-white/10 text-gray-400 hover:text-white transition-colors'
  }
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  )
}
