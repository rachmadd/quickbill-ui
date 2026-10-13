import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { DateRange } from 'react-day-picker'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/composed/dialog'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import dayjs from '@/lib/dayjs'
import { DialogClose } from '@/components/ui/dialog'

const meta: Meta<typeof Calendar> = {
  title: 'Components/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A standalone date picker calendar built on top of [react-day-picker](https://react-day-picker.js.org/).
Supports single date selection, date range selection, disabled date matchers, multi-month display, and dropdown navigation.

---

## Usage

\`\`\`tsx
import { Calendar } from '@/components/ui/calendar'

// Single date
const [date, setDate] = useState<Date | undefined>()
<Calendar mode="single" selected={date} onSelect={setDate} />

// Date range
const [range, setRange] = useState<DateRange | undefined>()
<Calendar mode="range" selected={range} onSelect={setRange} />
\`\`\`

---

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| \`mode\` | \`'single' \\| 'range' \\| 'multiple'\` | — | Selection mode |
| \`selected\` | \`Date \\| DateRange \\| Date[]\` | — | Controlled selected date(s) |
| \`onSelect\` | \`function\` | — | Callback fired when a date is selected |
| \`disabled\` | \`Matcher \\| Matcher[]\` | — | Dates to mark as unselectable |
| \`numberOfMonths\` | \`number\` | \`1\` | Number of months to render side-by-side |
| \`captionLayout\` | \`'label' \\| 'dropdown'\` | \`'label'\` | Month/year navigation style |
| \`buttonVariant\` | \`ButtonVariant\` | \`'ghost'\` | Style of the prev/next navigation buttons |

---

<div style="background:#eff6ff;border-left:4px solid #3b82f6;padding:12px 16px;border-radius:4px;margin:16px 0">
<strong>💡 Calendar vs DatePicker</strong>

| | \`<Calendar>\` | \`<DatePicker>\` |
|---|---|---|
| **When to use** | Embedded in a layout, inside a dialog or popover you control | Trigger + floating calendar as a self-contained component |
| **Trigger** | You manage it | Built in |
| **Flexibility** | Full — put it anywhere | Fixed popover pattern |

Use \`<Calendar>\` when you need direct control over placement. Use \`<DatePicker>\` for a pre-built input + popover.
</div>
        `,
      },
    },
  },
  argTypes: {
    mode: {
      description:
        'Selection mode — single date, a contiguous range, or multiple individual dates.',
      control: { type: 'select' },
      options: ['single', 'range', 'multiple'],
      table: {
        type: { summary: "'single' | 'range' | 'multiple'" },
      },
    },
    numberOfMonths: {
      description: 'Number of calendar months to render side-by-side.',
      control: { type: 'number', min: 1, max: 4 },
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
    captionLayout: {
      description:
        'Controls how the month/year caption is rendered — as a static label or selectable dropdowns for quick navigation.',
      control: { type: 'radio' },
      options: ['label', 'dropdown'],
      table: {
        type: { summary: "'label' | 'dropdown'" },
        defaultValue: { summary: "'label'" },
      },
    },
    buttonVariant: {
      description: 'Variant applied to the previous/next navigation buttons.',
      control: { type: 'select' },
      options: ['ghost', 'outline', 'primary'],
      table: {
        type: { summary: 'ButtonVariant' },
        defaultValue: { summary: "'ghost'" },
      },
    },
    disabled: {
      description:
        'One or more `Matcher` values — a `Date`, a `DateRange`, `{ before }`, `{ after }`, `{ dayOfWeek }`, or a function `(date: Date) => boolean` — that mark days as unselectable.',
      table: {
        type: { summary: 'Matcher | Matcher[]' },
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Calendar>

// ─── Single ───────────────────────────────────────────────────────────────────

/**
 * Pick a single date. `onSelect` delivers a `Date | undefined` — `undefined` when the user
 * clicks the already-selected date to deselect it.
 *
 * ```tsx
 * const [date, setDate] = useState<Date | undefined>()
 * <Calendar mode="single" selected={date} onSelect={setDate} />
 * ```
 */
export const SingleSelect: Story = {
  name: 'Single Date',
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>()

    return (
      <div className="flex flex-col items-center gap-4">
        <Calendar {...args} mode="single" selected={date} onSelect={setDate} />
        <p className="text-muted-foreground text-sm">
          {date ? dayjs(date).format('dddd, DD MMMM YYYY') : 'No date selected'}
        </p>
      </div>
    )
  },
}

// ─── Range ────────────────────────────────────────────────────────────────────

/**
 * Select a date range. The first click sets `from`, the second sets `to`. `onSelect` delivers
 * `{ from: Date | undefined; to?: Date | undefined }`.
 *
 * ```tsx
 * const [range, setRange] = useState<DateRange | undefined>()
 * <Calendar mode="range" selected={range} onSelect={setRange} />
 * ```
 */
export const RangeSelect: Story = {
  render: (args) => {
    const [range, setRange] = useState<DateRange | undefined>({
      from: new Date(2025, 10, 4),
      to: new Date(),
    })

    return (
      <div className="flex flex-col items-center gap-4">
        <Calendar {...args} mode="range" selected={range} onSelect={setRange} />
        <p className="text-muted-foreground text-sm">
          {range?.from && range?.to
            ? `${dayjs(range.from).format('DD MMM YYYY')} → ${dayjs(range.to).format('DD MMM YYYY')}`
            : range?.from
              ? `From ${dayjs(range.from).format('DD MMM YYYY')} — pick an end date`
              : 'No range selected'}
        </p>
      </div>
    )
  },
}

// ─── Multiple months ──────────────────────────────────────────────────────────

/**
 * Display two months side-by-side — ideal for range selection spanning multiple months so users
 * can see both the start and end without navigating back and forth.
 *
 * ```tsx
 * <Calendar mode="range" numberOfMonths={2} selected={range} onSelect={setRange} />
 * ```
 */
export const MultipleMonths: Story = {
  render: (args) => {
    const [range, setRange] = useState<DateRange | undefined>()

    return (
      <div className="flex flex-col items-center gap-4">
        <Calendar {...args} mode="range" numberOfMonths={2} selected={range} onSelect={setRange} />
        <p className="text-muted-foreground text-sm">
          {range?.from && range?.to
            ? `${dayjs(range.from).format('DD MMM YYYY')} → ${dayjs(range.to).format('DD MMM YYYY')}`
            : range?.from
              ? `From ${dayjs(range.from).format('DD MMM YYYY')} — pick an end date`
              : 'Select a start and end date'}
        </p>
      </div>
    )
  },
}

// ─── Disabled dates ───────────────────────────────────────────────────────────

/**
 * Disable dates using any combination of `Matcher` values. Here past dates and weekends are
 * blocked — useful for booking flows where only future weekdays are valid.
 *
 * ```tsx
 * <Calendar
 *   mode="single"
 *   disabled={[
 *     { before: new Date() },   // all past dates
 *     { dayOfWeek: [0, 6] },   // Sundays and Saturdays
 *   ]}
 * />
 * ```
 */
export const WithDisabledDates: Story = {
  name: 'Disabled Dates',
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>()

    return (
      <div className="flex flex-col items-center gap-4">
        <Calendar
          {...args}
          mode="single"
          selected={date}
          onSelect={setDate}
          disabled={[{ before: new Date() }, { dayOfWeek: [0, 6] }]}
        />
        <p className="text-muted-foreground text-sm">
          {date ? dayjs(date).format('dddd, DD MMMM YYYY') : 'Past dates and weekends are disabled'}
        </p>
      </div>
    )
  },
}

// ─── Dropdown caption ─────────────────────────────────────────────────────────

/**
 * Replace the static month/year label with selectable dropdowns. Useful when users need to jump
 * quickly across months or years — e.g. selecting a birth date or a far-future due date.
 *
 * ```tsx
 * <Calendar mode="single" captionLayout="dropdown" />
 * ```
 */
export const DropdownCaption: Story = {
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>()

    return (
      <Calendar
        {...args}
        mode="single"
        captionLayout="dropdown"
        selected={date}
        onSelect={setDate}
      />
    )
  },
}

// ─── Attached to a Button (Popover) ───────────────────────────────────────────

/**
 * The most common pattern for forms — a button that opens a `<Popover>` containing the calendar.
 * The button label updates to reflect the selected date.
 *
 * ```tsx
 * <Popover>
 *   <PopoverTrigger render={<Button variant="outline" />}>
 *     {date ? format(date, 'dd MMM yyyy') : 'Pick a date'}
 *   </PopoverTrigger>
 *   <PopoverContent className="w-auto p-0">
 *     <Calendar mode="single" selected={date} onSelect={setDate} />
 *   </PopoverContent>
 * </Popover>
 * ```
 */
export const AttachedToButton: Story = {
  name: 'Attached to Button',
  render: () => {
    const [date, setDate] = useState<Date | undefined>()

    return (
      <Popover>
        <PopoverTrigger render={<Button variant="outline" className="w-52 justify-start" />}>
          {date ? dayjs(date).format('DD MMM YYYY') : 'Pick a date'}
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar mode="single" selected={date} onSelect={setDate} />
        </PopoverContent>
      </Popover>
    )
  },
}

/**
 * Range date picker attached to a button. Clicking opens a two-month popover calendar where the
 * user picks a start and end date.
 *
 * ```tsx
 * <Popover>
 *   <PopoverTrigger render={<Button variant="outline" />}>
 *     {range ? `${format(range.from)} → ${format(range.to)}` : 'Select period'}
 *   </PopoverTrigger>
 *   <PopoverContent className="w-auto p-0">
 *     <Calendar mode="range" numberOfMonths={2} selected={range} onSelect={setRange} />
 *   </PopoverContent>
 * </Popover>
 * ```
 */
export const RangeAttachedToButton: Story = {
  name: 'Range Attached to Button',
  render: () => {
    const [range, setRange] = useState<DateRange | undefined>()

    const label =
      range?.from && range?.to
        ? `${dayjs(range.from).format('DD MMM YYYY')} → ${dayjs(range.to).format('DD MMM YYYY')}`
        : range?.from
          ? `From ${dayjs(range.from).format('DD MMM YYYY')}`
          : 'Select period'

    return (
      <Popover>
        <PopoverTrigger render={<Button variant="outline" className="w-72 justify-start" />}>
          {label}
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar mode="range" numberOfMonths={2} selected={range} onSelect={setRange} />
        </PopoverContent>
      </Popover>
    )
  },
}

// ─── Inside a Dialog ──────────────────────────────────────────────────────────

/**
 * Calendar embedded in a `<Dialog>` — useful for mobile-friendly date picking where the calendar
 * should block interaction with the rest of the page. The dialog footer shows the selected date
 * and a confirm action.
 *
 * ```tsx
 * <Dialog
 *   title="Select Date"
 *   content={<Calendar mode="single" selected={date} onSelect={setDate} />}
 *   footer={<Button className="w-full">Confirm</Button>}
 * >
 *   <Button variant="outline">Pick a date</Button>
 * </Dialog>
 * ```
 */
export const InsideDialog: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>()

    return (
      <Dialog
        title="Select Date"
        content={
          <div className="flex justify-center">
            <Calendar mode="single" className="w-full" selected={date} onSelect={setDate} />
          </div>
        }
        footer={
          <div className="flex w-full flex-col gap-2">
            <p className="text-muted-foreground text-center text-sm">
              {date ? dayjs(date).format('dddd, DD MMMM YYYY') : 'No date selected'}
            </p>
            <DialogClose>
              <Button className="w-full">Confirm</Button>
            </DialogClose>
          </div>
        }
      >
        <Button variant="outline">
          {date ? `Selected Date: ${dayjs(date).format('DD MMM YYYY')}` : 'Pick a date'}
        </Button>
      </Dialog>
    )
  },
}

