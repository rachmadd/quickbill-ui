import React, { useCallback, useMemo, useState } from 'react'
import {
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  Combobox as ComboboxRoot,
  ComboboxValue,
  useComboboxAnchor,
} from '../../combobox'
import { cn } from '@/lib/utils'
import { InfiniteScrollLoader } from '../infinite-scroll-loader'
import { Flex } from '@/components/core/flex'
import type {
  ComboboxClassNames,
  ComboboxProps,
  InfiniteScrollConfig,
  MaybeArray,
  UnwrappedItem,
} from './types'
import type { ComboboxRootChangeEventDetails } from '@base-ui/react'
import { SearchHighlights } from '../search-highlights'

const ComboboxI = <
  TItem = unknown,
  TValue extends UnwrappedItem<TItem> | string | undefined = undefined,
  Multiple extends boolean | undefined = false,
  TActualItem = UnwrappedItem<TItem>,
>(
  p: ComboboxProps<TItem, TValue, Multiple, TActualItem>,
  ref: React.ForwardedRef<HTMLInputElement>,
) => {
  const {
    items,
    value: controlledValue,
    defaultValue,
    onValueChange,

    open: controlledOpen,
    onOpenChange,
    defaultOpen,

    inputValue: controlledInputValue,
    defaultInputValue,
    onInputValueChange,

    multiple,
    className,
    inputSize,
    variant,
    placeholder,
    showClearButton,
    prefixList,
    suffixList,
    infiniteScroll,
    itemDisabled,
    getItemLabel,
    getItemValue,
    customItemRenderer,
    classNames,
    empty,
    side,
    align,
    sideOffset,
    alignOffset,
    collisionAvoidance,
    collisionBoundary,
    positionMethod,
    ...props
  } = p

  const anchor = useComboboxAnchor()

  const [internalValue, setInternalValue] = useState(defaultValue ?? '')

  const [internalInputValue, setInternalInputValue] = useState(defaultInputValue ?? '')
  const inputValue = controlledInputValue !== undefined ? controlledInputValue : internalInputValue
  const handleInputValueChange = (val: string, eventDetails: ComboboxRootChangeEventDetails) => {
    setInternalInputValue(val)
    onInputValueChange?.(val, eventDetails)
  }

  // control internal/external Open state
  const [internalOpen, setInternalOpen] = useState(defaultOpen || false)
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen
  const handleOpenChange = (open: boolean) => {
    setInternalOpen(open)
    onOpenChange?.(open)
  }

  /**
   * sync value type (string vs item) by mapping the provided value(s) to the corresponding item(s) in the list.
   * e.g if value is string and the item is an object, find the item in the list that has a matching value (using getItemValue) and use that as the selected value.
   * applicable to both multiple and single select modes. This allows the component to be flexible with the type of value it accepts while still working with complex item structures.
   */
  const valueToItem = useCallback(
    (val: MaybeArray<TActualItem, Multiple>): TActualItem | TActualItem[] => {
      // Helper to get all leaf items regardless of structure
      const flatItems: TActualItem[] = isGroupedItems(items)
        ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (items as any[]).flatMap((g) => g.items)
        : (items as unknown as TActualItem[])

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const findItem = (v: any) => {
        if (typeof v === 'string') {
          return flatItems.find((item) => extractValueFromItem(item, getItemValue) === v)
        }
        return v
      }

      if (multiple && Array.isArray(val)) {
        return val.map(findItem).filter(Boolean) as TActualItem[]
      }
      return findItem(val)
    },
    [getItemValue, items, multiple],
  )

  const normalizedValue = useMemo(() => {
    const value =
      controlledValue !== undefined
        ? (controlledValue as MaybeArray<TActualItem, Multiple>)
        : (internalValue as MaybeArray<TActualItem, Multiple>)

    return valueToItem(value)
  }, [controlledValue, internalValue, valueToItem])

  return (
    <ComboboxRoot<TActualItem, Multiple>
      value={normalizedValue as Multiple extends true ? TActualItem[] : TActualItem}
      inputRef={ref}
      items={items}
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={(open) => {
        handleOpenChange(open)
      }}
      inputValue={controlledInputValue}
      onInputValueChange={(val, eventDetails) => {
        handleInputValueChange(val, eventDetails)
      }}
      multiple={multiple}
      onValueChange={(value) => {
        if (value) {
          if (onValueChange) {
            onValueChange(value as MaybeArray<TActualItem, Multiple>)
          }
          if (!controlledValue) {
            const v = value as MaybeArray<TValue, Multiple>
            setInternalValue(v ?? '')
          }
        } else {
          onValueChange?.(null)
          setInternalValue('')
        }
      }}
      itemToStringLabel={getItemLabel}
      itemToStringValue={getItemValue}
      isItemEqualToValue={(item, value) => {
        return (
          extractValueFromItem(item, getItemValue) === extractValueFromItem(value, getItemValue)
        )
      }}
      {...props}
    >
      {multiple ? (
        <ComboboxChips ref={anchor} className={cn('w-full max-w-xs', className, classNames?.root)}>
          <ComboboxValue placeholder={placeholder}>
            {(values: TActualItem[]) => (
              <React.Fragment>
                {values.map((value) => (
                  <ComboboxChip
                    key={extractValueFromItem(value, getItemValue)}
                    className={classNames?.chip}
                  >
                    {extractLabelFromItem(value, getItemLabel)}
                  </ComboboxChip>
                ))}
                <ComboboxChipsInput
                  className={classNames?.chipInput}
                  onFocus={() => {
                    handleOpenChange(true)
                  }}
                  placeholder={
                    !normalizedValue ||
                    (Array.isArray(normalizedValue) && normalizedValue.length < 1)
                      ? placeholder
                      : ''
                  }
                />
              </React.Fragment>
            )}
          </ComboboxValue>
        </ComboboxChips>
      ) : (
        <ComboboxInput
          ref={anchor}
          disabled={props.disabled}
          aria-invalid={props['aria-invalid']}
          inputSize={inputSize}
          variant={variant}
          className={cn(className, classNames?.root)}
          placeholder={placeholder}
          onFocus={() => {
            if (!open) {
              handleOpenChange(true)
            }
          }}
          onBlur={() => {
            if (open) {
              requestAnimationFrame(() => {
                setTimeout(() => {
                  handleOpenChange(false)
                }, 300)
              })
            }
          }}
          showClear={showClearButton === undefined ? Boolean(normalizedValue) : showClearButton}
        />
      )}

      <ComboboxContent
        anchor={anchor}
        data-has-suffix={Boolean(suffixList)}
        className={cn(classNames?.content)}
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        collisionAvoidance={collisionAvoidance}
        collisionBoundary={collisionBoundary}
        positionerClassName={cn(classNames?.positioner)}
        positionMethod={positionMethod}
      >
        {prefixList && (
          <div data-slot="combobox-prefix" className={classNames?.prefixList}>
            {prefixList}
          </div>
        )}
        <ComboboxEmpty>{empty ?? 'Data tidak ditemukan.'}</ComboboxEmpty>
        {isGroupedItems(items) ? (
          <ComboboxList className={classNames?.list}>
            {(group, index) => (
              <React.Fragment key={group.value}>
                <ComboboxGroup key={group.value} items={group.items}>
                  <ComboboxLabel className={classNames?.groupLabel}>{group.value}</ComboboxLabel>
                  <ComboboxCollection>
                    {(item, index: number) =>
                      renderComboboxItem(
                        item,
                        index,
                        normalizedValue,
                        classNames,
                        customItemRenderer,
                        getItemLabel,
                        getItemValue,
                        itemDisabled,
                        inputValue,
                      )
                    }
                  </ComboboxCollection>
                </ComboboxGroup>
                {index === group.length - 1 && renderInfiniteScrollLoader(infiniteScroll)}
              </React.Fragment>
            )}
          </ComboboxList>
        ) : (
          <ComboboxList className={classNames?.list}>
            {(item, index) => (
              <React.Fragment key={extractValueFromItem(item, getItemValue)}>
                {renderComboboxItem(
                  item,
                  index,
                  normalizedValue,
                  classNames,
                  customItemRenderer,
                  getItemLabel,
                  getItemValue,
                  itemDisabled,
                  inputValue,
                )}
                {index === (items || []).length - 1 && renderInfiniteScrollLoader(infiniteScroll)}
              </React.Fragment>
            )}
          </ComboboxList>
        )}
        {suffixList && (
          <div data-slot="combobox-suffix" className={cn(classNames?.suffixList)}>
            {suffixList}
          </div>
        )}
      </ComboboxContent>
    </ComboboxRoot>
  )
}

