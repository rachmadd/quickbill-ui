import React, { useEffect, useRef, useState } from 'react'
import { Autocomplete } from '@/components/ui/composed/autocomplete'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Flex } from '@/components/core/flex'
import { Button } from '@/components/ui/button'
import { Typography, TypographyContent } from '@/components/core/typography'
import { Icon } from '@/components/icons'
import { countryData } from '@/lib/data/country'

const meta: Meta<typeof Autocomplete> = {
  title: 'Components/Fields/Autocomplete',
  component: Autocomplete,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
An autocomplete input built on top of [Base UI Autocomplete](https://base-ui.com/react/components/autocomplete).
As the user types, matching suggestions appear in a dropdown. The user may select a suggestion **or keep their own free-form text** — the final \`value\` is always the raw string in the input.

**Base component:** [\`@base-ui/react\` Autocomplete](https://base-ui.com/react/components/autocomplete)

<div style="background:#fff7ed;border-left:4px solid #f97316;padding:12px 16px;border-radius:4px;margin:16px 0">
<strong>⚠️ Use Autocomplete only when free text is a valid answer</strong>

Autocomplete is designed for inputs where the user is allowed to type anything — the suggestions are hints, not a constraint.
If the value **must** come from a predefined list (no arbitrary input allowed), use <a href="?path=/docs/components-inputs-combobox--docs"><strong>Combobox</strong></a> instead.

| | Autocomplete | Combobox |
|---|---|---|
| User can type anything | ✅ | ❌ |
| Value is always from the list | ❌ | ✅ |
| Good for search inputs | ✅ | — |
| Good for select/dropdown fields | — | ✅ |
</div>

\`\`\`tsx
import { Autocomplete } from 'quickbill-ui'

// String suggestions — value is whatever the user typed or selected
<Autocomplete
  items={['Apple', 'Banana', 'Cherry']}
  placeholder="Search fruits..."
/>

// Object suggestions — itemToStringLabel controls display, value is still a free string
<Autocomplete
  items={countries}
  itemToStringLabel={(item) => item.country}
  placeholder="Search countries..."
/>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input field',
    },
    showClearButton: {
      control: 'boolean',
      description: 'Whether to show the clear (×) button when input has a value',
      defaultValue: true,
    },
    mode: {
      control: { type: 'select' },
      options: ['list', 'both', 'inline', 'none'],
      description:
        '`list` — dropdown only · `inline` — ghost text in input only · `both` — dropdown + inline ghost text · `none` — no filtering, show all items',
      defaultValue: 'both',
    },
    autoHighlight: {
      control: { type: 'select' },
      options: [false, true, 'always'],
      description:
        'Auto-focus the first matching option: `false` — never · `true` — on open · `always` — after every keystroke',
    },
    empty: {
      control: 'text',
      description: 'Content shown when no items match the current search query',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the entire input',
    },
    readOnly: {
      control: 'boolean',
      description: 'Prevent the user from changing the value',
    },
    required: {
      control: 'boolean',
      description: 'Mark the field as required for native form validation',
    },
    name: {
      control: 'text',
      description: 'Name attribute used for form submission',
    },
    prefixList: {
      control: false,
      description: 'Node rendered above the item list inside the dropdown',
    },
    suffixList: {
      control: false,
      description: 'Node rendered below the item list inside the dropdown',
    },
    customItemRenderer: {
      control: false,
      description:
        'Override the default item row with a custom render function `(item, index, isHighlighted) => ReactNode`',
    },
    classNames: {
      control: false,
      description:
        'Per-part className overrides: `root`, `content`, `list`, `option`, `groupLabel`, `prefixList`, `suffixList`',
    },
    infiniteScroll: {
      control: false,
      description:
        'Config for paginated/infinite loading: `{ hasNextPage, isLoading, onLoadMore }`',
    },
  },
}

export default meta
type Story = StoryObj<typeof Autocomplete>

// ---------------------------------------------------------------------------
// Shared sample data
// ---------------------------------------------------------------------------

const fruits = [
  'Apple',
  'Banana',
  'Cherry',
  'Date',
  'Elderberry',
  'Fig',
  'Grape',
  'Honeydew',
  'Kiwi',
  'Lemon',
  'Mango',
  'Orange',
  'Pear',
  'Quince',
  'Raspberry',
  'Strawberry',
  'Tangerine',
  'Watermelon',
]

const users = [
  { id: 1, name: 'John Doe', role: 'Developer', department: 'Engineering' },
  { id: 2, name: 'Jane Smith', role: 'Designer', department: 'Design' },
  { id: 3, name: 'Bob Johnson', role: 'Manager', department: 'Engineering' },
  { id: 4, name: 'Alice Brown', role: 'Developer', department: 'Engineering' },
  { id: 5, name: 'Charlie Wilson', role: 'Designer', department: 'Design' },
  { id: 6, name: 'Diana Davis', role: 'QA Engineer', department: 'Quality' },
]

const groupedFruits = [
  { value: 'Citrus', items: ['Lemon', 'Orange', 'Tangerine', 'Grapefruit'] },
  { value: 'Berries', items: ['Strawberry', 'Raspberry', 'Blueberry', 'Blackberry'] },
  { value: 'Tropical', items: ['Mango', 'Pineapple', 'Kiwi', 'Papaya'] },
]

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

/** Simplest usage: pass a string array as `items`. The user can type freely or pick a suggestion. */
export const Basic: Story = {
  args: {
    items: fruits,
    placeholder: 'Search fruits...',
  },
}

/**
 * All four `mode` values side-by-side.
 * - `list` — shows a dropdown, no inline ghost text
 * - `both` — dropdown + ghost text in the input (default)
 * - `inline` — ghost text only, no dropdown
 * - `none` — always shows all items, no filtering at all
 */
export const AllModes: Story = {
  args: {
    items: fruits,
  },
  decorators: [
    (Story) => (
      <Flex gap="4" alignItems="start">
        <Story />
      </Flex>
    ),
  ],
  render: (args) => (
    <>
      {(['list', 'both', 'inline', 'none'] as const).map((mode) => (
        <Flex key={mode} direction="col" gap="2">
          <Typography level="sm">
            mode=<strong>{mode}</strong>
          </Typography>
          <Autocomplete items={args.items as string[]} mode={mode} placeholder={`mode="${mode}"`} />
        </Flex>
      ))}
    </>
  ),
}

/** Demonstrates `disabled` and `aria-invalid` (error) states. */
export const States: Story = {
  args: {
    items: fruits,
  },
  decorators: [
    (Story) => (
      <Flex gap="4" alignItems="start">
        <Story />
      </Flex>
    ),
  ],
  render: (args) => (
    <>
      <Flex direction="col" gap="2">
        <Typography level="sm">Disabled</Typography>
        <Autocomplete items={args.items as string[]} disabled placeholder="Disabled" />
      </Flex>
      <Flex direction="col" gap="2">
        <Typography level="sm">Error</Typography>
        <Autocomplete items={args.items as string[]} aria-invalid placeholder="Error state" />
      </Flex>
      <Flex direction="col" gap="2">
        <Typography level="sm">Read-only</Typography>
        <Autocomplete
          items={args.items as string[]}
          readOnly
          defaultValue="Apple"
          placeholder="Read-only"
        />
      </Flex>
    </>
  ),
}

/**
 * When `items` contains objects, use `itemToStringLabel` to control what text appears
 * in the dropdown row and in the input after selection.
 */
export const WithObjects: Story = {
  args: {
    items: users,
    placeholder: 'Search users...',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    itemToStringLabel: (user: any) => `${user.name} (${user.role})`,
  },
}

/**
 * Items structured as `{ value: string; items: Item[] }[]` render with group headers.
 * Filtering applies across all groups simultaneously.
 */
export const GroupedItems: Story = {
  args: {
    items: groupedFruits,
    placeholder: 'Search fruits by category...',
  },
}

/**
 * `customItemRenderer` replaces the default text row with any React node.
 * Receives `(item, index, isHighlighted)` — use `isHighlighted` to style the focused row.
 */
export const CustomRendering: Story = {
  args: {
    items: users,
    placeholder: 'Search users...',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    itemToStringLabel: (user: any) => `${user.name} (${user.role})`,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    customItemRenderer: (user: any) => (
      <Flex gap="3" alignItems="center">
        <div>
          <div className="bg-qb-blue-30 text-qb-primary flex size-10 items-center justify-center rounded-full text-xl">
            {user.name
              .split(' ')
              .slice(0, 2)
              .map((s: string) => s[0])
              .join('')}
          </div>
        </div>
        <Flex direction="col">
          <TypographyContent strong>{user.name}</TypographyContent>
          <TypographyContent>
            {user.role} · {user.department}
          </TypographyContent>
        </Flex>
      </Flex>
    ),
  },
}

/**
 * `prefixList` and `suffixList` slot arbitrary React nodes above and below the item list.
 * Common uses: category headers, "create new" actions, footnotes, or pagination counts.
 */
export const WithPrefixSuffix: Story = {
  args: {
    placeholder: 'Search fruits...',
  },
  render: (args) => {
    const [items, setItems] = useState(fruits.slice(0, 5))
    return (
      <Autocomplete
        items={items}
        placeholder={args.placeholder}
        prefixList={
          <div className="border-qb-input w-full border-b pb-2">
            <Button
              variant="link"
              onClick={() => setItems((prev) => [...prev, fruits[prev.length] ?? ''])}
            >
              <Icon name="PlusOutlined" />
              Add next fruit
            </Button>
          </div>
        }
        suffixList={
          <div className="border-qb-input border-t px-4 py-1">
            <Typography level="sm" className="text-qb-mist-50">
              Showing {items.length} items
            </Typography>
          </div>
        }
      />
    )
  },
}

/**
 * `mode="inline"` shows a ghost-text completion directly inside the input field.
 * No dropdown appears — press Tab or → to accept the suggestion.
 */
export const InlineMode: Story = {
  args: {
    items: fruits,
    placeholder: 'Type to see inline suggestion...',
    mode: 'inline',
  },
}

/**
 * `mode="both"` combines the dropdown list with inline ghost-text completion.
 * This is the default mode.
 */
export const BothMode: Story = {
  args: {
    items: fruits,
    placeholder: 'Search with inline completion...',
    mode: 'both',
  },
}

/**
 * `mode="none"` disables filtering entirely — all items are always visible.
 * Useful when the list is pre-filtered server-side and local filtering would interfere.
 */
export const NoFiltering: Story = {
  args: {
    items: fruits.slice(0, 5),
    placeholder: 'Browse items (no filtering)...',
    mode: 'none',
  },
}

/**
 * `autoHighlight="always"` automatically moves focus to the first matching option
 * on every keystroke. Pressing Enter accepts it without extra navigation.
 */
export const AutoHighlight: Story = {
  args: {
    items: fruits,
    placeholder: 'First match is auto-highlighted...',
    autoHighlight: 'always',
  },
}

/**
 * `showClearButton={false}` hides the × button even when the input has a value.
 * Compare with the default (right) which shows the button as soon as text is present.
 */
export const ShowClearButton: Story = {
  args: {
    items: fruits,
  },
  decorators: [
    (Story) => (
      <Flex gap="4" alignItems="start">
        <Story />
      </Flex>
    ),
  ],
  render: (args) => (
    <>
      <Flex direction="col" gap="2">
        <Typography level="sm">showClearButton=false</Typography>
        <Autocomplete
          items={args.items as string[]}
          showClearButton={false}
          defaultValue="Apple"
          placeholder="No clear button"
        />
      </Flex>
      <Flex direction="col" gap="2">
        <Typography level="sm">showClearButton=true (default)</Typography>
        <Autocomplete
          items={args.items as string[]}
          showClearButton
          defaultValue="Apple"
          placeholder="With clear button"
        />
      </Flex>
    </>
  ),
}

/**
 * The `empty` prop replaces the default "Data tidak ditemukan." message.
 * Accepts a string or any React node — useful for adding a call-to-action or icon.
 */
export const CustomEmpty: Story = {
  args: {
    items: fruits,
    placeholder: 'Type "xyz" to trigger empty state...',
    defaultValue: 'xyz',
    empty: (
      <Flex direction="col" gap="2" alignItems="center" className="py-3">
        <Icon name="SearchOutlined" size={24} />
        <Typography level="sm">No fruits matched your search</Typography>
      </Flex>
    ),
  },
}

/**
 * `filter` overrides the built-in substring match. The function receives
 * `(itemValue, query, itemToString?)` and must return `true` to include the item.
 * This example only matches items whose label *starts with* the query.
 */
export const CustomFilter: Story = {
  args: {
    items: fruits,
    placeholder: 'Type to filter (starts-with only)...',
    filter: (item, query) => {
      const label = typeof item === 'string' ? item : String(item)
      return label.toLowerCase().startsWith(query.toLowerCase())
    },
  },
  decorators: [
    (Story) => (
      <Flex direction="col" gap="2">
        <Typography level="sm">
          Starts-with filter (try &quot;ap&quot; vs &quot;le&quot; vs &quot;pple&quot;)
        </Typography>
        <Story />
      </Flex>
    ),
  ],
  render: (args) => <Autocomplete {...args} />,
}

/**
 * `classNames` lets you target individual parts of the component with CSS classes
 * without fighting generic `className`. Available parts: `root`, `content`, `list`,
 * `option`, `groupLabel`, `prefixList`, `suffixList`.
 */
export const CustomClassNames: Story = {
  args: {
    items: fruits,
    placeholder: 'Custom classes',
    classNames: {
      list: 'max-h-40',
      option: 'font-mono text-xs',
    },
  },
  decorators: [
    (Story) => (
      <Flex direction="col" gap="2">
        <Typography level="sm">Custom option &amp; list styles</Typography>
        <Story />
      </Flex>
    ),
  ],
  render: (args) => <Autocomplete {...args} />,
}

/**
 * Fully controlled: the parent owns `value` and updates it via `onValueChange`.
 * The user can still type freely — every keystroke calls `onValueChange` with the current text.
 * `onItemClick` fires only when a suggestion is explicitly selected.
 */
export const Controlled: Story = {
  args: {
    items: fruits,
    placeholder: 'Controlled autocomplete...',
  },
  decorators: [
    (Story) => (
      <Flex direction="col" gap="4">
        <Story />
      </Flex>
    ),
  ],
  render: (args) => {
    const [value, setValue] = useState('Apple')
    const [lastClicked, setLastClicked] = useState<string | null>(null)
    return (
      <>
        <Flex gap="2">
          <Button variant="outline" onClick={() => setValue('Mango')}>
            Set to &rsquo;Mango&rsquo;
          </Button>
          <Button variant="secondary-outline" onClick={() => setValue('')}>
            Clear
          </Button>
        </Flex>
        <Autocomplete
          {...args}
          value={value}
          onValueChange={setValue}
          onItemClick={(item) => setLastClicked(String(item))}
        />
        <Typography level="sm">
          Input value: <strong>{value || '(empty)'}</strong>
        </Typography>
        <Typography level="sm">
          Last picked from list: <strong>{lastClicked ?? 'none'}</strong>
        </Typography>
      </>
    )
  },
}

/**
 * `onItemClick` fires when the user clicks (or keyboards) an item in the dropdown.
 * Unlike `onValueChange` (which fires on every keystroke), this only fires on explicit selection.
 */
export const OnItemClick: Story = {
  args: {
    items: fruits,
    placeholder: 'Pick a fruit from the list...',
  },
  decorators: [
    (Story) => (
      <Flex direction="col" gap="4">
        <Story />
      </Flex>
    ),
  ],
  render: (args) => {
    const [picked, setPicked] = useState<string | null>(null)
    return (
      <>
        <Autocomplete {...args} onItemClick={(item) => setPicked(String(item))} />
        <Typography level="sm">
          Last selected from dropdown: <strong>{picked ?? 'none'}</strong>
        </Typography>
      </>
    )
  },
}

/**
 * `name` and `required` wire the autocomplete into native HTML form submission.
 * The free-text value is submitted under the given `name` key.
 */
export const RequiredForm: Story = {
  render: () => {
    const formRef = useRef<HTMLFormElement>(null)
    const [submitted, setSubmitted] = useState<string | null>(null)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const data = new FormData(e.currentTarget)
      setSubmitted(data.get('fruit') as string)
    }

    return (
      <form ref={formRef} onSubmit={handleSubmit}>
        <Flex direction="col" gap="4">
          <Autocomplete items={fruits} name="fruit" required placeholder="Fruit (required)" />
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
 * Simulates server-side search: items are empty until the user types at least 2 characters,
 * then load after a short delay. `mode="none"` disables client-side filtering since the
 * server already filtered the results.
 */
export const AsyncItems: Story = {
  args: {
    mode: 'none',
    placeholder: 'Type 2+ chars to search countries...',
    className: 'w-80',
  },
  decorators: [
    (Story) => (
      <Flex direction="col" gap="4">
        <Story />
      </Flex>
    ),
  ],
  render: (args) => {
    const [query, setQuery] = useState('')
    const [items, setItems] = useState<string[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
      if (query.length < 2) {
        setItems([])
        return
      }
      setLoading(true)
      const timeout = setTimeout(() => {
        setItems(
          countryData
            .map((c) => c.country)
            .filter((c) => c.toLowerCase().includes(query.toLowerCase()))
            .slice(0, 8),
        )
        setLoading(false)
      }, 600)
      return () => clearTimeout(timeout)
    }, [query])

    return (
      <>
        <Autocomplete
          mode={args.mode}
          placeholder={args.placeholder}
          className={args.className}
          items={items}
          value={query}
          onValueChange={setQuery}
          empty={
            loading ? (
              <Typography level="sm" className="text-qb-mist-50 px-4 py-2">
                Searching...
              </Typography>
            ) : query.length < 2 ? (
              <Typography level="sm" className="text-qb-mist-50 px-4 py-2">
                Type at least 2 characters
              </Typography>
            ) : (
              <Typography level="sm" className="text-qb-mist-50 px-4 py-2">
                No countries found
              </Typography>
            )
          }
        />
        <Typography level="sm">
          Query: <strong>{query || '(empty)'}</strong> · Results: <strong>{items.length}</strong>
        </Typography>
      </>
    )
  },
}

/**
 * `infiniteScroll.hasNextPage` renders a loader at the bottom of the list that triggers
 * `onLoadMore` when it becomes visible. Simulate pagination by slicing a larger dataset.
 */
export const WithInfiniteScroll: Story = {
  args: {
    placeholder: 'Scroll to load more...',
  },
  decorators: [
    (Story) => (
      <Flex direction="col" gap="2">
        <Story />
      </Flex>
    ),
  ],
  render: (args) => {
    const allItems = Array.from({ length: 50 }, (_, i) => `Item ${i + 1}`)
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
      <>
        <Typography level="sm">
          Loaded {items.length} / {allItems.length} items
        </Typography>
        <Autocomplete
          placeholder={args.placeholder}
          items={items}
          infiniteScroll={{
            hasNextPage: items.length < allItems.length,
            isLoading: loading,
            onLoadMore: loadMore,
          }}
        />
      </>
    )
  },
}
