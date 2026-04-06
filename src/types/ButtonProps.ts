import type { ReactNode } from "react"

export interface ButtonProps {
  children: boolean | ReactNode
  onClick: () => void
  variant: 'primary' | 'secondary' | 'ghost' | 'action'
  className: string
  disabled?: boolean
}
