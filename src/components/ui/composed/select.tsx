/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { type Select as SelectPrimitive } from '@base-ui/react'
import { cn } from '@/lib/utils'
import { InfiniteScrollLoader } from './infinite-scroll-loader'
import { Flex } from '@/components/core/flex'

import {
  Select as SelectRoot,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectTrigger,
  SelectValue,
  SelectList,
} from '../select'
import type { VariantProps } from 'class-variance-authority'
import { InputGroupButton, inputGroupCva } from '../input-group'
import type { inputCva } from '../input'
import { Icon } from '@/components/icons'

interface InfiniteScrollConfig {
  onLoadMore?: () => void
  isLoading?: boolean
  hasNextPage?: boolean
}

interface SelectClassNames {
  root?: string
  trigger?: string
  value?: string
  content?: string
  list?: string
  item?: string
  groupLabel?: string
  prefixList?: string
  suffixList?: string
  positioner?: string
}

type SelectProps<Value, Multiple extends boolean | undefined = false> = SelectPrimitive.Root.Props<
  Value,
  Multiple
> & {
  placeholder?: string
  prefixList?: React.ReactNode
  suffixList?: React.ReactNode
  empty?: React.ReactNode
  customItemRenderer?: (item: Value, index: number, isSelected: boolean) => React.ReactNode
  customValueRenderer?: (value: Value) => React.ReactNode
  itemToStringLabel?: (item: Value) => string
  className?: string
  classNames?: SelectClassNames
  infiniteScroll?: InfiniteScrollConfig
  ['aria-invalid']?: boolean
  inputSize?: VariantProps<typeof inputCva>['inputSize']
  showClearButton?: boolean
  variant?: VariantProps<typeof inputGroupCva>['variant']
  side?: SelectPrimitive.Positioner.Props['side']
  align?: SelectPrimitive.Positioner.Props['align']
  sideOffset?: SelectPrimitive.Positioner.Props['sideOffset']
  alignOffset?: SelectPrimitive.Positioner.Props['alignOffset']
  collisionAvoidance?: SelectPrimitive.Positioner.Props['collisionAvoidance']
  collisionBoundary?: SelectPrimitive.Positioner.Props['collisionBoundary'] | 'unset'
  positionMethod?: SelectPrimitive.Positioner.Props['positionMethod']
}

