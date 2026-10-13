'use client'

import * as React from 'react'
import { Toggle as TogglePrimitive } from '@base-ui/react/toggle'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

export const toggleVariants = cva(
  [
    // NORMAL
    'inline-flex select-none items-center justify-center hover:cursor-pointer',
    'rounded-[8px] ring ring-qb-blue-20 bg-qb-mist-0',
    'text-qb-mist-70 font-normal',
    'transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-qb-blue-500/60',
    'disabled:opacity-50 disabled:pointer-events-none',
    'hover:bg-slate-50',

    // ON
    'data-pressed:text-qb-blue-70',
    'data-pressed:font-semibold',
    'data-pressed:ring-qb-blue-40',
    'data-pressed:bg-transparent',
  ].join(' '),
  {
    variants: {
      variant: {
        default: 'bg-qb-blue-10 text-qb-blue-50 data-pressed:bg-qb-blue-20 ring-0',
        outline: 'ring-qb-blue-20 bg-white',
        ghost: 'bg-transparent ring-transparent hover:bg-slate-50',
      },
      size: {
        sm: 'px-2.5 py-2 text-xs data-pressed:px-[9px]',
        default: 'px-3.5 py-2 text-sm data-pressed:px-[13px]',
        lg: 'px-4.5 py-2.5 text-sm data-pressed:px-[17px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export type ToggleVariantProps = VariantProps<typeof toggleVariants>

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive> & ToggleVariantProps
>(({ className, variant, size, ...props }, ref) => {
  return (
    <TogglePrimitive
      ref={ref}
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  )
})
Toggle.displayName = 'Toggle'

export { Toggle }
