'use client'

import * as React from 'react'
import { Combobox as ComboboxPrimitive } from '@base-ui/react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  inputGroupCva,
  InputGroupInput,
} from '@/components/ui/input-group'
import { Icon } from '../icons'
import type { VariantProps } from 'class-variance-authority'
import { inputCva } from './input'

const Combobox = ComboboxPrimitive.Root

function ComboboxValue({ ...props }: ComboboxPrimitive.Value.Props) {
  return <ComboboxPrimitive.Value data-slot="combobox-value" {...props} />
}

function ComboboxTrigger({
  className,
  children,
  iconClassName,
  ...props
}: ComboboxPrimitive.Trigger.Props & { iconClassName?: string }) {
  return (
    <ComboboxPrimitive.Trigger data-slot="combobox-trigger" className={cn(className)} {...props}>
      {children}
      <Icon name="ChevronDownOutlined" className={cn('pointer-events-none', iconClassName)} />
    </ComboboxPrimitive.Trigger>
  )
}

function ComboboxClear({ className, ...props }: ComboboxPrimitive.Clear.Props) {
  return (
    <ComboboxPrimitive.Clear
      data-slot="combobox-clear"
      className={cn(className)}
      {...props}
      render={
        <InputGroupButton
          size="icon-xs"
          className={
            'bg-qb-mist-20 text-qb-mist-80 size-5 rounded-full hover:cursor-pointer data-[size=lg]:size-5.5 data-[size=sm]:size-4 data-[input-size=default]:[&_svg]:size-3.5! data-[input-size=lg]:[&_svg]:size-4! data-[input-size=sm]:[&_svg]:size-3!'
          }
          variant="ghost"
        >
          <Icon name="CloseOutlined" className="pointer-events-none" />
        </InputGroupButton>
      }
    />
  )
}

type ComboboxInputProps = ComboboxPrimitive.Input.Props & {
  showTrigger?: boolean
  showClear?: boolean
  inputSize?: VariantProps<typeof inputCva>['inputSize']
  variant?: VariantProps<typeof inputGroupCva>['variant']
}

const ComboboxInput = React.forwardRef<HTMLDivElement, ComboboxInputProps>(
  (
    {
      className,
      children,
      disabled = false,
      showTrigger = true,
      showClear = false,
      inputSize = 'default',
      variant = 'default',
      ...props
    },
    ref,
  ) => {
    return (
      <InputGroup
        className={cn('w-auto', className)}
        data-input-size={inputSize}
        data-disabled={disabled}
        variant={variant}
        aria-invalid={props['aria-invalid']}
        ref={ref}
      >
        <ComboboxPrimitive.Input
          render={<InputGroupInput disabled={disabled} inputSize={inputSize} variant={variant} />}
          {...props}
        />
        <InputGroupAddon align="inline-end" className="gap-0">
          {showClear && <ComboboxClear data-input-size={inputSize} disabled={disabled} />}
          {showTrigger && (
            <InputGroupButton
              tabIndex={-1}
              size={inputSize === 'sm' ? 'icon-xs' : 'icon-sm'}
              variant="ghost"
              render={
                <ComboboxTrigger
                  iconClassName={cn(
                    'text-qb-mist-80 group-has-[>[data-popup-open]]/input-group:text-qb-primary!',
                    inputSize === 'sm' && 'size-4!',
                    inputSize === 'default' && 'size-5.5!',
                    inputSize === 'lg' && 'size-6!',
                  )}
                />
              }
              data-slot="input-group-button"
              className="data-pressed:bg-transparent"
              disabled={disabled}
            />
          )}
        </InputGroupAddon>
        {children}
      </InputGroup>
    )
  },
)
ComboboxInput.displayName = 'ComboboxInput'

function ComboboxContent({
  className,
  side = 'bottom',
  sideOffset = 6,
  align = 'start',
  alignOffset = 0,
  anchor,
  collisionAvoidance,
  positionerClassName,
  collisionBoundary = 'clipping-ancestors',
  positionMethod,
  ...props
}: ComboboxPrimitive.Popup.Props & {
  positionerClassName?: string
  collisionBoundary?: ComboboxPrimitive.Positioner.Props['collisionBoundary'] | 'unset'
} & Pick<
    ComboboxPrimitive.Positioner.Props,
    | 'side'
    | 'align'
    | 'sideOffset'
    | 'alignOffset'
    | 'anchor'
    | 'collisionAvoidance'
    | 'positionMethod'
  >) {
  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        anchor={anchor}
        className={cn('isolate z-50', positionerClassName)}
        collisionAvoidance={collisionAvoidance}
        collisionBoundary={collisionBoundary === 'unset' ? undefined : collisionBoundary}
        positionMethod={positionMethod}
      >
        <ComboboxPrimitive.Popup
          data-slot="combobox-content"
          data-chips={!!anchor}
          className={cn(
            'group/combobox-content text-qb-mist-70 shadow-elevation-light data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 *:data-[slot=input-group]:border-input/30 *:data-[slot=input-group]:bg-input/30 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 relative max-h-(--available-height) w-(--anchor-width) origin-(--transform-origin) overflow-hidden rounded-lg bg-white py-2 duration-100 data-[chips=true]:min-w-(--anchor-width) *:data-[slot=input-group]:m-1 *:data-[slot=input-group]:mb-0 *:data-[slot=input-group]:h-8 *:data-[slot=input-group]:shadow-none',
            className,
          )}
          {...props}
        />
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  )
}

