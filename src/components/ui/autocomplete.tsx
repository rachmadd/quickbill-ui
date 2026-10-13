'use client'

import * as React from 'react'
import { Autocomplete as AutocompletePrimitive } from '@base-ui/react'

import { cn } from '@/lib/utils'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group'
import { Icon } from '../icons'
import type { VariantProps } from 'class-variance-authority'

const Autocomplete = AutocompletePrimitive.Root

function AutocompleteValue({ ...props }: AutocompletePrimitive.Value.Props) {
  return <AutocompletePrimitive.Value data-slot="autocomplete-value" {...props} />
}

function AutocompleteTrigger({
  className,
  children,
  ...props
}: AutocompletePrimitive.Trigger.Props) {
  return (
    <AutocompletePrimitive.Trigger
      data-slot="autocomplete-trigger"
      className={cn("[&_svg:not([class*='size-'])]:size-4", className)}
      {...props}
    >
      {children}
      <Icon
        name="ChevronDownOutlined"
        className="text-muted-foreground pointer-events-none size-4"
      />
    </AutocompletePrimitive.Trigger>
  )
}

function AutocompleteClear({ className, ...props }: AutocompletePrimitive.Clear.Props) {
  return (
    <AutocompletePrimitive.Clear
      data-slot="autocomplete-clear"
      className={cn(className)}
      {...props}
      render={
        <InputGroupButton variant="ghost" size="icon-xs">
          <Icon name="CloseOutlined" className="pointer-events-none" />
        </InputGroupButton>
      }
    />
  )
}

type AutocompleteInputProps = Omit<AutocompletePrimitive.Input.Props, 'size'> & {
  showTrigger?: boolean
  showClear?: boolean
  inputSize?: VariantProps<typeof InputGroupInput>['inputSize']
  variant?: VariantProps<typeof InputGroup>['variant']
}

const AutocompleteInput = React.forwardRef<HTMLDivElement, AutocompleteInputProps>(
  (
    {
      className,
      children,
      disabled = false,
      showClear = false,
      inputSize = 'default',
      variant = 'default',
      ...props
    },
    ref,
  ) => {
    return (
      <InputGroup
        ref={ref}
        className={cn('w-auto', className)}
        data-input-size={inputSize}
        data-disabled={disabled}
        variant={variant}
        aria-invalid={props['aria-invalid']}
      >
        <AutocompletePrimitive.Input
          render={<InputGroupInput disabled={disabled} inputSize={inputSize} variant={variant} />}
          {...props}
        />
        <InputGroupAddon align="inline-end" className="gap-0">
          {showClear && <AutocompleteClear disabled={disabled} />}
        </InputGroupAddon>
        {children}
      </InputGroup>
    )
  },
)
AutocompleteInput.displayName = 'AutocompleteInput'

function AutocompleteContent({
  className,
  side = 'bottom',
  sideOffset = 4,
  align = 'center',
  alignOffset = 0,
  anchor,
  collisionAvoidance,
  positionerClassName,
  collisionBoundary = 'clipping-ancestors',
  positionMethod,
  ...props
}: AutocompletePrimitive.Popup.Props & {
  positionerClassName?: string
  collisionBoundary?: AutocompletePrimitive.Positioner.Props['collisionBoundary'] | 'unset'
} & Pick<
    AutocompletePrimitive.Positioner.Props,
    | 'align'
    | 'alignOffset'
    | 'side'
    | 'sideOffset'
    | 'collisionAvoidance'
    | 'positionMethod'
    | 'anchor'
  >) {
  return (
    <AutocompletePrimitive.Portal>
      <AutocompletePrimitive.Positioner
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
        <AutocompletePrimitive.Popup
          data-slot="autocomplete-content"
          data-chips={!!anchor}
          className={cn(
            'group/autocomplete-content text-qb-mist-70 shadow-elevation-light data-chips=true:min-w-(--anchor-width) data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 *:data-[slot=input-group]:border-input/30 *:data-[slot=input-group]:bg-input/30 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 relative max-h-(--available-height) w-(--anchor-width) max-w-(--available-width) origin-(--transform-origin) overflow-hidden rounded-lg bg-white py-2 duration-100 *:data-[slot=input-group]:m-1 *:data-[slot=input-group]:mb-0 *:data-[slot=input-group]:h-8 *:data-[slot=input-group]:shadow-none',
            className,
          )}
          {...props}
        />
      </AutocompletePrimitive.Positioner>
    </AutocompletePrimitive.Portal>
  )
}

function AutocompleteList({ className, ...props }: AutocompletePrimitive.List.Props) {
  return (
    <AutocompletePrimitive.List
      data-slot="autocomplete-list"
      className={cn(
        'custom-scrollbar max-h-[min(calc(--spacing(72)---spacing(9)),calc(var(--available-height)---spacing(9)))] scroll-py-1 overflow-y-auto overscroll-contain data-empty:p-0',
        className,
      )}
      {...props}
    />
  )
}

function AutocompleteCollection({ ...props }: AutocompletePrimitive.Collection.Props) {
  return <AutocompletePrimitive.Collection data-slot="autocomplete-collection" {...props} />
}

function AutocompleteOption({ className, children, ...props }: AutocompletePrimitive.Item.Props) {
  return (
    <AutocompletePrimitive.Item
      data-slot="autocomplete-option"
      className={cn(
        "data-highlighted:bg-qb-blue-15 data-selected:text-qb-primary relative flex w-full cursor-default items-center gap-2 py-2 pr-8 pl-4 text-sm outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      {children}
    </AutocompletePrimitive.Item>
  )
}

function AutocompleteGroup({ className, ...props }: AutocompletePrimitive.Group.Props) {
  return (
    <AutocompletePrimitive.Group
      data-slot="autocomplete-group"
      className={cn(className)}
      {...props}
    />
  )
}

function AutocompleteLabel({ className, ...props }: AutocompletePrimitive.GroupLabel.Props) {
  return (
    <AutocompletePrimitive.GroupLabel
      data-slot="autocomplete-label"
      className={cn('text-muted-foreground px-2 py-1.5 text-xs', className)}
      {...props}
    />
  )
}

function AutocompleteEmpty({ className, ...props }: AutocompletePrimitive.Empty.Props) {
  return (
    <AutocompletePrimitive.Empty
      data-slot="autocomplete-empty"
      className={cn(
        'text-muted-foreground hidden w-full justify-center py-2 text-center text-sm group-data-empty/autocomplete-content:flex',
        className,
      )}
      {...props}
    />
  )
}

function AutocompleteSeparator({ className, ...props }: AutocompletePrimitive.Separator.Props) {
  return (
    <AutocompletePrimitive.Separator
      data-slot="autocomplete-separator"
      className={cn('bg-border -mx-1 my-1 h-px', className)}
      {...props}
    />
  )
}

function useAutocompleteAnchor() {
  return React.useRef<HTMLDivElement | null>(null)
}

export {
  Autocomplete,
  AutocompleteInput,
  AutocompleteContent,
  AutocompleteList,
  AutocompleteOption,
  AutocompleteGroup,
  AutocompleteLabel,
  AutocompleteEmpty,
  AutocompleteSeparator,
  AutocompleteTrigger,
  AutocompleteValue,
  AutocompleteClear,
  AutocompleteCollection,
  useAutocompleteAnchor,
}