const Combobox = React.forwardRef(ComboboxI) as <
  TItem = unknown,
  TValue extends UnwrappedItem<TItem> | string | undefined = undefined,
  Multiple extends boolean | undefined = false,
  TActualItem = UnwrappedItem<TItem>,
>(
  props: ComboboxProps<TItem, TValue, Multiple, TActualItem> & {
    ref?: React.Ref<HTMLDivElement>
  },
) => React.ReactElement

export { Combobox }
/**
 * Checks if the items array represents grouped data.
 */
function isGroupedItems<T>(items: readonly T[]): boolean {
  return (
    Array.isArray(items) &&
    items.length > 0 &&
    typeof items[0] === 'object' &&
    items[0] !== null &&
    'value' in items[0] &&
    'items' in items[0]
  )
}

/**
 * Extracts a string value from an item for comparison and keying.
 * Priority: id > value > string conversion
 */
function extractValueFromItem<T>(item: T, customValueFn?: (item: T) => string): string {
  if (customValueFn) {
    return customValueFn(item)
  }

  if (typeof item === 'string') return item
  if (item && typeof item === 'object') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const obj = item as Record<string, any>
    if ('value' in obj && obj.value != null) {
      return String(obj.value)
    }
  }

  return String(item)
}

/**
 * Extracts a display label from an item.
 * Priority: custom function > label property > string conversion
 */
