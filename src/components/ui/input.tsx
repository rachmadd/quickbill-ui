import * as React from 'react'
import { Input as InputPrimitive } from '@base-ui/react/input'

import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

export const inputCva = cva('', {
  variants: {
    variant: {
      filled: 'bg-inp-filled-bg focus-visible:ring-inp-filled-focus-ring border-transparent',
      ghost: 'bg-inp-ghost-bg',
      default:
        'border-inp-border focus-visible:border-inp-focus-border focus-visible:ring-inp-focus-ring/20 border bg-inp-bg focus-visible:ring-[2px]',
    },
    inputSize: {
      lg: 'h-14 px-4 pt-4 pb-[17px]',
      default: 'h-12 px-3 pt-3 pb-[13px]',
      sm: 'h-9 px-3 pt-2 pb-[9px]',
      xs: 'h-7 px-2 pt-1.5 pb-[5.5px] text-xs placeholder:text-xs',
    },
  },
  defaultVariants: {
    variant: 'default',
    inputSize: 'default',
  },
})

export type BaseInputProps = React.ComponentProps<'input'> & VariantProps<typeof inputCva>

const InputBase = React.forwardRef<HTMLInputElement, BaseInputProps>(
  ({ className, type, variant, inputSize, ...props }, ref) => {
    return (
      <InputPrimitive
        type={type}
        data-slot="input"
        className={cn(
          'w-full min-w-0 rounded-md px-3 py-3',
          'placeholder:text-inp-placeholder-foreground placeholder:text-sm placeholder:font-normal',
          'selection:bg-inp-selection-bg selection:text-inp-selection-foreground',
          'disabled:bg-inp-disabled-bg disabled:text-inp-disabled-foreground disabled:placeholder:text-inp-disabled-placeholder-foreground/80 disabled:cursor-not-allowed disabled:rounded-md disabled:hover:cursor-not-allowed',
          `text-md font-semibold outline-none sm:text-sm md:text-sm`,
          `file:text-inp-file-foreground file:bg-inp-file-bg file:inline-flex file:h-7 file:border-0 file:text-sm file:font-medium`,
          'aria-invalid:ring-inp-aria_invalid-ring/20 aria-invalid:border-inp-aria_invalid-border',
          inputCva({ variant, inputSize }),
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
InputBase.displayName = 'InputBase'

export { InputBase }
