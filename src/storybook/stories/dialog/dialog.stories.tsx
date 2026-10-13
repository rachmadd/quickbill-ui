import { useState } from 'react'

import { Dialog } from '@/components/ui/composed/dialog'
import { Input } from '@/components/ui/composed/input'
import {
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogRoot,
  DialogTrigger,
  createDialogHandle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Summary } from '@/components/core/summary'
import { Card } from '@/components/ui/card'
import { DataTable, type TableColumn } from '@/components/ui/data-table'
import { Separator } from '@/components/ui/separator'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta = {
  title: 'Components/Dialog',
  tags: ['autodocs'],
  component: DialogRoot,
  subcomponents: {
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTrigger,
    DialogBody,
    DialogTitle,
    DialogDescription,
    DialogClose,
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A modal dialog for forms, data display, and user feedback. Built on top of [Base UI Dialog](https://base-ui.com/react/components/dialog).

---

<div style="background:#eff6ff;border-left:4px solid #3b82f6;padding:12px 16px;border-radius:4px;margin:16px 0">
<strong>💡 Two patterns available — pick the one that fits</strong>

| | Composed \`<Dialog>\` | Compound \`<DialogRoot>\` |
|---|---|---|
| **Best for** | Forms, data views, feedback | Multi-section, tables, custom layouts |
| **API style** | Props-driven (\`content\`, \`footer\`) | JSX composition |
| **Built-in close btn** | ✓ Header X button included | Via \`<DialogHeader showCloseButton>\` |
| **Layout control** | Fixed (header → body → footer) | Full — any structure, any order |
| **When to reach for it** | Most dialogs | DataTable + Summary, nested sections |

**Rule of thumb:** start with \`&lt;Dialog&gt;\`. Switch to compound only when the fixed layout can't express what you need.
</div>

---

## Two usage patterns

### 1. Composed \`<Dialog>\` — for standard dialogs

Pass \`title\`, \`content\` (body), and \`footer\` (actions) as props. The close button, separator, and overall structure are built in.

\`\`\`tsx
import { Dialog } from '@/components/ui/composed/dialog'

<Dialog
  title="Add Client"
  content={<form>...</form>}
  footer={
    <>
      <Button variant="outline">Cancel</Button>
      <Button>Save</Button>
    </>
  }
>
  <Button>Open</Button>
</Dialog>
\`\`\`

### 2. Compound components — for complex dialogs

Full structural control — compose header, body, separator, and footer in any order with any content.

\`\`\`tsx
import {
  DialogRoot, DialogTrigger, DialogContent,
  DialogHeader, DialogTitle, DialogBody,
  DialogFooter, DialogClose,
} from '@/components/ui/dialog'

<DialogRoot>
  <DialogTrigger render={<Button>Open</Button>} />
  <DialogContent>
    <DialogHeader><DialogTitle>Title</DialogTitle></DialogHeader>
    <Separator />
    <DialogBody>Content goes here.</DialogBody>
    <DialogFooter>
      <DialogClose render={<Button variant="outline">Cancel</Button>} />
      <Button>Submit</Button>
    </DialogFooter>
  </DialogContent>
</DialogRoot>
\`\`\`

---

## Anatomy

| Component | Description |
|---|---|
| \`<DialogRoot>\` | Root provider. Manages open state and modal behaviour |
| \`<DialogTrigger>\` | Element that opens the dialog on click |
| \`<DialogContent>\` | Popup container — renders portal, backdrop, and panel |
| \`<DialogHeader>\` | Top section. Accepts \`showCloseButton\` for an absolute X button |
| \`<DialogTitle>\` | Accessible title, linked to the panel via \`aria-labelledby\` |
| \`<DialogDescription>\` | Accessible description, linked via \`aria-describedby\` |
| \`<DialogBody>\` | Main content area |
| \`<DialogFooter>\` | Bottom action bar. Accepts \`showCloseButton\` for a Close button |
| \`<DialogClose>\` | Closes the dialog on click — use \`render\` to customise the element |
        `,
      },
    },
  },
}

