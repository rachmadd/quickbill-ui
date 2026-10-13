'use client'

import { Radio as RadioPrimitive } from '@base-ui/react/radio'
import { RadioGroup as RadioGroupPrimitive } from '@base-ui/react/radio-group'

import { cn } from '@/lib/utils'

function RadioGroupRoot({ className, ...props }: RadioGroupPrimitive.Props) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      className={cn('grid w-full gap-3', className)}
      {...props}
    />
  )
}

function RadioGroupItem({
  className,
  ...props
}: RadioPrimitive.Root.Props & { variant?: 'default' | 'inset' }) {
  return (
    <RadioPrimitive.Root
      data-slot="radio-group-item"
      data-variant={props.variant || 'default'}
      className={cn(
        'group/radio-group-item peer relative flex aspect-square size-5 shrink-0 rounded-full border-2 border-[rgba(0,0,0,0.6)] outline-none after:absolute after:-inset-x-3 after:-inset-y-2 hover:cursor-pointer',
        'data-disabled:bg-qb-mist-20 data-disabled:border-qb-mist-40 data-disabled:cursor-not-allowed data-disabled:opacity-80',
        'active:border-qb-blue-60 active:ring-ring/30 active:ring-3',
        'focus-visible:border-qb-ring focus-visible:ring-ring/50 focus-visible:ring-3',
        'data-checked:border-qb-blue-60 data-checked:data-[variant=inset]:bg-qb-blue-60',
        'aria-invalid:border-qb-destructive aria-invalid:ring-qb-destructive/30 aria-invalid:data-checked:border-qb-blue-60 aria-invalid:data-checked:ring-3',
        className,
      )}
      {...props}
    >
      <RadioPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="flex size-5 items-center justify-center"
      >
        <span className="bg-qb-blue-60 absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full group-data-[variant=inset]/radio-group-item:bg-white" />
      </RadioPrimitive.Indicator>
    </RadioPrimitive.Root>
  )
}

export { RadioGroupRoot, RadioGroupItem }
