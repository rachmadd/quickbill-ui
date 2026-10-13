/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta, StoryObj } from '@storybook/react-vite'
import { DataTable } from '@/components/ui/data-table'
import { toast } from 'sonner'
import { Icon } from '@/components/icons'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { useState } from 'react'
import type { SortingState } from '@tanstack/react-table'
import { TypographyContent } from '@/components/core/typography'

const mockTableData = [
  {
    invoiceNo: 'INV-001',
    amount: 'Rp 1.000.000',
    invoiceDate: '10 Oct 2025',
    status: 'PAID',
  },
  {
    invoiceNo: 'INV-002',
    amount: 'Rp 1.000.000',
    invoiceDate: '10 Oct 2025',
    status: 'PAID',
  },
  {
    invoiceNo: 'INV-003',
    amount: 'Rp 1.000.000',
    invoiceDate: '10 Oct 2025',
    status: 'PAID',
  },
  {
    invoiceNo: 'INV-004',
    amount: 'Rp 1.000.000',
    invoiceDate: '10 Oct 2025',
    status: 'PAID',
  },
  {
    invoiceNo: 'INV-005',
    amount: 'Rp 1.000.000',
    invoiceDate: '10 Oct 2025',
    status: 'PAID',
  },
  {
    invoiceNo: 'INV-006',
    amount: 'Rp 1.000.000',
    invoiceDate: '10 Oct 2025',
    status: 'PAID',
  },
  {
    invoiceNo: 'INV-007',
    amount: 'Rp 1.000.000',
    invoiceDate: '10 Oct 2025',
    status: 'PAID',
  },
  {
    invoiceNo: 'INV-008',
    amount: 'Rp 1.000.000',
    invoiceDate: '10 Oct 2025',
    status: 'PAID',
  },
  {
    invoiceNo: 'INV-009',
    amount: 'Rp 1.000.000',
    invoiceDate: '10 Oct 2025',
    status: 'PAID',
  },
  {
    invoiceNo: 'INV-010',
    amount: 'Rp 1.000.000',
    invoiceDate: '10 Oct 2025',
    status: 'PAID',
  },
]

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable',
  component: DataTable,
  argTypes: {
    className: { control: 'text' },
    columns: { control: false },
    data: { control: false },
  },
}

export default meta
type Story = StoryObj<typeof DataTable>

export const Default: Story = {
  decorators: [
    (Story) => (
      <div className="bg-qb-blue-15 w-[700px] p-18 lg:w-[900px]">
        <Story />
      </div>
    ),
  ],
  args: {
    columns: [
      {
        accessorKey: 'invoiceNo',
        header: 'Invoice Number',
      },
      {
        accessorKey: 'amount',
        header: 'Amount',
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ getValue }: any) => {
          return <Badge>{getValue()}</Badge>
        },
      },
      {
        accessorKey: 'invoiceDate',
        header: 'Invoice Date',
      },
    ],
    data: mockTableData,
  },
}

export const ActionColumn: Story = {
  decorators: [
    (Story) => (
      <div className="bg-qb-blue-15 w-[700px] p-18 lg:w-[900px]">
        <Story />
      </div>
    ),
  ],
  args: {
    actions: {
      shortcut: [
        {
          key: '1',
          label: 'Approve',
          disabled: (row: any) => row.original.invoiceNo === 'INV-001',
          icon: <Icon name="CheckOutlined" className="text-qb-success-main" />,
          onClick: (row: any) => {
            toast.success('You clicked table action', {
              description: row.original.invoiceNo,
            })
          },
        },
        {
          key: '3',
          label: 'Reject',
          icon: <Icon name="CloseOutlined" className="text-qb-negative-main" />,
          onClick: (row: any) => {
            toast.success('You clicked table action', {
              description: row.original.invoiceNo,
            })
          },
        },
      ],
      dropdown: [
        {
          key: '1',
          label: 'Copy Reference ID',
          icon: <Icon name="CopyOutlined" />,
          onClick: (row: any) => {
            toast.success('You clicked table action', {
              description: row.original.invoiceNo,
            })
          },
        },
      ],
    },
    columns: [
      {
        accessorKey: 'invoiceNo',
        header: 'Invoice Number',
      },
      {
        accessorKey: 'amount',
        header: 'Amount',
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ getValue }: any) => {
          return <Badge>{getValue()}</Badge>
        },
      },
      {
        accessorKey: 'invoiceDate',
        header: 'Invoice Date',
      },
    ],
    data: mockTableData,
  },
}

