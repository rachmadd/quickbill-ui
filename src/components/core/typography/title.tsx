'use client'
import { cn } from '@/lib/utils'
import type { FC, HTMLAttributes } from 'react'

export interface TitleProps extends HTMLAttributes<HTMLDivElement> {
  strong?: boolean
  level?: 'md' | 'sm'
}

const Title: FC<TitleProps> = ({ className, level = 'md', strong = false, ...props }) => (
  <div
    className={cn(
      level === 'md' && 'text-[24px] leading-[34px]',
      level === 'sm' && 'text-[18px] leading-[28px]',
      strong ? 'font-semibold' : 'font-normal',
      'text-qb-mist-90',
      className,
    )}
    {...props}
  >
    {props.children}
  </div>
)

export { Title }
