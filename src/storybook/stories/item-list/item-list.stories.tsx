import { useState } from 'react'
import { Flex } from '@/components/core/flex'
import { ItemList } from '@/components/core/item-list'
import { TypographyContent } from '@/components/core/typography'
import { Icon } from '@/components/icons'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Dropdown } from '@/components/ui/composed/dropdown'

const meta: Meta = {
  title: 'Components/ItemList',
  tags: ['autodocs'],
  component: ItemList,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A generic, type-safe list component that renders any array of objects with a custom render function.
The component infers the item type from the \`items\` array, giving the \`render\` callback full type safety.

---

## Basic usage

\`\`\`tsx
type Invoice = { id: string; client: string; amount: number }

<ItemList
  items={invoices}
  render={(invoice) => (
    <span>{invoice.client} — {invoice.amount}</span>
  )}
/>
\`\`\`

## Custom key

By default \`getKey\` reads \`item.id\`. Override it when your item uses a different identifier:

\`\`\`tsx
<ItemList
  items={invoices}
  getKey={(item) => item.invoiceNumber}
  render={(item) => <span>{item.client}</span>}
/>
\`\`\`

## Anatomy

| Prop | Type | Default | Description |
|---|---|---|---|
| \`items\` | \`T[]\` | — | Array of any objects — type is inferred |
| \`render\` | \`(item: T) => ReactNode\` | — | Render function called per item |
| \`getKey\` | \`(item: T) => React.Key\` | \`item.id\` | Key extractor for each row |
| \`className\` | \`string\` | — | Class applied to the container |
| \`divider\` | \`boolean\` | \`true\` | Show horizontal dividers between items |
| \`infiniteScroll\` | \`ItemListInfiniteScroll\` | — | Infinite scroll config — triggers loader when \`hasNextPage\` is true |
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof meta>

type Invoice = {
  id: string
  client: string
  invoiceNumber: string
  amount: string
  status: 'unpaid' | 'paid' | 'overdue'
}

const invoices: Invoice[] = [
  {
    id: '1',
    client: 'PT CMK Bakery',
    invoiceNumber: 'INV-001',
    amount: 'Rp190.000',
    status: 'unpaid',
  },
  {
    id: '2',
    client: 'PT Super',
    invoiceNumber: 'INV-002',
    amount: 'Rp190.000.000',
    status: 'paid',
  },
  {
    id: '3',
    client: 'CV Mitra Jaya',
    invoiceNumber: 'INV-003',
    amount: 'Rp75.000.000',
    status: 'overdue',
  },
]

const statusBadge: Record<Invoice['status'], React.ReactElement> = {
  unpaid: <Badge variant="warning">Belum Lunas</Badge>,
  paid: <Badge variant="success">Lunas</Badge>,
  overdue: <Badge variant="destructive">Terlewat</Badge>,
}

/**
 * The default usage. Pass `items` and a `render` function — the component infers the item type automatically.
 * Dividers are enabled by default.
 *
 * ```tsx
 * <ItemList
 *   items={invoices}
 *   render={(invoice) => <span>{invoice.client}</span>}
 * />
 * ```
 */
export const Default: Story = {
  render: () => (
    <ItemList
      items={invoices}
      render={(invoice) => (
        <Flex direction="col" gap="2">
          <div>{statusBadge[invoice.status]}</div>
          <Flex justifyContent="space-between" alignItems="center">
            <TypographyContent strong>{invoice.client}</TypographyContent>
            <Dropdown items={[{ label: 'Hapus Invoice' }]}>
              <Button size="icon-sm" variant="ghost" pill={false}>
                <Icon name="ThreeDotsOutlined" />
              </Button>
            </Dropdown>
          </Flex>
          <Flex justifyContent="space-between" alignItems="center">
            <TypographyContent>{invoice.invoiceNumber}</TypographyContent>
            <TypographyContent>{invoice.amount}</TypographyContent>
          </Flex>
        </Flex>
      )}
    />
  ),
}

/**
 * Set `divider={false}` to remove the horizontal lines between items.
 * Useful when items already have card-like backgrounds or spacing to visually separate them.
 *
 * ```tsx
 * <ItemList items={invoices} divider={false} render={(item) => <span>{item.client}</span>} />
 * ```
 */
export const NoDivider: Story = {
  render: () => (
    <ItemList
      items={invoices}
      divider={false}
      render={(invoice) => (
        <Flex justifyContent="space-between" alignItems="center">
          <Flex direction="col" gap="1">
            <TypographyContent strong>{invoice.client}</TypographyContent>
            <TypographyContent>{invoice.invoiceNumber}</TypographyContent>
          </Flex>
          {statusBadge[invoice.status]}
        </Flex>
      )}
    />
  ),
}

/**
 * Override `getKey` when your item does not have an `id` field or uses a different identifier.
 * Here the list uses `invoiceNumber` as the key.
 *
 * ```tsx
 * <ItemList
 *   items={invoices}
 *   getKey={(item) => item.invoiceNumber}
 *   render={(item) => <span>{item.client}</span>}
 * />
 * ```
 */
export const CustomKey: Story = {
  render: () => (
    <ItemList
      items={invoices}
      getKey={(item) => item.invoiceNumber}
      render={(invoice) => (
        <Flex justifyContent="space-between" alignItems="center">
          <TypographyContent strong>{invoice.client}</TypographyContent>
          <TypographyContent>{invoice.amount}</TypographyContent>
        </Flex>
      )}
    />
  ),
}

/**
 * Pass `infiniteScroll={{ hasNextPage, isLoading, onLoadMore }}` to append a scroll-triggered
 * loader after the last item. `onLoadMore` fires when the loader enters the viewport.
 * Set `hasNextPage` to `false` once all data is loaded to hide the loader.
 *
 * ```tsx
 * <ItemList
 *   items={items}
 *   render={(item) => <span>{item.client}</span>}
 *   infiniteScroll={{
 *     hasNextPage: true,
 *     isLoading: false,
 *     onLoadMore: () => fetchNextPage(),
 *   }}
 * />
 * ```
 */
export const WithInfiniteScroll: Story = {
  render: () => {
    const PAGE_SIZE = 3

    const allInvoices: Invoice[] = [
      ...invoices,
      {
        id: '4',
        client: 'PT Nusa Indah',
        invoiceNumber: 'INV-004',
        amount: 'Rp50.000.000',
        status: 'paid',
      },
      {
        id: '5',
        client: 'CV Bintang Mas',
        invoiceNumber: 'INV-005',
        amount: 'Rp30.000.000',
        status: 'unpaid',
      },
      {
        id: '6',
        client: 'PT Karya Agung',
        invoiceNumber: 'INV-006',
        amount: 'Rp120.000.000',
        status: 'overdue',
      },
      {
        id: '7',
        client: 'PT Delta Jaya',
        invoiceNumber: 'INV-007',
        amount: 'Rp88.000.000',
        status: 'paid',
      },
    ]

    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
    const [isLoading, setIsLoading] = useState(false)

    const visibleItems = allInvoices.slice(0, visibleCount)
    const hasNextPage = visibleCount < allInvoices.length

    const handleLoadMore = () => {
      setIsLoading(true)
      setTimeout(() => {
        setVisibleCount((c) => c + PAGE_SIZE)
        setIsLoading(false)
      }, 1200)
    }

    return (
      <ItemList
        items={visibleItems}
        render={(invoice) => (
          <Flex justifyContent="space-between" alignItems="center">
            <Flex direction="col" gap="1">
              <TypographyContent strong>{invoice.client}</TypographyContent>
              <TypographyContent>{invoice.invoiceNumber}</TypographyContent>
            </Flex>
            <Flex direction="col" alignItems="end" gap="1">
              <TypographyContent>{invoice.amount}</TypographyContent>
              {statusBadge[invoice.status]}
            </Flex>
          </Flex>
        )}
        infiniteScroll={{
          hasNextPage,
          isLoading,
          onLoadMore: handleLoadMore,
        }}
      />
    )
  },
}
