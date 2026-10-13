import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import dayjs from '@/lib/dayjs'

import {
  DatePicker,
  type DatePickerProps,
  type DatePickerPreset,
} from '@/components/ui/composed/datepicker'
import { Button } from '@/components/ui/button'
import { Flex } from '@/components/core/flex'
import { Typography } from '@/components/core/typography'
import {
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<DatePickerProps<'single'>> = {
  title: 'Components/Fields/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A composable date-picker input that combines a **preset dropdown** with a **calendar popover**.

- **With \`presets\`** — the trigger opens a dropdown of named date shortcuts; the last item is always "Custom" which opens the calendar picker.
- **Without \`presets\`** — the trigger goes straight to the calendar popover.
- **\`mode="single"\`** — selects a single \`Date\`.
- **\`mode="range"\`** — selects \`{ from: Date; to?: Date }\`.  Closing is automatic once both ends are picked.

Fully **controlled** (\`value\` + \`onValueChange\`) or **uncontrolled** (\`defaultValue\` + \`name\` for a hidden \`<input>\`).
The \`ref\` prop forwards to the hidden input, so it integrates directly with **react-hook-form**'s \`register\`.

The trigger is styled identically to \`SelectTrigger\`, respecting \`inputSize\` and \`variant\`.

\`\`\`tsx
import { DatePicker } from 'quickbill-ui'

// Range mode with named presets
<DatePicker
  mode="range"
  presets={[
    { label: '7 hari terakhir', dateValue: { from: sevenDaysAgo, to: today } },
    { label: '30 hari terakhir', dateValue: { from: thirtyDaysAgo, to: today } },
  ]}
  value={value}
  onValueChange={setValue}
/>

// Single mode, no presets → goes straight to calendar
<DatePicker
  mode="single"
  value={date}
  onValueChange={setDate}
  placeholder="Pilih tanggal"
/>

// Uncontrolled + react-hook-form
const { register } = useForm()
<DatePicker mode="single" name="due_date" ref={register('due_date').ref} />
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    mode: {
      control: { type: 'radio' },
      options: ['single', 'range'],
      description: '`single` returns a `Date`; `range` returns `{ from: Date; to?: Date }`',
    },
    placeholder: {
      control: 'text',
      description: 'Text shown in the trigger when no value is selected',
    },
    customLabel: {
      control: 'text',
      description: 'Label for the "Custom" option at the bottom of the preset dropdown',
    },
    inputSize: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'default', 'lg'],
      description: 'Height / padding size of the trigger — mirrors `SelectTrigger` sizes',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'filled', 'ghost'],
      description: 'Visual style of the trigger border',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the trigger and prevents opening any popup',
    },
    'aria-invalid': {
      control: 'boolean',
      description: 'Adds a destructive ring to the trigger (error state)',
    },
    side: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Which side of the trigger the popup opens on',
    },
    align: {
      control: { type: 'select' },
      options: ['start', 'center', 'end'],
      description: 'Alignment of the popup relative to the trigger',
    },
    sideOffset: {
      control: 'number',
      description: 'Gap in px between trigger and popup',
    },
    presets: {
      control: false,
      description:
        'Array of `{ label, dateValue }`. `dateValue` is `Date` for single or `{ from, to }` for range. If omitted, skips the dropdown and goes straight to calendar.',
    },
    value: {
      control: false,
      description: 'Controlled value — `Date` for single, `{ from, to? }` for range',
    },
    defaultValue: {
      control: false,
      description: 'Initial value for uncontrolled usage',
    },
    onValueChange: {
      control: false,
      description: 'Fired on every selection change, including partial ranges',
    },
    onOpenChange: {
      control: false,
      description:
        'Fired when the primary popup opens/closes (dropdown with presets, calendar without)',
    },
    dateDisabled: {
      control: false,
      description:
        'react-day-picker `Matcher | Matcher[]` — disabled date logic passed to the calendar',
    },
    classNames: {
      control: false,
      description:
        'Per-part className overrides: `trigger`, `dropdown`, `calendar`, `dropdownItem`',
    },
    name: {
      control: 'text',
      description: 'Name for the hidden `<input>` — enables native form and RHF uncontrolled usage',
    },
    ref: {
      control: false,
      description: 'Forwarded to the hidden `<input>` — pass react-hook-form `register().ref` here',
    },
  },
}

export default meta
type Story = StoryObj<DatePickerProps<'single'>>

// ─── Shared preset data ───────────────────────────────────────────────────────

const today = dayjs().startOf('day').toDate()

const rangePresets: DatePickerPreset<'range'>[] = [
  { label: 'Hari ini', dateValue: { from: today, to: today } },
  {
    label: '7 hari terakhir',
    dateValue: { from: dayjs().subtract(7, 'day').startOf('day').toDate(), to: today },
  },
  {
    label: '14 hari terakhir',
    dateValue: { from: dayjs().subtract(14, 'day').startOf('day').toDate(), to: today },
  },
  {
    label: '30 hari terakhir',
    dateValue: { from: dayjs().subtract(30, 'day').startOf('day').toDate(), to: today },
  },
  {
    label: '60 hari terakhir',
    dateValue: { from: dayjs().subtract(60, 'day').startOf('day').toDate(), to: today },
  },
]

const singlePresets: DatePickerPreset<'single'>[] = [
  { label: 'Hari ini', dateValue: today },
  { label: '7 hari ke depan', dateValue: dayjs().add(7, 'day').toDate() },
  { label: '14 hari ke depan', dateValue: dayjs().add(14, 'day').toDate() },
  { label: '30 hari ke depan', dateValue: dayjs().add(30, 'day').toDate() },
]

// ─── Helper ───────────────────────────────────────────────────────────────────

function ValueDisplay({
  value,
  mode,
}: {
  value: Date | { from: Date; to?: Date } | undefined
  mode: 'single' | 'range'
}) {
  if (!value) return <span className="text-qb-mist-40 text-xs">Belum dipilih</span>
  if (mode === 'single') {
    return (
      <span className="text-qb-mist-60 text-xs">{dayjs(value as Date).format('DD MMM YYYY')}</span>
    )
  }
  const range = value as { from: Date; to?: Date }
  return (
    <span className="text-qb-mist-60 text-xs">
      {dayjs(range.from).format('DD MMM YYYY')}
      {range.to ? ` — ${dayjs(range.to).format('DD MMM YYYY')}` : ' — ...'}
    </span>
  )
}

// ─── Stories ─────────────────────────────────────────────────────────────────

/** Default usage: range mode with standard presets. */
export const Default: Story = {
  args: {
    mode: 'single',
    placeholder: 'Pilih tanggal',
    inputSize: 'default',
    variant: 'default',
  },
  render: (args) => (
    <div className="w-80">
      <DatePicker {...args} />
    </div>
  ),
}

/** Range mode with named date shortcuts. Selecting "Kustom" opens the calendar inline. */
export const RangeWithPresets: Story = {
  render: () => {
    const [value, setValue] = useState<{ from: Date; to?: Date } | undefined>()
    return (
      <div className="w-80 space-y-2">
        <DatePicker
          mode="range"
          presets={rangePresets}
          value={value}
          onValueChange={setValue}
          placeholder="Pilih rentang tanggal"
        />
        <ValueDisplay value={value} mode="range" />
      </div>
    )
  },
}

/** Single mode with named shortcuts. Custom option uses the Indonesian label. */
export const SingleWithPresets: Story = {
  render: () => {
    const [value, setValue] = useState<Date | undefined>()
    return (
      <div className="w-80 space-y-2">
        <DatePicker
          mode="single"
          presets={singlePresets}
          customLabel="Pilih tanggal lain"
          value={value}
          onValueChange={setValue}
          placeholder="Pilih tanggal"
        />
        <ValueDisplay value={value} mode="single" />
      </div>
    )
  },
}

/** No presets: trigger opens the calendar popover directly. */
export const CalendarOnly: Story = {
  render: () => {
    const [singleVal, setSingleVal] = useState<Date | undefined>()
    const [rangeVal, setRangeVal] = useState<{ from: Date; to?: Date } | undefined>()
    return (
      <Flex gap="6" alignItems="start">
        <Flex direction="col" gap="2">
          <Typography level="sm" className="font-semibold">
            mode=single
          </Typography>
          <div className="w-64">
            <DatePicker
              mode="single"
              value={singleVal}
              onValueChange={setSingleVal}
              placeholder="Pilih tanggal"
            />
          </div>
          <ValueDisplay value={singleVal} mode="single" />
        </Flex>
        <Flex direction="col" gap="2">
          <Typography level="sm" className="font-semibold">
            mode=range
          </Typography>
          <div className="w-72">
            <DatePicker
              mode="range"
              value={rangeVal}
              onValueChange={setRangeVal}
              placeholder="Pilih rentang tanggal"
            />
          </div>
          <ValueDisplay value={rangeVal} mode="range" />
        </Flex>
      </Flex>
    )
  },
}

/** Compares all three visual variants side-by-side. */
export const Variants: Story = {
  render: () => (
    <Flex gap="5" alignItems="start">
      {(['default', 'filled', 'ghost'] as const).map((variant) => (
        <Flex key={variant} direction="col" gap="2">
          <Typography level="sm" className="font-semibold">
            variant=<em>{variant}</em>
          </Typography>
          <div className="w-72">
            <DatePicker
              mode="range"
              presets={rangePresets}
              variant={variant}
              placeholder="Pilih rentang tanggal"
              defaultValue={{ from: today, to: today }}
            />
          </div>
        </Flex>
      ))}
    </Flex>
  ),
}

/** Compares all four sizes: `xs`, `sm`, `default`, and `lg`. */
export const Sizes: Story = {
  render: () => (
    <Flex gap="5" alignItems="start">
      {(['xs', 'sm', 'default', 'lg'] as const).map((size) => (
        <Flex key={size} direction="col" gap="2">
          <Typography level="sm" className="font-semibold">
            inputSize=<em>{size}</em>
          </Typography>
          <div className="w-64">
            <DatePicker
              mode="single"
              presets={singlePresets}
              inputSize={size}
              placeholder="Pilih tanggal"
              defaultValue={today}
            />
          </div>
        </Flex>
      ))}
    </Flex>
  ),
}

/** Disabled, error (`aria-invalid`), and placeholder-only states. */
export const States: Story = {
  render: () => (
    <Flex gap="5" alignItems="start">
      <Flex direction="col" gap="2">
        <Typography level="sm" className="font-semibold">
          Disabled
        </Typography>
        <div className="w-64">
          <DatePicker
            mode="single"
            presets={singlePresets}
            disabled
            defaultValue={today}
            placeholder="Pilih tanggal"
          />
        </div>
      </Flex>
      <Flex direction="col" gap="2">
        <Typography level="sm" className="font-semibold">
          Error (aria-invalid)
        </Typography>
        <div className="w-64">
          <DatePicker
            mode="single"
            presets={singlePresets}
            aria-invalid
            placeholder="Pilih tanggal"
          />
        </div>
      </Flex>
      <Flex direction="col" gap="2">
        <Typography level="sm" className="font-semibold">
          Placeholder only
        </Typography>
        <div className="w-64">
          <DatePicker mode="range" presets={rangePresets} placeholder="Pilih rentang" />
        </div>
      </Flex>
    </Flex>
  ),
}

/**
 * Fully controlled — parent owns the value and external buttons can reset or override it.
 */
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<{ from: Date; to?: Date } | undefined>({
      from: dayjs().subtract(7, 'day').startOf('day').toDate(),
      to: today,
    })
    return (
      <Flex direction="col" gap="4" className="w-80">
        <Flex gap="2">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setValue({
                from: dayjs().subtract(30, 'day').startOf('day').toDate(),
                to: today,
              })
            }
          >
            Set 30 hari
          </Button>
          <Button variant="secondary-outline" size="sm" onClick={() => setValue(undefined)}>
            Clear
          </Button>
        </Flex>
        <DatePicker
          mode="range"
          presets={rangePresets}
          value={value}
          onValueChange={setValue}
          placeholder="Pilih rentang tanggal"
        />
        <ValueDisplay value={value} mode="range" />
      </Flex>
    )
  },
}

/**
 * Uncontrolled with a hidden `<input name="...">`.
 * Submit the form to see the serialised value (ISO string, comma-separated for range).
 */
export const UncontrolledForm: Story = {
  render: () => {
    const [submitted, setSubmitted] = useState<string | null>(null)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const data = new FormData(e.currentTarget)
      setSubmitted(data.get('date_range') as string)
    }

    return (
      <form onSubmit={handleSubmit}>
        <Flex direction="col" gap="4" className="w-80">
          <DatePicker
            mode="range"
            presets={rangePresets}
            name="date_range"
            defaultValue={{ from: today, to: today }}
            placeholder="Pilih rentang tanggal"
          />
          <Button type="submit" className="w-full">
            Submit form
          </Button>
          {submitted !== null && (
            <Typography level="sm">
              Hidden input value: <strong className="break-all">{submitted || '(empty)'}</strong>
            </Typography>
          )}
        </Flex>
      </form>
    )
  },
}

/**
 * Inside a Dialog — verifies that the calendar popover layers correctly above the modal backdrop
 * and that clicking dates does not accidentally close the dialog.
 */
export const InsideDialog: Story = {
  render: () => {
    const [rangeVal, setRangeVal] = useState<{ from: Date; to?: Date } | undefined>()
    const [singleVal, setSingleVal] = useState<Date | undefined>()

    return (
      <DialogRoot>
        <DialogTrigger render={<Button>Buka Dialog</Button>} />
        <DialogContent className="w-full max-w-md">
          <DialogHeader title="Filter Tanggal" />
          <DialogBody>
            <Flex direction="col" gap="4">
              <Flex direction="col" gap="1.5">
                <Label>Rentang tanggal</Label>
                <DatePicker
                  mode="range"
                  presets={rangePresets}
                  value={rangeVal}
                  onValueChange={setRangeVal}
                  placeholder="Pilih rentang"
                />
                <ValueDisplay value={rangeVal} mode="range" />
              </Flex>
              <Flex direction="col" gap="1.5">
                <Label>Tanggal jatuh tempo</Label>
                <DatePicker
                  mode="single"
                  value={singleVal}
                  onValueChange={setSingleVal}
                  placeholder="Pilih tanggal"
                />
                <ValueDisplay value={singleVal} mode="single" />
              </Flex>
            </Flex>
          </DialogBody>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setRangeVal(undefined)
                setSingleVal(undefined)
              }}
            >
              Reset
            </Button>
            <Button>Terapkan</Button>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    )
  },
}

/** `dateDisabled` forwards react-day-picker matchers — here all past dates are blocked. */
export const DisabledDates: Story = {
  render: () => {
    const [value, setValue] = useState<Date | undefined>()
    return (
      <Flex gap="6" alignItems="start">
        <Flex direction="col" gap="2">
          <Typography level="sm" className="font-semibold">
            Blokir tanggal lampau
          </Typography>
          <div className="w-72">
            <DatePicker
              mode="single"
              presets={singlePresets}
              value={value}
              onValueChange={setValue}
              placeholder="Pilih tanggal"
              dateDisabled={{ before: new Date() }}
            />
          </div>
          <ValueDisplay value={value} mode="single" />
        </Flex>
        <Flex direction="col" gap="2">
          <Typography level="sm" className="font-semibold">
            Blokir hari tertentu (Sabtu & Minggu)
          </Typography>
          <div className="w-72">
            <DatePicker
              mode="single"
              value={value}
              onValueChange={setValue}
              placeholder="Pilih tanggal"
              dateDisabled={[{ dayOfWeek: [0, 6] }]}
            />
          </div>
          <ValueDisplay value={value} mode="single" />
        </Flex>
      </Flex>
    )
  },
}

/** Custom `customLabel` and per-part `classNames` overrides. */
export const CustomisedAppearance: Story = {
  render: () => (
    <Flex gap="6" alignItems="start">
      <Flex direction="col" gap="2">
        <Typography level="sm" className="font-semibold">
          customLabel="Kustom"
        </Typography>
        <div className="w-72">
          <DatePicker
            mode="range"
            presets={rangePresets}
            customLabel="Kustom"
            placeholder="Pilih rentang"
          />
        </div>
      </Flex>
      <Flex direction="col" gap="2">
        <Typography level="sm" className="font-semibold">
          classNames.dropdownItem
        </Typography>
        <div className="w-72">
          <DatePicker
            mode="range"
            presets={rangePresets}
            placeholder="Pilih rentang"
            classNames={{
              dropdownItem: 'font-mono text-xs',
            }}
          />
        </div>
      </Flex>
    </Flex>
  ),
}

/**
 * `useDialogOnMobile` renders a full-screen Dialog on screens narrower than `sm` (640 px).
 * — With presets: first dialog shows the preset list; "Custom" opens a second calendar dialog
 *   with a chevron-left back button that returns to the preset list.
 * — Without presets: trigger opens the calendar dialog directly with an ✕ close button.
 * Resize the viewport below 640 px to see the dialog behaviour.
 */
export const DialogOnMobile: Story = {
  render: () => {
    const [rangeVal, setRangeVal] = useState<{ from: Date; to?: Date } | undefined>()
    const [singleVal, setSingleVal] = useState<Date | undefined>()
    return (
      <Flex gap="6" alignItems="start">
        <Flex direction="col" gap="2">
          <Typography level="sm" className="font-semibold">
            With presets (range)
          </Typography>
          <div className="w-72">
            <DatePicker
              mode="range"
              presets={rangePresets}
              value={rangeVal}
              onValueChange={setRangeVal}
              placeholder="Pilih rentang tanggal"
              useDialogOnMobile
            />
          </div>
          <ValueDisplay value={rangeVal} mode="range" />
        </Flex>
        <Flex direction="col" gap="2">
          <Typography level="sm" className="font-semibold">
            No presets (single)
          </Typography>
          <div className="w-64">
            <DatePicker
              mode="single"
              value={singleVal}
              onValueChange={setSingleVal}
              placeholder="Pilih tanggal"
              useDialogOnMobile
              calendarDialogTitle="Pilih Tanggal"
            />
          </div>
          <ValueDisplay value={singleVal} mode="single" />
        </Flex>
      </Flex>
    )
  },
}

/**
 * `side` and `align` control where the popup opens.
 * Scroll down if the popup appears off-screen.
 */
export const Positioning: Story = {
  render: () => (
    <Flex gap="8" alignItems="center" className="mt-40">
      {(
        [
          { side: 'top', label: 'side=top' },
          { side: 'bottom', align: 'end', label: 'side=bottom align=end' },
          { side: 'bottom', sideOffset: 16, label: 'sideOffset=16' },
        ] as const
      ).map(({ label, ...props }) => (
        <Flex key={label} direction="col" gap="2" alignItems="center">
          <Typography level="sm">{label}</Typography>
          <div className="w-64">
            <DatePicker mode="single" presets={singlePresets} placeholder="Open me" {...props} />
          </div>
        </Flex>
      ))}
    </Flex>
  ),
}
