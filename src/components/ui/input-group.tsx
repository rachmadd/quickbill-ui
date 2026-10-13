'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { InputBase, type BaseInputProps } from '@/components/ui/input'
import { TextArea } from '@/components/ui/textarea'

// DEFAULT
// --input_group-ring: var(--qb-input);
// --input_group-focus_visible-ring: var(--ring);
// --input_group-bg: var(--qb-mist-0);
//
// GHOST
// --input_group-ghost-border: transparent;
// --input_group-ghost-bg: transparent;
//
// FILLED
// --input_group-filled-bg: var(--qb-mist-10);
// --input_group-filled-focus-ring: var(--qb-mist-10);
// --input_group-filled-border: transparent;

export const inputGroupCva = cva('', {
  variants: {
    variant: {
      filled:
        'bg-input_group-filled-bg focus-visible:ring-input_group-filled-focus-ring border-input_group-filled-border',
      ghost: 'border-input_group-ghost-border bg-input_group-ghost-bg',
      default:
        'ring-input_group-ring has-[[data-slot=input-group-control]:focus-visible]:ring-input_group-focus_visible-ring bg-input_group-bg ring',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export type InputGroupProps = Omit<React.ComponentProps<'div'>, 'prefix' | 'size'> &
  VariantProps<typeof inputGroupCva>
function InputGroup({ className, variant, ...props }: InputGroupProps) {
  return (
    <div
      data-slot="input-group"
      role="group"
      className={cn(
        inputGroupCva({ variant }),
        'group/input-group relative flex w-full items-center transition-[color,box-shadow] outline-none',
        'min-w-0 has-[>textarea]:h-auto',
        'data-[input-size=xs]:rounded-[5px]',
        'data-[input-size=sm]:rounded-[6px]',
        'data-[input-size=default]:rounded-[8px] [data-[input-size=default]>input]:max-h-2',
        'data-[input-size=lg]:rounded-[10px]',

        'data-[disabled=true]:bg-qb-mist-10 data-[disabled=true]:text-qb-mist-50',

        // Variants based on alignment.
        'has-[>[data-align=inline-start]]:[&>input]:pl-2',
        'has-[>[data-align=inline-end]]:[&>input]:pr-2',
        'has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>[data-align=block-start]]:[&>input]:pb-3',
        'has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-end]]:[&>input]:pt-3',

        // Error state.
        'aria-invalid:ring-qb-destructive',
        '[&[aria-invalid=true]:not(:has([data-slot=input-group-control]:focus-visible))]:ring-qb-destructive',

        className,
      )}
      {...props}
    />
  )
}

const inputGroupAddonVariants = cva(
  "text-muted-foreground flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium select-none group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-6",
  {
    variants: {
      align: {
        'inline-start':
          'order-first pl-2 group-data-[input-size=default]/input-group:ml-0.5 group-data-[input-size=lg]/input-group:ml-0.5 group-data-[input-size=sm]/input-group:ml-1 has-[>button]:ml-[-0.3rem] has-[>kbd]:ml-[-0.15rem]',
        'inline-end':
          'order-last pr-2 group-data-[input-size=default]/input-group:mr-0.5 group-data-[input-size=lg]/input-group:mr-0.5 group-data-[input-size=sm]/input-group:mr-1 has-[>button]:mr-[-0.3rem] has-[>kbd]:mr-[-0.15rem]',
        'block-start':
          'order-first w-full justify-start px-2.5 pt-2 group-has-[>input]/input-group:pt-2 [.border-b]:pb-2',
        'block-end':
          'order-last w-full justify-start px-2.5 pb-2 group-has-[>input]/input-group:pb-2 [.border-t]:pt-2',
      },
    },
    defaultVariants: {
      align: 'inline-start',
    },
  },
)

function InputGroupAddon({
  className,
  align = 'inline-start',
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof inputGroupAddonVariants>) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest('button')) {
          return
        }
        e.currentTarget.parentElement?.querySelector('input')?.focus()
      }}
      {...props}
    />
  )
}

const inputGroupButtonVariants = cva('flex items-center gap-2 text-sm shadow-none', {
  variants: {
    size: {
      xs: "h-6 gap-1 rounded-[calc(var(--radius)-3px)] px-1.5 [&>svg:not([class*='size-'])]:size-3.5",
      sm: '',
      'icon-xs': 'size-6 rounded-[calc(var(--radius)-3px)] p-0 has-[>svg]:p-0',
      'icon-sm': 'size-8 p-0 has-[>svg]:p-0',
    },
  },
  defaultVariants: {
    size: 'xs',
  },
})

function InputGroupButton({
  className,
  type = 'button',
  variant = 'ghost',
  size = 'sm',
  ...props
}: Omit<React.ComponentProps<typeof Button>, 'size' | 'type'> &
  VariantProps<typeof inputGroupButtonVariants> & {
    type?: 'button' | 'submit' | 'reset'
  }) {
  return (
    <Button
      type={type}
      data-size={size}
      variant={variant}
      className={cn(inputGroupButtonVariants({ size }), className)}
      {...props}
    />
  )
}

function InputGroupText({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      className={cn(
        "text-muted-foreground flex items-center gap-2 text-sm [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  )
}

const InputGroupInput = React.forwardRef<HTMLInputElement, BaseInputProps>(
  ({ className, inputSize, ...props }, ref) => {
    return (
      <InputBase
        data-slot="input-group-control"
        className={cn(
          'flex-1 rounded-none border-0 bg-transparent shadow-none ring-0 focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0 dark:bg-transparent dark:disabled:bg-transparent',
          className,
        )}
        data-input-size={inputSize}
        inputSize={inputSize}
        ref={ref}
        {...props}
      />
    )
  },
)
InputGroupInput.displayName = 'InputGroupInput'

function InputGroupTextarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <TextArea
      data-slot="input-group-control"
      className={cn(
        'flex-1 resize-none rounded-none border-0 bg-transparent py-2 shadow-none ring-0 focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0 dark:bg-transparent dark:disabled:bg-transparent',
        className,
      )}
      {...props}
    />
  )
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
}
