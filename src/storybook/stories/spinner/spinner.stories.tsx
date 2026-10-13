import type { Meta, StoryObj } from '@storybook/react-vite'
import { Spinner } from '@/components/ui/spinner'

/**
 * Loader spinner icon component to indicate loading state.

Reference: [https://ui.shadcn.com/docs/components/spinner](https://ui.shadcn.com/docs/components/spinner).
 */
const meta: Meta<typeof Spinner> = {
  title: 'Components/Spinner',
  tags: ['autodocs'],
  component: Spinner,
  argTypes: {
    className: { control: 'text' },
    size: { control: 'range' },
  },
}

export default meta
type Story = StoryObj<typeof Spinner>

export const Default: Story = {
  args: {
    className: 'text-qb-primary',
  },
}

export const Large: Story = {
  args: {
    className: 'text-qb-primary',
    size: 32,
  },
}
