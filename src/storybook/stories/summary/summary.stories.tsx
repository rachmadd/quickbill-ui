import type { Meta, StoryObj } from '@storybook/react-vite'
import { Summary } from '@/components/core/summary'

const meta: Meta<typeof Summary> = {
  title: 'Components/Summary',
  component: Summary,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'filled'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Summary>

export const Default: Story = {
  args: {
    variant: 'default',
    items: [
      {
        key: 'payment_method',
        label: 'Metode Bayar',
        value: 'Kartu Kredit',
      },
      {
        key: 'ref_id',
        label: 'Reference ID',
        value: '3450192838321',
      },
      {
        key: 'subtotal',
        label: 'Subtotal',
        value: 'Rp190.000',
      },
      {
        key: 'admin_fee',
        label: 'Admin Fee',
        value: 'Rp2000',
      },
    ],
  },
}

export const Filled: Story = {
  args: {
    variant: 'filled',
    items: [
      {
        key: 'payment_method',
        label: 'Metode Bayar',
        value: 'Kartu Kredit',
      },
      {
        key: 'ref_id',
        label: 'Reference ID',
        value: '3450192838321',
      },
      {
        key: 'subtotal',
        label: 'Subtotal',
        value: 'Rp190.000',
      },
      {
        key: 'admin_fee',
        label: 'Admin Fee',
        value: 'Rp2000',
      },
    ],
  },
}

export const Divider: Story = {
  args: {
    divider: true,
    items: [
      {
        key: 'payment_method',
        label: 'Metode Bayar',
        value: 'Kartu Kredit',
      },
      {
        key: 'ref_id',
        label: 'Reference ID',
        value: '3450192838321',
      },
      {
        key: 'subtotal',
        label: 'Subtotal',
        value: 'Rp190.000',
      },
      {
        key: 'admin_fee',
        label: 'Admin Fee',
        value: 'Rp2000',
      },
    ],
  },
}
