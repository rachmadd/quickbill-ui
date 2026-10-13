import type React from 'react'
import type { Matcher } from 'react-day-picker'
import type { VariantProps } from 'class-variance-authority'
import type { inputCva } from '../../input'
import type { inputGroupCva } from '../../input-group'
import type { PopoverContent } from '../../popover'

export type DatePickerMode = 'single' | 'range'

export type DatePickerValue = {
  single: Date
  range: { from: Date; to?: Date }
}

/**
 * A preset option for the datepicker dropdown.
 * For 'single' mode, dateValue is a Date.
 * For 'range' mode, dateValue is { from: Date; to: Date } (both required).
 */
export type DatePickerPreset<M extends DatePickerMode = DatePickerMode> = {
  label: React.ReactNode
  dateValue: M extends 'single' ? Date : { from: Date; to: Date }
}

export type ClassNames = {
  /** Applied to the trigger button */
  trigger?: string
  /** Applied to the desktop dropdown popup */
  dropdown?: string
  /** Applied to the calendar */
  calendar?: string
  /** Applied to each preset item */
  dropdownItem?: string
}

export type DatePickerProps<M extends DatePickerMode = 'single'> = {
  mode?: M
  /** Controlled value */
  value?: DatePickerValue[M]
  /** Initial value for uncontrolled usage */
  defaultValue?: DatePickerValue[M]
  onValueChange?: (value: DatePickerValue[M] | undefined) => void
  /**
   * Controls the primary popup open state.
   * - With presets: controls dropdown open
   * - Without presets: controls calendar open
   */
  open?: boolean
  onOpenChange?: (open: boolean) => void
  placeholder?: string
  /** Preset options shown in the dropdown. If empty/omitted, goes straight to calendar. */
  presets?: DatePickerPreset<M>[]
  /** Label for the "Custom" item at the bottom of the preset list */
  customLabel?: React.ReactNode
  /** Disabled date matcher(s) passed to Calendar */
  dateDisabled?: Matcher | Matcher[]
  /** Applied to the trigger button (same as classNames.trigger) */
  className?: string
  classNames?: ClassNames
  inputSize?: VariantProps<typeof inputCva>['inputSize']
  variant?: VariantProps<typeof inputGroupCva>['variant']
  'aria-invalid'?: boolean
  disabled?: boolean
  /** Name for the hidden input — enables uncontrolled usage with react-hook-form */
  name?: string
  side?: React.ComponentProps<typeof PopoverContent>['side']
  align?: React.ComponentProps<typeof PopoverContent>['align']
  sideOffset?: number
  alignOffset?: number
  /** Forwarded to the hidden input — use for react-hook-form `ref` registration */
  ref?: React.Ref<HTMLInputElement>
  /** On screens smaller than `sm`, render a Dialog instead of a dropdown/popover */
  useDialogOnMobile?: boolean
  /** Title for the calendar dialog on mobile (defaults to `placeholder`) */
  calendarDialogTitle?: string
}
