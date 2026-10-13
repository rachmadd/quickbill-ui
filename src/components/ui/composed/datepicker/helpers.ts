import { isSameDay } from 'date-fns'
import { isMatch } from 'react-day-picker'
import type { Matcher } from 'react-day-picker'
import dayjs from '@/lib/dayjs'
import type { DatePickerMode, DatePickerValue, DatePickerPreset } from './types'

export function formatDisplayValue(
  value: DatePickerValue['single'] | DatePickerValue['range'] | undefined,
  mode: DatePickerMode,
): string {
  if (!value) return ''
  if (mode === 'single') {
    return dayjs(value as Date).format('DD MMM YYYY')
  }
  const range = value as DatePickerValue['range']
  if (!range.from) return ''
  const from = dayjs(range.from).format('DD MMM YYYY')
  const to = range.to ? dayjs(range.to).format('DD MMM YYYY') : '...'
  return `${from} - ${to}`
}

export function serializeValue(
  value: DatePickerValue['single'] | DatePickerValue['range'] | undefined,
  mode: DatePickerMode,
): string {
  if (!value) return ''
  if (mode === 'single') return (value as Date).toISOString()
  const { from, to } = value as DatePickerValue['range']
  const parts = [from?.toISOString(), to?.toISOString()].filter(Boolean) as string[]
  return parts.join(',')
}

export function isPresetDisabled<M extends DatePickerMode>(
  preset: DatePickerPreset<M>,
  dateDisabled: Matcher | Matcher[] | undefined,
  mode: M,
): boolean {
  if (!dateDisabled) return false
  const matchers = Array.isArray(dateDisabled) ? dateDisabled : [dateDisabled]
  if (mode === 'single') {
    return isMatch(preset.dateValue as Date, matchers)
  }
  const { from, to } = preset.dateValue as { from: Date; to: Date }
  return isMatch(from, matchers) || isMatch(to, matchers)
}

export function matchesPreset<M extends DatePickerMode>(
  value: DatePickerValue[M] | undefined,
  preset: DatePickerPreset<M>,
  mode: M,
): boolean {
  if (!value) return false
  if (mode === 'single') {
    return isSameDay(value as Date, preset.dateValue as Date)
  }
  const range = value as DatePickerValue['range']
  const presetRange = preset.dateValue as { from: Date; to: Date }
  return Boolean(
    range.from &&
    range.to &&
    isSameDay(range.from, presetRange.from) &&
    isSameDay(range.to, presetRange.to),
  )
}
