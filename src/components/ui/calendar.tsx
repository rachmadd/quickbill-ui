'use client'

import * as React from 'react'
import { Icon } from '@/components/icons'
import { DayButton, DayPicker, getDefaultClassNames } from 'react-day-picker'
import { id } from 'react-day-picker/locale'
import dayjs from 'dayjs'

import { cn } from '@/lib/utils'
import { Button, buttonCva } from '@/components/ui/button'

type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>['variant']
}

function Calendar({
  className,
  classNames,
  captionLayout = 'label',
  buttonVariant = 'ghost',
  formatters,
  components,
  ...props
}: CalendarProps) {
  const defaultClassNames = getDefaultClassNames()
  return (
    <DayPicker
      locale={id}
      showOutsideDays={false}
      className={cn(
        'bg-background group/calendar px-3 py-4 [--cell-size:--spacing(4)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent [[data-slot=popover-content]_&]:outline-hidden',
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className,
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) => date.toLocaleString('default', { month: 'short' }),
        ...formatters,
      }}
      classNames={{
        root: cn('w-fit', defaultClassNames.root),
        months: cn('relative flex flex-col gap-4 md:flex-row', defaultClassNames.months),
        month: cn('flex w-full flex-col gap-3', defaultClassNames.month),
        nav: cn(
          'absolute inset-x-0 top-0 flex w-full items-center justify-end gap-2',
          defaultClassNames.nav,
        ),
        button_previous: cn(
          buttonCva({ variant: buttonVariant, size: 'icon-sm' }),
          'p-0 select-none aria-disabled:opacity-50',
          defaultClassNames.button_previous,
        ),
        button_next: cn(
          buttonCva({ variant: buttonVariant, size: 'icon-sm' }),
          'p-0 select-none aria-disabled:opacity-50',
          defaultClassNames.button_next,
        ),
        month_caption: cn(
          'flex w-full items-center justify-start px-2 pt-0.5',
          defaultClassNames.month_caption,
        ),
        dropdowns: cn(
          'flex h-(--cell-size) w-full items-center justify-center gap-1.5 text-sm font-medium',
          defaultClassNames.dropdowns,
        ),
        dropdown_root: cn(
          'has-focus:border-ring border-input has-focus:ring-ring/50 relative rounded-md border shadow-xs has-focus:ring-[3px]',
          defaultClassNames.dropdown_root,
        ),
        dropdown: cn('bg-popover absolute inset-0 opacity-0', defaultClassNames.dropdown),
        caption_label: cn(
          'font-medium select-none',
          captionLayout === 'label'
            ? 'text-sm'
            : '[&>svg]:text-muted-foreground flex h-8 items-center gap-1 rounded-md pr-1 pl-2 text-sm [&>svg]:size-3.5',
          defaultClassNames.caption_label,
        ),
        table: 'w-full border-collapse',
        weekdays: cn(
          'flex',
          defaultClassNames.weekdays,
          'text-qb-mist-50 text-xs font-normal sm:text-sm',
        ),
        weekday: cn(
          'text-muted-foreground flex-1 rounded-md px-2 pt-2 font-normal select-none',
          defaultClassNames.weekday,
        ),
        week: cn('mt-2 flex', defaultClassNames.week),
        week_number_header: cn('w-(--cell-size) select-none', defaultClassNames.week_number_header),
        week_number: cn(
          'text-muted-foreground text-[0.8rem] select-none',
          defaultClassNames.week_number,
        ),
        day: cn(
          'group/day relative z-0 aspect-square h-9.5 w-9.5 flex-1 p-0 text-center select-none sm:h-10',
        ),

        range_start: cn(
          defaultClassNames.range_start,
          'relative bg-transparent',
          // Draw the "strip" on the right half using ::before
          'before:bg-qb-blue-20 before:absolute before:top-0 before:right-0 before:bottom-0 before:-z-10 before:w-1/2',
          // FIX: Hide the strip if the CHILD button has data-range-end="true"
          'has-[[data-range-end=true]]:before:hidden',
        ),
        range_middle: cn('bg-qb-blue-20 rounded-none', defaultClassNames.range_middle),
        range_end: cn(
          defaultClassNames.range_end,
          'relative bg-transparent',
          // Draw the "strip" on the left half using ::after
          'after:bg-qb-blue-20 after:absolute after:top-0 after:bottom-0 after:left-0 after:-z-10 after:w-1/2',
          // FIX: Hide the strip if the CHILD button has data-range-start="true"
          'has-[[data-range-start=true]]:after:hidden',
        ),
        // --- UPDATED LOGIC END ---

        today: cn(
          'bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none',
          defaultClassNames.today,
        ),
        outside: cn(
          'text-muted-foreground aria-selected:text-muted-foreground',
          defaultClassNames.outside,
        ),
        disabled: cn('text-muted-foreground opacity-50', defaultClassNames.disabled),
        hidden: cn('invisible', defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return <div data-slot="calendar" ref={rootRef} className={cn(className)} {...props} />
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === 'left') {
            return (
              <Icon name="ChevronLeftOutlined" className={cn('size-6', className)} {...props} />
            )
          }

          if (orientation === 'right') {
            return (
              <Icon name="ChevronRightOutlined" className={cn('size-6', className)} {...props} />
            )
          }

          return <Icon name="ChevronDownOutlined" className={cn('size-6', className)} {...props} />
        },
        MonthCaption: ({ calendarMonth, className }) => {
          return (
            <div className={cn('text-md font-semibold sm:text-lg', className)}>
              {dayjs(calendarMonth.date).format('MMM')} {dayjs(calendarMonth.date).format('YYYY')}
            </div>
          )
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-(--cell-size) items-center justify-center text-center">
                {children}
              </div>
            </td>
          )
        },
        ...components,
      }}
      {...props}
    />
  )
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames()

  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon-xs"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-ripple="false"
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        // ADDED: relative and z-10 to ensure button sits ON TOP of the pseudo-element strip
        'relative z-10',
        'group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 flex aspect-square size-9.5 min-w-(--cell-size) flex-col gap-1 justify-self-center leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] [&>span]:text-xs [&>span]:opacity-70',
        defaultClassNames.day,
        // single
        'data-[selected-single=true]:bg-qb-blue-60 data-[selected-single=true]:text-white',
        // range start classes
        'data-[range-start=true]:bg-qb-blue-60 data-[range-start=true]:rounded-4xl data-[range-start=true]:text-white',
        // range end classes
        'data-[range-end=true]:bg-qb-blue-60 data-[range-end=true]:rounded-4xl data-[range-end=true]:text-white',
        className,
      )}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton, type CalendarProps }
