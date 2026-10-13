import React from 'react'
import type { Autocomplete as AutocompletePrimitive, BaseUIEvent } from '@base-ui/react'
import { cn } from '@/lib/utils'
import { InfiniteScrollLoader } from './infinite-scroll-loader'
import { Flex } from '@/components/core/flex'

import {
  AutocompleteOption,
  AutocompleteContent,
  AutocompleteEmpty,
  AutocompleteGroup,
  AutocompleteInput,
  AutocompleteLabel,
  AutocompleteList,
  Autocomplete as AutocompleteRoot,
  AutocompleteCollection,
  useAutocompleteAnchor,
} from '../autocomplete'

// Helper to extract the item type from either a flat array or a grouped array
type ExtractItemType<T> = T extends readonly { items: readonly (infer U)[] }[]
  ? U
  : T extends readonly (infer U)[]
    ? U
    : // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any

interface InfiniteScrollConfig {
  onLoadMore?: () => void
  isLoading?: boolean
  hasNextPage?: boolean
}

interface AutocompleteClassNames {
  root?: string
  input?: string
  clear?: string
  content?: string
  list?: string
  option?: string
  groupLabel?: string
  prefixList?: string
  suffixList?: string
  positioner?: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface AutocompleteProps<TItems extends readonly any[]>
  // We omit 'items' and 'children' from the base props to redefine them
  extends Omit<AutocompletePrimitive.Root.Props<ExtractItemType<TItems>>, 'items' | 'children'> {
  /**
   * The items to be displayed.
   * This maintains the exact literal type passed in (Flat vs Grouped).
   */
  items: TItems

  // Basic props
  placeholder?: string
  showClearButton?: boolean

  // Content customization
  prefixList?: React.ReactNode
  suffixList?: React.ReactNode
  empty?: React.ReactNode

  // Item rendering - Uses the extracted item type for inference
  customItemRenderer?: (
    item: ExtractItemType<TItems>,
    index: number,
    isHighlighted: boolean,
  ) => React.ReactNode

  itemToStringLabel?: (item: ExtractItemType<TItems>) => string
  onItemClick?: (
    item: ExtractItemType<TItems>,
    event: BaseUIEvent<React.MouseEvent<HTMLDivElement, MouseEvent>>,
  ) => void

  // Styling
  className?: string
  classNames?: AutocompleteClassNames // Replace with your AutocompleteClassNames type

  // Advanced features
  infiniteScroll?: InfiniteScrollConfig // Replace with your InfiniteScrollConfig type
  ['aria-invalid']?: boolean

  side?: AutocompletePrimitive.Positioner.Props['side']
  align?: AutocompletePrimitive.Positioner.Props['align']
  sideOffset?: AutocompletePrimitive.Positioner.Props['sideOffset']
  alignOffset?: AutocompletePrimitive.Positioner.Props['alignOffset']
  collisionAvoidance?: AutocompletePrimitive.Positioner.Props['collisionAvoidance']
  collisionBoundary?: AutocompletePrimitive.Positioner.Props['collisionBoundary'] | 'unset'
  positionMethod?: AutocompletePrimitive.Positioner.Props['positionMethod']
}

/**
 * Advanced Autocomplete component built on Base UI primitives.
 * Provides search-as-you-type functionality with filtering and selection.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Autocomplete
 *   items={['Apple', 'Banana', 'Cherry']}
 *   placeholder="Search fruits..."
 * />
 *
 * // With custom objects
 * <Autocomplete
 *   items={[
 *     { id: 1, name: 'John Doe', role: 'Developer' },
 *     { id: 2, name: 'Jane Smith', role: 'Designer' },
 *   ]}
 *   placeholder="Search users..."
 * />
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Autocomplete = <TItems extends readonly any[]>({
  placeholder,
  showClearButton = true,
  prefixList,
  suffixList,
  className,
  infiniteScroll,
  customItemRenderer,
  itemToStringLabel,
  classNames,
  empty,
  openOnInputClick = true,
  mode = 'both',
  onItemClick,
  items, // Destructure items so it can be passed to AutocompleteRoot
  side,
  sideOffset,
  align,
  alignOffset,
  collisionAvoidance,
  collisionBoundary,
  positionMethod,
  ...props
}: AutocompleteProps<TItems>) => {
  const anchor = useAutocompleteAnchor()
  const renderInput = () => (
    <AutocompleteInput
      ref={anchor}
      aria-invalid={props['aria-invalid']}
      className={mergeClassNames(className, classNames?.root)}
      placeholder={placeholder}
      showClear={Boolean(showClearButton && props.value)}
    />
  )

  const renderGroupedList = () => (
    <AutocompleteList className={classNames?.list}>
      {(group) => (
        <AutocompleteGroup key={group.value} items={group.items}>
          <AutocompleteLabel className={classNames?.groupLabel}>{group.value}</AutocompleteLabel>
          <AutocompleteCollection>
            {(item, index) => (
              <React.Fragment key={getItemValue(item)}>
                {renderAutocompleteOption(
                  item,
                  index,
                  false, // Autocomplete doesn't have selection like combobox
                  classNames,
                  customItemRenderer,
                  itemToStringLabel,
                  onItemClick,
                )}
                {renderInfiniteScrollLoader(index === group.items.length - 1, infiniteScroll)}
              </React.Fragment>
            )}
          </AutocompleteCollection>
        </AutocompleteGroup>
      )}
    </AutocompleteList>
  )

  const renderFlatList = () => (
    <AutocompleteList className={classNames?.list}>
      {(item, index) => (
        <React.Fragment key={getItemValue(item)}>
          {renderAutocompleteOption(
            item,
            index,
            false, // Autocomplete doesn't have selection like combobox
            classNames,
            customItemRenderer,
            itemToStringLabel,
            onItemClick,
          )}
          {renderInfiniteScrollLoader(index === (items || []).length - 1, infiniteScroll)}
        </React.Fragment>
      )}
    </AutocompleteList>
  )

  const renderContent = () => (
    <AutocompleteContent
      anchor={anchor}
      className={cn(classNames?.content)}
      side={side}
      sideOffset={sideOffset}
      collisionAvoidance={collisionAvoidance}
      align={align}
      alignOffset={alignOffset}
      collisionBoundary={collisionBoundary}
      positionMethod={positionMethod}
      positionerClassName={cn(classNames?.positioner)}
    >
      {prefixList && (
        <div data-slot="autocomplete-prefix" className={classNames?.prefixList}>
          {prefixList}
        </div>
      )}
      <AutocompleteEmpty>{empty ?? 'Data tidak ditemukan.'}</AutocompleteEmpty>
      {items && isGroupedItems(items) ? renderGroupedList() : renderFlatList()}
      {suffixList && (
        <div data-slot="autocomplete-suffix" className={cn(classNames?.suffixList)}>
          {suffixList}
        </div>
      )}
    </AutocompleteContent>
  )

  return (
    <AutocompleteRoot {...props} items={items} openOnInputClick={openOnInputClick} mode={mode}>
      {renderInput()}
      {renderContent()}
    </AutocompleteRoot>
  )
}

// Utility functions

/**
 * Extracts a string value from an item for comparison and keying.
 * Priority: id > value > string conversion
 */
function getItemValue<T>(item: T): string {
  if (typeof item === 'string') return item
  if (item && typeof item === 'object') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const obj = item as Record<string, any>
    if ('id' in obj && obj.id != null) {
      return String(obj.id)
    }
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
function getItemLabel<T>(item: T, customLabelFn?: (item: T) => string): React.ReactNode {
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
 * Merges class names with proper precedence.
 */
function mergeClassNames(
  baseClass?: string,
  customClass?: string,
  additionalClass?: string,
): string | undefined {
  return cn(baseClass, customClass, additionalClass)
}

/**
 * Renders the infinite scroll loader component.
 */
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

/**
 * Renders a single autocomplete option with proper highlighting handling.
 */
function renderAutocompleteOption<ItemValue>(
  item: ItemValue,
  index: number,
  isHighlighted: boolean,
  classNames?: AutocompleteClassNames,
  customItemRenderer?: (item: ItemValue, index: number, isHighlighted: boolean) => React.ReactNode,
  itemToStringLabel?: (item: ItemValue) => string,
  onClick?: (
    item: ItemValue,
    event: BaseUIEvent<React.MouseEvent<HTMLDivElement, MouseEvent>>,
  ) => void,
): React.ReactNode {
  return (
    <AutocompleteOption
      value={item}
      key={getItemValue(item)}
      className={classNames?.option}
      onClick={(event) => onClick?.(item, event)}
    >
      {customItemRenderer
        ? customItemRenderer(item, index, isHighlighted)
        : getItemLabel(item, itemToStringLabel)}
    </AutocompleteOption>
  )
}
