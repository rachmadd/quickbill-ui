import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useAlertDialog } from '@/components/hooks/use-alert-dialog'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/core/typography'
import { Badge } from '@/components/ui/badge'

const meta: Meta = {
  title: 'Hooks/useAlertDialog',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
An imperative hook for triggering confirmation dialogs from anywhere in the component tree — no trigger element or local open state required.

Wrap your app once with \`<AlertDialogProvider>\`, then call \`alert(props)\` from any child component.

\`\`\`tsx
// 1. Wrap your app (done once at the root)
import { AlertDialogProvider } from 'quickbill-ui'

<AlertDialogProvider>
  <App />
</AlertDialogProvider>

// 2. Use the hook anywhere inside the tree
import { useAlertDialog } from 'quickbill-ui'

const { alert } = useAlertDialog()

alert({
  title: 'Delete Invoice?',
  content: 'This action cannot be undone.',
  confirm: { label: 'Delete', variant: 'destructive' },
  onConfirm: async () => { await deleteInvoice(id) },
})
\`\`\`

---

## API

| Prop | Type | Default | Description |
|---|---|---|---|
| \`title\` | \`string \\| { label: string; className?: string }\` | — | Dialog title |
| \`content\` | \`string \\| ReactNode \\| { label: string; className?: string }\` | — | Dialog body |
| \`confirm\` | \`{ label?: string; variant?: ButtonVariant }\` | \`{ label: 'OK' }\` | Confirm button config |
| \`cancel\` | \`{ label?: string; variant?: ButtonVariant }\` | \`{ label: 'Cancel' }\` | Cancel button config |
| \`showCancel\` | \`boolean\` | \`true\` | Whether to show the cancel button |
| \`onConfirm\` | \`() => void \\| Promise<void>\` | — | Called on confirm; spinner shown while pending |
| \`onCancel\` | \`() => void\` | — | Called on cancel |
| \`media\` | \`ReactNode\` | — | Image or illustration above the title |
| \`prefixContent\` | \`ReactNode\` | — | Content inserted above the description |
| \`suffixContent\` | \`ReactNode\` | — | Content inserted below the description |
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj

/**
 * The most common usage: a simple info alert with a title and description.
 * The dialog closes automatically when the user clicks Confirm or Cancel.
 *
 * ```tsx
 * const { alert } = useAlertDialog()
 *
 * alert({
 *   title: 'Session Expired',
 *   content: 'Your session has expired. Please log in again.',
 * })
 * ```
 */
export const Basic: Story = {
  render: () => {
    const { alert } = useAlertDialog()

    return (
      <Button
        onClick={() =>
          alert({
            title: 'Session Expired',
            content: 'Your session has expired. Please log in again to continue.',
            confirm: { label: 'Log In Again' },
          })
        }
      >
        Show Alert
      </Button>
    )
  },
}

/**
 * Pass an async function to `onConfirm` to show a loading spinner on the confirm button
 * while the promise resolves. The dialog closes automatically once it settles.
 *
 * ```tsx
 * alert({
 *   title: 'Send Payment',
 *   content: 'You are about to send $1,200.00 to Acme Corp.',
 *   confirm: { label: 'Send Payment' },
 *   onConfirm: async () => {
 *     await sendPayment()
 *   },
 * })
 * ```
 */
export const AsyncConfirm: Story = {
  name: 'Async Confirm (Loading)',
  render: () => {
    const { alert } = useAlertDialog()

    return (
      <Button
        onClick={() =>
          alert({
            title: 'Send Payment',
            content:
              'You are about to send $1,200.00 to Acme Corp. This will be charged to your linked bank account.',
            confirm: { label: 'Send Payment' },
            onConfirm: () => new Promise((resolve) => setTimeout(resolve, 2500)),
          })
        }
      >
        Pay Now
      </Button>
    )
  },
}

/**
 * Use `confirm: { variant: 'destructive' }` for irreversible or dangerous actions.
 * Pair with a `cancel` label that makes the safe path explicit.
 *
 * ```tsx
 * alert({
 *   title: 'Delete Invoice #INV-2024-042?',
 *   content: 'This action cannot be undone.',
 *   confirm: { label: 'Yes, Delete', variant: 'destructive' },
 *   cancel: { label: 'Keep Invoice' },
 * })
 * ```
 */
export const Destructive: Story = {
  render: () => {
    const { alert } = useAlertDialog()

    return (
      <Button
        variant="destructive"
        onClick={() =>
          alert({
            title: 'Delete Invoice #INV-2024-042?',
            content:
              'This action cannot be undone. The invoice and all associated payment records will be permanently removed.',
            confirm: { label: 'Yes, Delete', variant: 'destructive' },
            cancel: { label: 'Keep Invoice' },
          })
        }
      >
        Delete Invoice
      </Button>
    )
  },
}

/**
 * Set `showCancel={false}` for acknowledgement-only dialogs where the user simply
 * needs to confirm they have read the information.
 *
 * ```tsx
 * alert({
 *   title: 'Payment Received',
 *   content: 'We have received your payment of $2,400.00.',
 *   confirm: { label: 'Got it' },
 *   showCancel: false,
 * })
 * ```
 */
export const NoCancel: Story = {
  render: () => {
    const { alert } = useAlertDialog()

    return (
      <Button
        variant="outline"
        onClick={() =>
          alert({
            title: 'Payment Received',
            content:
              'We have received your payment of $2,400.00. A receipt has been sent to your email.',
            confirm: { label: 'Got it' },
            showCancel: false,
          })
        }
      >
        View Payment Notice
      </Button>
    )
  },
}

/**
 * Use `onConfirm` and `onCancel` callbacks to react to the user's choice.
 * Both callbacks are called before the dialog closes.
 *
 * ```tsx
 * alert({
 *   title: 'Discard Changes?',
 *   content: 'Your unsaved changes will be lost.',
 *   confirm: { label: 'Discard' },
 *   onConfirm: () => router.back(),
 *   onCancel: () => console.log('User kept editing'),
 * })
 * ```
 */
export const WithCallbacks: Story = {
  render: () => {
    const { alert } = useAlertDialog()
    const [result, setResult] = useState<'confirmed' | 'cancelled' | null>(null)

    return (
      <div className="flex flex-col items-center gap-4">
        <Button
          variant="outline"
          onClick={() =>
            alert({
              title: 'Discard Changes?',
              content: 'Your unsaved changes will be lost if you leave this page.',
              confirm: { label: 'Discard' },
              cancel: { label: 'Keep Editing' },
              onConfirm: () => setResult('confirmed'),
              onCancel: () => setResult('cancelled'),
            })
          }
        >
          Discard Changes
        </Button>
        {result && (
          <Badge variant={result === 'confirmed' ? 'destructive' : 'secondary'}>
            {result === 'confirmed' ? 'Confirmed — changes discarded' : 'Cancelled — kept editing'}
          </Badge>
        )}
      </div>
    )
  },
}

/**
 * Pass `title` as `{ label, className }` to apply custom typography.
 * Use `prefixContent` and `suffixContent` to inject elements above or below the description.
 *
 * ```tsx
 * alert({
 *   title: { label: 'Payment Overdue', className: 'text-qb-destructive' },
 *   prefixContent: <Badge variant="destructive">30 days past due</Badge>,
 *   content: 'This client has an overdue balance of $3,450.00.',
 * })
 * ```
 */
export const CustomContent: Story = {
  render: () => {
    const { alert } = useAlertDialog()

    return (
      <Button
        variant="destructive"
        onClick={() =>
          alert({
            title: { label: 'Payment Overdue', className: 'text-qb-destructive' },
            prefixContent: (
              <Typography className="text-qb-destructive text-center text-sm font-medium">
                30 days past due
              </Typography>
            ),
            content:
              'This client has an overdue balance of $3,450.00. Do you want to send a payment reminder?',
            confirm: { label: 'Send Reminder' },
            cancel: { label: 'Dismiss' },
          })
        }
      >
        Send Payment Reminder
      </Button>
    )
  },
}

/**
 * Multiple buttons triggering different alert configurations from the same component.
 * This illustrates the main benefit of the hook pattern: any component can open
 * any alert without prop-drilling a handler or an `open` state.
 */
export const MultipleAlerts: Story = {
  render: () => {
    const { alert } = useAlertDialog()

    return (
      <div className="flex flex-wrap justify-center gap-3">
        <Button
          onClick={() =>
            alert({
              title: 'Submit Invoice?',
              content:
                'Once submitted, the invoice will be sent to the client and cannot be edited.',
              confirm: { label: 'Submit' },
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
