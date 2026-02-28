import type { IconProps } from "./IconProps"

export type PostButtonsProps = {
  onClick: () => void
  className: string
  children: number | string
  iconName: IconProps['name']
  fill?: IconProps['fill']
}
