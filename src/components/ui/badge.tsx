import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

export const badgeVariants = {
  default: 'border-qb-blue-60 bg-qb-blue-20 text-qb-blue-60',
  success: 'border-qb-success-main bg-qb-success-10 text-qb-success-main',
  secondary: 'border-qb-mist-70 bg-qb-mist-20 text-qb-mist-70',
  destructive: 'border-qb-negative-main bg-qb-negative-10 text-qb-negative-main',
  warning: 'border-qb-warning-main bg-qb-warning-10 text-qb-warning-main',
  honeycomb: 'border-qb-daisy-70 bg-qb-daisy-20 text-qb-daisy-70',
} as const

export const badgeSizes = {
  default: 'min-h-[26px] text-xs',
  sm: 'min-h-[22px] text-[11px]',
  lg: 'min-h-[30px] text-sm',
  xl: 'min-h-[34px]  px-1 text-sm',
} as const

const badgeCva = cva(
  'inline-flex items-center justify-center select-none align-middle select-none ' +
    'font-medium whitespace-nowrap border-[0.5px] py-[3px] px-[4px]',
  {
    variants: {
      variant: badgeVariants,
      size: badgeSizes,
      pill: {
        true: 'rounded-full',
        false: 'rounded-md',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

type BadgeProps = React.ComponentProps<'span'> &
  VariantProps<typeof badgeCva> & {
    asChild?: boolean
  }

function Badge({
  className,
  variant = 'default',
  size = 'default',
  pill = true,
  asChild = false,
  ...props
}: BadgeProps) {
  const Comp = asChild ? Slot : 'span'
  return (
    <Comp data-slot="badge" className={cn(badgeCva({ variant, size, pill }), className)} {...props}>
      <span className="flex items-center px-[6px] leading-none">{props.children}</span>
    </Comp>
  )
}

export { Badge, badgeCva }
