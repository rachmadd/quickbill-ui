import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'

const cardCva = cva('rounded-2xl', {
  variants: {
    variant: {
      default: 'bg-qb-mist-0 shadow-elevation-xl',
      outlined: 'border-qb-mist-30 border bg-transparent',
      filled: 'bg-qb-mist-10',
    },
    size: {
      none: '',
      sm: 'p-2',
      md: 'p-4',
      lg: 'p-6',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'none',
  },
})

export type CardProps = React.ComponentProps<'div'> &
  VariantProps<typeof cardCva> & {
    asChild?: boolean
  }

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div'

    return <Comp className={cn(cardCva({ variant, size, className }))} {...props} ref={ref} />
  },
)

Card.displayName = 'Card'
