import { useState } from 'react'

import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
  createPopoverHandle,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from '@/components/ui/badge'

const meta: Meta = {
  title: 'Components/Popover',
  tags: ['autodocs'],
  component: Popover,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A non-modal floating panel anchored to a trigger element. Built on top of [Base UI Popover](https://base-ui.com/react/components/popover).

---

<div style="background:#eff6ff;border-left:4px solid #3b82f6;padding:12px 16px;border-radius:4px;margin:16px 0">
<strong>💡 When to use Popover vs Dropdown</strong>

| | Popover | Dropdown / DropdownMenu2 |
|---|---|---|
| **Content** | Arbitrary rich content — forms, summaries, detail panels | A list of clickable actions or options |
| **Interaction** | Informational or interactive panel; does not close on item click | Closes after an item is selected |
| **Keyboard pattern** | Focus moves into the panel freely | Arrow keys navigate between items |
| **Common use cases** | Invoice preview, date pickers, help text, settings panels | Action menus, sort pickers, filter lists |

**Rule of thumb:** if the popup contains a **list of actions**, use **Dropdown / DropdownMenu2**. If it contains **rich content** (text, forms, summaries), use **Popover**.
</div>

---

## Usage

\`\`\`tsx
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
} from '@/components/ui/popover'

<Popover>
  <PopoverTrigger render={<Button />}>Open</PopoverTrigger>
  <PopoverContent>
    <PopoverHeader>
      <PopoverTitle>Title</PopoverTitle>
      <PopoverDescription>Description</PopoverDescription>
    </PopoverHeader>
  </PopoverContent>
</Popover>
\`\`\`

---

## Anatomy

| Component | Description |
|---|---|
| \`<Popover>\` | Root provider. Manages open state |
| \`<PopoverTrigger>\` | Element that toggles the popover on click |
| \`<PopoverContent>\` | Floating panel — renders in a portal, positioned relative to the trigger |
| \`<PopoverHeader>\` | Container for title and description |
| \`<PopoverTitle>\` | Accessible title |
| \`<PopoverDescription>\` | Accessible description |

## Positioning

\`<PopoverContent>\` accepts \`side\` (\`top\` | \`bottom\` | \`left\` | \`right\`) and \`align\` (\`start\` | \`center\` | \`end\`) to control placement. Fine-tune with \`sideOffset\` and \`alignOffset\`.
        `,
      },
    },
  },
}

export default meta

export type PopoverStory = StoryObj<typeof meta>

/**
 * The simplest usage — a popover with a title and description anchored below its trigger.
 *
 * ```tsx
 * <Popover>
 *   <PopoverTrigger render={<Button />}>Open</PopoverTrigger>
 *   <PopoverContent>
 *     <PopoverHeader>
 *       <PopoverTitle>Invoice Details</PopoverTitle>
 *       <PopoverDescription>INV-2024-042 · Acme Corp · $1,200.00</PopoverDescription>
 *     </PopoverHeader>
 *   </PopoverContent>
 * </Popover>
 * ```
 */
export const Basic: PopoverStory = {
  name: 'Basic',
  render: () => (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>View Details</PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Invoice Details</PopoverTitle>
          <PopoverDescription>INV-2024-042 · Acme Corp · $1,200.00</PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  ),
}

/**
 * Use `side` to anchor the panel to a different edge of the trigger.
 * Accepts `top`, `bottom` (default), `left`, or `right`.
 *
 * ```tsx
 * <PopoverContent side="top">...</PopoverContent>
 * ```
 */