function ComboboxList({ className, ...props }: ComboboxPrimitive.List.Props) {
  return (
    <ComboboxPrimitive.List
      data-slot="combobox-list"
      className={cn(
        'custom-scrollbar max-h-[min(calc(--spacing(72)---spacing(9)),calc(var(--available-height)---spacing(9)))] scroll-py-1 overflow-y-auto overscroll-contain data-empty:p-0',
        className,
      )}
      {...props}
    />
  )
}

function ComboboxItem({ className, children, ...props }: ComboboxPrimitive.Item.Props) {
  return (
    <ComboboxPrimitive.Item
      data-slot="combobox-item"
      className={cn(
        'data-highlighted:bg-qb-blue-15 data-selected:text-qb-primary relative flex w-full cursor-default items-center gap-2 py-2 pr-8 pl-4 text-sm font-normal outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
        className,
      )}
      {...props}
    >
      {children}
    </ComboboxPrimitive.Item>
  )
}

function ComboboxGroup({ className, ...props }: ComboboxPrimitive.Group.Props) {
  return <ComboboxPrimitive.Group data-slot="combobox-group" className={cn(className)} {...props} />
}

function ComboboxLabel({ className, ...props }: ComboboxPrimitive.GroupLabel.Props) {
  return (
    <ComboboxPrimitive.GroupLabel
      data-slot="combobox-label"
      className={cn('text-qb-mist-70 px-2 py-1.5 text-sm font-semibold', className)}
      {...props}
    />
  )
}

function ComboboxCollection({ ...props }: ComboboxPrimitive.Collection.Props) {
  return <ComboboxPrimitive.Collection data-slot="combobox-collection" {...props} />
}

function ComboboxEmpty({ className, ...props }: ComboboxPrimitive.Empty.Props) {
  return (
    <ComboboxPrimitive.Empty
      data-slot="combobox-empty"
      className={cn(
        'text-muted-foreground hidden w-full justify-center py-2 text-center text-sm group-data-empty/combobox-content:flex',
        className,
      )}
      {...props}
    />
  )
}

function ComboboxSeparator({ className, ...props }: ComboboxPrimitive.Separator.Props) {
  return (
    <ComboboxPrimitive.Separator
      data-slot="combobox-separator"
      className={cn('bg-border -mx-1 my-1 h-px', className)}
      {...props}
    />
  )
}

function ComboboxChips({
  className,
  variant = 'default',
  inputSize = 'default',
  ...props
}: React.ComponentPropsWithRef<typeof ComboboxPrimitive.Chips> &
  ComboboxPrimitive.Chips.Props & {
    inputSize?: VariantProps<typeof InputGroupInput>['inputSize']
    variant?: VariantProps<typeof InputGroup>['variant']
  }) {
  return (
    <ComboboxPrimitive.Chips
      data-slot="combobox-chips"
      data-size={inputSize}
      className={cn(
        'focus-within:border-ring focus-within:ring-ring/50 has-aria-invalid:border-destructive has-aria-invalid:ring-destructive/20 flex flex-wrap items-center gap-1 bg-clip-padding px-2.5 py-1 text-sm transition-colors focus-within:ring-3 has-aria-invalid:ring-3 has-data-[slot=combobox-chip]:px-1',
        inputGroupCva({ variant }),
        inputCva({ inputSize }),
        'data-[size=sm]:rounded-[6px]',
        'data-[size=default]:rounded-[8px] [data-[size=default]>input]:max-h-2',
        'data-[size=lg]:rounded-[10px]',
        'h-auto',
        className,
      )}
      {...props}
    />
  )
}

function ComboboxChip({
  className,
  children,
  showRemove = true,
  ...props
}: ComboboxPrimitive.Chip.Props & {
  showRemove?: boolean
}) {
  return (
    <ComboboxPrimitive.Chip
      data-slot="combobox-chip"
      className={cn(
        'bg-qb-mist-20 text-qb-mist-90 flex h-[calc(--spacing(5.25))] w-fit items-center justify-center gap-2 rounded-full px-2 py-1 text-xs font-medium whitespace-nowrap has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-disabled:opacity-50 has-data-[slot=combobox-chip-remove]:pr-0',
        className,
      )}
      {...props}
    >
      {children}
      {showRemove && (
        <ComboboxPrimitive.ChipRemove
          className="mr-1"
          data-slot="combobox-chip-remove"
          render={
            <Button variant="ghost" className={'size-4 bg-white p-0 opacity-100'} size="icon-xs">
              <Icon name="CloseOutlined" className="pointer-events-none" />
            </Button>
          }
        />
      )}
    </ComboboxPrimitive.Chip>
  )
}

function ComboboxChipsInput({ className, ...props }: ComboboxPrimitive.Input.Props) {
  return (
    <ComboboxPrimitive.Input
      data-slot="combobox-chip-input"
      className={cn('min-w-16 flex-1 outline-none', className)}
      {...props}
    />
  )
}

function useComboboxAnchor() {
  return React.useRef<HTMLDivElement | null>(null)
}

export {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxCollection,
  ComboboxEmpty,
  ComboboxSeparator,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipsInput,
  ComboboxTrigger,
  ComboboxValue,
  ComboboxClear,
  useComboboxAnchor,
}
