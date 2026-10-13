import { useState } from 'react'

import { AlertDialog } from '@/components/ui/composed/alert-dialog'
import { useAlertDialog } from '@/components/hooks/use-alert-dialog'
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogRoot,
  AlertDialogTitle,
  AlertDialogTrigger,
  createAlertDialogHandle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/core/typography'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { illustrationOf } from '@/storybook/components/illustrations'

const meta: Meta = {
  title: 'Components/AlertDialog',
  tags: ['autodocs'],
  component: AlertDialog,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A modal confirmation dialog that requires the user to explicitly confirm or cancel an action. Built on top of [Base UI AlertDialog](https://base-ui.com/react/components/alert-dialog).

---

<div style="background:#eff6ff;border-left:4px solid #3b82f6;padding:12px 16px;border-radius:4px;margin:16px 0">
<strong>💡 Two patterns available — pick the one that fits</strong>

| | Composed \`<AlertDialog>\` | Compound \`<AlertDialogRoot>\` |
|---|---|---|
| **Best for** | Standard confirm/cancel flows | Complex, bespoke layouts |
| **API style** | Props-driven | JSX composition |
| **Built-in loading** | ✓ Spinner on async \`onConfirm\` | ✗ Manage manually |
| **Layout control** | Fixed (title → content → footer) | Full — add any content, in any order |
| **When to reach for it** | Most confirmation dialogs | Summary cards, extra actions, forms |

**Rule of thumb:** start with \`&lt;AlertDialog&gt;\`. Switch to compound components only when props can't express what you need.
</div>

---

## Two usage patterns

### 1. Composed \`<AlertDialog>\` — for standard confirmations

Use the composed \`<AlertDialog>\` component when you need a ready-made confirm/cancel dialog. Pass content as props and optionally provide an async \`onConfirm\` handler — the confirm button automatically shows a spinner while it resolves.

\`\`\`tsx
import { AlertDialog } from '@/components/ui/composed/confirmation-dialog'

<AlertDialog
  title="Delete Invoice"
  content="This action cannot be undone."
  confirm={{ label: 'Delete', variant: 'destructive' }}
  onConfirm={async () => { await deleteInvoice() }}
>
  <Button variant="destructive">Delete</Button>
</AlertDialog>
\`\`\`

### 2. Compound components — for complex confirmations

Use the compound API when you need full structural control — custom layouts, extra form elements, or non-standard content.

\`\`\`tsx
import {
  AlertDialog, AlertDialogTrigger, AlertDialogContent,
  AlertDialogHeader, AlertDialogTitle, AlertDialogDescription,
  AlertDialogFooter, AlertDialogAction, AlertDialogCancel,
} from '@/components/ui/alert-dialog'

<AlertDialog>
  <AlertDialogTrigger nativeButton={false} render={<div role="button" />}>
    <Button>Open</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Title</AlertDialogTitle>
      <AlertDialogDescription>Description</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Confirm</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
\`\`\`

---

## Anatomy

| Component | Description |
|---|---|
| \`<AlertDialog>\` | Composed component — wraps the full confirm/cancel pattern |
| \`<AlertDialog>\` | Root provider. Manages open state |
| \`<AlertDialogTrigger>\` | Element that opens the dialog on click |
| \`<AlertDialogContent>\` | Popup container — renders portal, backdrop, and panel |
| \`<AlertDialogHeader>\` | Top section containing title and description |
| \`<AlertDialogTitle>\` | Accessible title |
| \`<AlertDialogDescription>\` | Accessible description |
| \`<AlertDialogFooter>\` | Bottom action bar |
| \`<AlertDialogAction>\` | Confirm button — does not auto-close, attach your handler via \`onClick\` |
| \`<AlertDialogCancel>\` | Cancel button — closes the dialog automatically |
        `,
      },
    },
  },
}

export default meta

export type AlertDialogStory = StoryObj<typeof meta>

// ─── Composed <AlertDialog> ───────────────────────────────────────────

/**
 * The simplest usage. Wrap a trigger element as the child of `<AlertDialog>` and pass `title` and `content` as props.
 *
 * ```tsx
 * <AlertDialog
 *   title="Confirm Action"
 *   content="Are you sure you want to proceed?"
 * >
 *   <Button>Open</Button>
 * </AlertDialog>
 * ```
 */
