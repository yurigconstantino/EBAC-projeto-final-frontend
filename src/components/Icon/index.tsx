import { DynamicIcon } from 'lucide-react/dynamic'
import type { IconProps } from '../../types/IconProps'

export const Icon = ({ name, size, fill}: IconProps) => (
  <DynamicIcon name={name} size={size} fill={fill} />
)