export const Frameless: Story = {
  decorators: [
    (Story) => (
      <div className="bg-qb-blue-15 w-[700px] p-18 lg:w-[900px]">
        <Story />
      </div>
    ),
  ],
  args: {
    frameless: true,
    columns: [
      {
        accessorKey: 'invoiceNo',
        header: 'Invoice Number',
      },
      {
        accessorKey: 'amount',
        header: 'Amount',
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ getValue }: any) => {
          return <Badge>{getValue()}</Badge>
        },
      },
      {
        accessorKey: 'invoiceDate',
        header: 'Invoice Date',
      },
    ],
    data: mockTableData,
  },
}

export const Scrolling: Story = {
  decorators: [
    (Story) => (
      <div className="bg-qb-blue-15 w-[700px] p-18 lg:w-[900px]">
        <TypographyContent className="mx-auto mb-10 w-2/4 text-center">
          Enable Table Scrolling by Control fixed width and height in ClassName
        </TypographyContent>
        <Story />
      </div>
    ),
  ],
  args: {
    className: 'w-[400px] h-[300px] mx-auto',
    actions: {
      shortcut: [
        {
          key: '1',
          label: 'Approve',
          icon: <Icon name="CheckOutlined" className="text-qb-success-main" />,
          onClick: (row: any) => {
            toast.success('You clicked table action', {
              description: row.original.invoiceNo,
            })
          },
        },
        {
          key: '3',
          label: 'Reject',
          icon: <Icon name="CloseOutlined" className="text-qb-negative-main" />,
          onClick: (row: any) => {
            toast.success('You clicked table action', {
              description: row.original.invoiceNo,
            })
          },
        },
      ],
      dropdown: [
        {
          key: '1',
          label: 'Copy Reference ID',
          icon: <Icon name="CopyOutlined" />,
          onClick: (row: any) => {
            toast.success('You clicked table action', {
              description: row.original.invoiceNo,
            })
          },
        },
      ],
    },
    columns: [
      {
        accessorKey: 'invoiceNo',
        header: 'Invoice Number',
      },
      {
        accessorKey: 'amount',
        header: 'Amount',
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ getValue }: any) => {
          return <Badge>{getValue()}</Badge>
        },
      },
      {
        accessorKey: 'invoiceDate',
        header: 'Invoice Date',
      },
    ],
    data: mockTableData,
  },
}

export const WithCheckbox: Story = {
  decorators: [
    (Story) => (
      <div className="bg-qb-blue-15 w-[700px] p-18 lg:w-[900px]">
        <Story />
      </div>
    ),
  ],
  args: {
    actions: {
      shortcut: [
        {
          key: '1',
          label: 'Approve',
          icon: <Icon name="CheckOutlined" className="text-qb-success-main" />,
          onClick: (row: any) => {
            toast.success('You clicked table action', {
              description: row.original.invoiceNo,
            })
          },
        },
        {
          key: '3',
          label: 'Reject',
          icon: <Icon name="CloseOutlined" className="text-qb-negative-main" />,
          onClick: (row: any) => {
            toast.success('You clicked table action', {
              description: row.original.invoiceNo,
            })
          },
        },
      ],
      dropdown: [
        {
          key: '1',
          label: 'Copy Reference ID',
          icon: <Icon name="CopyOutlined" />,
          onClick: (row: any) => {
            toast.success('You clicked table action', {
              description: row.original.invoiceNo,
            })
          },
        },
      ],
    },
    columns: [
      {
        id: 'select',
        header: () => {
          return (
            <div className="flex items-start">
              <Checkbox indeterminate />
            </div>
          )
        },
        cell: () => {
          return <Checkbox />
        },
      },
      {
        accessorKey: 'invoiceNo',
        header: 'Invoice Number',
      },
      {
        accessorKey: 'amount',
        header: 'Amount',
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ getValue }: any) => {
          return <Badge>{getValue()}</Badge>
        },
      },
      {
        accessorKey: 'invoiceDate',
        header: 'Invoice Date',
      },
    ],
    data: mockTableData,
  },
}