export default meta

export type DialogStory = StoryObj<typeof meta>

// ─── Composed <Dialog> ───────────────────────────────────────────────────────

/**
 * A form inside a dialog — the most common use case. Pass `content` with your form fields and
 * `footer` with submit/cancel actions. The close button and separator are included automatically.
 *
 * ```tsx
 * <Dialog
 *   title="Add New Client"
 *   content={<form>...</form>}
 *   footer={<><Button variant="outline">Cancel</Button><Button>Save</Button></>}
 * >
 *   <Button>Open</Button>
 * </Dialog>
 * ```
 */
export const ComposedForm: DialogStory = {
  name: 'Composed / Form',
  render: () => (
    <Dialog
      title="Add New Client"
      content={
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Business Name</label>
            <Input placeholder="e.g. Acme Corp" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Email Address</label>
            <Input type="email" placeholder="billing@acme.com" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Phone Number</label>
            <Input type="tel" placeholder="+62 812 3456 7890" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Address</label>
            <Input placeholder="Jl. Sudirman No. 1, Jakarta" />
          </div>
        </div>
      }
      footer={
        <>
          <Button variant="outline">Cancel</Button>
          <Button>Add Client</Button>
        </>
      }
    >
      <Button>Add New Client</Button>
    </Dialog>
  ),
}

/**
 * Display structured data using `<Summary>` inside the dialog body. Useful for read-only invoice or
 * transaction detail views without building a full compound layout.
 *
 * ```tsx
 * <Dialog
 *   title="Invoice #INV-2024-099"
 *   content={<Summary variant="filled" items={[...]} />}
 *   footer={<><Button variant="outline">Download PDF</Button><Button>Mark as Paid</Button></>}
 * >
 *   <Button variant="outline">View Invoice</Button>
 * </Dialog>
 * ```
 */
export const ComposedDataDisplay: DialogStory = {
  name: 'Composed / Data Display',
  render: () => (
    <Dialog
      title="Invoice #INV-2024-099"
      content={
        <Summary
          variant="filled"
          items={[
            { key: 'client', label: 'Client', value: 'Acme Corp' },
            { key: 'email', label: 'Email', value: 'billing@acme.com' },
            { key: 'issued', label: 'Issued Date', value: '1 May 2026' },
            { key: 'due', label: 'Due Date', value: '31 May 2026' },
            { key: 'subtotal', label: 'Subtotal', value: '$2,200.00' },
            { key: 'tax', label: 'Tax (10%)', value: '$220.00' },
            { key: 'total', label: 'Total', value: '$2,420.00' },
          ]}
        />
      }
      footer={
        <>
          <Button variant="outline">Download PDF</Button>
          <Button>Mark as Paid</Button>
        </>
      }
    >
      <Button variant="outline">View Invoice</Button>
    </Dialog>
  ),
}

/**
 * A feedback dialog shown after completing an action — e.g. after recording a payment.
 * Use `showCloseButton={false}` and `closeOnBackdropClick={false}` to require explicit confirmation.
 *
 * ```tsx
 * <Dialog
 *   title="Payment Recorded"
 *   showCloseButton={false}
 *   closeOnBackdropClick={false}
 *   content={<Summary ... />}
 *   footer={<Button className="w-full">Done</Button>}
 * >
 *   <Button>Mark as Paid</Button>
 * </Dialog>
 * ```
 */
export const ComposedFeedback: DialogStory = {
  name: 'Composed / Feedback',
  render: () => (
    <Dialog
      title="Payment Recorded"
      showCloseButton={false}
      closeOnBackdropClick={false}
      content={
        <div className="flex flex-col gap-3">
          <Summary
            variant="filled"
            items={[
              { key: 'invoice', label: 'Invoice', value: '#INV-2024-099' },
              { key: 'client', label: 'Client', value: 'Acme Corp' },
              { key: 'amount', label: 'Amount Paid', value: '$2,420.00' },
              { key: 'date', label: 'Payment Date', value: '3 May 2026' },
              { key: 'method', label: 'Payment Method', value: 'Bank Transfer' },
            ]}
          />
          <p className="text-muted-foreground text-center text-sm">
            A confirmation has been sent to billing@acme.com.
          </p>
        </div>
      }
      footer={<Button className="w-full">Done</Button>}
    >
      <Button>Mark as Paid</Button>
    </Dialog>
  ),
}

