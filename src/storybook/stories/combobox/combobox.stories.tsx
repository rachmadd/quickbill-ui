import { Combobox } from '@/components/ui/composed/combobox/combobox'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { countryData, type Country } from '@/lib/data/country'
import { useEffect, useRef, useState } from 'react'
import { Flex } from '@/components/core/flex'
import { Button } from '@/components/ui/button'
import { Typography, TypographyContent } from '@/components/core/typography'
import { Spinner } from '@/components/ui/spinner'
import { people, type Person } from '@/lib/data/employee'
import { Icon } from '@/components/icons'
import dayjs from 'dayjs'
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogRoot,
} from '@/components/ui/dialog'

const meta: Meta<typeof Combobox> = {
  title: 'Components/Fields/Combobox',
  component: Combobox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A feature-rich combobox built on top of [Base UI Combobox](https://base-ui.com/react/components/combobox).
It supports single/multiple selection, object items with custom label/value accessors, grouped items,
infinite scroll, custom item rendering, controlled state, and composable prefix/suffix slots.

**Base component:** [\`@base-ui/react\` Combobox](https://base-ui.com/react/components/combobox)

<div style="background:#eff6ff;border-left:4px solid #3b82f6;padding:12px 16px;border-radius:4px;margin:16px 0">
<strong>💡 Use Combobox only when search is needed</strong>

Combobox adds a search input, filtering logic, and a keyboard-navigable dropdown — that's extra complexity.
If your list is short enough that users can scan it without searching, use <a href="?path=/docs/components-inputs-select--docs"><strong>Select</strong></a> instead.
It is simpler, lighter, and more predictable.

| | Combobox | Select |
|---|---|---|
| Built-in search / filtering | ✅ | ❌ |
| Good for long lists (20+ items) | ✅ | — |
| Good for short lists (&lt;20 items) | — | ✅ |
| Simpler markup & behaviour | — | ✅ |
</div>

<div style="background:#fff7ed;border-left:4px solid #f97316;padding:12px 16px;border-radius:4px;margin:16px 0">
<strong>⚠️ Always match <code>value</code> shape to <code>items</code> shape</strong>

When <code>items</code> is an array of objects, pass the full object as <code>value</code> / <code>defaultValue</code> too — not just the ID string.
Mixing types (object items + string value) forces the component to resolve the value by scanning the list on every render.
This works fine with static data but becomes unpredictable when items load asynchronously: if the list hasn't arrived yet,
the string value cannot be matched, so the combobox renders as if nothing is selected.

<br/>

✅ **Preferred — value shape mirrors items**

\`\`\`tsx
<Combobox
  items={countries}                        // Country[]
  value={{ id: '123', country: 'Indonesia' }} // same shape
  getItemLabel={(item) => item.country}
  getItemValue={(item) => item.id}
/>
\`\`\`

⚠️ **Avoid — value type differs from items type**

\`\`\`tsx
<Combobox
  items={countries}   // Country[]
  value="123"         // string ID — will fail to match until items are loaded
  getItemLabel={(item) => item.country}
  getItemValue={(item) => item.id}
/>
\`\`\`

If string IDs are unavoidable (e.g. coming from an API response), load the full item from the list before passing it as \`value\`,
or ensure \`items\` is always populated before the controlled \`value\` is set.
</div>

\`\`\`tsx
import { Combobox } from 'quickbill-ui'

// String items — value is also a string, always consistent
<Combobox items={['Apple', 'Banana', 'Cherry']} placeholder="Select a fruit" />

// Object items — value mirrors the object shape
<Combobox
  items={countries}
  value={selectedCountry}             // Country | null, not a string ID
  getItemLabel={(item) => item.name}
  getItemValue={(item) => item.id}
  placeholder="Select a country"
/>

// Multiple selection — value is Country[], not string[]
<Combobox
  items={countries}
  multiple
  value={selectedCountries}           // Country[]
  getItemLabel={(item) => item.name}
  getItemValue={(item) => item.id}
  placeholder="Select countries"
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    // Basic props
    placeholder: {
      description: 'Placeholder text shown when no value is selected',
      control: 'text',
    },
    showClearButton: {
      description: 'Show clear button when a value is selected',
      control: 'boolean',
      defaultValue: true,
    },

    // Content customization
    prefixList: {
      description: 'Content to display before the item list',
      control: false,
    },
    suffixList: {
      description: 'Content to display after the item list',
      control: false,
    },
    empty: {
      description: 'Custom empty state message or component',
      control: 'text',
    },

    // Item rendering
    customItemRenderer: {
      description: 'Custom function to render individual items',
      control: false,
    },

    // Styling
    className: {
      description: 'CSS class for the root element',
      control: 'text',
    },
    classNames: {
      description: 'Object with CSS classes for specific parts',
      control: false,
    },

    // Advanced features
    infiniteScroll: {
      description: 'Configuration for infinite scroll loading',
      control: false,
    },

    // Base UI inherited props
    disabled: {
      description: 'Disable the combobox',
      control: 'boolean',
    },
    readOnly: {
      description: 'Make the combobox read-only',
      control: 'boolean',
    },
    required: {
      description: 'Mark the combobox as required',
      control: 'boolean',
    },
    name: {
      description: 'Name attribute for form submission',
      control: 'text',
    },
    modal: {
      description: 'Render the dropdown as a modal (portal)',
      control: 'boolean',
      defaultValue: false,
    },
    open: {
      description: 'Control the open state of the dropdown',
      control: 'boolean',
    },
    defaultOpen: {
      description: 'Default open state for uncontrolled usage',
      control: 'boolean',
    },
    onOpenChange: {
      description: 'Callback when the open state changes',
      control: false,
    },
    value: {
      description: 'Controlled selected value(s)',
      control: false,
    },
    defaultValue: {
      description: 'Default selected value(s) for uncontrolled usage',
      control: false,
    },
    onValueChange: {
      description: 'Callback when the selected value changes',
      control: false,
    },
    inputValue: {
      description: 'Controlled input value for filtering',
      control: 'text',
    },
    defaultInputValue: {
      description: 'Default input value for uncontrolled usage',
      control: 'text',
    },
    onInputValueChange: {
      description: 'Callback when the input value changes',
      control: false,
    },
    filter: {
      description: 'Custom filter function for items',
      control: false,
    },
  },
}

export default meta

type Story = StoryObj<typeof Combobox>

/** Basic usage with a plain string array. Items are used as both label and value automatically. */
export const Default: Story = {
  args: {
    items: ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'],
    placeholder: 'Select a fruit',
  },
  render: (args) => {
    return <Combobox {...args} />
  },
}

/** Shows all three available sizes side-by-side: `sm`, `default`, and `lg`. */
export const Sizes: Story = {
  args: {
    inputSize: 'default',
    placeholder: 'Select a country',
  },
  render: (args) => {
    const items = countryData
    return (
      <Flex gap="2" alignItems="start">
        <Combobox
          items={items}
          inputSize={'sm'}
          defaultValue={{
            id: '69e3d13602285b333e56f780',
            country: 'Indonesia',
          }}
          getItemLabel={(item) => item.country}
          getItemValue={(item) => item.id}
        />
        <Combobox
          items={items}
          inputSize={args.inputSize}
          defaultValue={{
            id: '69e3d13602285b333e56f780',
            country: 'Indonesia',
          }}
          getItemLabel={(item) => item.country}
          getItemValue={(item) => item.id}
        />
        <Combobox
          items={items}
          inputSize={'lg'}
          defaultValue={{
            id: '69e3d13602285b333e56f780',
            country: 'Indonesia',
          }}
          getItemLabel={(item) => item.country}
          getItemValue={(item) => item.id}
        />
      </Flex>
    )
  },
}

/** Demonstrates `disabled` and `aria-invalid` (error) states. */
export const States: Story = {
  args: {
    inputSize: 'default',
    placeholder: 'Select a country',
  },
  render: (args) => {
    const items = countryData
    return (
      <Flex gap="2" alignItems="start">
        <Combobox
          items={items}
          disabled
          placeholder="Disabled"
          getItemLabel={(item) => item.country}
          getItemValue={(item) => item.id}
        />
        <Combobox
          items={items}
          inputSize={args.inputSize}
          aria-invalid
          placeholder="Error"
          getItemLabel={(item) => item.country}
          getItemValue={(item) => item.id}
        />
      </Flex>
    )
  },
}

/**
 * The `readOnly` prop prevents the user from changing the value but keeps the combobox interactive
 * (the dropdown can still be opened, items can be seen, but selection is blocked).
 */
export const ReadOnly: Story = {
  render: () => {
    const items = countryData
    return (
      <Flex gap="2" alignItems="start" direction="col">
        <Typography level="sm">Read-only with pre-selected value</Typography>
        <Combobox
          items={items}
          readOnly
          defaultValue={{ id: '69e3d13602285b333e56f780', country: 'Indonesia' }}
          getItemLabel={(item) => item.country}
          getItemValue={(item) => item.id}
        />
        <Typography level="sm">Read-only with no value</Typography>
        <Combobox
          items={items}
          readOnly
          placeholder="Cannot select"
          getItemLabel={(item) => item.country}
          getItemValue={(item) => item.id}
        />
      </Flex>
    )
  },
}

/** Compares all three visual variants side-by-side: `filled`, `default`, and `ghost`. */
export const Variants: Story = {
  args: {
    items: countryData,
  },
  render: (args) => {
    const items = args.items as Country[]
    return (
      <Flex gap="2">
        <Combobox
          items={items}
          placeholder="Filled"
          variant={'filled'}
          defaultValue={{
            id: '69e3d13602285b333e56f780',
            country: 'Indonesia',
          }}
          getItemLabel={(item) => item.country}
          getItemValue={(item) => item.id}
        />
        <Combobox
          items={items}
          placeholder="Default"
          variant={'default'}
          defaultValue={{
            id: '69e3d13602285b333e56f780',
            country: 'Indonesia',
          }}
          getItemLabel={(item) => item.country}
          getItemValue={(item) => item.id}
        />
        <Combobox
          items={items}
          placeholder="Ghost"
          variant={'ghost'}
          defaultValue={{
            id: '69e3d13602285b333e56f780',
            country: 'Indonesia',
          }}
          getItemLabel={(item) => item.country}
          getItemValue={(item) => item.id}
        />
      </Flex>
    )
  },
}

/**
 * Items structured as `{ value: string; items: Item[] }[]` are automatically rendered
 * with group headers. Useful for categorized option lists.
 */
export const GroupItem: Story = {
  args: {
    items: countryData,
    placeholder: 'Select a country',
  },
  render: (args) => {
    const items = [
      {
        value: 'Umum',
        items: [
          { label: 'Unit', value: 'Unit' },
          { label: 'Pcs', value: 'Pcs' },
          { label: 'Lusin', value: 'Lusin' },
          { label: 'Kodi', value: 'Kodi' },
          { label: 'Set', value: 'Set' },
          { label: 'Kilogram (kg)', value: 'Kilogram (kg)' },
          { label: 'Package', value: 'Package' },
        ],
      },
      {
        value: 'Panjang',
        items: [
          { label: 'Meter (m)', value: 'Meter (m)' },
          { label: 'Centimeter (cm)', value: 'Centimeter (cm)' },
          { label: 'Milimeter (mm)', value: 'Milimeter (mm)' },
          { label: 'Kilometer (km)', value: 'Kilometer (km)' },
          { label: 'Inch (in)', value: 'Inch (in)' },
          { label: 'Kaki (ft)', value: 'Kaki (ft)' },
          { label: 'Yard (yd)', value: 'Yard (yd)' },
          { label: 'Mil (mi)', value: 'Mil (mi)' },
        ],
      },
      {
        value: 'Berat',
        items: [
          { label: 'Gram (g)', value: 'Gram (g)' },
          { label: 'Miligram (mg)', value: 'Miligram (mg)' },
          { label: 'Ton', value: 'Ton' },
          { label: 'Kwintal', value: 'Kwintal' },
          { label: 'Pon', value: 'Pon' },
          { label: 'Ons', value: 'Ons' },
        ],
      },
      {
        value: 'Volume',
        items: [
          { label: 'Liter (l)', value: 'Liter (l)' },
          { label: 'Mililiter (ml)', value: 'Mililiter (ml)' },
          { label: 'Meter Kubik (m³)', value: 'Meter Kubik (m³)' },
          { label: 'Centimeter Kubik (cm³)', value: 'Centimeter Kubik (cm³)' },
          { label: 'Galon', value: 'Galon' },
        ],
      },
      {
        value: 'Waktu',
        items: [
          { label: 'Detik (s)', value: 'Detik (s)' },
          { label: 'Menit (min)', value: 'Menit (min)' },
          { label: 'Jam (h)', value: 'Jam (h)' },
          { label: 'Bulan', value: 'Bulan' },
          { label: 'Hari', value: 'Hari' },
          { label: 'Minggu', value: 'Minggu' },
          { label: 'Tahun', value: 'Tahun' },
        ],
      },
      {
        value: 'Luas',
        items: [
          { label: 'Are (a)', value: 'Are (a)' },
          { label: 'Hektar (ha)', value: 'Hektar (ha)' },
          { label: 'Meter Persegi (m²)', value: 'Meter Persegi (m²)' },
        ],
      },
      {
        value: 'Lainnya',
        items: [
          { label: 'Barrel', value: 'Barrel' },
          { label: 'Carat', value: 'Carat' },
          { label: 'Kaleng', value: 'Kaleng' },
          { label: 'kWh', value: 'kWh' },
          { label: 'Pasang', value: 'Pasang' },
          { label: 'Rim', value: 'Rim' },
          { label: 'Gross', value: 'Gross' },
          { label: 'Roll', value: 'Roll' },
        ],
      },
    ]
    return (
      <Combobox placeholder={args.placeholder} items={items} getItemLabel={(item) => item.label} />
    )
  },
}

/**
 * When items are objects, use `getItemLabel` to extract the display string and `getItemValue`
 * to extract the unique identifier used for comparison and form submission.
 */
export const Object: Story = {
  args: {
    items: countryData,
    placeholder: 'Select a country',
  },
  render: (args) => {
    const items = args.items as Country[]
    return (
      <Combobox
        items={items}
        defaultValue={{
          id: '69e3d13602285b333e56f780',
          country: 'Indonesia',
        }}
        getItemLabel={(item) => item.country}
        getItemValue={(item) => item.id}
      />
    )
  },
}

/**
 * Pass `multiple` to enable multi-select mode. Selected items are displayed as chips.
 * The user can remove individual chips by clicking the × on each chip.
 */
export const Multiple: Story = {
  args: {
    items: countryData,
    placeholder: 'Multiple select country',
  },
  render: (args) => {
    const items = args.items as Country[]
    return (
      <Combobox
        items={items}
        placeholder={args.placeholder}
        getItemLabel={(item) => item.country}
        getItemValue={(item) => item.id}
        multiple
      />
    )
  },
}

/**
 * Controlled multiple selection: externally manage the array of selected values.
 * Useful for forms or when the selection state needs to be tracked by a parent component.
 */
export const MultipleControlled: Story = {
  render: () => {
    const items = countryData
    const [value, setValue] = useState<Country[]>([])
    return (
      <Flex direction="col" gap="4">
        <Flex gap="2" className="flex-wrap">
          <Button
            variant="outline"
            onClick={() =>
              setValue([
                { id: '69e3d13602285b333e56f780', country: 'Indonesia' },
                { id: '69e3d136867e9dfd3e4b89b1', country: 'Ireland' },
              ])
            }
          >
            Select Indonesia & Ireland
          </Button>
          <Button variant="secondary-outline" onClick={() => setValue([])}>
            Clear All
          </Button>
        </Flex>
        <Combobox
          items={items}
          multiple
          value={value}
          onValueChange={(val) => setValue(val ?? [])}
          getItemLabel={(item) => item.country}
          getItemValue={(item) => item.id}
          placeholder="Select countries"
        />
        <Typography level="sm">
          Selected: <strong>{value.map((c) => c.country).join(', ') || 'none'}</strong>
        </Typography>
      </Flex>
    )
  },
}

/**
 * Multiple selection combined with grouped items. Each group header is shown
 * and items can be selected across groups.
 */
export const MultipleGrouped: Story = {
  render: () => {
    const groupedItems = [
      {
        value: 'Asia',
        items: countryData.filter((c) =>
          ['Indonesia', 'Vietnam', 'Thailand', 'Singapore', 'Malaysia'].includes(c.country),
        ),
      },
      {
        value: 'Europe',
        items: countryData.filter((c) =>
          ['Ireland', 'Germany', 'France', 'Italy', 'Spain'].includes(c.country),
        ),
      },
      {
        value: 'Americas',
        items: countryData.filter((c) =>
          ['United States', 'Canada', 'Brazil', 'Mexico', 'Argentina'].includes(c.country),
        ),
      },
    ]
    const [value, setValue] = useState<Country[]>([])
    return (
      <Flex direction="col" gap="4">
        <Combobox
          items={groupedItems}
          multiple
          value={value}
          onValueChange={(val) => setValue(val ?? [])}
          getItemLabel={(item) => item.country}
          getItemValue={(item) => item.id}
          placeholder="Select countries by region"
          className="w-80"
        />
        <Typography level="sm">
          Selected ({value.length}):{' '}
          <strong>{value.map((c) => c.country).join(', ') || 'none'}</strong>
        </Typography>
      </Flex>
    )
  },
}

/**
 * Fully controlled: `value`, `open`, and `inputValue` are all managed externally.
 * Demonstrates how to programmatically set the selected value, open the dropdown,
 * and drive the search input from outside the component.
 */
export const Controlled: Story = {
  args: {
    items: countryData,
    placeholder: 'Select a country',
  },
  render: (args) => {
    const items = args.items as Country[]
    const [value, setValue] = useState<string | null>(null)
    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState('')
    return (
      <Flex direction="col" gap="4">
        <Flex direction="row" gap="2">
          <Button
            variant={'outline'}
            onClick={() => {
              const index = items.findIndex((value) => value.country === 'Vietnam')
              setValue(items[index].id)
              setSearch(items[index].country)
            }}
          >
            Set Value to &rsquo;Vietnam&rsquo;
          </Button>
          <Button variant={'outline'} onClick={() => setOpen(true)}>
            Open Dropdown
          </Button>
          <Button variant={'outline'} onClick={() => setSearch('thailand')}>
            Search &rsquo;Thailand&rsquo;
          </Button>
          <Button variant={'secondary-outline'} onClick={() => setValue(null)}>
            Clear Value
          </Button>
        </Flex>
        <Combobox
          placeholder={args.placeholder}
          items={items}
          value={value}
          onValueChange={(value) => {
            setValue(value?.id || null)
          }}
          open={open}
          onOpenChange={setOpen}
          inputValue={search}
          onInputValueChange={setSearch}
          getItemLabel={(item) => item.country}
          getItemValue={(item) => item.id}
        />
        <Typography level="sm">
          Selected value: <strong>{value}</strong>
        </Typography>
      </Flex>
    )
  },
}

/**
 * Items are loaded asynchronously (simulated 3s delay). The combobox accepts `undefined`
 * items during loading and renders normally once items arrive. A pre-selected `value`
 * object is resolved against the incoming list automatically.
 */
export const AsyncItems: Story = {
  args: {
    items: countryData,
    placeholder: 'Select a country',
  },
  render: (args) => {
    const [value, setValue] = useState<Country | null>({
      id: '69e3d13602285b333e56f780',
      country: 'Indonesia',
    })

    const [items, setItems] = useState<Country[] | undefined>()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
      setLoading(true)
      const timeout = setTimeout(() => {
        setItems(countryData)
        setLoading(false)
      }, 3000)

      return () => {
        clearTimeout(timeout)
      }
    }, [])

    return (
      <Flex direction="col" gap="4">
        {loading && (
          <Flex alignItems="start" gap="2">
            <Spinner className="text-qb-primary" />
            <Typography level="sm">Loading data</Typography>
          </Flex>
        )}
        <Flex direction="row" gap="2">
          <Button
            variant={'outline'}
            onClick={() =>
              setValue({
                id: '69e3d136713e13121e4d4095',
                country: 'Vietnam',
              })
            }
          >
            Set to &rsquo;Vietnam&rsquo;
          </Button>
          <Button
            variant={'outline'}
            onClick={() =>
              setValue({
                id: '69e3d136713e13121e4d4095',
                country: 'Thailand',
              })
            }
          >
            Set to &rsquo;Thailand&rsquo;
          </Button>
          <Button variant={'secondary-outline'} onClick={() => setValue(null)}>
            Clear
          </Button>
        </Flex>
        <Combobox
          name="country"
          className="max-w-80"
          placeholder={args.placeholder}
          items={items || []}
          value={value}
          onValueChange={(value) => {
            setValue(value || null)
          }}
          getItemLabel={(item) => item.country}
          getItemValue={(item) => item.id}
        />
        <Typography level="sm">
          Selected value: <strong>{JSON.stringify(value)}</strong>
        </Typography>
      </Flex>
    )
  },
}

/**
 * `customItemRenderer` replaces the default text row with any React node.
 * Receives `(item, index, isSelected, searchQuery)` — use `isSelected` to conditionally
 * render a checkmark or highlight the active row.
 */
export const CustomRenderItem: Story = {
  args: {
    items: people,
    placeholder: 'Select a person',
  },
  render: (args) => {
    const items = args.items as Person[]
    return (
      <Combobox
        name="country"
        className="w-120"
        placeholder={args.placeholder}
        items={items}
        getItemLabel={(item) => item.name}
        getItemValue={(item) => item.id}
        customItemRenderer={(item, _, isSelected) => {
          return (
            <Flex gap="4">
              <div>
                <div className="bg-qb-blue-30 text-qb-primary flex size-10 items-center justify-center rounded-full text-xl">
                  {item.name
                    .split(' ')
                    .slice(0, 2)
                    .map((s: string) => s[0])
                    .join('')}
                </div>
              </div>
              <Flex direction="col" gap="4">
                <TypographyContent strong>{item.name}</TypographyContent>
                <TypographyContent>{item.phone}</TypographyContent>
              </Flex>
              {isSelected && <Icon name="CheckOutlined" key={'1'} size={32} />}
            </Flex>
          )
        }}
      />
    )
  },
}

/**
 * `filter` replaces the built-in substring match. The function receives `(item, query, itemToString)`
 * and must return `true` to include the item. This example matches items whose label *ends with* the query.
 */
export const CustomFilter: Story = {
  args: {
    items: countryData,
    placeholder: 'Select a country',
  },
  render: (args) => {
    const items = args.items as Country[]
    return (
      <Flex direction="col" gap="2">
        <Typography>Search Backward</Typography>
        <Combobox
          name="country"
          className="max-w-80"
          placeholder={args.placeholder}
          items={items}
          getItemLabel={(item) => item.country}
          getItemValue={(item) => item.id}
          filter={(itemValue, query, itemToString) => {
            if (itemToString) {
              return itemToString?.(itemValue).toLowerCase().endsWith(query.toLowerCase())
            }
            return false
          }}
        />
      </Flex>
    )
  },
}

/**
 * `prefixList` and `suffixList` render arbitrary React nodes above and below the item list
 * inside the dropdown. Common uses: an "Add new" action button (prefix) or a metadata footer (suffix).
 */
export const PrefixSuffixItem: Story = {
  name: 'Prefix/Suffix component in List',
  args: {
    items: countryData,
    placeholder: 'Select a country',
  },
  render: (args) => {
    const countryData = args.items as Country[]
    const [items, setItems] = useState(countryData.slice(0, 3))
    const [lastAdded, setLastAdded] = useState<Date>()
    return (
      <Combobox
        name="country"
        className="max-w-80"
        placeholder={args.placeholder}
        items={items}
        getItemLabel={(item) => item.country}
        getItemValue={(item) => item.id}
        prefixList={
          <div className="border-qb-input w-full border-b pb-2">
            <Button
              variant={'link'}
              onClick={() => {
                setItems((prev) => {
                  return [countryData[prev.length] || [], ...prev]
                })
                setLastAdded(dayjs().toDate())
              }}
            >
              <Icon name="PlusOutlined" />
              Add new country
            </Button>
          </div>
        }
        suffixList={
          <div className="border-qb-input border-t px-4 py-1">
            <Typography level="sm" className="text-qb-mist-50">
              Last added:{' '}
              {`${dayjs(lastAdded).hour()}:${dayjs(lastAdded).minute()}:${dayjs(lastAdded).second()}`}
            </Typography>
          </div>
        }
      />
    )
  },
}

/**
 * `infiniteScroll.hasNextPage` shows a loader at the bottom of the list.
 * `infiniteScroll.onLoadMore` is called when the loader becomes visible.
 * Simulate pagination by incrementally slicing a larger dataset.
 */
export const InfiniteLoading: Story = {
  name: 'Infinite loading with scroll',
  args: {
    items: countryData,
    placeholder: 'Select a country',
  },
  render: (args) => {
    const countryData = args.items as Country[]
    const [items, setItems] = useState(countryData.slice(0, 5))
    const [page, setPage] = useState(1)
    return (
      <Combobox
        name="country"
        className="max-w-80"
        placeholder={args.placeholder}
        items={items}
        defaultValue={{
          id: '69e3d136867e9dfd3e4b89b1',
          country: 'Ireland',
        }}
        getItemLabel={(item) => item.country}
        getItemValue={(item) => item.id}
        infiniteScroll={{
          hasNextPage: items.length < countryData.length,
          onLoadMore: () => {
            setTimeout(() => {
              setItems(countryData.slice(0, (page + 1) * 5))
              setPage((prev) => prev + 1)
            }, 1000)
          },
        }}
      />
    )
  },
}

/**
 * When `showClearButton={false}` the × button is never shown, even when a value is selected.
 * Compare the two comboboxes — left hides the clear button, right shows it (default behaviour).
 */
export const ShowClearButton: Story = {
  render: () => {
    return (
      <Flex gap="4" alignItems="start">
        <Flex direction="col" gap="2">
          <Typography level="sm">showClearButton=false</Typography>
          <Combobox
            items={countryData}
            showClearButton={false}
            defaultValue={{ id: '69e3d13602285b333e56f780', country: 'Indonesia' }}
            getItemLabel={(item) => item.country}
            getItemValue={(item) => item.id}
            placeholder="No clear button"
          />
        </Flex>
        <Flex direction="col" gap="2">
          <Typography level="sm">showClearButton=true (default)</Typography>
          <Combobox
            items={countryData}
            showClearButton
            defaultValue={{ id: '69e3d13602285b333e56f780', country: 'Indonesia' }}
            getItemLabel={(item) => item.country}
            getItemValue={(item) => item.id}
            placeholder="With clear button"
          />
        </Flex>
      </Flex>
    )
  },
}

/**
 * The `empty` prop replaces the default "Data tidak ditemukan." message shown
 * when no items match the current search query. Accepts a string or any React node.
 */
export const CustomEmpty: Story = {
  render: () => {
    return (
      <Flex gap="4" alignItems="start">
        <Flex direction="col" gap="2">
          <Typography level="sm">String empty message</Typography>
          <Combobox
            items={countryData}
            empty="No countries found."
            getItemLabel={(item) => item.country}
            getItemValue={(item) => item.id}
            placeholder="Try typing 'xyz'"
            defaultInputValue="xyz"
          />
        </Flex>
        <Flex direction="col" gap="2">
          <Typography level="sm">Custom node empty state</Typography>
          <Combobox
            items={countryData}
            empty={
              <Flex direction="col" gap="2" alignItems="center" className="py-2">
                <Icon name="SearchOutlined" size={24} />
                <Typography level="sm">No results for your search</Typography>
              </Flex>
            }
            getItemLabel={(item) => item.country}
            getItemValue={(item) => item.id}
            placeholder="Try typing 'xyz'"
            defaultInputValue="xyz"
          />
        </Flex>
      </Flex>
    )
  },
}

/**
 * `itemDisabled` receives each item and returns `true` to disable it.
 * Disabled items appear greyed out and cannot be selected or focused.
 */
export const DisabledItems: Story = {
  render: () => {
    const fruits = [
      { label: 'Apple', value: 'apple', available: true },
      { label: 'Banana', value: 'banana', available: false },
      { label: 'Cherry', value: 'cherry', available: true },
      { label: 'Date', value: 'date', available: false },
      { label: 'Elderberry', value: 'elderberry', available: true },
      { label: 'Fig', value: 'fig', available: false },
      { label: 'Grape', value: 'grape', available: true },
    ]
    return (
      <Flex direction="col" gap="2">
        <Typography level="sm">Items marked as unavailable are disabled</Typography>
        <Combobox
          items={fruits}
          getItemLabel={(item) => item.label}
          getItemValue={(item) => item.value}
          itemDisabled={(item) => !item.available}
          placeholder="Select a fruit"
        />
      </Flex>
    )
  },
}

/**
 * `onItemHighlighted` fires when the keyboard or mouse focuses an item in the list.
 * Use it to show a preview, fetch additional details, or log analytics.
 */
export const OnItemHighlighted: Story = {
  render: () => {
    const [highlighted, setHighlighted] = useState<Country | undefined>()
    return (
      <Flex direction="col" gap="4">
        <Combobox
          items={countryData}
          getItemLabel={(item) => item.country}
          getItemValue={(item) => item.id}
          onItemHighlighted={(item) => setHighlighted(item)}
          placeholder="Hover or arrow-key through items"
          className="max-w-80"
        />
        <Typography level="sm">
          Highlighted: <strong>{highlighted ? highlighted.country : 'none'}</strong>
        </Typography>
      </Flex>
    )
  },
}

/**
 * `classNames` allows targeted CSS overrides for each internal part of the combobox
 * without wrapping or fighting with generic `className`. Parts available:
 * `root`, `content`, `list`, `item`, `groupLabel`, `chips`, `chip`, `chipInput`,
 * `prefixList`, `suffixList`, `positioner`.
 */
export const CustomClassNames: Story = {
  render: () => {
    return (
      <Flex gap="4" alignItems="start">
        <Flex direction="col" gap="2">
          <Typography level="sm">Custom item & list styles</Typography>
          <Combobox
            items={countryData}
            getItemLabel={(item) => item.country}
            getItemValue={(item) => item.id}
            placeholder="Select a country"
            classNames={{
              list: 'max-h-40',
              item: 'font-mono text-xs',
            }}
          />
        </Flex>
        <Flex direction="col" gap="2">
          <Typography level="sm">Custom chip styles (multiple)</Typography>
          <Combobox
            items={countryData}
            multiple
            getItemLabel={(item) => item.country}
            getItemValue={(item) => item.id}
            placeholder="Select countries"
            defaultValue={[
              { id: '69e3d13602285b333e56f780', country: 'Indonesia' },
              { id: '69e3d136867e9dfd3e4b89b1', country: 'Ireland' },
            ]}
            classNames={{
              chip: 'bg-qb-primary/10 text-qb-primary border-qb-primary/30',
            }}
          />
        </Flex>
      </Flex>
    )
  },
}

/**
 * `side`, `align`, `sideOffset`, and `alignOffset` control where the dropdown appears
 * relative to the trigger input. These mirror the [Base UI Positioner](https://base-ui.com/react/components/combobox#positioner) props.
 */
export const Positioning: Story = {
  render: () => {
    return (
      <Flex gap="4" alignItems="center" className="mt-40">
        <Flex direction="col" gap="2" alignItems="center">
          <Typography level="sm">side=top</Typography>
          <Combobox
            items={countryData}
            getItemLabel={(item) => item.country}
            getItemValue={(item) => item.id}
            placeholder="Opens upward"
            side="top"
          />
        </Flex>
        <Flex direction="col" gap="2" alignItems="center">
          <Typography level="sm">side=bottom align=end</Typography>
          <Combobox
            items={countryData}
            getItemLabel={(item) => item.country}
            getItemValue={(item) => item.id}
            placeholder="Opens bottom-end"
            side="bottom"
            align="end"
          />
        </Flex>
        <Flex direction="col" gap="2" alignItems="center">
          <Typography level="sm">sideOffset=16</Typography>
          <Combobox
            items={countryData}
            getItemLabel={(item) => item.country}
            getItemValue={(item) => item.id}
            placeholder="Extra gap"
            sideOffset={16}
          />
        </Flex>
      </Flex>
    )
  },
}

/**
 * `name` and `required` integrate the combobox with native HTML form submission.
 * A hidden `<input>` with the provided `name` carries the selected value.
 * The `required` attribute participates in browser constraint validation.
 */
export const RequiredForm: Story = {
  render: () => {
    const formRef = useRef<HTMLFormElement>(null)
    const [submitted, setSubmitted] = useState<string | null>(null)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const data = new FormData(e.currentTarget)
      setSubmitted(data.get('country') as string)
    }

    return (
      <form ref={formRef} onSubmit={handleSubmit}>
        <Flex direction="col" gap="4">
          <Combobox
            items={countryData}
            name="country"
            required
            getItemLabel={(item) => item.country}
            getItemValue={(item) => item.id}
            placeholder="Country (required)"
          />
          <Button type="submit">Submit</Button>
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
 * When rendered inside a `DialogRoot`, the dropdown uses the `modal` prop to ensure
 * it appears above the dialog overlay. The `collisionAvoidance` and `side` props
 * help avoid clipping at the dialog boundary.
 */
export const InsideDialog: Story = {
  args: {
    items: countryData,
  },
  render: (args) => {
    const items = args.items as Country[]
    return (
      <DialogRoot>
        <DialogTrigger render={<Button />}>Open Dialog</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Example Dialog</DialogTitle>
          </DialogHeader>
          <div>
            <Flex direction="col" gap="2">
              <Combobox
                items={items}
                placeholder="Filled"
                variant={'filled'}
                defaultValue={{
                  id: '69e3d13602285b333e56f780',
                  country: 'Indonesia',
                }}
                getItemLabel={(item) => item.country}
                getItemValue={(item) => item.id}
              />
              <Combobox
                items={items}
                placeholder="Default"
                variant={'default'}
                defaultValue={{
                  id: '69e3d13602285b333e56f780',
                  country: 'Indonesia',
                }}
                getItemLabel={(item) => item.country}
                getItemValue={(item) => item.id}
              />
              <Combobox
                items={items}
                placeholder="Ghost"
                variant={'ghost'}
                defaultValue={{
                  id: '69e3d13602285b333e56f780',
                  country: 'Indonesia',
                }}
                getItemLabel={(item) => item.country}
                getItemValue={(item) => item.id}
                side="bottom"
                collisionAvoidance={{ side: 'shift', fallbackAxisSide: 'end' }}
              />
            </Flex>
          </div>
        </DialogContent>
      </DialogRoot>
    )
  },
}