export const ComposedBasic: AlertDialogStory = {
  name: 'Composed / Basic',
  render: () => (
    <AlertDialog
      title="Submit Invoice?"
      content="Once submitted, the invoice will be sent to the client and cannot be edited."
      media={<img src={illustrationOf('questionSrc')} alt="" />}
    >
      <Button>Submit Invoice</Button>
    </AlertDialog>
  ),
}

/**
 * Use `confirm={{ variant: 'destructive' }}` for irreversible or dangerous actions.
 * This signals to the user that the action has serious consequences.
 *
 * ```tsx
 * <AlertDialog
 *   title="Delete Invoice"
 *   content="This action cannot be undone."
 *   confirm={{ label: 'Delete', variant: 'destructive' }}
 * >
 *   <Button variant="destructive">Delete</Button>
 * </AlertDialog>
 * ```
 */
export const ComposedDestructive: AlertDialogStory = {
  name: 'Composed / Destructive',
  render: () => (
    <AlertDialog
      title="Delete Invoice #INV-2024-042?"
      content="This action cannot be undone. The invoice and all associated payment records will be permanently removed."
      media={<img src={illustrationOf('deleteSrc')} alt="" />}
      confirm={{ label: 'Yes, Delete', variant: 'destructive' }}
      cancel={{ label: 'Keep Invoice' }}
    >
      <Button variant="destructive">Delete Invoice</Button>
    </AlertDialog>
  ),
}

/**
 * Set `showCancel={false}` to hide the cancel button. Useful for acknowledgement-only dialogs
 * where the user simply needs to confirm they have read the information.
 *
 * ```tsx
 * <AlertDialog showCancel={false} title="Notice" content="..." confirm={{ label: 'Got it' }}>
 *   <Button>Open</Button>
 * </AlertDialog>
 * ```
 */
export const ComposedNoCancel: AlertDialogStory = {
  name: 'Composed / No Cancel',
  render: () => (
    <AlertDialog
      title="Subscription Renewed"
      content="Your QuickBill Pro subscription has been renewed for another 12 months. Your next billing date is 1 June 2027."
      media={<img src={illustrationOf('successPaymentSrc')} alt="" />}
      confirm={{ label: 'Got it' }}
      showCancel={false}
    >
      <Button variant="outline">View Renewal Notice</Button>
    </AlertDialog>
  ),
}

/**
 * Pass an async function to `onConfirm` to trigger a loading spinner on the confirm button while the promise resolves.
 * The dialog closes automatically once the promise settles (resolves or rejects).
 *
 * ```tsx
 * <AlertDialog
 *   title="Send Payment"
 *   onConfirm={async () => { await sendPayment() }}
 * >
 *   <Button>Pay Now</Button>
 * </AlertDialog>
 * ```
 */
export const ComposedAsyncConfirm: AlertDialogStory = {
  name: 'Composed / Async Confirm (Loading)',
  render: () => (
    <AlertDialog
      title="Send Payment"
      content="You are about to send $1,200.00 to Acme Corp. This will be charged to your linked bank account."
      media={<img src={illustrationOf('uploadTransactionSrc')} alt="" />}
      confirm={{ label: 'Send Payment' }}
      onConfirm={() => new Promise((resolve) => setTimeout(resolve, 2500))}
    >
      <Button>Pay Now</Button>
    </AlertDialog>
  ),
}

/**
 * Control open state externally by passing `open` and `onOpenChange`. Omit the trigger child entirely —
 * the dialog will only open when `open` is set to `true` by parent logic.
 *
 * ```tsx
 * const [open, setOpen] = useState(false)
 *
 * <Button onClick={() => setOpen(true)}>Open</Button>
 * <AlertDialog open={open} onOpenChange={setOpen} title="Controlled" content="..." />
 * ```
 */
export const ComposedControlled: AlertDialogStory = {
  name: 'Composed / Controlled',
  render: () => {
    const [open, setOpen] = useState(false)

    return (
      <div className="flex flex-col items-center gap-4">
        <Button onClick={() => setOpen(true)}>Open Programmatically</Button>
        <AlertDialog
          open={open}
          onOpenChange={setOpen}
          title="Void Invoice?"
          content="Voiding this invoice will notify the client and mark it as void in your records."
          media={<img src={illustrationOf('attentionSrc')} alt="" />}
          confirm={{ label: 'Void Invoice', variant: 'destructive' }}
          cancel={{ label: 'Keep Active' }}
          onConfirm={() => setOpen(false)}
        />
      </div>
    )
  },
}