export const Positioning: PopoverStory = {
  name: 'Positioning',
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      {(['top', 'bottom', 'left', 'right'] as const).map((side) => (
        <Popover key={side}>
          <PopoverTrigger render={<Button variant="outline" className="w-full capitalize" />}>
            {side}
          </PopoverTrigger>
          <PopoverContent side={side}>
            <PopoverHeader>
              <PopoverTitle>Anchored to {side}</PopoverTitle>
              <PopoverDescription>The panel opens on the {side} side.</PopoverDescription>
            </PopoverHeader>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  ),
}

/**
 * Use `align` to control how the panel aligns relative to the trigger along the cross axis.
 * Accepts `start`, `center` (default), or `end`.
 *
 * ```tsx
 * <PopoverContent align="start">...</PopoverContent>
 * ```
 */
export const Alignment: PopoverStory = {
  name: 'Alignment',
  render: () => (
    <div className="flex flex-col gap-4">
      {(['start', 'center', 'end'] as const).map((align) => (
        <Popover key={align}>
          <PopoverTrigger render={<Button variant="outline" className="w-48 capitalize" />}>
            Align {align}
          </PopoverTrigger>
          <PopoverContent align={align}>
            <PopoverHeader>
              <PopoverTitle>Aligned to {align}</PopoverTitle>
              <PopoverDescription>Cross-axis alignment: {align}.</PopoverDescription>
            </PopoverHeader>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  ),
}

/**
 * Control open state externally by passing `open` and `onOpenChange` to `<Popover>`.
 * This lets parent logic drive visibility without a trigger child.
 *
 * ```tsx
 * const [open, setOpen] = useState(false)
 *
 * <Button onClick={() => setOpen(true)}>Open</Button>
 * <Popover open={open} onOpenChange={setOpen}>
 *   <PopoverContent>...</PopoverContent>
 * </Popover>
 * ```
 */
export const Controlled: PopoverStory = {
  name: 'Controlled',
  render: () => {
    const [open, setOpen] = useState(false)

    return (
      <div className="flex flex-col items-center gap-12">
        <Button variant="outline" onClick={() => setOpen((v) => !v)}>
          {open ? 'Close Popover' : 'Open Programmatically'}
        </Button>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger>
            <Badge>I have popover</Badge>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverHeader>
              <PopoverTitle>Controlled Popover</PopoverTitle>
              <PopoverDescription>
                This popover is driven by external state, not a trigger inside it.
              </PopoverDescription>
            </PopoverHeader>
          </PopoverContent>
        </Popover>
      </div>
    )
  },
}

// ─── Handle with payload ──────────────────────────────────────────────────────

type InvoicePayload = {
  id: string
  client: string
  amount: number
  dueDate: string
  status: 'pending' | 'paid' | 'overdue'
}

const invoicePopoverHandle = createPopoverHandle<InvoicePayload>()

/**
 * Use `createPopoverHandle` to connect multiple detached triggers to a single `<Popover>`.
 * Each `<PopoverTrigger>` gets the same `handle`, a unique `id`, and its own `payload`.
 * The `<Popover>` root accepts a render-function child that receives the active trigger's payload.
 *
 * This avoids repeating a full `<Popover>` tree for every row in a list.
 *
 * ```tsx
 * const handle = createPopoverHandle<{ id: string; name: string }>()
 *
 * // Multiple triggers — each carries its own payload
 * {items.map((item) => (
 *   <PopoverTrigger key={item.id} handle={handle} id={item.id} payload={item} render={<Button />}>
 *     {item.id}
 *   </PopoverTrigger>
 * ))}
 *
 * // One popover root — receives whichever trigger's payload is active
 * <Popover handle={handle}>
 *   {({ payload }) => (
 *     <PopoverContent>
 *       <PopoverTitle>{payload?.name}</PopoverTitle>
 *     </PopoverContent>
 *   )}
 * </Popover>
 * ```
 */
export const HandleWithPayload: PopoverStory = {
  name: 'Handle with Payload',
  render: () => {
    const invoices: InvoicePayload[] = [
      {
        id: 'INV-001',
        client: 'Acme Corp',
        amount: 1250.0,
        dueDate: '1 Jun 2026',
        status: 'pending',
      },
      {
        id: 'INV-002',
        client: 'Globex Inc',
        amount: 890.5,
        dueDate: '15 May 2026',
        status: 'overdue',
      },
      {
        id: 'INV-003',
        client: 'Initech LLC',
        amount: 2100.0,
        dueDate: '30 Jun 2026',
        status: 'paid',
      },
    ]

    const statusColor: Record<InvoicePayload['status'], string> = {
      pending: 'text-amber-600',
      overdue: 'text-red-600',
      paid: 'text-green-600',
    }

    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          {invoices.map((invoice) => (
            <PopoverTrigger
              key={invoice.id}
              handle={invoicePopoverHandle}
              id={invoice.id}
              payload={invoice}
              render={<Button variant="outline" size="sm" />}
            >
              {invoice.id}
            </PopoverTrigger>
          ))}
        </div>

        <Popover handle={invoicePopoverHandle}>
          {({ payload }) => (
            <PopoverContent className="w-72">
              <PopoverHeader>
                <PopoverTitle>{payload?.id}</PopoverTitle>
                <PopoverDescription>{payload?.client}</PopoverDescription>
              </PopoverHeader>
              <div className="flex flex-col gap-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount</span>
                  <span className="text-qb-primary font-semibold">
                    ${payload?.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Due date</span>
                  <span className="font-medium">{payload?.dueDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <span
                    className={`font-medium capitalize ${payload ? statusColor[payload.status] : ''}`}
                  >
                    {payload?.status}
                  </span>
                </div>
              </div>
            </PopoverContent>
          )}
        </Popover>
      </div>
    )
  },
}

export const RichContent: PopoverStory = {
  name: 'Rich Content',
  render: () => (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>INV-2024-099</PopoverTrigger>
      <PopoverContent className="w-80">
        <PopoverHeader>
          <PopoverTitle>Payment Summary</PopoverTitle>
          <PopoverDescription>Invoice issued to Acme Corp</PopoverDescription>
        </PopoverHeader>
        <div className="flex flex-col gap-1.5 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Invoice</span>
            <span className="font-medium">#INV-2024-099</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Amount</span>
            <span className="text-qb-primary font-semibold">$2,400.00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Due date</span>
            <span className="font-medium">1 June 2026</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Status</span>
            <span className="font-medium text-amber-600">Pending</span>
          </div>
        </div>
        <div className="flex gap-2 pt-1">
          <Button size="sm" className="flex-1">
            Send Reminder
          </Button>
          <Button size="sm" variant="outline" className="flex-1">
            View Invoice
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  ),
}
