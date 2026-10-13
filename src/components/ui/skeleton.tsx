import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const skeletonVariants = cva('bg-qb-mist-20 h-20 w-20 rounded-md', {
  variants: {
    variant: {
      neutral:
        'from-qb-mist-20 via-qb-mist-30 to-qb-mist-20 animate-[shimmer_1s_ease_infinite] bg-linear-[125deg] from-[25%] via-[30%] to-[40%] bg-size-[400%_120%]',
      primary:
        'from-qb-blue-20 via-qb-blue-30 to-qb-blue-20 animate-[shimmer_1s_ease_infinite] bg-linear-[125deg] from-[25%] via-[30%] to-[40%] bg-size-[400%_120%]',
      transparent:
        'animate-[shimmer_1s_ease_infinite] bg-white/10 bg-linear-[120deg] from-transparent via-white/50 to-transparent bg-size-[400%_120%] backdrop-blur-xl backdrop-saturate-100',
      inanimate:
        'from-qb-mist-20 via-qb-mist-30 to-qb-mist-20 bg-linear-[125deg] from-[25%] via-[30%] to-[40%] bg-size-[400%_120%]',
    },
    shape: {
      rectangle: 'rounded-md',
      circle: 'rounded-full',
    },
  },
  defaultVariants: {
    variant: 'neutral',
    shape: 'rectangle',
  },
})

function Skeleton({
  className,
  variant,
  shape,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof skeletonVariants>) {
  return (
    <div
      data-slot="skeleton"
      className={cn(skeletonVariants({ variant, shape }), className)}
      {...props}
    />
  )
}

export { Skeleton }
