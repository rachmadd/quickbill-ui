import type { Meta, StoryObj } from '@storybook/react-vite'
import { Skeleton } from '@/components/ui/skeleton'

/**
 * Skeleton component to indicate loading state for content that is being fetched.
 */
const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  tags: ['autodocs'],
  component: Skeleton,
  argTypes: {
    className: { control: 'text' },
    variant: {
      control: { type: 'select' },
      options: ['neutral', 'primary', 'transparent', 'inanimate'],
    },
    shape: {
      control: { type: 'select' },
      options: ['rectangle', 'circle'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Skeleton>

export const Default: Story = {
  args: {
    className: 'w-200',
  },
}

export const Circle: Story = {
  args: {
    className: 'size-20',
    shape: 'circle',
  },
}

export const OnBlueBackground: Story = {
  args: {
    className: 'w-64 h-6',
    variant: 'transparent',
  },
  render: (args) => (
    <div className="bg-qb-blue-80 rounded-md p-6">
      <Skeleton {...args} />
    </div>
  ),
}

export const Inanimate: Story = {
  args: {
    className: 'w-200',
    variant: 'inanimate',
  },
}
