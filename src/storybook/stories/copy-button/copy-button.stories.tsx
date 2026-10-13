import type { Meta, StoryObj } from '@storybook/react-vite'
import { toast } from 'sonner'
import { CopyButton } from '@/components/core/copy-button'
import { buttonSizes, buttonVariants } from '@/components/ui/button'

type Args = React.ComponentProps<typeof CopyButton>

const meta: Meta<Args> = {
  title: 'Components/CopyButton',
  component: CopyButton,
  argTypes: {
    variant: { control: 'select', options: Object.keys(buttonVariants) },
    size: { control: 'radio', options: Object.keys(buttonSizes) },
    pill: { control: 'boolean' },
    value: { control: 'text' },
    showIcon: { control: 'boolean' },
    successIconName: {
      control: 'radio',
      options: ['CheckOutlined', 'CheckCircleOutlined'],
    },
    successText: { control: 'text' },
    resetAfter: { control: { type: 'number', min: 300, step: 100 } },
    className: { control: false },
    onClick: { control: false },
  },
}
export default meta

type Story = StoryObj<Args>

export const Default: Story = {
  args: {
    value: 'QB-123456',
    children: 'Copy',
    variant: 'secondary',
    size: 'default',
    pill: true,
    showIcon: true,
    successIconName: 'CheckCircleOutlined2',
    successText: 'Copied!',
    resetAfter: 1400,
  },
}

export const Primary: Story = {
  args: { ...Default.args, variant: 'default', children: 'Copy code' },
}

export const Ghost: Story = {
  args: { ...Default.args, variant: 'ghost', children: 'Copy link' },
}

export const NoIcon: Story = {
  args: { ...Default.args, showIcon: false, children: 'Copy' },
}

export const IconOnly: Story = {
  args: {
    ...Default.args,
    className: 'flex p-0',
    size: 'icon',
    variant: 'link',
    children: '',
    showIcon: true,
    onClick: () => {
      toast.success('Berhasil Disalin')
    },
  },
}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-end gap-3">
      <CopyButton {...args} size="sm">
        Copy (sm)
      </CopyButton>
      <CopyButton {...args} size="default">
        Copy (default)
      </CopyButton>
      <CopyButton {...args} size="lg">
        Copy (lg)
      </CopyButton>
    </div>
  ),
  args: { ...Default.args },
}

export const NotPill: Story = {
  args: { ...Default.args, pill: false, children: 'Copy (square)' },
}
