'use client'
import { cn } from '@/lib/utils'
import type { FC, HTMLAttributes } from 'react'

const H2: FC<HTMLAttributes<HTMLHeadingElement>> = ({ className, ...props }) => (
  <h2 className={cn('text-qb-mist-90 text-[36px] leading-[60px] font-bold', className)} {...props}>
    {props.children}
  </h2>
)

export { H2 }
