import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

const statusDotCva = cva('h-3 w-3 flex-shrink-0 rounded-full', {
  variants: {
    variant: {
      success: 'bg-qb-success-main',
      warning: 'bg-qb-warning-main',
      error: 'bg-qb-negative-main',
      info: 'bg-qb-blue-50',
      default: 'bg-qb-mist-50',
    },
  },
  defaultVariants: {
    variant: 'info',
  },
})

function VerticalProgressItemDot({
  className,
  variant,
  showLine = true,
  ...props
}: React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof statusDotCva> & { showLine?: boolean }) {
  return (
    <div className={cn('relative mr-1 shrink-0', className)} {...props}>
      <div
        data-slot="vertical-progress-dot"
        className={cn(statusDotCva({ variant }), 'mt-1.5', 'relative z-5')}
      />
      {showLine && (
        <div
          data-slot="vertical-progress-line"
          className={cn(
            'absolute left-1/2 -translate-x-1/2',
            'top-2.5',
            'bottom-[-4px]',
            'bg-qb-mist-30 w-[1px]',
          )}
        />
      )}
    </div>
  )
}

type VerticalProgressComponentProps = React.ComponentProps<'div'> & {
  showLine?: boolean
  items: {
    key: string
    variant: VariantProps<typeof statusDotCva>['variant']
    content: React.ReactNode
  }[]
}

const VerticalProgress: React.FC<VerticalProgressComponentProps> = ({
  className,
  items,
  showLine = false,
  ...props
}) => {
  return (
    <div {...props} className={cn('', className)}>
      {items.map((item, index) => (
        <div key={item.key} className="flex gap-2">
          <VerticalProgressItemDot
            variant={item.variant}
            showLine={showLine || index < items.length - 1}
          />
          <div className="">{item.content}</div>
        </div>
      ))}
    </div>
  )
}

export { VerticalProgress }
