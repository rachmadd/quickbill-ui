import { useRef, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useSnapshot } from '@/components/hooks/use-snapshot/use-snapshot'
import { SnapshotProvider } from '@/components/hooks/use-snapshot/context'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Spinner } from '@/components/ui/spinner'

const meta: Meta = {
  title: 'Hooks/useSnapshot',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A hook for capturing HTML content and downloading it as a **PDF** or **PNG** file.

Wrap the relevant subtree with \`<SnapshotProvider>\`, then call \`download\` or \`downloadRef\`
from any child component. Two methods are available:

| Method | When to use |
|---|---|
| \`download(component, options)\` | Render a React component off-screen and capture it |
| \`downloadRef(ref, options)\` | Capture a DOM element already in the tree via a ref |

\`\`\`tsx
import { SnapshotProvider, useSnapshot } from 'quickbill-ui'

// 1. Wrap with the provider
<SnapshotProvider>
  <App />
</SnapshotProvider>

// 2. Use the hook in any child
const { download, downloadRef, isDownloading } = useSnapshot()

// Download a React component
await download(<InvoiceCard />, { fileName: 'invoice', type: 'pdf' })

// Download a DOM ref
const ref = useRef<HTMLDivElement>(null)
await downloadRef(ref, { fileName: 'invoice', type: 'png' })
\`\`\`

---

## API

### \`download(component, options)\`

Renders \`component\` off-screen (outside the viewport), captures it with \`html2canvas\`, then
downloads the result. The component is unmounted after capture.

### \`downloadRef(ref, options)\`

Captures the DOM element pointed to by \`ref\` using \`html2canvas\`, then downloads the result.
The element must be mounted and visible (not \`display: none\`).

### Options

| Key | Type | Description |
|---|---|---|
| \`fileName\` | \`string\` | File name without extension |
| \`type\` | \`'pdf' \\| 'png'\` | Output file format |

### \`isDownloading\`

\`boolean\` — \`true\` while the capture and file generation are in progress. Use this to show
a loading indicator and disable the trigger button.
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj

// ---------------------------------------------------------------------------
// Shared sample content used as the downloadable subject
// ---------------------------------------------------------------------------

const InvoiceCard = () => (
  <div
    style={{
      width: 400,
      padding: 32,
      backgroundColor: '#ffffff',
      fontFamily: 'sans-serif',
      border: '1px solid #e5e7eb',
      borderRadius: 12,
    }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
      <div>
        <p style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>Invoice</p>
        <p style={{ margin: 0, fontSize: 13, color: '#6b7280' }}>#INV-2025-042</p>
      </div>
      <div
        style={{
          background: '#eff6ff',
          color: '#1d4ed8',
          borderRadius: 9999,
          padding: '4px 12px',
          fontSize: 12,
          fontWeight: 600,
          alignSelf: 'flex-start',
        }}
      >
        Pending
      </div>
    </div>

    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
      <div>
        <p style={{ margin: 0, fontSize: 11, color: '#6b7280', textTransform: 'uppercase' }}>
          From
        </p>
        <p style={{ margin: 0, fontSize: 13, fontWeight: 600 }}>Acme Inc.</p>
        <p style={{ margin: 0, fontSize: 12, color: '#6b7280' }}>hello@example.com</p>
      </div>
      <div style={{ textAlign: 'right' }}>
        <p style={{ margin: 0, fontSize: 11, color: '#6b7280', textTransform: 'uppercase' }}>To</p>
        <p style={{ margin: 0, fontSize: 13, fontWeight: 600 }}>Acme Corp</p>
        <p style={{ margin: 0, fontSize: 12, color: '#6b7280' }}>billing@acme.com</p>
      </div>
    </div>

    <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 24 }}>
      <thead>
        <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
          <th style={{ textAlign: 'left', padding: '6px 0', fontSize: 11, color: '#6b7280' }}>
            Description
          </th>
          <th style={{ textAlign: 'right', padding: '6px 0', fontSize: 11, color: '#6b7280' }}>
            Amount
          </th>
        </tr>
      </thead>
      <tbody>
        {[
          { desc: 'Web Development (40h)', amount: '$4,000.00' },
          { desc: 'UI Design (12h)', amount: '$1,200.00' },
          { desc: 'Project Management', amount: '$600.00' },
        ].map((row) => (
          <tr key={row.desc} style={{ borderBottom: '1px solid #f3f4f6' }}>
            <td style={{ padding: '8px 0', fontSize: 13 }}>{row.desc}</td>
            <td style={{ padding: '8px 0', fontSize: 13, textAlign: 'right' }}>{row.amount}</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td style={{ padding: '12px 0', fontSize: 14, fontWeight: 700 }}>Total</td>
          <td style={{ padding: '12px 0', fontSize: 14, fontWeight: 700, textAlign: 'right' }}>
            $5,800.00
          </td>
        </tr>
      </tfoot>
    </table>

    <p style={{ margin: 0, fontSize: 11, color: '#9ca3af', textAlign: 'center' }}>
      Due by 1 June 2025 · Net 30
    </p>
  </div>
)

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

/**
 * Use `download(component, options)` to render a React component off-screen,
 * capture it as an image, and download the result as a PDF.
 *
 * The component does not need to be in the visible DOM — `SnapshotProvider`
 * mounts it outside the viewport automatically.
 *
 * ```tsx
 * const { download, isDownloading } = useSnapshot()
 *
 * await download(<InvoiceCard />, { fileName: 'invoice-042', type: 'pdf' })
 * ```
 */
export const DownloadComponentAsPdf: Story = {
  name: 'download() — as PDF',
  decorators: [
    (Story) => (
      <SnapshotProvider>
        <Story />
      </SnapshotProvider>
    ),
  ],
  render: () => {
    const { download, isDownloading } = useSnapshot()

    return (
      <div className="flex flex-col items-center gap-4">
        <InvoiceCard />
        <Button
          disabled={isDownloading}
          onClick={() => download(<InvoiceCard />, { fileName: 'invoice-042', type: 'pdf' })}
        >
          {isDownloading ? <Spinner className="text-white" /> : 'Download as PDF'}
        </Button>
      </div>
    )
  },
}

/**
 * Use `type: 'png'` in the options to download the captured component as a PNG image
 * instead of a PDF document.
 *
 * ```tsx
 * await download(<InvoiceCard />, { fileName: 'invoice-042', type: 'png' })
 * ```
 */
export const DownloadComponentAsPng: Story = {
  name: 'download() — as PNG',
  decorators: [
    (Story) => (
      <SnapshotProvider>
        <Story />
      </SnapshotProvider>
    ),
  ],
  render: () => {
    const { download, isDownloading } = useSnapshot()

    return (
      <div className="flex flex-col items-center gap-4">
        <InvoiceCard />
        <Button
          variant="outline"
          disabled={isDownloading}
          onClick={() => download(<InvoiceCard />, { fileName: 'invoice-042', type: 'png' })}
        >
          {isDownloading ? <Spinner /> : 'Download as PNG'}
        </Button>
      </div>
    )
  },
}

/**
 * Use `downloadRef(ref, options)` to capture a DOM element already mounted in the tree.
 * Attach a `ref` to the element you want to capture, then pass it to `downloadRef`.
 *
 * ```tsx
 * const ref = useRef<HTMLDivElement>(null)
 * const { downloadRef, isDownloading } = useSnapshot()
 *
 * <div ref={ref}>
 *   <InvoiceCard />
 * </div>
 * <Button onClick={() => downloadRef(ref, { fileName: 'invoice', type: 'pdf' })}>
 *   Download
 * </Button>
 * ```
 */
export const DownloadRef: Story = {
  name: 'downloadRef() — capture a DOM ref',
  decorators: [
    (Story) => (
      <SnapshotProvider>
        <Story />
      </SnapshotProvider>
    ),
  ],
  render: () => {
    const ref = useRef<HTMLDivElement>(null)
    const { downloadRef, isDownloading } = useSnapshot()

    return (
      <div className="flex flex-col items-center gap-4">
        <div ref={ref}>
          <InvoiceCard />
        </div>
        <div className="flex gap-3">
          <Button
            disabled={isDownloading}
            onClick={() => downloadRef(ref, { fileName: 'invoice-ref', type: 'pdf' })}
          >
            {isDownloading ? <Spinner className="text-white" /> : 'Download PDF'}
          </Button>
          <Button
            variant="outline"
            disabled={isDownloading}
            onClick={() => downloadRef(ref, { fileName: 'invoice-ref', type: 'png' })}
          >
            {isDownloading ? <Spinner /> : 'Download PNG'}
          </Button>
        </div>
      </div>
    )
  },
}

/**
 * `isDownloading` is `true` while the capture and file generation are in progress.
 * Use it to show a loading state and prevent double-clicks.
 *
 * ```tsx
 * const { download, isDownloading } = useSnapshot()
 *
 * <Button disabled={isDownloading}>
 *   {isDownloading ? <Spinner /> : 'Download'}
 * </Button>
 * ```
 */
export const IsDownloadingState: Story = {
  name: 'isDownloading — loading state',
  decorators: [
    (Story) => (
      <SnapshotProvider>
        <Story />
      </SnapshotProvider>
    ),
  ],
  render: () => {
    const { download, isDownloading } = useSnapshot()
    const [downloaded, setDownloaded] = useState(false)

    return (
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm">
          <span className="text-gray-600">isDownloading:</span>
          <Badge variant={isDownloading ? 'warning' : 'secondary'}>{String(isDownloading)}</Badge>
        </div>
        <Button
          disabled={isDownloading}
          onClick={() =>
            download(<InvoiceCard />, { fileName: 'invoice-loading', type: 'pdf' }).then(() =>
              setDownloaded(true),
            )
          }
        >
          {isDownloading ? (
            <span className="flex items-center gap-2">
              <Spinner className="text-white" /> Generating PDF…
            </span>
          ) : (
            'Download PDF'
          )}
        </Button>
        {downloaded && !isDownloading && <Badge variant="success">Downloaded successfully</Badge>}
      </div>
    )
  },
}
