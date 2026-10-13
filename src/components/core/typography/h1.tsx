'use client'
import { cn } from '@/lib/utils'
import type { FC, HTMLAttributes } from 'react'

const H1: FC<HTMLAttributes<HTMLHeadingElement>> = ({ className, ...props }) => (
  <h1 className={cn('text-qb-mist-90 text-[48px] leading-[60px] font-bold', className)} {...props}>
    {props.children}
  </h1>
)

export { H1 }
