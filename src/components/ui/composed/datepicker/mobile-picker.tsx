'use client'

import React from 'react'
import type { Matcher } from 'react-day-picker'
import { cn } from '@/lib/utils'
import { Dialog } from '../dialog'
import type { DatePickerMode, DatePickerPreset, ClassNames } from './types'
import { isPresetDisabled } from './helpers'

type MobilePickerProps<M extends DatePickerMode> = {
  placeholder: string
  calendarDialogTitle?: string
  presets?: DatePickerPreset<M>[]
  customLabel?: React.ReactNode
  hasPresets: boolean
  activePresetIndex: number | null
  classNames?: ClassNames
  dateDisabled?: Matcher | Matcher[]
  openPresets: boolean
  openCalendar: boolean
  onOpenPresetsChange: (open: boolean) => void
  onOpenCalendarChange: (open: boolean) => void
  onPresetSelect: (preset: DatePickerPreset<M>) => void
  onCustomSelect: () => void
  calendarContent: React.ReactNode
  mode: M
}

export function MobilePicker<M extends DatePickerMode>({
  placeholder,
  calendarDialogTitle,
  presets,
  customLabel,
  hasPresets,
  activePresetIndex,
  classNames,
  dateDisabled,
  openPresets,
  openCalendar,
  onOpenPresetsChange,
  onOpenCalendarChange,
  onPresetSelect,
  onCustomSelect,
  calendarContent,
  mode,
}: MobilePickerProps<M>) {
  const presetListContent = (
    <div className="divide-qb-mist-30 flex flex-col divide-y">
      {presets?.map((preset, index) => {
        const disabled = isPresetDisabled(preset, dateDisabled, mode)
        return (
          <button
            key={index}
            type="button"
            disabled={disabled}
            className={cn(
              'px-4 py-3 text-left text-sm font-normal',
              'disabled:cursor-not-allowed disabled:opacity-40',
              activePresetIndex === index && !disabled && 'text-qb-primary font-semibold',
              classNames?.dropdownItem,
            )}
            onClick={() => !disabled && onPresetSelect(preset)}
          >
            {preset.label}
          </button>
        )
      })}
      <button
        type="button"
        className={cn(
          'px-4 py-3 text-left text-sm font-normal',
          activePresetIndex === -1 && 'text-qb-primary font-semibold',
          classNames?.dropdownItem,
        )}
        onClick={onCustomSelect}
      >
        {customLabel}
      </button>
    </div>
  )

  return (
    <>
      {hasPresets && (
        <Dialog
          title={placeholder}
          content={presetListContent}
          open={openPresets}
          onOpenChange={(open) => onOpenPresetsChange(open)}
          closeIcon="chevron-left"
          closePosition="left"
          classNames={{
            content: 'p-0',
          }}
          divider={false}
        />
      )}

      <Dialog
        title={calendarDialogTitle ?? placeholder}
        content={<div className="flex justify-center py-2">{calendarContent}</div>}
        open={openCalendar}
        onOpenChange={(open) => onOpenCalendarChange(open)}
        closeIcon={'x'}
        closePosition="left"
        classNames={{
          content: 'p-0',
        }}
      />
    </>
  )
}
