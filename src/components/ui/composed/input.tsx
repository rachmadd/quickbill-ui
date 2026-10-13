import { type VariantProps } from 'class-variance-authority'
import React from 'react'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  inputGroupCva,
  InputGroupInput,
} from '../input-group'
import type { inputCva } from '../input'
import { cn } from '@/lib/utils'

export type InputProps = Omit<React.ComponentProps<'input'>, 'prefix' | 'suffix'> & {
  inputSize?: VariantProps<typeof inputCva>['inputSize']
  variant?: VariantProps<typeof inputGroupCva>['variant']
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  prefixButton?: {
    label?: string
    content: React.ReactNode
    onClick: () => void
  }
  suffixButton?: {
    label?: string
    content: React.ReactNode
    onClick: () => void
  }
  className?: string
  classNames?: {
    root?: string
    input?: string
    prefix?: string
    suffix?: string
  }
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant = 'default',
      prefix,
      suffix,
      prefixButton,
      suffixButton,
      inputSize = 'default',
      classNames,
      ...props
    },
    ref,
  ) => {
    return (
      <InputGroup
        data-input-size={inputSize}
        data-disabled={props.disabled}
        variant={variant}
        className={cn(className, classNames?.root)}
        aria-invalid={props['aria-invalid']}
      >
        <InputGroupInput
          {...props}
          className={cn(classNames?.input)}
          inputSize={inputSize}
          variant={variant}
          ref={ref}
        />
        {prefix && <InputGroupAddon className={cn(classNames?.prefix)}>{prefix}</InputGroupAddon>}
        {prefixButton && (
          <InputGroupAddon>
            <InputGroupButton
              onClick={prefixButton.onClick}
              title={prefixButton.label}
              size={'icon-xs'}
              aria-label={prefixButton.label}
            >
              {prefixButton.content}
            </InputGroupButton>
          </InputGroupAddon>
        )}

        {suffix && (
          <InputGroupAddon align="inline-end" className={cn(classNames?.suffix)}>
            {suffix}
          </InputGroupAddon>
        )}
        {suffixButton && (
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              onClick={suffixButton.onClick}
              title={suffixButton.label}
              size={'icon-xs'}
              aria-label={suffixButton.label}
            >
              {suffixButton.content}
            </InputGroupButton>
          </InputGroupAddon>
        )}
      </InputGroup>
    )
  },
)

Input.displayName = 'Input'
export { Input }
