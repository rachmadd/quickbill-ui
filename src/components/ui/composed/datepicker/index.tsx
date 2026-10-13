'use client'

import { useCallback, useMemo, useRef, useState } from 'react'
import { isSameDay } from 'date-fns'
import type { DateRange } from 'react-day-picker'

import { cn } from '@/lib/utils'
import { Popover, PopoverContent } from '../../popover'
import { Dropdown } from '../dropdown'
import { Calendar } from '../../calendar'
import type { DropdownItem } from '../dropdown'

import type { DatePickerMode, DatePickerValue, DatePickerPreset } from './types'
import type { DatePickerProps } from './types'
import { formatDisplayValue, serializeValue, matchesPreset, isPresetDisabled } from './helpers'
import { DatePickerTrigger } from './trigger'
import { MobilePicker } from './mobile-picker'

// ─── Component ───────────────────────────────────────────────────────────────

function DatePicker<M extends DatePickerMode = 'single'>({
  mode = 'single' as M,
  value,
  defaultValue,
  onValueChange,
  open,
  onOpenChange,
  placeholder = 'Pilih tanggal',
  presets,
  customLabel = 'Custom',
  dateDisabled,
  className,
  classNames,
  inputSize = 'default',
  variant = 'default',
  'aria-invalid': ariaInvalid,
  disabled,
  name,
  side = 'bottom',
  align = 'start',
  sideOffset = 4,
  alignOffset = 0,
  ref,
  useDialogOnMobile = false,
  calendarDialogTitle,
}: DatePickerProps<M>) {
  const triggerRef = useRef<HTMLButtonElement>(null)
  const hasPresets = Boolean(presets?.length)
  // Tracks whether a calendar close was triggered by date selection (vs user back/dismiss)
  const closedBySelectionRef = useRef(false)

  // ─── State ────────────────────────────────────────────────────────────────

  const [internalValue, setInternalValue] = useState<DatePickerValue[M] | undefined>(defaultValue)

  // Desktop open states
  const [openDropdown, setOpenDropdown] = useState(false)
  const [openCalendar, setOpenCalendar] = useState(false)

  // Mobile open states
  const [mobileOpenPresets, setMobileOpenPresets] = useState(false)
  const [mobileOpenCalendar, setMobileOpenCalendar] = useState(false)

  const [calendarMonth, setCalendarMonth] = useState<Date>(() => {
    const initial = value ?? defaultValue
    if (!initial) return new Date()
    if (mode === 'range') return (initial as DatePickerValue['range']).from ?? new Date()
    return initial as Date
  })

  // Controlled value takes precedence over internal
  const resolvedValue = value !== undefined ? value : internalValue

  // Desktop effective open states — external `open` controls the "primary" popup
  const primaryOpen = open !== undefined ? open : hasPresets ? openDropdown : openCalendar
  const effectiveOpenDropdown = hasPresets ? primaryOpen : false
  const effectiveOpenCalendar = !hasPresets ? primaryOpen : openCalendar

  const desktopIsAnyOpen = effectiveOpenDropdown || effectiveOpenCalendar
  const mobileIsAnyOpen = mobileOpenPresets || mobileOpenCalendar

  // ─── Shared helpers ───────────────────────────────────────────────────────

  const getMonthFromValue = useCallback(
    (v: DatePickerValue[M] | undefined): Date => {
      if (!v) return new Date()
      if (mode === 'range') return (v as DatePickerValue['range']).from ?? new Date()
      return v as Date
    },
    [mode],
  )

  const updateValue = useCallback(
    (newValue: DatePickerValue[M] | undefined) => {
      setInternalValue(newValue)
      onValueChange?.(newValue)
    },
    [onValueChange],
  )

  // ─── Desktop handlers ─────────────────────────────────────────────────────

  const handleDropdownOpenChange = useCallback(
    (isOpen: boolean) => {
      setOpenDropdown(isOpen)
      onOpenChange?.(isOpen)
    },
    [onOpenChange],
  )

  const handleCalendarOpenChange = useCallback(
    (isOpen: boolean) => {
      if (isOpen) setCalendarMonth(getMonthFromValue(resolvedValue))
      setOpenCalendar(isOpen)
      if (!hasPresets) onOpenChange?.(isOpen)
    },
    [hasPresets, onOpenChange, resolvedValue, getMonthFromValue],
  )

  const handleDesktopCustomSelect = useCallback(() => {
    setCalendarMonth(getMonthFromValue(resolvedValue))
    setOpenDropdown(false)
    setOpenCalendar(true)
  }, [resolvedValue, getMonthFromValue])

  // ─── Mobile handlers ──────────────────────────────────────────────────────

  const handleMobilePresetsOpenChange = useCallback((isOpen: boolean) => {
    setMobileOpenPresets(isOpen)
  }, [])

  const handleMobileCalendarOpenChange = useCallback(
    (isOpen: boolean) => {
      if (isOpen) setCalendarMonth(getMonthFromValue(resolvedValue))
      setMobileOpenCalendar(isOpen)
      // Back button closes calendar → reopen preset list (unless closed by selection)
      if (!isOpen && hasPresets && !closedBySelectionRef.current) {
        setMobileOpenPresets(true)
      }
      closedBySelectionRef.current = false
    },
    [hasPresets, resolvedValue, getMonthFromValue],
  )

  const handleMobileCustomSelect = useCallback(() => {
    setCalendarMonth(getMonthFromValue(resolvedValue))
    setMobileOpenPresets(false)
    setMobileOpenCalendar(true)
  }, [resolvedValue, getMonthFromValue])

  const handleMobilePresetSelect = useCallback(
    (preset: DatePickerPreset<M>) => {
      updateValue(preset.dateValue as DatePickerValue[M])
      setMobileOpenPresets(false)
    },
    [updateValue],
  )

  // ─── Calendar select (shared desktop + mobile) ────────────────────────────

  const closeCalendars = useCallback((delay = 0) => {
    const doClose = () => {
      closedBySelectionRef.current = true
      setOpenCalendar(false)
      setMobileOpenCalendar(false)
    }
    if (delay > 0) {
      setTimeout(doClose, delay)
    } else {
      doClose()
    }
  }, [])

  const handleCalendarSelect = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (selected: any, selectedDay: Date) => {
      if (mode === 'single') {
        updateValue(selected as DatePickerValue[M] | undefined)
        if (selected) closeCalendars()
        return
      }

      // Range mode — own the two-click state machine.
      //
      // react-day-picker v9 sets { from: d, to: d } on the FIRST click when
      // min=0 (default), which would make our "both ends truthy" guard close
      // the calendar too early. We override that by always resetting to
      // { from, to: undefined } on the first click.
      const current = resolvedValue as DatePickerValue['range'] | undefined
      const currentFrom = current?.from
      const currentTo = current?.to

      // First click: nothing selected yet or previous range was complete → start fresh
      if (!currentFrom || currentTo) {
        updateValue({ from: selectedDay, to: undefined } as DatePickerValue[M])
        return
      }

      // Second click: same date as FROM → single-day range
      if (isSameDay(selectedDay, currentFrom)) {
        updateValue({ from: selectedDay, to: selectedDay } as DatePickerValue[M])
        closeCalendars(300)
        return
      }

      // Second click: different date → complete the range
      // react-day-picker already sorts from/to when user picks an earlier date
      const newRange = selected as { from?: Date; to?: Date } | undefined
      updateValue(newRange as DatePickerValue[M] | undefined)
      if (newRange?.from && newRange?.to) {
        closeCalendars(300)
      }
    },
    [mode, resolvedValue, updateValue, closeCalendars],
  )

  // ─── Derived values ───────────────────────────────────────────────────────

  const displayText = useMemo(() => formatDisplayValue(resolvedValue, mode), [resolvedValue, mode])
  const serializedValue = useMemo(() => serializeValue(resolvedValue, mode), [resolvedValue, mode])

  // Active preset index: -1 means value exists but matches no preset ("Custom" is active)
  const activePresetIndex = useMemo(() => {
    if (!presets?.length || !resolvedValue) return null
    return presets.findIndex((p) => matchesPreset(resolvedValue, p, mode))
  }, [presets, resolvedValue, mode])

  const dropdownItems = useMemo((): DropdownItem[] => {
    if (!presets?.length) return []
    return [
      ...presets.map((preset, index) => {
        const disabled = isPresetDisabled(preset, dateDisabled, mode)
        return {
          label: preset.label,
          disabled,
          className: cn(
            'rounded-none px-4 py-2 text-sm font-normal',
            activePresetIndex === index && !disabled && 'text-qb-primary! font-semibold',
            classNames?.dropdownItem,
          ),
          onClick: () => {
            updateValue(preset.dateValue as DatePickerValue[M])
            setOpenDropdown(false)
          },
        }
      }),
      {
        label: customLabel,
        className: cn(
          'rounded-none px-4 py-2 text-sm font-normal',
          activePresetIndex === -1 &&
            resolvedValue !== undefined &&
            'text-qb-primary! font-semibold',
          classNames?.dropdownItem,
        ),
        onClick: handleDesktopCustomSelect,
      },
    ]
  }, [
    presets,
    activePresetIndex,
    customLabel,
    resolvedValue,
    classNames?.dropdownItem,
    updateValue,
    handleDesktopCustomSelect,
    dateDisabled,
    mode,
  ])

  // ─── Calendar content (split for react-day-picker discriminated union) ────

  const calendarContent =
    mode === 'single' ? (
      <Calendar
        mode="single"
        selected={resolvedValue as Date | undefined}
        month={calendarMonth}
        onMonthChange={setCalendarMonth}
        disabled={dateDisabled}
        onSelect={(day, selectedDay) => handleCalendarSelect(day, selectedDay)}
        className={cn('w-full max-w-full', classNames?.calendar)}
      />
    ) : (
      <Calendar
        mode="range"
        selected={resolvedValue as DateRange | undefined}
        month={calendarMonth}
        onMonthChange={setCalendarMonth}
        disabled={dateDisabled}
        onSelect={(range, selectedDay) => handleCalendarSelect(range, selectedDay)}
        className={cn('w-full max-w-full', classNames?.calendar)}
      />
    )

  // ─── Shared trigger props ─────────────────────────────────────────────────

  const sharedTriggerProps = {
    displayText,
    placeholder,
    disabled,
    'aria-invalid': ariaInvalid,
    inputSize,
    variant,
    hasPresets,
    className,
    classNames,
  } as const

  // ─── Desktop layout ───────────────────────────────────────────────────────

  const desktopCalendarPopover = (
    <Popover open={effectiveOpenCalendar} onOpenChange={handleCalendarOpenChange}>
      <PopoverContent
        anchor={triggerRef}
        side={side}
        align={align}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        className="w-auto bg-white px-0 py-4 sm:px-2"
      >
        {calendarContent}
      </PopoverContent>
    </Popover>
  )

  const desktopContent = hasPresets ? (
    <>
      <Dropdown
        items={dropdownItems}
        open={effectiveOpenDropdown}
        onOpenChange={handleDropdownOpenChange}
        align={align}
        side={side}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        className={cn('border-0 px-0 py-3', classNames?.dropdown)}
      >
        <DatePickerTrigger
          {...sharedTriggerProps}
          isAnyOpen={desktopIsAnyOpen}
          triggerRef={triggerRef}
        />
      </Dropdown>
      {desktopCalendarPopover}
    </>
  ) : (
    <>
      <DatePickerTrigger
        {...sharedTriggerProps}
        isAnyOpen={desktopIsAnyOpen}
        triggerRef={triggerRef}
        onClick={() => setOpenCalendar((o) => !o)}
      />
      {desktopCalendarPopover}
    </>
  )

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="relative w-full">
      {/* Hidden input for RHF / uncontrolled form usage */}
      <input type="hidden" ref={ref} name={name} value={serializedValue} />

      {useDialogOnMobile ? (
        <>
          {/* Mobile UI — Dialog-based */}
          <div className="sm:hidden">
            <DatePickerTrigger
              {...sharedTriggerProps}
              isAnyOpen={mobileIsAnyOpen}
              onClick={() => {
                if (hasPresets) setMobileOpenPresets(true)
                else setMobileOpenCalendar(true)
              }}
            />
            <MobilePicker
              placeholder={placeholder}
              calendarDialogTitle={calendarDialogTitle}
              presets={presets}
              customLabel={customLabel}
              hasPresets={hasPresets}
              activePresetIndex={activePresetIndex}
              classNames={classNames}
              dateDisabled={dateDisabled}
              mode={mode}
              openPresets={mobileOpenPresets}
              openCalendar={mobileOpenCalendar}
              onOpenPresetsChange={handleMobilePresetsOpenChange}
              onOpenCalendarChange={handleMobileCalendarOpenChange}
              onPresetSelect={handleMobilePresetSelect}
              onCustomSelect={handleMobileCustomSelect}
              calendarContent={calendarContent}
            />
          </div>

          {/* Desktop UI — Dropdown + Popover */}
          <div className="hidden sm:block">{desktopContent}</div>
        </>
      ) : (
        desktopContent
      )}
    </div>
  )
}

export { DatePicker }
export type { DatePickerProps, DatePickerPreset, DatePickerValue }
