import type { ComponentType } from 'react'
import type { iconPaths } from './paths'
export type TIconComponent = ComponentType<{ width: number; height: number }>

export type IconProps = {
  name: keyof typeof iconPaths
  size?: number
  className?: string
}
