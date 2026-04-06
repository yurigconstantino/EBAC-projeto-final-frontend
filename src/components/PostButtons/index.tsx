import type { PostButtonsProps } from '../../types/PostButtonsProps'
import { Icon } from '../Icon'

export const PostButtons = ({
  onClick,
  className,
  children,
  iconName,
  fill
}: PostButtonsProps) => (
  <button onClick={onClick} className={className}>
    <Icon name={iconName} size={18} fill={fill} />
    {children}
  </button>
)
