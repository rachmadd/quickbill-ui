import type { Meta, StoryObj } from '@storybook/react-vite'
import { Icon } from '@/components/icons'
import { BreadCrumb } from '@/components/ui/breadcrumb'

const meta: Meta<typeof BreadCrumb> = {
  title: 'Components/Breadcrumb',
  component: BreadCrumb,
  argTypes: {
    items: {
      description: 'Array of breadcrumb items with label and href',
    },
    separator: {
      description: 'Custom separator between breadcrumb items',
    },
  },
}

export default meta
type Story = StoryObj<typeof BreadCrumb>

export const Primary: Story = {
  args: {
    items: [
      { label: 'Pembayaran Masuk', href: '/components' },
      { label: 'Detail Pembayaran Masuk' },
    ],
    separator: <Icon className="text-qb-blue-70" name="ChevronRightOutlined" size={24} />,
  },
}

export const CustomSeparator: Story = {
  args: {
    items: [
      { label: 'Pembayaran Keluar', href: '/components' },
      { label: 'Detail Pembayaran Keluar' },
    ],
    separator: <Icon className="text-qb-blue-70" name="TriangleRightOutlined" size={24} />,
  },
}
