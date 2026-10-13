import { DataEntry } from '@/components/ui/custom/data-entry'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof DataEntry> = {
  title: 'Components/DataEntry',
  component: DataEntry,
  argTypes: {
    label: { control: { type: 'text' } },
    value: { control: { type: 'object' } },
    orientation: { control: { type: 'radio' }, options: ['vertical', 'horizontal'] },
    showPlaceholder: { control: { type: 'boolean' }, description: 'Show "-" when value is empty' },
    className: { control: { type: 'text' }, description: 'Tailwind class for the root container' },
    classNames: {
      control: { type: 'object' },
      description: 'Tailwind classes for inner elements (label, value)',
    },
  },
  render: (args) => <DataEntry {...args} />,
}

export default meta

type Story = StoryObj<typeof meta>

export const Customizable: Story = {
  args: {
    label: '',
    value: '',
    orientation: 'vertical',
    showPlaceholder: true,
    className: '',
    classNames: {
      label: '',
      value: '',
    },
  },
}

export const Primary: Story = {
  args: {
    label: 'Email Address',
    value: 'johndoe@example.com',
    orientation: 'vertical',
  },
}

export const Horizontal: Story = {
  args: {
    label: 'Status',
    value: 'Active',
    orientation: 'horizontal',
  },
}

export const EmptyValue: Story = {
  args: {
    label: 'Phone Number',
    value: undefined,
  },
}

export const TitleOnly: Story = {
  args: {
    label: 'Informasi Utama',
    showPlaceholder: false,
    classNames: { label: 'text-md font-semibold text-qb-mist-100' },
  },
}

export const MultipleValues: Story = {
  args: {
    label: 'Contact Person',
    value: ['John Doe', '081234567890', 'john@example.com'],
  },
}

export const EmptyArray: Story = {
  args: {
    label: 'Bank Accounts',
    value: [],
  },
}

export const EmptyArrayNoPlaceholder: Story = {
  args: {
    label: 'Bank Accounts',
    value: [],
    showPlaceholder: false,
  },
}

export const BankAccount: Story = {
  args: {
    label: 'BCA',
    value: ['John Doe', '1234567890'],
  },
}

export const WithCustomClassNames: Story = {
  args: {
    label: 'Amount Due',
    value: '$1,200.00',
    orientation: 'vertical',
    classNames: {
      label: 'text-blue-500 font-semibold',
      value: 'text-red-600 text-lg',
    },
  },
}

export const CustomRenderValue: Story = {
  args: {
    label: 'Account Status',
    value: 'verified',
    renderValue: (val) => (
      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
        {val}
      </span>
    ),
  },
}

export const MixedArrayValues: Story = {
  args: {
    label: 'Payment Details',
    value: ['BCA - 1234567890', 'a.n. John Doe'],
  },
}
