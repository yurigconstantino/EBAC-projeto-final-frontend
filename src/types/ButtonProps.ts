import type { ReactNode } from 'react'

export interface ButtonProps {
  children: boolean | ReactNode
  onClick?: () => void
  OnChange?: () => void
  type?: "submit" | "reset" | "button"
  variant: 'primary' | 'secondary' | 'ghost' | 'action'
  className: string
  disabled?: boolean
}
