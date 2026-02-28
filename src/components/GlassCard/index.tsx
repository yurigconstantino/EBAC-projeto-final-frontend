import type { GlassCardProps } from '../../types/GlassCardProps'

export const GlassCard = ({ children, className }: GlassCardProps) => (
  <div
    className={`bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl rounded-3xl glass-card ${className}`}
  >
    {children}
  </div>
)
