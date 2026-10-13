import { Badge, badgeSizes, badgeVariants } from '@/components/ui/badge'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  argTypes: {
    asChild: { control: { disable: true } },
    size: { control: { type: 'radio' }, options: Object.keys(badgeSizes) },
    pill: {
      control: { type: 'boolean' },
    },
    variant: {
      control: { type: 'select' },
      options: Object.keys(badgeVariants),
    },
  },
}
export default meta

type Story = StoryObj<typeof Badge>

export const Default: Story = { args: { children: 'Default' } }
export const Success: Story = {
  args: { children: 'Success', variant: 'success' },
}
export const Secondary: Story = {
  args: { children: 'Waiting', variant: 'secondary' },
}
export const Destructive: Story = {
  args: { children: 'Failed', variant: 'destructive' },
}
export const Warning: Story = {
  args: { children: 'Processing', variant: 'warning' },
}
export const Honeycomb: Story = {
  args: { children: 'Pending', variant: 'honeycomb' },
}
