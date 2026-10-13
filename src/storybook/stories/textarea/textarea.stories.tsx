import { TextArea } from '@/components/ui/textarea'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof TextArea> = {
  title: 'Components/Fields/TextArea',
  id: 'components-textareawithcounter',
  component: TextArea,
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: { type: 'boolean' },
    },
    placeholder: {
      control: 'text',
    },
    variant: {
      control: 'select',
      options: ['default', 'ghost'],
    },
    showCounter: {
      control: { type: 'boolean' },
    },
    maxLength: {
      control: { type: 'number' },
    },
  },
}

export default meta
type Story = StoryObj<typeof TextArea>

export const Default: Story = {
  args: {
    disabled: false,
    placeholder: 'Enter your message...',
  },
}

export const Ghost: Story = {
  args: {
    disabled: false,
    variant: 'ghost',
    placeholder: 'Enter your message...',
  },
}

export const WithMaxLength: Story = {
  args: {
    disabled: false,
    placeholder: 'Enter your message (max 100 characters)...',
    maxLength: 100,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled textarea',
    maxLength: 100,
  },
}

export const Invalid: Story = {
  args: {
    ['aria-invalid']: true,
    placeholder: 'Disabled textarea',
    maxLength: 100,
  },
}
