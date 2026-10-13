'use client'
import { cn } from '@/lib/utils'
import type { FC } from 'react'

export type LinkProps = {
  level?: 'md' | 'sm'
  as?: React.ElementType
} & React.ComponentProps<'a'>

const Link: FC<LinkProps> = ({ className, level = 'md', as: Component = 'a', ...props }) => (
  <Component
    className={cn(
      'text-qb-blue-60 hover:text-qb-blue-70 font-semibold underline underline-offset-4 hover:cursor-pointer',
      level === 'md' && 'text-[14px] leading-[24px]',
      level === 'sm' && 'text-[12px] leading-[20px]',
      className,
    )}
    {...props}
  >
    {props.children}
  </Component>
)

export { Link }
