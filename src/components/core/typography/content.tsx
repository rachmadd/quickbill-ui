'use client'
import { cn } from '@/lib/utils'
import type { FC } from 'react'

export type ContentProps = React.ComponentProps<'div'> & {
  strong?: boolean
  level?: 'md' | 'sm'
}

const Content: FC<ContentProps> = ({ className, level = 'md', strong = false, ...props }) => (
  <div
    className={cn(
      level === 'md' && 'text-[14px] leading-[24px]',
      level === 'sm' && 'text-[12px] leading-[20px]',
      strong ? 'font-semibold' : 'font-normal',
      'text-qb-mist-90',
      className,
    )}
    {...props}
  >
    {props.children}
  </div>
)

export { Content }