/**
 * Control dialog open state externally by passing `open` and `onOpenChange`. Omit the trigger child —
 * the dialog opens only when `open` is set to `true` by parent logic.
 *
 * ```tsx
 * const [open, setOpen] = useState(false)
 *
 * <Button onClick={() => setOpen(true)}>Edit</Button>
 * <Dialog open={open} onOpenChange={setOpen} title="Edit Invoice" content={...} footer={...} />
 * ```
 */
export const ComposedControlled: DialogStory = {
  name: 'Composed / Controlled',
  render: () => {
    const [open, setOpen] = useState(false)

    return (
      <div className="flex flex-col items-center gap-4">
        <Button onClick={() => setOpen(true)}>Edit Invoice</Button>
        <Dialog
          open={open}
          onOpenChange={(next) => setOpen(next)}
          title="Edit Invoice #INV-2024-099"
          content={
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium">Invoice Number</label>
                <Input defaultValue="INV-2024-099" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium">Client</label>
                <Input defaultValue="Acme Corp" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium">Due Date</label>
                <Input type="date" defaultValue="2026-05-31" />
              </div>
            </div>
          }
          footer={
            <>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Discard
              </Button>
              <Button onClick={() => setOpen(false)}>Save Changes</Button>
            </>
          }
        />
      </div>
    )
  },
}

// ─── Compound components ─────────────────────────────────────────────────────

type LineItem = {
  description: string
  qty: number
  rate: number
  amount: number
}

const lineItemColumns: TableColumn<LineItem, unknown>[] = [
  { accessorKey: 'description', header: 'Description' },
  { accessorKey: 'qty', header: 'Qty', size: 60 },
  {
    accessorKey: 'rate',
    header: 'Rate',
    size: 100,
    cell: ({ getValue }) => `$${(getValue() as number).toFixed(2)}`,
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    size: 100,
    cell: ({ getValue }) => `$${(getValue() as number).toFixed(2)}`,
  },
]

/**
 * A fully structured invoice viewer using compound components. The body contains a `<Summary>` for
 * client info, a `<DataTable>` for line items, and a totals section — all inside a single scrollable
 * body with a pinned header and footer.
 *
 * Use this pattern when the composed `<Dialog>` layout isn't flexible enough for multi-section content.
 */
export const CompoundComplex: DialogStory = {
  name: 'Compound / Complex Invoice Viewer',
  render: () => (
    <DialogRoot>
      <DialogTrigger render={<Button variant="outline">View Invoice</Button>} />
      <DialogContent className="sm:w-[680px]">
        <DialogHeader>
          <DialogTitle>Invoice #INV-2024-099</DialogTitle>
          <DialogDescription>Acme Corp · Issued 1 May 2026 · Due 31 May 2026</DialogDescription>
        </DialogHeader>
        <Separator />
        <DialogBody className="flex max-h-[60vh] flex-col gap-4 overflow-y-auto">
          <Summary
            variant="filled"
            items={[
              { key: 'client', label: 'Client', value: 'Acme Corp' },
              { key: 'email', label: 'Email', value: 'billing@acme.com' },
              { key: 'address', label: 'Address', value: 'Jl. Sudirman No. 1, Jakarta' },
              { key: 'status', label: 'Status', value: 'Unpaid' },
            ]}
          />
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium">Line Items</p>
            <DataTable
              frameless
              columns={lineItemColumns}
              data={[
                { description: 'UI/UX Design', qty: 1, rate: 1500.0, amount: 1500.0 },
                { description: 'Frontend Development', qty: 20, rate: 50.0, amount: 1000.0 },
                { description: 'QA & Testing', qty: 5, rate: 40.0, amount: 200.0 },
              ]}
            />
          </div>
          <Summary
            items={[
              { key: 'subtotal', label: 'Subtotal', value: '$2,700.00' },
              { key: 'tax', label: 'Tax (11%)', value: '$297.00' },
              { key: 'total', label: 'Total', value: '$2,997.00' },
            ]}
          />
        </DialogBody>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Close</Button>} />
          <Button variant="outline">Download PDF</Button>
          <Button>Mark as Paid</Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  ),
}

