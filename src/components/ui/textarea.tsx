import * as React from 'react'

import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { TypographyContent } from '../core/typography'

const textAreaCva = cva('', {
  variants: {
    variant: {
      ghost: 'bg-transparent',
      default:
        'border-qb-input focus-within:border-ring focus-within:ring-ring/20 border bg-white focus-within:ring-[2px]',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

const baseSizeStyles = {
  textarea: 'flex-1 min-h-0 px-3 py-3 text-sm',
  counter: 'h-[21px] px-3 text-xs leading-[21px]',
} as const

export type TextAreaProps = {
  className?: string
  textareaClassName?: string
  maxLength?: number
  showCounter?: boolean
  variant?: VariantProps<typeof textAreaCva>['variant']
} & Omit<React.ComponentProps<'textarea'>, 'maxLength'>

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      className,
      textareaClassName,
      maxLength,
      showCounter,
      variant = 'default',
      value,
      defaultValue,
      onChange,
      disabled,
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue?.toString() || '')

    const isControlled = value !== undefined
    const currentValue = isControlled ? value.toString() : internalValue
    const characterCount = currentValue.length
    const shouldShowCounter = maxLength !== undefined && showCounter !== false

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (!isControlled) {
        setInternalValue(e.target.value)
      }
      onChange?.(e)
    }

    return (
      <div
        data-slot="textarea"
        aria-invalid={props['aria-invalid'] || undefined}
        data-disabled={disabled || undefined}
        className={cn(
          'relative flex w-full flex-col transition-[color,box-shadow] outline-none',
          'h-[116px] gap-[3px] rounded-lg',
          textAreaCva({ variant }),
          'aria-invalid:ring-qb-destructive/10 aria-invalid:border-qb-destructive',
          disabled && 'cursor-not-allowed opacity-50',
          className,
        )}
      >
        <textarea
          ref={ref}
          data-slot="textarea"
          disabled={disabled}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          maxLength={maxLength}
          className={cn(
            'placeholder:text-qb-mist-40 selection:bg-qb-primary selection:text-qb-primary-foreground w-full min-w-0 rounded-md font-medium outline-none placeholder:font-normal md:text-sm',
            'resize-none bg-transparent',
            'disabled:cursor-not-allowed',
            baseSizeStyles.textarea,
            textareaClassName,
          )}
          {...props}
        />
        {shouldShowCounter && (
          <div
            data-slot="textarea-counter"
            className={cn('flex items-center justify-end select-none')}
          >
            <TypographyContent level="sm" className="text-qb-mist-50 px-2 pt-0.5 pb-2 font-normal">
              {maxLength ? `${characterCount}/${maxLength}` : characterCount}
            </TypographyContent>
          </div>
        )}
      </div>
    )
  },
)

TextArea.displayName = 'TextArea'

export { TextArea, textAreaCva }
