import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '@/components/ui/button'
import { Dropdown, type DropdownItem } from '@/components/ui/composed/dropdown'
import { Input } from '@/components/ui/composed/input'
import { Icon } from '@/components/icons'
import { Dialog } from '@/components/ui/composed/dialog'
import { Flex } from '@/components/core/flex'
import { Typography } from '@/components/core/typography'
import { EditIcon, Trash2Icon, CopyIcon, SendIcon } from 'lucide-react'

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A **composed** dropdown built on top of [DropdownMenu](?path=/docs/components-dropdownmenu--docs) (Base UI).

Pass an \`items\` array of plain action items — the component handles trigger wiring, popup positioning, and rendering. Each item maps directly to a \`<DropdownMenuItem>\`.

---

<div style="background:#eff6ff;border-left:4px solid #3b82f6;padding:12px 16px;border-radius:4px;margin:16px 0">
<strong>💡 Composed vs Compound — which to use?</strong>

| | \`Dropdown\` (this component) | \`DropdownMenu\` (compound) |
|---|---|---|
| **API style** | Data-driven \`items\` array | Full JSX composition |
| **Item types** | Action items only | Labels, separators, checkboxes, radio groups, submenus… |
| **Customisation** | Common presets (\`prefix\`, \`suffix\`, \`overlay\`, \`fullWidth\`…) | Unlimited — you own the markup |
| **Best for** | Action menus, quick-action rows | Complex menus with mixed content |

**Rule of thumb:** start with \`Dropdown\`. Switch to \`DropdownMenu\` when you need labels, separators, checkboxes, radio groups, or submenus.
</div>

---

## Item props

Every item accepts all \`DropdownMenuItem\` props plus two extras:

| Prop | Type | Description |
|---|---|---|
| \`children\` | \`ReactNode\` | Item label (text, icons, anything) |
| \`value\` | \`string\` | When set, clicking highlights this item and calls \`onValueChange\` |
| \`visible\` | \`boolean\` | Hide the item without filtering the array |
| \`variant\` | \`"default" \\| "destructive"\` | Red colour for dangerous actions |
| \`disabled\` | \`boolean\` | Non-interactive, reduced opacity |
| \`onClick\` | \`function\` | Click handler |
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Dropdown>

// ---------------------------------------------------------------------------
// Default
// ---------------------------------------------------------------------------

export const Default: Story = {
  args: {
    children: (
      <Button variant="outline" pill={false}>
        Open
      </Button>
    ),
    items: [
      { label: 'Profile' },
      { label: 'Billing' },
      { label: 'Team' },
      { label: 'Subscription' },
    ],
  },
}

// ---------------------------------------------------------------------------
// Variants & Disabled
// ---------------------------------------------------------------------------

/**
 * Set `variant="destructive"` on an item to colour it red.
 * Set `disabled` to make an item non-interactive.
 *
 * ```tsx
 * { children: 'Delete Invoice', variant: 'destructive' }
 * { children: 'Send (draft only)', disabled: true }
 * ```
 */
export const VariantsAndDisabled: Story = {
  name: 'Variants & Disabled',
  render: () => (
    <Dropdown
      items={[
        {
          label: (
            <>
              <EditIcon size={14} /> Edit Invoice
            </>
          ),
        },
        {
          label: (
            <>
              <CopyIcon size={14} /> Duplicate
            </>
          ),
        },
        {
          label: (
            <>
              <SendIcon size={14} /> Send (draft only)
            </>
          ),
          disabled: true,
        },
        {
          label: (
            <>
              <Trash2Icon size={14} /> Delete Invoice
            </>
          ),
          variant: 'destructive',
        },
        {
          label: (
            <>
              <Trash2Icon size={14} /> Void Invoice
            </>
          ),
          variant: 'destructive',
          disabled: true,
        },
      ]}
    >
      <Button variant="outline" pill={false}>
        Actions
      </Button>
    </Dropdown>
  ),
}

// ---------------------------------------------------------------------------
// Visible Toggle
// ---------------------------------------------------------------------------

/**
 * Use `visible` to conditionally hide items without filtering the array.
 * Hidden items are never rendered.
 *
 * ```tsx
 * { children: 'Edit Invoice', visible: !isPaid }
 * ```
 */
export const VisibleToggle: Story = {
  name: 'Visible Toggle',
  render: () => {
    const isPaid = true

    return (
      <Flex direction="col" gap="3" alignItems="center">
        <Typography level="sm" className="text-muted-foreground">
          Invoice status: <strong>paid</strong> — edit & delete are hidden
        </Typography>
        <Dropdown
          items={[
            { label: 'View Invoice' },
            { label: 'Download PDF' },
            { label: 'Edit Invoice', visible: !isPaid },
            { label: 'Delete Invoice', variant: 'destructive', visible: !isPaid },
          ]}
        >
          <Button variant="outline" pill={false}>
            Actions
          </Button>
        </Dropdown>
      </Flex>
    )
  },
}

// ---------------------------------------------------------------------------
// With Prefix (Searchable)
// ---------------------------------------------------------------------------

/**
 * `itemPrefix` renders a sticky slot at the top of the popup — great for a search input
 * that filters the `items` array before passing it in.
 *
 * Mouse and keyboard events on the prefix are stopped from bubbling into the menu,
 * so typing in the search box won't trigger menu keyboard navigation.
 * Use `disableKeyboardEvent` alongside a prefix input.
 *
 * ```tsx
 * <Dropdown
 *   disableKeyboardEvent
 *   itemPrefix={<Input placeholder="Search…" />}
 *   items={filteredItems}
 * >
 *   <Button>Open</Button>
 * </Dropdown>
 * ```
 */
export const WithPrefix: Story = {
  name: 'With Prefix (Searchable)',
  render: () => {
    const [search, setSearch] = useState('')

    const allCities = ['Jakarta', 'Bandung', 'Surabaya', 'Medan', 'Makassar', 'Yogyakarta']

    const items: DropdownItem[] = allCities
      .filter((city) => city.toLowerCase().includes(search.toLowerCase()))
      .map((city) => ({ label: city }))

    return (
      <Dropdown
        disableKeyboardEvent
        itemPrefix={
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            prefix={<Icon name="SearchOutlined" size={16} />}
            placeholder="Search city…"
            inputSize="sm"
          />
        }
        items={items}
      >
        <Button variant="outline" pill={false}>
          Filter cities
        </Button>
      </Dropdown>
    )
  },
}

// ---------------------------------------------------------------------------
// With Suffix
// ---------------------------------------------------------------------------

/**
 * `itemSuffix` renders a persistent slot at the bottom of the popup — handy for a
 * "Create new" action that should always be visible regardless of the items list.
 *
 * ```tsx
 * <Dropdown
 *   itemSuffix={<Button variant="ghost">+ Add new</Button>}
 *   items={items}
 * >
 *   <Button>Open</Button>
 * </Dropdown>
 * ```
 */
export const WithSuffix: Story = {
  name: 'With Suffix',
  render: () => (
    <Dropdown
      itemPrefix={
        <Input
          prefix={<Icon name="SearchOutlined" size={16} />}
          placeholder="Search city…"
          inputSize="sm"
        />
      }
      itemSuffix={
        <Button variant="ghost" className="w-full px-1">
          <Icon name="PlusCircleOutlined" />
          Add new city
        </Button>
      }
      items={[{ label: 'Jakarta' }, { label: 'Bandung' }, { label: 'Surabaya' }]}
    >
      <Button variant="outline" pill={false}>
        Select city
      </Button>
    </Dropdown>
  ),
}

// ---------------------------------------------------------------------------
// With Overlay
// ---------------------------------------------------------------------------

/**
 * Pass `overlay` to render a dimmed backdrop behind the popup.
 *
 * ```tsx
 * <Dropdown overlay items={items}>
 *   <Button>Open</Button>
 * </Dropdown>
 * ```
 */
export const WithOverlay: Story = {
  name: 'With Overlay',
  args: {
    overlay: true,
    children: (
      <Button variant="outline" pill={false}>
        Open with Overlay
      </Button>
    ),
    items: [
      { label: 'Profile' },
      { label: 'Settings' },
      { label: 'Log out', variant: 'destructive' },
    ],
  },
}

// ---------------------------------------------------------------------------
// Inside Dialog
// ---------------------------------------------------------------------------

/**
 * `<Dropdown>` inside a `<Dialog>` — the menu portal renders above the dialog backdrop
 * automatically. Use `disableKeyboardEvent` when the prefix contains an `<Input>`.
 */
export const InsideDialog: Story = {
  name: 'Inside Dialog',
  render: () => {
    const [city, setCity] = useState<string | null>(null)
    const [search, setSearch] = useState('')

    const cities = ['Jakarta', 'Bandung', 'Surabaya', 'Medan', 'Makassar', 'Yogyakarta']

    const items: DropdownItem[] = cities
      .filter((c) => c.toLowerCase().includes(search.toLowerCase()))
      .map((c) => ({
        label: c,
        onClick: () => setCity(c),
      }))

    return (
      <Dialog
        title="Select City"
        footer={
          <Flex gap="2" justifyContent="end">
            <Button variant="outline">Cancel</Button>
            <Button>Confirm</Button>
          </Flex>
        }
        content={
          <Flex direction="col" gap="3">
            <Dropdown
              disableKeyboardEvent
              itemPrefix={
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  prefix={<Icon name="SearchOutlined" size={16} />}
                  placeholder="Search city…"
                  inputSize="sm"
                />
              }
              items={items}
            >
              <Button variant="outline" pill={false} className="w-full justify-start">
                {city ?? 'Select a city…'}
              </Button>
            </Dropdown>
          </Flex>
        }
      >
        <Button variant="outline">Open Dialog</Button>
      </Dialog>
    )
  },
}