// ─── Handle with payload ──────────────────────────────────────────────────────

type ClientPayload = {
  name: string
  email: string
  invoiceCount: number
  totalBilled: number
  outstanding: number
}

const clientDialogHandle = createDialogHandle<ClientPayload>()

/**
 * Use `createDialogHandle` to open a dialog programmatically with a typed payload — no trigger
 * child or local open state required. Call `handle.openWithPayload(data)` from anywhere, then
 * access the data via the function-as-child pattern on `<DialogRoot handle={handle}>`.
 *
 * ```tsx
 * const clientHandle = createDialogHandle<{ name: string; totalBilled: number }>()
 *
 * <Button onClick={() => clientHandle.openWithPayload({ name: 'Acme', totalBilled: 24500 })}>
 *   View Summary
 * </Button>
 *
 * <DialogRoot handle={clientHandle}>
 *   {({ payload }) => (
 *     <DialogContent>
 *       <DialogTitle>{payload?.name}</DialogTitle>
 *       ...
 *     </DialogContent>
 *   )}
 * </DialogRoot>
 * ```
 */
export const CompoundHandleWithPayload: DialogStory = {
  name: 'Compound / Handle with Payload',
  render: () => {
    const clients: ClientPayload[] = [
      {
        name: 'Acme Corp',
        email: 'billing@acme.com',
        invoiceCount: 12,
        totalBilled: 24500,
        outstanding: 2420,
      },
      {
        name: 'Globex Inc',
        email: 'ar@globex.com',
        invoiceCount: 7,
        totalBilled: 15200,
        outstanding: 0,
      },
      {
        name: 'Initech LLC',
        email: 'finance@initech.io',
        invoiceCount: 3,
        totalBilled: 6800,
        outstanding: 890,
      },
    ]

    return (
      <div className="flex w-96 flex-col gap-3">
        {clients.map((client) => (
          <Card
            key={client.name}
            variant="outlined"
            size="md"
            className="flex items-center justify-between"
          >
            <div>
              <p className="text-sm font-medium">{client.name}</p>
              <p className="text-muted-foreground text-xs">
                {client.invoiceCount} invoices · {client.email}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => clientDialogHandle.openWithPayload(client)}
            >
              View
            </Button>
          </Card>
        ))}

        <DialogRoot handle={clientDialogHandle}>
          {({ payload }) => (
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{payload?.name}</DialogTitle>
                <DialogDescription>Client account summary</DialogDescription>
              </DialogHeader>
              <Separator />
              <DialogBody>
                <Summary
                  variant="filled"
                  items={[
                    { key: 'email', label: 'Email', value: payload?.email ?? '' },
                    {
                      key: 'invoices',
                      label: 'Total Invoices',
                      value: payload?.invoiceCount ?? 0,
                    },
                    {
                      key: 'total',
                      label: 'Total Billed',
                      value: `$${(payload?.totalBilled ?? 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
                    },
                    {
                      key: 'outstanding',
                      label: 'Outstanding',
                      value: `$${(payload?.outstanding ?? 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
                    },
                  ]}
                />
              </DialogBody>
              <DialogFooter>
                <DialogClose render={<Button variant="outline">Close</Button>} />
                <Button>Create Invoice</Button>
              </DialogFooter>
            </DialogContent>
          )}
        </DialogRoot>
      </div>
    )
  },
}