export const Sorting: Story = {
  decorators: [
    (Story) => (
      <div className="bg-qb-blue-15 w-[700px] p-18 lg:w-[900px]">
        <Story />
      </div>
    ),
  ],
  args: {
    actions: {
      dropdown: [
        {
          key: '1',
          label: 'Copy Reference ID',
          icon: <Icon name="CopyOutlined" />,
          onClick: (row: any) => {
            toast.success('You clicked table action', {
              description: row.original.invoiceNo,
            })
          },
        },
      ],
    },
    columns: [
      {
        id: 'select',
        header: () => {
          return (
            <div className="flex items-start">
              <Checkbox indeterminate />
            </div>
          )
        },
        cell: () => {
          return <Checkbox />
        },
      },
      {
        accessorKey: 'invoiceNo',
        header: 'Invoice Number',
        enableSorting: true,
      },
      {
        accessorKey: 'amount',
        header: 'Amount',
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ getValue }: any) => {
          return <Badge>{getValue()}</Badge>
        },
      },
      {
        accessorKey: 'invoiceDate',
        header: 'Invoice Date',
      },
    ],
    data: mockTableData,
  },
  render: (args) => {
    const [params, setParams] = useState<{
      sortingField?: string
      sortingOrder?: string
    }>({
      sortingField: undefined,
      sortingOrder: undefined,
    })

    return (
      <DataTable
        {...args}
        sorting={
          params
            ? ([
                {
                  id: params.sortingField,
                  desc: params.sortingOrder === 'desc',
                },
              ] as SortingState)
            : undefined
        }
        onSortingChange={(state) => {
          setParams((params) => ({
            ...params,
            sortingField: state[0] && state[0].id,
            sortingOrder: state[0] && state[0].desc ? 'desc' : 'asc',
          }))
        }}
      />
    )
  },
}

export const RowHref: Story = {
  decorators: [
    (Story) => (
      <div className="bg-qb-blue-15 w-[700px] p-18 lg:w-[900px]">
        <Story />
      </div>
    ),
  ],
  args: {
    rowHref: (row: any) => `/row/${row.original?.invoiceNo}`,
    actions: {
      shortcut: [
        {
          key: '1',
          label: 'Approve',
          icon: <Icon name="CheckOutlined" className="text-qb-success-main" />,
          onClick: (row: any) => {
            toast.success('You clicked table action', {
              description: row.original.invoiceNo,
            })
          },
        },
        {
          key: '3',
          label: 'Reject',
          icon: <Icon name="CloseOutlined" className="text-qb-negative-main" />,
          onClick: (row: any) => {
            toast.success('You clicked table action', {
              description: row.original.invoiceNo,
            })
          },
        },
      ],
      dropdown: [
        {
          key: '1',
          label: 'Copy Reference ID',
          icon: <Icon name="CopyOutlined" />,
          onClick: (row: any) => {
            toast.success('You clicked table action', {
              description: row.original.invoiceNo,
            })
          },
        },
      ],
    },
    columns: [
      {
        id: 'select',
        header: () => {
          return (
            <div className="flex items-start">
              <Checkbox indeterminate />
            </div>
          )
        },
        cell: () => {
          return <Checkbox />
        },
      },
      {
        accessorKey: 'invoiceNo',
        header: 'Invoice Number',
      },
      {
        accessorKey: 'amount',
        header: 'Amount',
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ getValue }: any) => {
          return <Badge>{getValue()}</Badge>
        },
      },
      {
        accessorKey: 'invoiceDate',
        header: 'Invoice Date',
      },
    ],
    data: mockTableData,
  },
  render: (args) => {
    return <DataTable {...args} />
  },
}

export const StickyAction: Story = {
  decorators: [
    (Story) => (
      <div className="bg-qb-blue-15 w-[700px] p-18 lg:w-[900px]">
        <Story />
      </div>
    ),
  ],
  args: {
    className: 'w-[400px] h-[300px] mx-auto',
    actions: {
      sticky: [
        {
          key: 'edit',
          label: 'Ubah',
          icon: <Icon name="EditOutlined" />,
          onClick: (row: any) => {
            toast.success('You clicked sticky action', {
              description: `Edit ${row.original.invoiceNo}`,
            })
          },
        },
      ],
    },
    columns: [
      {
        accessorKey: 'invoiceNo',
        header: 'Invoice Number',
      },
      {
        accessorKey: 'amount',
        header: 'Amount',
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ getValue }: any) => {
          return <Badge>{getValue()}</Badge>
        },
      },
      {
        accessorKey: 'invoiceDate',
        header: 'Invoice Date',
      },
    ],
    data: mockTableData,
  },
}

