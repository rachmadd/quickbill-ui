import * as React from 'react'

import { cn } from '@/lib/utils'

function Table({ className, ...props }: React.ComponentProps<'table'>) {
  return (
    <div data-slot="table-container" className="relative w-full">
      <table
        data-slot="table"
        className={cn('w-full caption-bottom text-sm', className)}
        {...props}
      />
    </div>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<'thead'>) {
  return (
    <thead
      data-slot="table-header"
      className={cn('[&_tr]:border-b-0 [&_tr]:hover:bg-inherit', className)}
      {...props}
    />
  )
}

function TableBody({ className, ...props }: React.ComponentProps<'tbody'>) {
  return (
    <tbody
      data-slot="table-body"
      className={cn('[&_tr:last-child]:border-0', className)}
      {...props}
    />
  )
}

function TableFooter({ className, ...props }: React.ComponentProps<'tfoot'>) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn('border-t font-medium [&>tr]:last:border-b-0', className)}
      {...props}
    />
  )
}

function TableRow({ className, ...props }: React.ComponentProps<'tr'>) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        'hover:bg-qb-blue-15 data-[state=selected]:bg-qb-muted table-row border-b border-[rgba(0,0,0,0.08)] transition-colors last:shadow-none last:[&_.quickbill-table-action_.quickbill-table-action-container]:rounded-br-lg last:[&_.quickbill-table-action_.quickbill-table-action-container]:shadow-none last:[&>td:first-child]:rounded-bl-xl last:[&>td:last-child]:rounded-br-xl',
        '[&_.quickbill-table-action-shortcut]:hidden hover:[&_.quickbill-table-action-shortcut]:flex [&>.quickbill-table-action>.quickbill-table-action-container]:w-min hover:[&>.quickbill-table-action>.quickbill-table-action-container]:w-min',
        className,
      )}
      {...props}
    />
  )
}

function TableHead({ className, ...props }: React.ComponentProps<'th'>) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        'text-qb-mist-70 sticky top-0 z-10 px-2 py-3 text-left align-middle font-medium whitespace-nowrap shadow-(--shadow-border) first:rounded-tl-lg first:pl-4 last:pr-4',
        className,
      )}
      {...props}
    />
  )
}

function TableCell({
  className,
  rowHref,
  children,
  slot: Component = 'a',
  ...props
}: Omit<React.ComponentProps<'td'>, 'slot'> & {
  rowHref?: string
  slot?: React.ElementType
}) {
  const classNames = cn(
    'text-qb-mist-70 px-2 py-2 align-middle font-normal whitespace-nowrap [&_[role=checkbox]]:translate-y-[2px] [&:has([role=checkbox])]:pr-0',
    className,
  )

  if (rowHref) {
    return (
      <td data-slot="table-cell" {...props} className={cn('first:pl-2 last:pr-2')}>
        <Component href={rowHref} className={cn(classNames, 'block h-full w-full')}>
          {children}
        </Component>
      </td>
    )
  }
  return (
    <td data-slot="table-cell" className={cn(classNames, 'first:pl-4 last:pr-4')} {...props}>
      {children}
    </td>
  )
}

function TableAction({ className, ...props }: React.ComponentProps<'td'>) {
  return (
    <td
      data-slot="table-cell"
      className={cn('sticky right-0 align-top whitespace-nowrap', className)}
      {...props}
    />
  )
}

function TableCaption({ className, ...props }: React.ComponentProps<'caption'>) {
  return (
    <caption
      data-slot="table-caption"
      className={cn('text-qb-muted-foreground mt-4 text-sm', className)}
      {...props}
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  TableAction,
}
