import { InfoBox } from '@/components/core/infobox'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { toast } from 'sonner'

const meta: Meta<typeof InfoBox> = {
  title: 'Components/InfoBox',
  component: InfoBox,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['default', 'warning', 'success', 'error'],
    },
    size: {
      control: 'radio',
      options: ['sm', 'default'],
    },
  },
}

export default meta

type Story = StoryObj<typeof InfoBox>

export const Default: Story = {
  args: {
    title: 'Payment Success!',
  },
}

export const Error: Story = {
  args: {
    title: 'Payment Failed!',
    variant: 'error',
  },
}

export const Warning: Story = {
  args: {
    title: 'Payment Pending!',
    variant: 'warning',
  },
}

export const Success: Story = {
  args: {
    title: 'Payment Success!',
    variant: 'success',
  },
}

export const Small: Story = {
  args: {
    title: 'Payment Success!',
    size: 'sm',
  },
}

export const Description: Story = {
  args: {
    title: 'Payment Success!',
    description: 'Your payment request is successfully proceed',
  },
}

export const CloseButton: Story = {
  args: {
    title: 'Payment Success!',
    description: 'Your payment request is successfully proceed',
    closable: true,
  },
}

export const Loading: Story = {
  args: {
    title: 'Processing Payment!',
    description: 'Your payment in process',
    closable: true,
    loading: true,
  },
}

export const ActionButton: Story = {
  args: {
    title: 'Payment Success!',
    description: 'Your payment request is successfully proceed',
    closable: true,
    action: {
      label: 'See Invoice',
      onClick: () => toast.success('Clicked'),
    },
  },
}
