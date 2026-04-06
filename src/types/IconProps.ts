import { DynamicIcon } from 'lucide-react/dynamic'
export interface IconProps {
  name: React.ComponentProps<typeof DynamicIcon>['name']
  size: number
  fill?: string
}