/**
 * Pass `title` as `{ label, className }` to apply custom typography. Use `prefixContent` and
 * `suffixContent` to inject elements above or below the description.
 *
 * ```tsx
 * <AlertDialog
 *   title={{ label: 'Warning', className: 'text-qb-destructive' }}
 *   prefixContent={<Badge variant="destructive">High Risk</Badge>}
 *   content="..."
 * >
 *   <Button>Open</Button>
 * </AlertDialog>
 * ```
 */
export const ComposedCustomContent: AlertDialogStory = {
  name: 'Composed / Custom Content',
  render: () => (
    <AlertDialog
      title={{ label: 'Payment Overdue', className: 'text-qb-destructive' }}
      media={<img src={illustrationOf('attentionSrc')} alt="" />}
      prefixContent={
        <Typography className="text-qb-destructive text-center text-sm font-medium">
          30 days past due
        </Typography>
      }
      content="This client has an overdue balance of $3,450.00. Do you want to send a payment reminder?"
      confirm={{ label: 'Send Reminder' }}
      cancel={{ label: 'Dismiss' }}
    >
      <Button variant="destructive">Send Reminder</Button>
    </AlertDialog>
  ),
}

// ─── Compound components ──────────────────────────────────────────────────────

/**
 * A fully structured compound confirmation dialog. Use this pattern when you need media,
 * a summary card, primary actions, and a secondary CTA — all in one dialog.
 *
 * The footer holds two primary actions (Cancel + Send) and a secondary CTA card below them
 * with its own action, giving the user three total action buttons to interact with.
 */
export const CompoundComplex: AlertDialogStory = {
  name: 'Compound / Complex',
  render: () => (
    <AlertDialogRoot>
      <AlertDialogTrigger nativeButton={false} render={<div role="button" />}>
        <Button>Send Invoice</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[90%] gap-6 rounded-2xl sm:w-120">
        <AlertDialogHeader className="gap-1">
          <AlertDialogMedia>
            <img src={illustrationOf('resendInvoiceSrc')} alt="" />
          </AlertDialogMedia>
          <AlertDialogTitle className="text-qb-mist-90 text-center text-lg font-semibold md:text-2xl">
            Send Invoice to Acme Corp?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-qb-mist-70 text-center text-sm">
            Review the details below. Once sent, the client will receive an email notification.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <Card variant="filled" size="md" className="flex flex-col gap-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Invoice</span>
            <span className="font-medium">#INV-2024-099</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Client</span>
            <span className="font-medium">Acme Corp</span>
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
            <span className="text-muted-foreground">Line items</span>
            <span className="font-medium">3 items</span>
          </div>
        </Card>

        <AlertDialogFooter className="flex flex-col gap-3 sm:flex-col">
          <div className="flex gap-2">
            <AlertDialogCancel className="flex-1">Cancel</AlertDialogCancel>
            <AlertDialogAction className="flex-1">Send Invoice</AlertDialogAction>
          </div>
          <Card variant="outlined" size="md" className="flex items-center gap-3">
            <div className="flex-1">
              <p className="text-sm font-medium">Schedule a payment reminder</p>
              <p className="text-muted-foreground text-xs">
                Remind Acme Corp 3 days before the due date
              </p>
            </div>
            <AlertDialogAction variant="outline" size="sm" className="shrink-0">
              Add Reminder
            </AlertDialogAction>
          </Card>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogRoot>
  ),
}

// ─── Hook: useAlertDialog ─────────────────────────────────────────────

/**
 * Use the `useAlertDialog` hook to open a confirmation dialog imperatively from anywhere in
 * your component tree — no trigger child or local open state required.
 *
 * Wrap your app (or the relevant subtree) with `<AlertDialogProvider>` once, then call
 * `confirm(props)` from any child component. It accepts the same props as `<AlertDialog>`.
 *
 * ```tsx
 * // 1. Wrap your tree with the provider
 * <AlertDialogProvider>
 *   <App />
 * </AlertDialogProvider>
 *
 * // 2. Use the hook anywhere inside the tree
 * const { confirm } = useAlertDialog()
 *
 * confirm({
 *   title: 'Delete Invoice?',
 *   content: 'This cannot be undone.',
 *   confirm: { label: 'Delete', variant: 'destructive' },
 *   onConfirm: async () => { await deleteInvoice(id) },
 * })
 * ```
 */
