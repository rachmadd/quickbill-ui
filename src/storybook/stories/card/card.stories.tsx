import { Card } from '@/components/ui/card'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'filled'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Card>

export const Primary: Story = {
  args: {
    size: 'lg',
    children: (
      <div className="flex flex-col gap-2">
        <h3 className="text-lg leading-none font-semibold tracking-tight">Card Title</h3>
        <p className="text-qb-muted-foreground text-sm">
          This is a description inside the card with large padding.
        </p>
      </div>
    ),
  },
}

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    size: 'lg',
    children: (
      <div className="flex flex-col gap-2">
        <h3 className="text-lg leading-none font-semibold tracking-tight">Outlined Card</h3>
        <p className="text-qb-muted-foreground text-sm">
          This card uses the “outlined” variant with large padding.
        </p>
      </div>
    ),
  },
}

export const Filled: Story = {
  args: {
    variant: 'filled',
    size: 'lg',
    children: (
      <div className="flex flex-col gap-2">
        <h3 className="text-lg leading-none font-semibold tracking-tight">Filled Card</h3>
        <p className="text-qb-muted-foreground text-sm">
          This card uses the “filled” variant with large padding.
        </p>
      </div>
    ),
  },
}
