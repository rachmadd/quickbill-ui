'use client'

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  type Row,
  type SortingState,
  useReactTable,
} from '@tanstack/react-table'

import {
  Table,
  TableAction,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { Icon } from '../icons'
import { Tooltip } from '../ui/custom/tooltip'
import { Empty, type EmptyComponentProps } from './custom/empty'
import { Button } from './button'
import { Dropdown } from './composed/dropdown'
import emptyStateSrc from '@/components/illustration/empty-state.svg?url'

export type TableActionProps<TData> = {
  key: string
  onClick: (row: Row<TData>) => void
  label: string
  icon?: React.ReactNode
  disabled?: (row: Row<TData>) => boolean
  visible?: boolean | ((row: Row<TData>) => boolean)
}

export type TableColumn<TData, TValue> = ColumnDef<TData, TValue>
export interface DataTableProps<TData, TValue> {
  columns: TableColumn<TData, TValue>[]
  data: TData[]
  frameless?: boolean
  className?: string
  rowHref?: (row: Row<TData>) => string
  rowHrefSlot?: React.ElementType
  onClickRow?: (row: Row<TData>) => void
  sorting?: SortingState
  empty?: EmptyComponentProps
  onSortingChange?: (state: SortingState) => void
  actions?: {
    sticky?: TableActionProps<TData>[]
    shortcut?: TableActionProps<TData>[]
    dropdown?: TableActionProps<TData>[]
    disableDropdown?: boolean | ((row: Row<TData>) => boolean)
  }
}

export function DataTable<TData, TValue>({
  columns,
  data,
  className,
  actions,
  frameless = false,
  sorting,
  onSortingChange,
  rowHref,
  rowHrefSlot,
  onClickRow,
  empty = {
    title: 'No Result',
    media: <img src={emptyStateSrc} width={120} height={120} />,
  },
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    defaultColumn: {
      size: undefined,
      maxSize: undefined,
      minSize: undefined,
    },
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
    state: {
      sorting,
    },
    enableSortingRemoval: true,
    sortDescFirst: false,
    onSortingChange: (updater) => {
      const newSortingValue = updater instanceof Function ? sorting && updater(sorting) : updater
      if (onSortingChange && newSortingValue) onSortingChange(newSortingValue)
    },
  })

  const flexibleColumnCount = table
    .getAllLeafColumns()
    .filter((col) => col.columnDef.size === undefined).length
  const flexibleColumnWidth = flexibleColumnCount > 0 ? 'auto' : undefined

  return (
    <div
      className={cn(
        'bg-transparent pt-2 pr-1 pb-1 pl-1',
        !frameless && 'shadow-elevation-light rounded-2xl bg-white',
        className,
      )}
    >
      <div className={cn('h-full w-full overflow-auto')}>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const { column } = header
                  const enableSorting = column.columnDef.enableSorting
                  return (
                    <TableHead
                      key={header.id}
                      className={cn(frameless ? 'bg-transparent' : 'bg-white')}
                      style={
                        header.column.columnDef.size !== undefined
                          ? { width: header.column.getSize(), maxWidth: header.column.getSize() }
                          : flexibleColumnWidth
                            ? { width: flexibleColumnWidth }
                            : undefined
                      }
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                      {enableSorting && (
                        <button
                          className="ml-1 p-0.5 align-middle hover:cursor-pointer"
                          onClick={() => {
                            column.toggleSorting()
                          }}
                        >
                          {{
                            asc: (
                              <div className={'text-mist-80 bg-qb-blue-20 rounded'}>
                                <Icon name="ArrowDownOutlined" size={16} />
                              </div>
                            ),
                            desc: (
                              <div className={'text-mist-80 bg-qb-blue-20 rounded'}>
                                <Icon name="ArrowUpOutlined" size={16} />
                              </div>
                            ),
                          }[header.column.getIsSorted() as string] ?? (
                            <Icon name="ArrowDownOutlined" size={16} />
                          )}
                        </button>
                      )}
                    </TableHead>
                  )
                })}
                {actions && (
                  <TableHead
                    className={cn(
                      'sticky right-0 z-20',
                      actions.sticky && actions.sticky.length > 0 && 'text-center',
                      frameless ? 'bg-transparent' : 'bg-white',
                    )}
                  >
                    {actions.sticky && actions.sticky.length > 0 && 'Action'}
                  </TableHead>
                )}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length
              ? table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                    onClick={!onClickRow ? undefined : () => onClickRow?.(row)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        rowHref={rowHref ? rowHref(row) : undefined}
                        slot={rowHrefSlot}
                        style={
                          cell.column.columnDef.size !== undefined
                            ? { width: cell.column.getSize(), maxWidth: cell.column.getSize() }
                            : flexibleColumnWidth
                              ? { width: flexibleColumnWidth }
                              : undefined
                        }
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                    {actions && (
                      <TableAction className="quickbill-table-action table-cell max-w-[160px] min-w-[60px]">
                        <div className="flex h-full w-full justify-end">
                          <div
                            className={cn(
                              'relative flex h-full flex-0 px-2 py-2',
                              'quickbill-table-action-container',
                              frameless ? 'bg-white/40 backdrop-blur-2xl' : 'bg-white',
                            )}
                          >
                            <div className="shadow-table-action absolute top-0 bottom-0 left-0 w-0.5"></div>
                            <div
                              className={cn(
                                'quickbill-table-action-shortcut absolute top-0 right-full bottom-[0.3px] items-center transition-all',
                                actions.shortcut && actions.shortcut?.length > 0 ? 'px-2' : 'px-0',
                                frameless ? 'bg-white/40 backdrop-blur-2xl' : 'bg-white',
                              )}
                            >
                              {actions.shortcut &&
                                actions.shortcut?.length > 0 &&
                                actions.shortcut.map((item) => {
                                  const visible = item.visible
                                  if (visible !== undefined) {
                                    if (typeof visible === 'function' && visible(row) === false) {
                                      return null
                                    }
                                    if (typeof visible === 'boolean' && visible === false) {
                                      return null
                                    }
                                  }

                                  return (
                                    <div key={item.key}>
                                      <div className="shadow-table-action absolute top-0 bottom-0 left-0 w-0.5"></div>
                                      <Tooltip
                                        content={item.label}
                                        disableHoverableContent
                                        delayDuration={300}
                                      >
                                        <Button
                                          size={'icon-sm'}
                                          pill={false}
                                          variant={'ghost'}
                                          disabled={item.disabled?.(row)}
                                          onClick={(e) => {
                                            if (actions && onClickRow) e.stopPropagation()
                                            item.onClick(row)
                                          }}
                                          className={cn(
                                            "[&_svg:not([class*='size-'])]:size-4",
                                            item.disabled?.(row) && 'cursor-not-allowed opacity-50',
                                          )}
                                        >
                                          {item.icon}
                                        </Button>
                                      </Tooltip>
                                    </div>
                                  )
                                })}
                            </div>
                            <div className="flex items-center gap-2">
                              {actions.sticky &&
                                actions.sticky.length > 0 &&
                                actions.sticky.map((item) => (
                                  <Button
                                    key={item.key}
                                    size={'sm'}
                                    variant={'outline'}
                                    disabled={item.disabled?.(row)}
                                    onClick={(e) => {
                                      if (actions && onClickRow) e.stopPropagation()
                                      item.onClick(row)
                                    }}
                                    className="w-fit gap-2 rounded-md font-normal [&_svg:not([class*='size-'])]:size-4"
                                    pill={false}
                                  >
                                    {item.icon}
                                    {item.label}
                                  </Button>
                                ))}
                              {actions.dropdown && actions.dropdown.length > 0 && (
                                <Dropdown
                                  side="bottom"
                                  align="end"
                                  className="min-w-45"
                                  items={actions.dropdown.map((item) => ({
                                    visible:
                                      typeof item.visible === 'function'
                                        ? item.visible(row)
                                        : item.visible,
                                    onClick: (e) => {
                                      if (actions && onClickRow) e.stopPropagation()
                                      item.onClick(row)
                                    },
                                    label: item.label,
                                    disabled: item.disabled?.(row),
                                  }))}
                                >
                                  <Button
                                    size={'icon-sm'}
                                    pill={false}
                                    variant={'ghost'}
                                    className={'data-popup-open:bg-qb-blue-15'}
                                    disabled={
                                      typeof actions?.disableDropdown === 'function'
                                        ? actions?.disableDropdown(row)
                                        : actions?.disableDropdown
                                    }
                                  >
                                    <Icon name="ThreeDotsOutlined" size={18} />
                                  </Button>
                                </Dropdown>
                              )}
                            </div>
                          </div>
                        </div>
                      </TableAction>
                    )}
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
        {table.getRowModel().rows?.length === 0 && <Empty {...empty} />}
      </div>
    </div>
  )
}
