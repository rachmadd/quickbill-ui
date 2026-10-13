'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../dropdown-menu'
import { cn } from '@/lib/utils'

type DropdownItemItem = Omit<React.ComponentProps<typeof DropdownMenuItem>, 'children'>

export type DropdownItem = Omit<DropdownItemItem, 'type' | 'children' | 'label'> & {
  visible?: boolean
  label?: React.ReactNode | React.ReactElement
}

type DropdownPropsBase = {
  items: DropdownItem[]
  className?: string
  open?: boolean
  onOpenChange?: React.ComponentProps<typeof DropdownMenu>['onOpenChange']
  modal?: boolean
  overlay?: boolean
  itemPrefix?: React.ReactNode
  itemSuffix?: React.ReactNode
  side?: React.ComponentProps<typeof DropdownMenuContent>['side']
  align?: React.ComponentProps<typeof DropdownMenuContent>['align']
  sideOffset?: number
  alignOffset?: number
  disableKeyboardEvent?: boolean
  children: React.ReactElement
}

function Dropdown({
  children,
  className,
  open,
  onOpenChange,
  modal,
  items,
  itemPrefix,
  itemSuffix,
  overlay,
  side = 'bottom',
  align,
  sideOffset,
  alignOffset,
  disableKeyboardEvent,
}: DropdownPropsBase) {
  return (
    <DropdownMenu open={open} onOpenChange={onOpenChange} modal={modal}>
      <DropdownMenuTrigger render={children} />
      <DropdownMenuContent
        className={cn('max-w-65 min-w-(--anchor-width) px-0 py-2', className)}
        overlay={overlay}
        side={side}
        align={align}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        disableKeyboardEvent={disableKeyboardEvent}
      >
        {Boolean(itemPrefix) && (
          <div
            className="px-2 py-1"
            onMouseDown={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          >
            {itemPrefix}
          </div>
        )}

        {items.map((itemWithVisible, index) => {
          const { visible, ...item } = itemWithVisible
          if (visible === false) return null
          const { label, className: itemClassName, onClick, ...itemProps } = item
          return (
            <DropdownMenuItem
              key={index}
              {...itemProps}
              className={cn('rounded-none text-sm leading-6', itemClassName)}
              onClick={(event) => {
                onClick?.(event)
              }}
            >
              {label}
            </DropdownMenuItem>
          )
        })}

        {Boolean(itemSuffix) && <div className="px-2 py-1">{itemSuffix}</div>}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { Dropdown }