export const HookUseAlertDialog: AlertDialogStory = {
  name: 'Hook / useAlertDialog',
  decorators: [(Story) => <Story />],
  render: () => {
    const { alert } = useAlertDialog()

    return (
      <div className="flex flex-wrap justify-center gap-3">
        <Button
          onClick={() =>
            alert({
              title: 'Submit Invoice?',
              media: <img src={illustrationOf('questionSrc')} alt="" />,
              content:
                'Once submitted, the invoice will be sent to the client and cannot be edited.',
              confirm: { label: 'Submit' },
              cancel: { label: 'Cancel' },
            })
          }
        >
          Submit Invoice
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            alert({
              title: 'Send Payment',
              media: <img src={illustrationOf('uploadTransactionSrc')} alt="" />,
              content:
                'You are about to send $1,200.00 to Acme Corp. This will be charged to your linked bank account.',
              confirm: { label: 'Send Payment' },
              onConfirm: () => new Promise((resolve) => setTimeout(resolve, 2500)),
            })
          }
        >
          Pay Now (Async)
        </Button>
        <Button
          variant="destructive"
          onClick={() =>
            alert({
              title: 'Delete Invoice #INV-2024-042?',
              media: <img src={illustrationOf('deleteSrc')} alt="" />,
              content:
                'This action cannot be undone. The invoice and all associated payment records will be permanently removed.',
              confirm: { label: 'Yes, Delete', variant: 'destructive' },
              cancel: { label: 'Keep Invoice' },
            })
          }
        >
          Delete Invoice
        </Button>
      </div>
    )
  },
}

// ─── Handle with payload ──────────────────────────────────────────────────────

const deleteInvoiceHandle = createAlertDialogHandle<{
  id: string
  client: string
  amount: number
}>()

/**
 * Use `createAlertDialogHandle` to open a confirmation dialog programmatically with a payload.
 * The handle exposes `openWithPayload(payload)` to open the dialog and pass data to it.
 * `<AlertDialog>` uses `handle={handle}` and a function-as-a-child pattern to receive the payload.
 *
 * ```tsx
 * const confirmHandle = createAlertDialogHandle<{ id: string }>()
 *
 * <Button onClick={() => confirmHandle.openWithPayload({ id: '123' })}>
 *   Delete
 * </Button>
 *
 * <AlertDialog handle={confirmHandle}>
 *   {({ payload }) => (
 *     <AlertDialogContent>
 *       <AlertDialogTitle>Delete {payload?.id}?</AlertDialogTitle>
 *       ...
 *     </AlertDialogContent>
 *   )}
 * </AlertDialog>
 * ```
 */
export const CompoundHandleWithPayload: AlertDialogStory = {
  name: 'Compound / Handle with Payload',
  render: () => {
    const invoices = [
      { id: 'INV-001', client: 'Acme Corp', amount: 1250.0 },
      { id: 'INV-002', client: 'Globex Inc', amount: 890.5 },
      { id: 'INV-003', client: 'Initech LLC', amount: 2100.0 },
    ]

    return (
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-wrap justify-center gap-2">
          {invoices.map((invoice) => (
            <Button
              key={invoice.id}
              variant="destructive"
              onClick={() => deleteInvoiceHandle.openWithPayload(invoice)}
            >
              Delete {invoice.id}
            </Button>
          ))}
        </div>

        <AlertDialogRoot handle={deleteInvoiceHandle}>
          {({ payload }) => (
            <AlertDialogContent className="w-[90%] gap-6 rounded-2xl sm:w-150">
              <AlertDialogHeader>
                <AlertDialogMedia>
                  <img src={illustrationOf('deleteSrc')} alt="" />
                </AlertDialogMedia>
                <AlertDialogTitle className="text-qb-mist-90 text-center text-lg font-semibold md:text-2xl">
                  Delete {payload?.id}?
                </AlertDialogTitle>
                <AlertDialogDescription className="text-qb-mist-70 text-center text-sm">
                  You are about to permanently delete the invoice for{' '}
                  <strong>{payload?.client}</strong> worth{' '}
                  <strong>
                    ${payload?.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </strong>
                  . This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="flex flex-col gap-2 sm:flex-row sm:gap-4">
                <AlertDialogCancel className="order-first flex-1">Keep Invoice</AlertDialogCancel>
                <AlertDialogAction className="flex-1" variant="destructive">
                  Yes, Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          )}
        </AlertDialogRoot>
      </div>
    )
  },
}
