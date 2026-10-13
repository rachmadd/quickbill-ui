'use client'

import React from 'react'
import type { VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Icon } from '@/components/icons'
import { inputCva } from '../../input'
import { inputGroupCva } from '../../input-group'
import type { ClassNames } from './types'

export type DatePickerTriggerProps = {
  displayText: string
  placeholder: string
  isAnyOpen: boolean
  disabled?: boolean
  'aria-invalid'?: boolean
  inputSize?: VariantProps<typeof inputCva>['inputSize']
  variant?: VariantProps<typeof inputGroupCva>['variant']
  className?: string
  classNames?: Pick<ClassNames, 'trigger'>
  hasPresets?: boolean
  onClick?: () => void
  triggerRef?: React.RefObject<HTMLButtonElement | null>
}

export function DatePickerTrigger({
  displayText,
  placeholder,
  isAnyOpen,
  disabled,
  'aria-invalid': ariaInvalid,
  inputSize = 'default',
  variant = 'default',
  className,
  classNames,
  hasPresets,
  onClick,
  triggerRef,
}: DatePickerTriggerProps) {
  return (
    <button
      ref={triggerRef}
      type="button"
      disabled={disabled}
      data-popup-open={isAnyOpen || undefined}
      data-input-size={inputSize}
      aria-invalid={ariaInvalid}
      aria-haspopup={hasPresets ? 'listbox' : 'dialog'}
      aria-expanded={isAnyOpen}
      className={cn(
        'group/datepicker flex w-full items-center justify-between gap-1.5 rounded-lg bg-transparent py-2 pr-2 pl-2.5 text-sm whitespace-nowrap transition-colors outline-none select-none',
        'focus-visible:ring-ring/20 focus-visible:ring-3 focus-visible:ring-offset-1',
        'disabled:cursor-not-allowed disabled:opacity-50',
        inputCva({ inputSize, variant: 'ghost' }),
        inputGroupCva({ variant }),
        'data-popup-open:ring-ring data-popup-open:ring-[1px]',
        'data-[input-size=xs]:rounded-[5px] data-[input-size=xs]:text-xs',
        'data-[input-size=sm]:rounded-[6px]',
        'data-[input-size=default]:rounded-[8px]',
        'data-[input-size=lg]:rounded-[10px]',
        variant === 'ghost' && 'focus-visible:ring-0! data-popup-open:ring-0',
        'aria-invalid:ring-qb-destructive aria-invalid:ring',
        'text-qb-mist-90',
        classNames?.trigger,
        className,
      )}
      onClick={onClick}
    >
      {displayText ? (
        <span className="flex-1 truncate text-left font-semibold">{displayText}</span>
      ) : (
        <span className="text-qb-mist-50 flex-1 truncate text-left font-normal">{placeholder}</span>
      )}
      <Icon
        name="CalendarOutlined"
        className={cn(
          'pointer-events-none shrink-0 transition-colors',
          variant !== 'ghost' && 'group-data-popup-open/datepicker:text-qb-primary',
          inputSize === 'default' && 'size-5.5!',
          inputSize === 'xs' && 'size-4!',
          inputSize === 'sm' && 'size-4!',
          inputSize === 'lg' && 'size-6!',
        )}
      />
    </button>
  )
}
