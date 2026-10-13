import React from 'react'
import { cn } from '../../lib/utils'
import type { IconProps } from './types'
export * from './types'
import { iconPaths } from './paths'

export type IconNames = keyof typeof iconPaths

export const Icon: React.FC<IconProps> = ({ name, className, size = 24 }) => {
  const IconComponent = iconPaths[name]
  if (IconComponent) {
    return <IconComponent width={size} height={size} className={cn(className)} />
  }
  return null
}

export * from './paths'
