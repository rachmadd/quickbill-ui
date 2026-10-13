import { Label } from '@/components/ui/label'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof Label> = {
  title: 'Components/Label',
  component: Label,
}

export default meta
type Story = StoryObj<typeof Label>

export const Default: Story = {
  args: {
    children: 'First Name',
  },
}

export const Required: Story = {
  args: {
    children: 'First Name',
    required: true,
  },
}
