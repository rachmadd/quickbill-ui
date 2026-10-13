import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  CopyIcon,
  DownloadIcon,
  EditIcon,
  EllipsisIcon,
  LogOutIcon,
  MailIcon,
  PlusIcon,
  PrinterIcon,
  SendIcon,
  SettingsIcon,
  ShareIcon,
  Trash2Icon,
  UserIcon,
} from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  createMenuHandle,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Flex } from '@/components/core/flex'
import { Typography } from '@/components/core/typography'
import { Icon } from '@/components/icons'
import { Dialog } from '@/components/ui/composed/dialog'
import { Input } from '@/components/ui/composed/input'

const meta: Meta = {
  title: 'Components/DropdownMenu',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A fully-composable dropdown menu built on top of [Base UI Menu](https://base-ui.com/react/components/menu).
Use it when you need a trigger + popup with arbitrary items — regular actions, checkboxes, radio groups, submenus, and keyboard shortcuts.

---

<div style="background:#eff6ff;border-left:4px solid #3b82f6;padding:12px 16px;border-radius:4px;margin:16px 0">
<strong>💡 When to use DropdownMenu vs Select</strong>

Both open a popup from a trigger, but they serve different purposes:

| | DropdownMenu | Select |
|---|---|---|
| **Purpose** | Trigger actions or commands | Choose a value from a list |
| **Affects form state** | ✗ No | ✓ Yes — submits a value |
| **Selected state** | ✗ Items are not “chosen” | ✓ One (or many) item is selected |
| **Common content** | Edit, Delete, Share, Export… | Cities, statuses, categories… |
| **Contains** | Actions, submenus, checkboxes | Options only |
| **Keyboard pattern** | Focus moves into the menu | Value binding, clear button |

**Rule of thumb:** if clicking an item *does something*, use **DropdownMenu**. If clicking an item *picks a value*, use [**Select**](?path=/docs/components-inputs-select--docs).
</div>

---

## Anatomy

| Component | Description |
|---|---|
| \`<DropdownMenu>\` | Root provider — manages open state |
| \`<DropdownMenuTrigger>\` | Element that opens the menu on click |
| \`<DropdownMenuContent>\` | Popup container with positioning props |
| \`<DropdownMenuGroup>\` | Logical grouping of items |
| \`<DropdownMenuLabel>\` | Non-interactive group heading |
| \`<DropdownMenuItem>\` | Interactive action row (\`variant="destructive"\` for danger) |
| \`<DropdownMenuCheckboxItem>\` | Togglable item with a checkmark |
| \`<DropdownMenuRadioGroup>\` | Container for mutually exclusive radio items |
| \`<DropdownMenuRadioItem>\` | Single radio option |
| \`<DropdownMenuSeparator>\` | Horizontal divider |
| \`<DropdownMenuShortcut>\` | Keyboard shortcut hint (right-aligned) |
| \`<DropdownMenuSub>\` | Submenu root |
| \`<DropdownMenuSubTrigger>\` | Item that opens a submenu |
| \`<DropdownMenuSubContent>\` | Popup container for a submenu |
| \`createMenuHandle\` | Factory for programmatic open with typed payload |
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// ---------------------------------------------------------------------------
// Basic
// ---------------------------------------------------------------------------

/**
 * The simplest usage: a trigger button + a popup with a label, separator, and plain action items.
 *
 * ```tsx
 * <DropdownMenu>
 *   <DropdownMenuTrigger render={<Button>Open</Button>} />
 *   <DropdownMenuContent>
 *     <DropdownMenuLabel>My Account</DropdownMenuLabel>
 *     <DropdownMenuSeparator />
 *     <DropdownMenuItem>Profile</DropdownMenuItem>
 *     <DropdownMenuItem>Billing</DropdownMenuItem>
 *   </DropdownMenuContent>
 * </DropdownMenu>
 * ```
 */
export const Basic: Story = {
  name: 'Basic',
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline">Open Menu</Button>} />
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

// ---------------------------------------------------------------------------
// With Icons
// ---------------------------------------------------------------------------

/**
 * Pair icons with items to give visual context for each action.
 * Pass any React node as the first child alongside the label text.
 *
 * ```tsx
 * <DropdownMenuItem>
 *   <UserIcon />
 *   Profile
 * </DropdownMenuItem>
 * ```
 */
export const WithIcons: Story = {
  name: 'With Icons',
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline">Account</Button>} />
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <UserIcon />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SettingsIcon />
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem>
            <MailIcon />
            Messages
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <LogOutIcon />
            Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

// ---------------------------------------------------------------------------
// With Shortcuts
// ---------------------------------------------------------------------------

/**
 * `<DropdownMenuShortcut>` renders a keyboard hint right-aligned inside the item.
 * It is purely decorative — wire your own global keybindings to the actions.
 *
 * ```tsx
 * <DropdownMenuItem>
 *   Edit
 *   <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
 * </DropdownMenuItem>
 * ```
 */
export const WithShortcuts: Story = {
  name: 'With Shortcuts',
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline">Invoice Actions</Button>} />
      <DropdownMenuContent>
        <DropdownMenuItem>
          <EditIcon />
          Edit
          <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CopyIcon />
          Duplicate
          <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <PrinterIcon />
          Print
          <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <DownloadIcon />
          Download PDF
          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem variant="destructive">
            <Trash2Icon />
            Delete
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

// ---------------------------------------------------------------------------
// With Groups
// ---------------------------------------------------------------------------

/**
 * Use `<DropdownMenuGroup>` + `<DropdownMenuLabel>` to visually separate related items.
 * Each group gets its own accessible heading.
 *
 * ```tsx
 * <DropdownMenuGroup>
 *   <DropdownMenuLabel>Actions</DropdownMenuLabel>
 *   <DropdownMenuItem>Edit</DropdownMenuItem>
 * </DropdownMenuGroup>
 * ```
 */
export const WithGroups: Story = {
  name: 'With Groups',
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline">Actions</Button>} />
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Document</DropdownMenuLabel>
          <DropdownMenuItem>
            <EditIcon />
            Edit Invoice
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CopyIcon />
            Duplicate
          </DropdownMenuItem>
          <DropdownMenuItem>
            <PrinterIcon />
            Print
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Share</DropdownMenuLabel>
          <DropdownMenuItem>
            <SendIcon />
            Send to Client
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ShareIcon />
            Share Link
          </DropdownMenuItem>
          <DropdownMenuItem>
            <DownloadIcon />
            Download PDF
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Danger Zone</DropdownMenuLabel>
          <DropdownMenuItem variant="destructive">
            <Trash2Icon />
            Delete Invoice
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

// ---------------------------------------------------------------------------
// Destructive Items
// ---------------------------------------------------------------------------

/**
 * Set `variant="destructive"` on `<DropdownMenuItem>` to signal a dangerous or irreversible action.
 * The item text and icon turn red; the focus ring uses the destructive colour.
 *
 * ```tsx
 * <DropdownMenuItem variant="destructive">
 *   <Trash2Icon />
 *   Delete Invoice
 * </DropdownMenuItem>
 * ```
 */
export const DestructiveItems: Story = {
  name: 'Destructive Items',
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline">Danger Actions</Button>} />
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <EditIcon />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CopyIcon />
            Duplicate
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem variant="destructive">
            <Trash2Icon />
            Delete Invoice
          </DropdownMenuItem>
          <DropdownMenuItem variant="destructive">
            <Icon name="CloseOutlined" />
            Void Invoice
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

// ---------------------------------------------------------------------------
// Disabled Items
// ---------------------------------------------------------------------------

/**
 * Pass the `disabled` prop to prevent a user from interacting with a specific item.
 * Disabled items render at reduced opacity and ignore pointer and keyboard events.
 *
 * ```tsx
 * <DropdownMenuItem disabled>Send (unavailable)</DropdownMenuItem>
 * ```
 */
export const DisabledItems: Story = {
  name: 'Disabled Items',
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline">Open</Button>} />
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <EditIcon />
            Edit Invoice
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            <SendIcon />
            Send (draft only)
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CopyIcon />
            Duplicate
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem variant="destructive" disabled>
            <Trash2Icon />
            Delete (locked)
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

// ---------------------------------------------------------------------------
// Checkbox Items
// ---------------------------------------------------------------------------

/**
 * `<DropdownMenuCheckboxItem>` lets users toggle individual options independently.
 * Manage state externally and pass `checked` + `onCheckedChange`.
 *
 * ```tsx
 * const [showPaid, setShowPaid] = useState(true)
 *
 * <DropdownMenuCheckboxItem checked={showPaid} onCheckedChange={setShowPaid}>
 *   Show Paid
 * </DropdownMenuCheckboxItem>
 * ```
 */
export const CheckboxItems: Story = {
  name: 'Checkbox Items',
  render: () => {
    const [columns, setColumns] = useState({
      amount: true,
      client: true,
      dueDate: true,
      status: false,
      createdAt: false,
    })

    const toggle = (key: keyof typeof columns) =>
      setColumns((prev) => ({ ...prev, [key]: !prev[key] }))

    return (
      <Flex direction="col" gap="3" alignItems="center">
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="outline">Toggle Columns</Button>} />
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuLabel>Visible Columns</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={columns.amount}
                onCheckedChange={() => toggle('amount')}
              >
                Amount
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={columns.client}
                onCheckedChange={() => toggle('client')}
              >
                Client
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={columns.dueDate}
                onCheckedChange={() => toggle('dueDate')}
              >
                Due Date
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={columns.status}
                onCheckedChange={() => toggle('status')}
              >
                Status
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={columns.createdAt}
                onCheckedChange={() => toggle('createdAt')}
              >
                Created At
              </DropdownMenuCheckboxItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <Typography level="sm" className="text-muted-foreground">
          Visible:{' '}
          <strong>
            {Object.entries(columns)
              .filter(([, v]) => v)
              .map(([k]) => k)
              .join(', ') || 'none'}
          </strong>
        </Typography>
      </Flex>
    )
  },
}

// ---------------------------------------------------------------------------
// Radio Group
// ---------------------------------------------------------------------------

/**
 * `<DropdownMenuRadioGroup>` with `<DropdownMenuRadioItem>` enforces a single selection.
 * Bind `value` and `onValueChange` on the `<DropdownMenuRadioGroup>`.
 *
 * ```tsx
 * <DropdownMenuRadioGroup value={status} onValueChange={setStatus}>
 *   <DropdownMenuRadioItem value="draft">Draft</DropdownMenuRadioItem>
 *   <DropdownMenuRadioItem value="sent">Sent</DropdownMenuRadioItem>
 * </DropdownMenuRadioGroup>
 * ```
 */
export const RadioGroup: Story = {
  name: 'Radio Group',
  render: () => {
    const [sortBy, setSortBy] = useState('date-desc')

    return (
      <Flex direction="col" gap="3" alignItems="center">
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="outline">Sort By</Button>} />
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuLabel>Sort Order</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
                <DropdownMenuRadioItem value="date-desc">Date (Newest first)</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="date-asc">Date (Oldest first)</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="amount-desc">
                  Amount (High to low)
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="amount-asc">
                  Amount (Low to high)
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="client-asc">Client (A – Z)</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <Typography level="sm" className="text-muted-foreground">
          Sorting by: <strong>{sortBy}</strong>
        </Typography>
      </Flex>
    )
  },
}

// ---------------------------------------------------------------------------
// Submenu
// ---------------------------------------------------------------------------

/**
 * Nest `<DropdownMenuSub>` inside `<DropdownMenuContent>` to create a flyout submenu.
 * The `<DropdownMenuSubTrigger>` automatically appends a chevron icon.
 *
 * ```tsx
 * <DropdownMenuSub>
 *   <DropdownMenuSubTrigger>More Options</DropdownMenuSubTrigger>
 *   <DropdownMenuSubContent>
 *     <DropdownMenuItem>Option A</DropdownMenuItem>
 *   </DropdownMenuSubContent>
 * </DropdownMenuSub>
 * ```
 */
export const Submenu: Story = {
  name: 'Submenu',
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline">Invoice Actions</Button>} />
      <DropdownMenuContent>
        <DropdownMenuItem>
          <EditIcon />
          Edit Invoice
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CopyIcon />
          Duplicate
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <ShareIcon />
            Share
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>
              <MailIcon />
              Send via Email
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Icon name="LinkOutlined" />
              Copy Link
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Icon name="ShareOutlined" />
              Share to WhatsApp
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <DownloadIcon />
            Export
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>Export as PDF</DropdownMenuItem>
            <DropdownMenuItem>Export as CSV</DropdownMenuItem>
            <DropdownMenuItem>Export as Excel</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <Trash2Icon />
          Delete Invoice
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

// ---------------------------------------------------------------------------
// Inset Items
// ---------------------------------------------------------------------------

/**
 * `inset` on `<DropdownMenuItem>` or `<DropdownMenuLabel>` adds left padding to align
 * text with icon-bearing items in the same list.
 *
 * ```tsx
 * <DropdownMenuItem inset>No icon, but aligned</DropdownMenuItem>
 * ```
 */
export const InsetItems: Story = {
  name: 'Inset Items',
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline">Open</Button>} />
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel inset>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <UserIcon />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SettingsIcon />
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem inset>Notifications</DropdownMenuItem>
          <DropdownMenuItem inset>Privacy</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOutIcon />
            Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

// ---------------------------------------------------------------------------
// With Overlay
// ---------------------------------------------------------------------------

/**
 * Pass `overlay` to `<DropdownMenuContent>` to render a dimmed backdrop behind the popup.
 * Useful when the menu sits over important content that should be visually suppressed.
 *
 * ```tsx
 * <DropdownMenuContent overlay>...</DropdownMenuContent>
 * ```
 */
export const WithOverlay: Story = {
  name: 'With Overlay',
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline">Open with Overlay</Button>} />
      <DropdownMenuContent overlay>
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <UserIcon />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SettingsIcon />
            Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">
            <LogOutIcon />
            Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

// ---------------------------------------------------------------------------
// Positioning
// ---------------------------------------------------------------------------

/**
 * `side`, `align`, and `sideOffset` on `<DropdownMenuContent>` control where the popup
 * appears relative to the trigger. Mirrors the [Base UI Positioner](https://base-ui.com/react/components/menu#positioner) props.
 *
 * ```tsx
 * <DropdownMenuContent side="top" align="end" sideOffset={8}>...</DropdownMenuContent>
 * ```
 */
export const Positioning: Story = {
  name: 'Positioning',
  render: () => (
    <Flex gap="6" alignItems="center" className="flex-wrap">
      {(
        [
          { side: 'top', align: 'center', label: 'top / center' },
          { side: 'bottom', align: 'start', label: 'bottom / start' },
          { side: 'bottom', align: 'end', label: 'bottom / end' },
          { side: 'right', align: 'center', label: 'right / center' },
        ] as const
      ).map(({ label, side, align }) => (
        <Flex key={label} direction="col" gap="2" alignItems="center">
          <Typography level="sm" className="text-muted-foreground">
            {label}
          </Typography>
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="outline">Open</Button>} />
            <DropdownMenuContent side={side} align={align} sideOffset={8}>
              <DropdownMenuItem>Action A</DropdownMenuItem>
              <DropdownMenuItem>Action B</DropdownMenuItem>
              <DropdownMenuItem>Action C</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Flex>
      ))}
    </Flex>
  ),
}

// ---------------------------------------------------------------------------
// Controlled Open State
// ---------------------------------------------------------------------------

/**
 * Control the open state externally by passing `open` and `onOpenChange` to `<DropdownMenu>`.
 * This lets you open or close the menu from your own logic — e.g. on row selection.
 *
 * ```tsx
 * const [open, setOpen] = useState(false)
 *
 * <DropdownMenu open={open} onOpenChange={setOpen}>
 *   ...
 * </DropdownMenu>
 * ```
 */
export const Controlled: Story = {
  name: 'Controlled',
  render: () => {
    const [open, setOpen] = useState(false)
    const [lastAction, setLastAction] = useState<string | null>(null)

    return (
      <Flex direction="col" gap="4" alignItems="center">
        <Flex gap="2">
          <Button onClick={() => setOpen(true)}>Open Programmatically</Button>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Close
          </Button>
        </Flex>
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger render={<Button variant="secondary-outline">Menu Trigger</Button>} />
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => {
                setLastAction('Edit')
                setOpen(false)
              }}
            >
              <EditIcon />
              Edit Invoice
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setLastAction('Send')
                setOpen(false)
              }}
            >
              <SendIcon />
              Send Invoice
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onClick={() => {
                setLastAction('Delete')
                setOpen(false)
              }}
            >
              <Trash2Icon />
              Delete Invoice
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {lastAction && (
          <Typography level="sm" className="text-muted-foreground">
            Last action: <strong>{lastAction}</strong>
          </Typography>
        )}
      </Flex>
    )
  },
}

// ---------------------------------------------------------------------------
// Handle with Payload
// ---------------------------------------------------------------------------

const invoiceMenuHandle = createMenuHandle<{
  id: string
  client: string
  status: 'draft' | 'sent' | 'paid'
}>()

/**
 * Use `createMenuHandle` with `payload` on each `<DropdownMenuTrigger>` to share one menu
 * instance across many rows. Each trigger passes its own data; the `<DropdownMenu>` function-as-child
 * receives whichever trigger was just pressed.
 *
 * This avoids mounting N menus — ideal for table rows with action buttons.
 *
 * ```tsx
 * const rowHandle = createMenuHandle<{ id: string }>()
 *
 * // Each row has its own trigger with a payload:
 * <DropdownMenuTrigger handle={rowHandle} payload={{ id: row.id }} render={<Button>•••</Button>} />
 *
 * // One shared menu receives the active trigger's payload:
 * <DropdownMenu handle={rowHandle}>
 *   {({ payload }) => (
 *     <DropdownMenuContent>
 *       <DropdownMenuItem onClick={() => edit(payload?.id)}>Edit</DropdownMenuItem>
 *     </DropdownMenuContent>
 *   )}
 * </DropdownMenu>
 * ```
 */
export const HandleWithPayload: Story = {
  name: 'Handle with Payload',
  render: () => {
    const invoices = [
      { id: 'INV-001', client: 'Acme Corp', status: 'draft' as const },
      { id: 'INV-002', client: 'Globex Inc', status: 'sent' as const },
      { id: 'INV-003', client: 'Initech LLC', status: 'paid' as const },
    ]

    const [lastAction, setLastAction] = useState<string | null>(null)

    return (
      <Flex direction="col" gap="4" alignItems="center">
        <div className="w-full max-w-sm divide-y rounded-lg border">
          {invoices.map((invoice) => (
            <Flex
              key={invoice.id}
              justifyContent="space-between"
              alignItems="center"
              className="px-4 py-3"
            >
              <Flex direction="col" gap="0.5">
                <Typography level="sm" className="font-medium">
                  {invoice.id}
                </Typography>
                <span className="text-muted-foreground text-xs">{invoice.client}</span>
              </Flex>
              <DropdownMenuTrigger
                handle={invoiceMenuHandle}
                payload={invoice}
                render={
                  <Button variant="ghost" size="icon">
                    <EllipsisIcon size={16} />
                  </Button>
                }
              />
            </Flex>
          ))}
        </div>

        <DropdownMenu handle={invoiceMenuHandle}>
          {({ payload }) => (
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuLabel>{payload?.id}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setLastAction(`Edit ${payload?.id}`)}
                  disabled={payload?.status === 'paid'}
                >
                  <EditIcon />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLastAction(`Send ${payload?.id}`)}>
                  <SendIcon />
                  Send to {payload?.client}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLastAction(`Download ${payload?.id}`)}>
                  <DownloadIcon />
                  Download PDF
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => setLastAction(`Delete ${payload?.id}`)}
                  disabled={payload?.status === 'paid'}
                >
                  <Trash2Icon />
                  Delete Invoice
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          )}
        </DropdownMenu>

        {lastAction && (
          <Typography level="sm" className="text-muted-foreground">
            Last action: <strong>{lastAction}</strong>
          </Typography>
        )}
      </Flex>
    )
  },
}

// ---------------------------------------------------------------------------
// Kitchen Sink — real-world invoice context menu
// ---------------------------------------------------------------------------

/**
 * A full-featured context menu combining icons, shortcuts, groups, a submenu, checkbox columns,
 * and a destructive action — representative of a real invoice-table row menu.
 */
export const KitchenSink: Story = {
  name: 'Kitchen Sink',
  render: () => {
    const [showTimestamps, setShowTimestamps] = useState(false)
    const [showNotes, setShowNotes] = useState(true)

    return (
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="outline">Invoice #INV-2024-099</Button>} />
        <DropdownMenuContent className="w-56">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Invoice Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <EditIcon />
              Edit Invoice
              <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CopyIcon />
              Duplicate
              <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <PrinterIcon />
              Print
              <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuLabel>Send</DropdownMenuLabel>
            <DropdownMenuItem>
              <SendIcon />
              Send to Client
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <ShareIcon />
                Share
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>
                  <MailIcon />
                  Via Email
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Icon name="LinkOutlined" />
                  Copy Link
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuItem>
              <DownloadIcon />
              Download PDF
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuLabel>View Options</DropdownMenuLabel>
            <DropdownMenuCheckboxItem checked={showTimestamps} onCheckedChange={setShowTimestamps}>
              Show Timestamps
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked={showNotes} onCheckedChange={setShowNotes}>
              Show Notes
            </DropdownMenuCheckboxItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuItem variant="destructive">
            <Trash2Icon />
            Delete Invoice
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>

          <DropdownMenuItem variant="destructive">
            <Icon name="CloseOutlined" />
            Void Invoice
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  },
}

/**
 * User account menu in a top-navigation bar — combining an avatar trigger,
 * a radio group for switching between workspaces, and a destructive log-out action.
 */
export const UserAccountMenu: Story = {
  name: 'User Account Menu',
  render: () => {
    const [workspace, setWorkspace] = useState('personal')

    return (
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="ghost" size="icon" className="rounded-full">
              <div className="bg-qb-blue-60 flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold text-white">
                RS
              </div>
            </Button>
          }
        />
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuGroup>
            <DropdownMenuLabel>
              <div className="flex flex-col gap-0.5">
                <span className="font-medium">Rachmad Syaefullah</span>
                <span className="text-muted-foreground text-xs font-normal">
                  user@example.com
                </span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Workspace</DropdownMenuLabel>
            <DropdownMenuRadioGroup value={workspace} onValueChange={setWorkspace}>
              <DropdownMenuRadioItem value="personal">Personal</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="quickbill">Acme Inc.</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="acme">Acme Corp</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <UserIcon />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SettingsIcon />
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem>
            <PlusIcon />
            New Workspace
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">
            <LogOutIcon />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  },
}

// ---------------------------------------------------------------------------
// Inside Dialog
// ---------------------------------------------------------------------------

/**
 * A dropdown menu used inside a `<Dialog>`. The menu's portal renders above the dialog's
 * backdrop, so stacking context is handled automatically — no extra z-index wrangling needed.
 *
 * Use `collisionBoundary="unset"` on `<DropdownMenuContent>` when the dialog clips the popup.
 * By default DropdownMenu will focus to an item on Keyboard Input, if you have an Input inside DropdownContent, use `disableKeyboardEvent`
 */
export const InsideDialog: Story = {
  render: () => {
    const [assignee, setAssignee] = useState<string | null>(null)
    const [priority, setPriority] = useState('medium')

    return (
      <Dialog
        title="Edit Invoice"
        footer={
          <Flex gap="2" justifyContent="end">
            <Button variant="outline">Cancel</Button>
            <Button>Save Changes</Button>
          </Flex>
        }
        content={
          <Flex direction="col" gap="4">
            <Flex direction="col" gap="1.5">
              <Typography level="sm" className="font-medium">
                Assignee
              </Typography>
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button variant="outline" className="w-full justify-start">
                      <UserIcon />
                      {assignee ?? 'Select assignee…'}
                    </Button>
                  }
                />
                <DropdownMenuContent
                  collisionBoundary="unset"
                  className="h-40 w-56"
                  disableKeyboardEvent
                >
                  <div className="sticky -top-2 isolate z-1 bg-white px-2 py-4">
                    <Input inputSize={'sm'} placeholder="Search..." />
                  </div>
                  {[
                    'Joehan K.',
                    'Acme Finance',
                    'John Doe',
                    'Jane Doe',
                    'Marry Jane',
                    'Jon Snow',
                    'Sansa Stark',
                    'Tryrion Lannister',
                  ].map((name) => (
                    <DropdownMenuItem key={name} onClick={() => setAssignee(name)}>
                      <UserIcon />
                      {name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </Flex>

            <Flex direction="col" gap="1.5">
              <Typography level="sm" className="font-medium">
                Priority
              </Typography>
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button variant="outline" className="w-full justify-start capitalize">
                      {priority}
                    </Button>
                  }
                />
                <DropdownMenuContent collisionBoundary="unset" className="w-56">
                  <DropdownMenuRadioGroup value={priority} onValueChange={setPriority}>
                    <DropdownMenuRadioItem value="low">Low</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="medium">Medium</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="high">High</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </Flex>
          </Flex>
        }
      >
        <Button variant="outline">Open Dialog</Button>
      </Dialog>
    )
  },
}
