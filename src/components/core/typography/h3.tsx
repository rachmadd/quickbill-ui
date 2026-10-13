'use client'
import { cn } from '@/lib/utils'
import type { FC, HTMLAttributes } from 'react'

const H3: FC<HTMLAttributes<HTMLHeadingElement>> = ({ className, ...props }) => (
  <h3 className={cn('text-qb-mist-90 text-[28px] leading-[40px] font-bold', className)} {...props}>
    {props.children}
  </h3>
)

export { H3 }
