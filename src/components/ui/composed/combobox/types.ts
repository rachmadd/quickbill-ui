import type {
  ComboboxRootChangeEventDetails,
  ComboboxRootHighlightEventDetails,
  Combobox as ComboboxPrimitive,
} from '@base-ui/react'
import type { VariantProps } from 'class-variance-authority'

import type { InputGroup, InputGroupInput } from '../../input-group'

export interface InfiniteScrollConfig {
  onLoadMore?: () => void
  isLoading?: boolean
  hasNextPage?: boolean
}

export interface ComboboxClassNames {
  root?: string
  input?: string
  clear?: string
  content?: string
  list?: string
  item?: string
  groupLabel?: string
  chips?: string
  chip?: string
  chipInput?: string
  prefixList?: string
  suffixList?: string
  positioner?: string
}

// Extract combobox value if multiple is true then value must be an array
export type MaybeArray<T, Multiple extends boolean | undefined> = Multiple extends true ? T[] : T

// Extract combobox items from Grouped Items shape
export type UnwrappedItem<T> = T extends { items: (infer U)[] } ? U : T

export type ComboboxProps<
  TItem = unknown,
  TValue extends UnwrappedItem<TItem> | string | undefined = undefined,
  Multiple extends boolean | undefined = false,
  TActualItem = UnwrappedItem<TItem>,
> = {
  items: TItem[]

  value?: MaybeArray<TValue, Multiple> | null
  defaultValue?: MaybeArray<TValue, Multiple> | null
  onValueChange?: (value: MaybeArray<TActualItem, Multiple> | null) => void

  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  onOpenChangeComplete?: (open: boolean) => void

  multiple?: Multiple

  placeholder?: string
  showClearButton?: boolean

  prefixList?: React.ReactNode
  suffixList?: React.ReactNode
  empty?: React.ReactNode

  customItemRenderer?: (item: TActualItem, index: number, isSelected: boolean) => React.ReactNode

  getItemLabel?: (item: TActualItem) => string
  getItemValue?: (item: TActualItem) => string
  onItemHighlighted?: (
    item: TActualItem | undefined,
    eventDetails: ComboboxRootHighlightEventDetails,
  ) => void

  className?: string
  classNames?: ComboboxClassNames

  infiniteScroll?: InfiniteScrollConfig

  itemDisabled?: (item: TActualItem) => boolean

  disabled?: boolean
  readOnly?: boolean
  required?: boolean
  modal?: boolean
  name?: string
  id?: string

  inputValue?: string
  defaultInputValue?: string
  onInputValueChange?: (inputValue: string, eventDetails: ComboboxRootChangeEventDetails) => void

  filter?:
    | ((
        itemValue: TActualItem,
        query: string,
        itemToString?: ((itemValue: TActualItem) => string) | undefined,
      ) => boolean)
    | null
    | undefined

  inputSize?: VariantProps<typeof InputGroupInput>['inputSize']
  variant?: VariantProps<typeof InputGroup>['variant']
  ['aria-invalid']?: boolean

  side?: ComboboxPrimitive.Positioner.Props['side']
  align?: ComboboxPrimitive.Positioner.Props['align']
  sideOffset?: ComboboxPrimitive.Positioner.Props['sideOffset']
  alignOffset?: ComboboxPrimitive.Positioner.Props['alignOffset']
  collisionAvoidance?: ComboboxPrimitive.Positioner.Props['collisionAvoidance']
  collisionBoundary?: ComboboxPrimitive.Positioner.Props['collisionBoundary'] | 'unset'
  positionMethod?: ComboboxPrimitive.Positioner.Props['positionMethod']
}