export const Select = <Value, Multiple extends boolean | undefined = false>({
  placeholder,
  prefixList,
  suffixList,
  className,
  infiniteScroll,
  customItemRenderer,
  customValueRenderer,
  itemToStringLabel,
  classNames,
  empty,
  inputSize = 'default',
  value: controlledValue,
  onValueChange,
  side,
  align,
  sideOffset,
  alignOffset,
  collisionAvoidance,
  positionMethod,
  collisionBoundary,
  variant,
  showClearButton = true,
  ...props
}: SelectProps<Value, Multiple>) => {
  type SelectValue = SelectProps<Value, Multiple>['value']
  const [internalValue, setInternalValue] = useState<SelectValue>(props.defaultValue || null)

  const value = controlledValue !== undefined ? controlledValue : internalValue

  const selectItems = normalizeItems(props.items)
  const hasItems = selectItems.length > 0
  const grouped = isGroupedItems(selectItems)

  const renderTrigger = () => (
    <SelectTrigger
      className={cn(className, classNames?.root)}
      inputSize={inputSize}
      aria-invalid={props['aria-invalid']}
      variant={variant}
    >
      <SelectValue placeholder={placeholder || 'Select an option'} className={classNames?.value}>
        {customValueRenderer
          ? (customValueRenderer as (v: SelectValue) => React.ReactNode)
          : undefined}
      </SelectValue>
      {value && showClearButton && (
        <InputGroupButton
          size="icon-xs"
          tabIndex={-1}
          type="button"
          nativeButton={false}
          data-size={inputSize}
          className={
            'bg-qb-mist-20 size-5 rounded-full hover:cursor-pointer data-[size=lg]:size-5.5 data-[size=sm]:size-4 data-[size=default]:[&_svg]:size-3.5! data-[size=lg]:[&_svg]:size-4! data-[size=sm]:[&_svg]:size-3!'
          }
          render={<div role="button" aria-description="Clear" />}
          variant="ghost"
          onClick={(e) => {
            const eventDetails = {
              event: e, // The original MouseEvent
              reason: 'none', // Or 'item-press' depending on your context
              cancel: () => {}, // Required stubs
              allowPropagation: () => {},
              isCanceled: false,
              isPropagationAllowed: true,
            }
            onValueChange?.(null as any, eventDetails as any)
            setInternalValue(null)
          }}
        >
          <Icon name="CloseOutlined" className="pointer-events-none" />
        </InputGroupButton>
      )}
    </SelectTrigger>
  )

  const renderItem = (item: Value, index: number) => {
    const isSelected = isValueSelected(item, value, props.multiple)

    return (
      <SelectItem value={item} key={getItemValue(item)} className={classNames?.item}>
        {customItemRenderer
          ? customItemRenderer(item, index, isSelected)
          : getItemLabel(item, itemToStringLabel)}
      </SelectItem>
    )
  }

  const renderGroupedList = () => (
    <SelectContent
      className={cn(classNames?.content)}
      side={side}
      sideOffset={sideOffset}
      collisionAvoidance={collisionAvoidance}
      align={align}
      alignOffset={alignOffset}
      alignItemWithTrigger={false}
      collisionBoundary={collisionBoundary}
      positionMethod={positionMethod}
      positionerClassName={cn(classNames?.positioner)}
    >
      {prefixList}
      <SelectScrollUpButton />
      <SelectList className={classNames?.list}>
        {selectItems.map((group, groupIndex: number) => (
          <SelectGroup key={group.value ?? String(groupIndex)}>
            <SelectLabel className={classNames?.groupLabel}>
              {group.title ?? group.value}
            </SelectLabel>
            {group.items.map((item: Value, itemIndex: number) => (
              <React.Fragment key={getItemValue(item)}>
                {renderItem(item, itemIndex)}
                {renderInfiniteScrollLoader(itemIndex === group.items.length - 1, infiniteScroll)}
              </React.Fragment>
            ))}
          </SelectGroup>
        ))}
      </SelectList>
      <SelectScrollDownButton />
      {suffixList}
    </SelectContent>
  )

  const renderFlatList = () => (
    <SelectContent
      className={cn(classNames?.content)}
      alignItemWithTrigger={false}
      side={side}
      sideOffset={sideOffset}
      collisionAvoidance={collisionAvoidance}
      align={align}
      alignOffset={alignOffset}
      collisionBoundary={collisionBoundary}
      positionMethod={positionMethod}
      positionerClassName={cn(classNames?.positioner)}
    >
      {prefixList}
      <SelectScrollUpButton />
      <SelectList className={classNames?.list}>
        {hasItems ? (
          selectItems.map((item: Value, index: number) => (
            <React.Fragment key={getItemValue(item)}>
              {renderItem(item, index)}
              {renderInfiniteScrollLoader(index === selectItems.length - 1, infiniteScroll)}
            </React.Fragment>
          ))
        ) : (
          <div className="text-muted-foreground px-4 py-3 text-sm">
            {empty || 'No options available.'}
          </div>
        )}
      </SelectList>
      <SelectScrollDownButton />
      {suffixList}
    </SelectContent>
  )

  return (
    <SelectRoot
      {...props}
      value={value}
      onValueChange={(value, eventDetails) => {
        onValueChange?.(value, eventDetails)
        setInternalValue(value)
      }}
      itemToStringLabel={itemToStringLabel}
      isItemEqualToValue={isItemEqual}
      items={props.items}
    >
      {renderTrigger()}
      {grouped ? renderGroupedList() : renderFlatList()}
    </SelectRoot>
  )
}

function normalizeItems<Value>(items: Value): any[] {
  if (!items) return []
  if (Array.isArray(items)) return items
  return Object.entries(items).map(([value, label]) => ({ value, label }))
}

function getItemValue<Value>(item: Value): string {
  if (typeof item === 'string') return item
  if (item == null) return ''
  if (typeof item === 'object') {
    if ('value' in item && item.value != null) return String(item.value)
    if ('id' in item && item.id != null) return String(item.id)
  }
  return String(item)
}

function getItemLabel(item: any, customLabelFn?: (item: any) => string): React.ReactNode {
  if (customLabelFn) {
    return customLabelFn(item)
  }
  if (typeof item === 'string') return item
  if (item == null) return ''
  if (typeof item === 'object') {
    if ('label' in item && item.label != null) return item.label
    if ('title' in item && item.title != null) return item.title
  }
  return String(item)
}

function isItemEqual(a: any, b: any): boolean {
  return getItemValue(a) === getItemValue(b)
}

function isValueSelected<Value>(item: Value, value: any, multiple?: boolean | undefined) {
  if (multiple && Array.isArray(value)) {
    return value.some((current) => isItemEqual(item, current))
  }
  return value != null && isItemEqual(item, value)
}

function isGroupedItems(items: any[]): boolean {
  return (
    Array.isArray(items) &&
    items.length > 0 &&
    typeof items[0] === 'object' &&
    items[0] !== null &&
    'items' in items[0]
  )
}

function renderInfiniteScrollLoader(
  isLastItem: boolean,
  infiniteScroll?: InfiniteScrollConfig,
): React.ReactNode {
  if (!isLastItem || !infiniteScroll?.hasNextPage) return null
  return (
    <Flex direction="col" gap="4" className="mt-4 mb-4 w-full flex-1">
      <InfiniteScrollLoader size={22} onLoadMore={infiniteScroll.onLoadMore ?? (() => {})} />
    </Flex>
  )
}
