import React, { useRef, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Select } from '@/components/ui/composed/select'
import { Button } from '@/components/ui/button'
import { Flex } from '@/components/core/flex'
import { Typography } from '@/components/core/typography'
import { Icon } from '@/components/icons'

const meta: Meta<typeof Select> = {
  title: 'Components/Fields/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A lightweight select built on top of [Base UI Select](https://base-ui.com/react/components/select).
The user opens a dropdown and picks one option — no typing, no filtering.
It is the right choice when the list is short enough that users can scan it at a glance.

**Base component:** [\`@base-ui/react\` Select](https://base-ui.com/react/components/select)

<div style="background:#eff6ff;border-left:4px solid #3b82f6;padding:12px 16px;border-radius:4px;margin:16px 0">
<strong>💡 When to use Select vs Combobox</strong>

Select is simpler, lighter, and more predictable than Combobox.
If the list is long (20+ items) or users benefit from typing to narrow results,
use <a href="?path=/docs/components-inputs-combobox--docs"><strong>Combobox</strong></a> instead.

| | Select | Combobox |
|---|---|---|
| Built-in search / filtering | ❌ | ✅ |
| Good for short lists (&lt;20 items) | ✅ | — |
| Good for long lists (20+ items) | — | ✅ |
| Simpler markup & behaviour | ✅ | — |
</div>

\`\`\`tsx
import { Select } from 'quickbill-ui'

// String options
<Select items={['Draft', 'Sent', 'Paid']} placeholder="Status" />

// Object options — label shown to user, value submitted to form
<Select
  items={[{ value: 'jkt', label: 'Jakarta' }, { value: 'sgp', label: 'Singapore' }]}
  placeholder="Select a city"
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Text shown in the trigger when nothing is selected',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'filled', 'ghost'],
      description: 'Visual style of the trigger button',
    },
    inputSize: {
      control: { type: 'select' },
      options: ['sm', 'default', 'lg'],
      description: 'Height / padding size of the trigger',
    },
    disabled: {
      control: 'boolean',
      description: 'Prevent the user from opening the dropdown',
    },
    readOnly: {
      control: 'boolean',
      description: 'Show the value but block changes',
    },
    required: {
      control: 'boolean',
      description: 'Participate in native form constraint validation',
    },
    multiple: {
      control: 'boolean',
      description: 'Allow selecting more than one item',
    },
    showClearButton: {
      control: 'boolean',
      description: 'Show the × clear button when a value is selected',
      defaultValue: true,
    },
    name: {
      control: 'text',
      description: 'Name attribute used for HTML form submission',
    },
    empty: {
      control: 'text',
      description: 'Content shown when `items` is empty',
    },
    prefixList: {
      control: false,
      description: 'Node rendered above the option list inside the dropdown',
    },
    suffixList: {
      control: false,
      description: 'Node rendered below the option list inside the dropdown',
    },
    customItemRenderer: {
      control: false,
      description: 'Override the default option row: `(item, index, isSelected) => ReactNode`',
    },
    customValueRenderer: {
      control: false,
      description:
        'Override what the trigger displays for the selected value: `(value) => ReactNode`',
    },
    itemToStringLabel: {
      control: false,
      description: 'Extract a display label from an object item',
    },
    classNames: {
      control: false,
      description:
        'Per-part className overrides: `root`, `trigger`, `value`, `content`, `list`, `item`, `groupLabel`, `prefixList`, `suffixList`',
    },
    infiniteScroll: {
      control: false,
      description: 'Config for paginated loading: `{ hasNextPage, isLoading, onLoadMore }`',
    },
    side: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Which side of the trigger the dropdown opens on',
    },
    align: {
      control: { type: 'select' },
      options: ['start', 'center', 'end'],
      description: 'Alignment of the dropdown relative to the trigger',
    },
    sideOffset: {
      control: 'number',
      description: 'Gap in px between trigger and dropdown',
    },
    value: {
      control: false,
      description: 'Controlled selected value',
    },
    defaultValue: {
      control: false,
      description: 'Initial value for uncontrolled usage',
    },
    onValueChange: {
      control: false,
      description: 'Callback fired when the selection changes',
    },
  },
}

export default meta
type Story = StoryObj<typeof Select>

// ---------------------------------------------------------------------------
// Shared sample data
// ---------------------------------------------------------------------------

interface SimpleOption {
  value: string
  label: string
}

interface PartnerOption extends SimpleOption {
  phoneNumber: string
  email: string
}

const simpleOptions: SimpleOption[] = [
  { value: 'jakarta', label: 'Jakarta' },
  { value: 'singapore', label: 'Singapore' },
  { value: 'bangkok', label: 'Bangkok' },
  { value: 'london', label: 'London' },
  { value: 'paris', label: 'Paris' },
]

const groupedOptions: Array<{ title: string; value: string; items: SimpleOption[] }> = [
  {
    title: 'Asia',
    value: 'asia',
    items: [
      { value: 'jakarta', label: 'Jakarta' },
      { value: 'singapore', label: 'Singapore' },
      { value: 'bangkok', label: 'Bangkok' },
    ],
  },
  {
    title: 'Europe',
    value: 'europe',
    items: [
      { value: 'london', label: 'London' },
      { value: 'paris', label: 'Paris' },
      { value: 'berlin', label: 'Berlin' },
    ],
  },
  {
    title: 'Americas',
    value: 'americas',
    items: [
      { value: 'new-york', label: 'New York' },
      { value: 'sao-paulo', label: 'São Paulo' },
    ],
  },
]

const partnerOptions: PartnerOption[] = [
  {
    value: 'mitra-1',
    label: 'PT. Contoh Sejahtera',
    phoneNumber: '081200000001',
    email: 'contoh@example.com',
  },
  {
    value: 'mitra-2',
    label: 'Budi Santoso',
    phoneNumber: '081200000002',
    email: 'budi@example.com',
  },
  {
    value: 'mitra-3',
    label: 'PT Maju Bersama',
    phoneNumber: '081200000003',
    email: 'info@example.com',
  },
]

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

/** Simplest usage: object items with `value` and `label` fields. No extra config needed. */
export const Basic: Story = {
  args: {
    items: simpleOptions,
    placeholder: 'Select a city...',
  },
}

/** Compares all three visual variants: `default`, `filled`, and `ghost`. */
export const Variants: Story = {
  render: () => (
    <Flex gap="4" alignItems="start">
      {(['default', 'filled', 'ghost'] as const).map((variant) => (
        <Flex key={variant} direction="col" gap="2">
          <Typography level="sm">
            variant=<strong>{variant}</strong>
          </Typography>
          <Select
            items={simpleOptions}
            variant={variant}
            defaultValue={{ value: 'jakarta', label: 'Jakarta' }}
            placeholder="Select a city..."
          />
        </Flex>
      ))}
    </Flex>
  ),
}

/** Compares all three sizes: `sm`, `default`, and `lg`. */
export const Sizes: Story = {
  render: () => (
    <Flex gap="4" alignItems="start">
      {(['sm', 'default', 'lg'] as const).map((size) => (
        <Flex key={size} direction="col" gap="2">
          <Typography level="sm">
            inputSize=<strong>{size}</strong>
          </Typography>
          <Select
            items={simpleOptions}
            inputSize={size}
            defaultValue={{ value: 'jakarta', label: 'Jakarta' }}
            placeholder="Select a city..."
          />
        </Flex>
      ))}
    </Flex>
  ),
}

/** Demonstrates `disabled`, `aria-invalid` (error), and `readOnly` states. */
export const States: Story = {
  render: () => (
    <Flex gap="4" alignItems="start">
      <Flex direction="col" gap="2">
        <Typography level="sm">Disabled</Typography>
        <Select items={simpleOptions} disabled placeholder="Disabled" />
      </Flex>
      <Flex direction="col" gap="2">
        <Typography level="sm">Error</Typography>
        <Select items={simpleOptions} aria-invalid placeholder="Error state" />
      </Flex>
      <Flex direction="col" gap="2">
        <Typography level="sm">Read-only</Typography>
        <Select
          items={simpleOptions}
          readOnly
          defaultValue={{ value: 'jakarta', label: 'Jakarta' }}
          placeholder="Read-only"
        />
      </Flex>
    </Flex>
  ),
}

/**
 * Items structured as `{ title, value, items[] }` render with labelled group separators.
 * The `title` field is shown as the group heading; `value` is used as the React key.
 */
export const Grouped: Story = {
  args: {
    items: groupedOptions,
    placeholder: 'Select a city...',
  },
}

/**
 * When items are arbitrary objects, pass `itemToStringLabel` so the component knows
 * what text to display in the trigger and dropdown rows.
 * The `value` field (or `id`) is still used for equality checks automatically.
 */
export const CustomObjects: Story = {
  args: {
    items: partnerOptions,
    placeholder: 'Select a partner...',
    itemToStringLabel: (option) => (option as PartnerOption).label,
  },
}

/**
 * `customValueRenderer` replaces what the trigger shows for the selected value.
 * Receives the selected item and must return a `ReactNode`.
 * The placeholder still shows when nothing is selected.
 */
export const CustomValueRenderer: Story = {
  render: () => (
    <div className="w-85">
      <Select
        items={partnerOptions}
        placeholder="Select a partner..."
        className="h-auto min-w-120"
        customValueRenderer={(option: PartnerOption | null) => {
          if (!option) return undefined
          return (
            <div className="flex items-center gap-6 p-2">
              <div className="bg-qb-blue-15 flex size-8 items-center justify-center rounded-full">
                <Icon name="User2" className="text-qb-primary" />
              </div>
              <Flex direction="col">
                <span className="font-medium">{option.label}</span>
                <span className="text-qb-mist-40 font-normal">{option.email}</span>
              </Flex>
            </div>
          )
        }}
      />
    </div>
  ),
}

/**
 * `customItemRenderer` replaces the default label text with any React node.
 * Receives `(item, index, isSelected)` — use `isSelected` to style the active row.
 */
export const CustomRendering: Story = {
  render: () => (
    <div className="w-85">
      <Select
        items={partnerOptions}
        placeholder="Select a partner..."
        className="min-w-80"
        itemToStringLabel={(option: PartnerOption) => option.label}
        customItemRenderer={(option: PartnerOption, _, isSelected) => (
          <div className={`flex flex-col gap-1 ${isSelected ? 'text-qb-blue-60' : ''}`}>
            <span className="text-sm font-medium">{option.label}</span>
            <span className="text-qb-mist-50 text-xs">
              {option.phoneNumber} • {option.email}
            </span>
          </div>
        )}
      />
    </div>
  ),
}

/**
 * Fully controlled: parent owns `value` and updates it via `onValueChange`.
 * Use this pattern inside forms or when the selected value drives other UI state.
 */
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<SimpleOption | null>({
      value: 'singapore',
      label: 'Singapore',
    })
    return (
      <Flex direction="col" gap="4" className="w-80">
        <Flex gap="2">
          <Button
            variant="outline"
            onClick={() => setValue({ value: 'bangkok', label: 'Bangkok' })}
          >
            Set to &rsquo;Bangkok&rsquo;
          </Button>
          <Button variant="secondary-outline" onClick={() => setValue(null)}>
            Clear
          </Button>
        </Flex>
        <Select
          className="w-full"
          items={simpleOptions}
          placeholder="Controlled select..."
          value={value}
          onValueChange={(next) => setValue(next)}
        />
        <Typography level="sm">
          Selected: <strong>{value?.label ?? 'none'}</strong>
        </Typography>
      </Flex>
    )
  },
}

/**
 * `showClearButton={false}` hides the × clear button even when a value is selected.
 * Use when clearing is not a valid action (e.g. a required field with a safe default).
 */
export const ShowClearButton: Story = {
  render: () => (
    <Flex gap="4" alignItems="start">
      <Flex direction="col" gap="2">
        <Typography level="sm">showClearButton=false</Typography>
        <Select
          items={simpleOptions}
          showClearButton={false}
          defaultValue={{ value: 'jakarta', label: 'Jakarta' }}
          placeholder="No clear button"
        />
      </Flex>
      <Flex direction="col" gap="2">
        <Typography level="sm">showClearButton=true (default)</Typography>
        <Select
          items={simpleOptions}
          showClearButton
          defaultValue={{ value: 'jakarta', label: 'Jakarta' }}
          placeholder="With clear button"
        />
      </Flex>
    </Flex>
  ),
}

/**
 * Pass `multiple` to allow selecting more than one option.
 * The trigger displays all selected labels; the clear button removes all at once.
 */
export const Multiple: Story = {
  render: () => {
    const [value, setValue] = useState<SimpleOption[]>([])
    return (
      <Flex direction="col" gap="4" className="w-80">
        <Select
          items={simpleOptions}
          multiple
          value={value}
          onValueChange={(next) => setValue((next as SimpleOption[]) ?? [])}
          placeholder="Select cities..."
          className="w-full"
        />
        <Typography level="sm">
          Selected ({value.length}):{' '}
          <strong>{value.map((v) => v.label).join(', ') || 'none'}</strong>
        </Typography>
      </Flex>
    )
  },
}

/**
 * `prefixList` and `suffixList` slot arbitrary React nodes above and below the option list.
 * Common uses: category headers, hints, "create new" actions, or item counts.
 */
export const WithPrefixSuffix: Story = {
  render: () => (
    <div className="w-85">
      <Select
        items={simpleOptions}
        placeholder="Select a city..."
        prefixList={
          <div className="border-qb-input w-full border-b pb-2">
            <Button variant="link">
              <Icon name="PlusOutlined" />
              Add new city
            </Button>
          </div>
        }
        suffixList={
          <div className="border-qb-input border-t px-4 py-1">
            <Typography level="sm" className="text-qb-mist-50">
              {simpleOptions.length} cities available
            </Typography>
          </div>
        }
      />
    </div>
  ),
}

/**
 * `classNames` lets you override the style of each internal part without fighting `className`.
 * Parts: `root`, `trigger`, `value`, `content`, `list`, `item`, `groupLabel`, `prefixList`, `suffixList`.
 */
export const CustomClassNames: Story = {
  render: () => (
    <Flex gap="4" alignItems="start">
      <Flex direction="col" gap="2">
        <Typography level="sm">Custom item styles</Typography>
        <Select
          items={simpleOptions}
          placeholder="Select a city..."
          classNames={{
            list: 'max-h-36',
            item: 'font-mono text-xs',
          }}
        />
      </Flex>
      <Flex direction="col" gap="2">
        <Typography level="sm">Custom group label styles</Typography>
        <Select
          items={groupedOptions}
          placeholder="Select a city..."
          classNames={{
            groupLabel: 'text-qb-primary font-semibold uppercase tracking-wide text-xs',
          }}
        />
      </Flex>
    </Flex>
  ),
}

/** The `empty` prop replaces the default "No options available." when `items` is an empty array. */
export const EmptyState: Story = {
  render: () => (
    <Flex gap="4" alignItems="start">
      <Flex direction="col" gap="2">
        <Typography level="sm">String empty message</Typography>
        <Select items={[]} placeholder="No options" empty="There are no cities yet." />
      </Flex>
      <Flex direction="col" gap="2">
        <Typography level="sm">Custom node empty state</Typography>
        <Select
          items={[]}
          placeholder="No options"
          empty={
            <Flex direction="col" gap="2" alignItems="center" className="py-2">
              <Icon name="SearchOutlined" size={20} />
              <Typography level="sm">No cities available</Typography>
            </Flex>
          }
        />
      </Flex>
    </Flex>
  ),
}

/**
 * `name` and `required` wire the select into native HTML form submission.
 * A hidden `<input>` with the given `name` carries the selected value's string representation.
 */
export const RequiredForm: Story = {
  render: () => {
    const formRef = useRef<HTMLFormElement>(null)
    const [submitted, setSubmitted] = useState<string | null>(null)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const data = new FormData(e.currentTarget)
      setSubmitted(data.get('city') as string)
    }

    return (
      <form ref={formRef} onSubmit={handleSubmit}>
        <Flex direction="col" gap="4" className="w-72">
          <Select
            items={simpleOptions}
            name="city"
            required
            placeholder="City (required)"
            className="w-full"
          />
          <Button type="submit" className="w-full">
            Submit
          </Button>
          {submitted !== null && (
            <Typography level="sm">
              Submitted value: <strong>{submitted || '(empty)'}</strong>
            </Typography>
          )}
        </Flex>
      </form>
    )
  },
}

/**
 * `side`, `align`, and `sideOffset` control where the dropdown appears relative to the trigger.
 * These mirror the [Base UI Positioner](https://base-ui.com/react/components/select#positioner) props.
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
          <Select items={simpleOptions} placeholder="Open me" {...props} />
        </Flex>
      ))}
    </Flex>
  ),
}

/**
 * `infiniteScroll.hasNextPage` shows a loader at the end of the list.
 * `infiniteScroll.onLoadMore` fires when the loader scrolls into view.
 */
export const WithInfiniteScroll: Story = {
  render: () => {
    const allItems = Array.from({ length: 40 }, (_, i) => ({
      value: `option-${i + 1}`,
      label: `Option ${i + 1}`,
    }))
    const [items, setItems] = useState(allItems.slice(0, 10))
    const [loading, setLoading] = useState(false)

    const loadMore = () => {
      if (loading || items.length >= allItems.length) return
      setLoading(true)
      setTimeout(() => {
        setItems((prev) => allItems.slice(0, prev.length + 10))
        setLoading(false)
      }, 800)
    }

    return (
      <Flex direction="col" gap="2">
        <Typography level="sm">
          Loaded {items.length} / {allItems.length} items
        </Typography>
        <Select
          items={items}
          placeholder="Select an item..."
          className="w-60"
          infiniteScroll={{
            hasNextPage: items.length < allItems.length,
            isLoading: loading,
            onLoadMore: loadMore,
          }}
        />
      </Flex>
    )
  },
}