function extractLabelFromItem<T>(item: T, customLabelFn?: (item: T) => string): string {
  if (customLabelFn) {
    return customLabelFn(item)
  }

  if (typeof item === 'string') return item

  if (item && typeof item === 'object') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const obj = item as Record<string, any>
    if ('label' in obj && obj.label != null) {
      return obj.label
    }
  }

  return String(item)
}

/**
 * Renders a single combobox item with proper selection handling.
 */
function renderComboboxItem<T>(
  item: T,
  index: number,
  currentValue: T | T[] | null | undefined,
  classNames?: ComboboxClassNames,
  customItemRenderer?: (
    item: T,
    index: number,
    isSelected: boolean,
    searchQuery?: string,
  ) => React.ReactNode,
  itemToStringLabel?: (item: T) => string,
  itemToStringValue?: (item: T) => string,
  itemDisabled?: (item: T) => boolean,
  searchValue?: string,
): React.ReactNode {
  const isSelected = Array.isArray(currentValue)
    ? currentValue.find(
        (v) =>
          extractValueFromItem(v, itemToStringValue) ===
          extractValueFromItem(item, itemToStringValue),
      )
    : currentValue
      ? extractValueFromItem(currentValue, itemToStringValue) ===
        extractValueFromItem(item, itemToStringValue)
      : false

  return (
    <ComboboxItem
      value={item}
      key={extractValueFromItem(item, itemToStringValue)}
      className={classNames?.item}
      disabled={itemDisabled?.(item)}
    >
      {customItemRenderer ? (
        customItemRenderer(item, index, Boolean(isSelected), searchValue)
      ) : (
        <SearchHighlights
          text={extractLabelFromItem(item, itemToStringLabel)}
          query={searchValue ?? ''}
          mode="contains"
        />
      )}
    </ComboboxItem>
  )
}

/**
 * Renders the infinite scroll loader component.
 */
function renderInfiniteScrollLoader(infiniteScroll?: InfiniteScrollConfig): React.ReactNode {
  if (!infiniteScroll?.hasNextPage) return null

  return (
    <Flex direction="col" gap="4" className="mt-4 mb-4 w-full flex-1" key={'infinte-scroll'}>
      <InfiniteScrollLoader size={22} onLoadMore={infiniteScroll.onLoadMore ?? (() => {})} />
    </Flex>
  )
}