export const FixedLayout: Story = {
  decorators: [
    (Story) => (
      <div className="bg-qb-blue-15 w-[700px] p-18 lg:w-[900px]">
        <Story />
      </div>
    ),
  ],
  args: {
    columns: [
      {
        id: 'no',
        header: 'No',
        size: 44,
        cell: ({ row }: any) => row.index + 1,
      },
      {
        accessorKey: 'invoiceNo',
        header: 'Invoice Number',
        size: 200,
      },
      {
        accessorKey: 'amount',
        header: 'Amount',
      },
    ],
    data: mockTableData,
  },
}

export const Empty: Story = {
  decorators: [
    (Story) => (
      <div className="bg-qb-blue-15 w-[700px] p-18 lg:w-[900px]">
        <Story />
      </div>
    ),
  ],
  args: {
    rowHref: (row: any) => `/row/${row.original?.invoiceNo}`,
    actions: {
      shortcut: [
        {
          key: '1',
          label: 'Approve',
          icon: <Icon name="CheckOutlined" className="text-qb-success-main" />,
          onClick: (row: any) => {
            toast.success('You clicked table action', {
              description: row.original.invoiceNo,
            })
          },
        },
        {
          key: '3',
          label: 'Reject',
          icon: <Icon name="CloseOutlined" className="text-qb-negative-main" />,
          onClick: (row: any) => {
            toast.success('You clicked table action', {
              description: row.original.invoiceNo,
            })
          },
        },
      ],
      dropdown: [
        {
          key: '1',
          label: 'Copy Reference ID',
          icon: <Icon name="CopyOutlined" />,
          onClick: (row: any) => {
            toast.success('You clicked table action', {
              description: row.original.invoiceNo,
            })
          },
        },
      ],
    },
    columns: [
      {
        accessorKey: 'invoiceNo',
        header: 'Invoice Number',
      },
      {
        accessorKey: 'amount',
        header: 'Amount',
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ getValue }: any) => {
          return <Badge>{getValue()}</Badge>
        },
      },
      {
        accessorKey: 'invoiceDate',
        header: 'Invoice Date',
      },
    ],
    data: [],
  },
  render: (args) => {
    return <DataTable {...args} />
  },
}

export const OnClickRow: Story = {
  decorators: [
    (Story) => (
      <div className="bg-qb-blue-15 w-[550px] p-18">
        <Story />
      </div>
    ),
  ],
  args: {
    onClickRow: (row: any) => {
      toast.success('You clicked table row', {
        description: row.original.invoiceNo,
      })
    },
    actions: {
      shortcut: [
        {
          key: '1',
          label: 'Approve',
          icon: <Icon name="CheckOutlined" className="text-qb-success-main" />,
          onClick: () => {
            toast.success('You clicked approve action')
          },
        },
      ],
      sticky: [
        {
          key: '1',
          label: 'Ubah',
          icon: <Icon name="EditOutlined" />,
          onClick: () => {
            toast.success('You clicked edit action')
          },
        },
      ],
      dropdown: [
        {
          key: '1',
          label: 'Copy Invoice ID',
          icon: <Icon name="CopyOutlined" />,
          onClick: () => {
            toast.success('You clicked Copy Invoice ID action')
          },
        },
      ],
    },
    columns: [
      {
        accessorKey: 'invoiceNo',
        header: 'Invoice Number',
      },
      {
        accessorKey: 'amount',
        header: 'Amount',
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ getValue }: any) => {
          return <Badge>{getValue()}</Badge>
        },
      },
      {
        accessorKey: 'invoiceDate',
        header: 'Invoice Date',
      },
    ],
    data: mockTableData,
  },
  render: (args) => {
    return <DataTable {...args} />
  },
}

export const ConditionalDisabledThreeDots: Story = {
  decorators: [
    (Story) => (
      <div className="bg-qb-blue-15 w-[700px] p-18 lg:w-[900px]">
        <Story />
      </div>
    ),
  ],
  args: {
    actions: {
      dropdown: [
        {
          key: '1',
          label: 'Copy Reference ID',
          icon: <Icon name="CopyOutlined" />,
          onClick: (row: any) => {
            toast.success('You clicked table action', {
              description: row.original.invoiceNo,
            })
          },
        },
      ],
      disableDropdown: (row: any) =>
        row.original.invoiceNo === 'INV-001' || row.original.invoiceNo === 'INV-003',
    },
    columns: [
      {
        accessorKey: 'invoiceNo',
        header: 'Invoice Number',
      },
      {
        accessorKey: 'amount',
        header: 'Amount',
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ getValue }: any) => {
          return <Badge>{getValue()}</Badge>
        },
      },
      {
        accessorKey: 'invoiceDate',
        header: 'Invoice Date',
      },
    ],
    data: mockTableData,
  },
}