/**
 * Range calendar inside a dialog — the user picks a date range before confirming. Handy for
 * report date filters, booking flows, or any action that requires a period selection.
 *
 * ```tsx
 * <Dialog
 *   title="Select Period"
 *   content={<Calendar mode="range" numberOfMonths={2} selected={range} onSelect={setRange} />}
 *   footer={<><Button variant="outline">Cancel</Button><Button>Apply</Button></>}
 * >
 *   <Button variant="outline">Filter by date</Button>
 * </Dialog>
 * ```
 */
export const RangeInsideDialog: Story = {
  render: () => {
    const [range, setRange] = useState<DateRange | undefined>()

    const label =
      range?.from && range?.to
        ? `${dayjs(range.from).format('DD MMM YYYY')} → ${dayjs(range.to).format('DD MMM YYYY')}`
        : range?.from
          ? `From ${dayjs(range.from).format('DD MMM YYYY')} — pick an end date`
          : 'No period selected'

    return (
      <Dialog
        title="Select Period"
        className="sm:w-fit"
        contentClassName="overflow-x-auto"
        content={
          <div className="flex justify-center">
            <Calendar mode="range" numberOfMonths={2} selected={range} onSelect={setRange} />
          </div>
        }
        footer={
          <div className="flex w-full flex-col gap-2">
            <p className="text-muted-foreground text-center text-sm">{label}</p>
            <div className="flex gap-2">
              <DialogClose className="flex-1">
                <Button className={'w-full'} variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <DialogClose className="flex-1">
                <Button className={'w-full'}>Apply</Button>
              </DialogClose>
            </div>
          </div>
        }
      >
        <Button variant="outline">Filter by date</Button>
      </Dialog>
    )
  },
}
