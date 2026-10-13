'use client'

import * as React from 'react'
import { Select as SelectPrimitive } from '@base-ui/react/select'

import { cn } from '@/lib/utils'
import { Icon } from '../icons'
import type { VariantProps } from 'class-variance-authority'
import { inputGroupCva, type InputGroup, type InputGroupInput } from './input-group'
import { inputCva } from './input'

const Select = SelectPrimitive.Root

function SelectGroup({ className, ...props }: SelectPrimitive.Group.Props) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn('scroll-my-1 p-1', className)}
      {...props}
    />
  )
}

function SelectValue({ className, ...props }: SelectPrimitive.Value.Props) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cn(
        'block flex-1 truncate text-left font-semibold data-placeholder:font-normal',
        className,
      )}
      {...props}
    />
  )
}

function SelectTrigger({
  className,
  inputSize = 'default',
  variant = 'default',
  children,
  ...props
}: SelectPrimitive.Trigger.Props & {
  inputSize?: VariantProps<typeof InputGroupInput>['inputSize']
  variant?: VariantProps<typeof InputGroup>['variant']
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-input-size={inputSize}
      data-variant={variant}
      className={cn(
        "group/select-group data-placeholder:text-muted-foreground flex w-fit items-center justify-between gap-1.5 rounded-lg bg-transparent py-2 pr-2 pl-2.5 text-sm whitespace-nowrap transition-colors outline-none select-none focus-visible:ring-3 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-3 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        inputCva({ inputSize, variant: 'ghost' }),
        inputGroupCva({ variant }),
        'data-placeholder:text-qb-mist-50',
        'data-popup-open:ring-ring data-popup-open:ring-[1px]',
        'data-[input-size=xs]:rounded-[5px] data-[input-size=xs]:text-xs',
        'data-[input-size=sm]:rounded-[6px] data-[input-size=xs]:text-sm',
        'data-[input-size=default]:rounded-[8px] data-[input-size=xs]:text-sm [data-[input-size=default]>input]:max-h-2',
        'data-[input-size=lg]:rounded-[10px]',
        'aria-invalid:ring-qb-destructive aria-invalid:ring',
        'text-qb-mist-90',
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon
        render={
          <Icon
            name="ChevronDownOutlined"
            className={cn(
              'group-data-[popup-open]/select-group:text-qb-primary pointer-events-none',
              inputSize === 'default' && 'size-5.5!',
              inputSize === 'sm' && 'size-4!',
              inputSize === 'lg' && 'size-6!',
            )}
          />
        }
      />
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  side = 'bottom',
  sideOffset = 4,
  align = 'center',
  alignOffset = 0,
  alignItemWithTrigger = false,
  anchor,
  collisionAvoidance,
  positionerClassName,
  collisionBoundary = 'clipping-ancestors',
  positionMethod,
  ...props
}: SelectPrimitive.Popup.Props & {
  positionerClassName?: string
  collisionBoundary?: SelectPrimitive.Positioner.Props['collisionBoundary'] | 'unset'
} & Pick<
    SelectPrimitive.Positioner.Props,
    | 'align'
    | 'alignOffset'
    | 'side'
    | 'sideOffset'
    | 'alignItemWithTrigger'
    | 'collisionAvoidance'
    | 'positionMethod'
    | 'anchor'
  >) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        alignItemWithTrigger={alignItemWithTrigger}
        anchor={anchor}
        className={cn('isolate z-50', positionerClassName)}
        collisionAvoidance={collisionAvoidance}
        collisionBoundary={collisionBoundary === 'unset' ? undefined : collisionBoundary}
        positionMethod={positionMethod}
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          data-align-trigger={alignItemWithTrigger}
          className={cn(
            'text-qb-mist-70 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 relative isolate z-50 max-h-(--available-height) w-(--anchor-width) origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-lg bg-white duration-100 data-[align-trigger=true]:animate-none',
            'text-qb-mist-70 shadow-elevation-light py-2',
            className,
          )}
          {...props}
        >
          <SelectScrollUpButton />
          <SelectPrimitive.List>{children}</SelectPrimitive.List>
          <SelectScrollDownButton />
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  )
}

function SelectList({ className, ...props }: SelectPrimitive.List.Props) {
  return (
    <SelectPrimitive.List
      data-slot="select-list"
      className={cn(
        'custom-scrollbar max-h-[min(calc(--spacing(72)---spacing(9)),calc(var(--available-height)---spacing(9)))] scroll-py-1 overflow-y-auto overscroll-contain data-empty:p-0',
        className,
      )}
      {...props}
    />
  )
}

function SelectLabel({ className, ...props }: SelectPrimitive.GroupLabel.Props) {
  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-label"
      className={cn('text-muted-foreground px-2 py-1.5 text-sm font-semibold', className)}
      {...props}
    />
  )
}

function SelectItem({ className, children, ...props }: SelectPrimitive.Item.Props) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "data-highlighted:bg-qb-blue-15 data-selected:text-qb-primary relative flex w-full cursor-default items-center gap-2 py-2 pr-8 pl-4 text-sm font-normal outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      {children}
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({ className, ...props }: SelectPrimitive.Separator.Props) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn('bg-border pointer-events-none -mx-1 my-1 h-px', className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpArrow>) {
  return (
    <SelectPrimitive.ScrollUpArrow
      data-slot="select-scroll-up-button"
      className={cn(
        "bg-popover top-0 z-10 flex w-full cursor-default items-center justify-center py-1 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <Icon name="ChevronUpOutlined" />
    </SelectPrimitive.ScrollUpArrow>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownArrow>) {
  return (
    <SelectPrimitive.ScrollDownArrow
      data-slot="select-scroll-down-button"
      className={cn(
        "bg-popover bottom-0 z-10 flex w-full cursor-default items-center justify-center py-1 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <Icon name="ChevronDownOutlined" />
    </SelectPrimitive.ScrollDownArrow>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectList,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
