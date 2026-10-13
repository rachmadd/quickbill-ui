import type { Meta, StoryObj } from '@storybook/react-vite'
import { Divider } from '@/components/ui/divider'

const meta: Meta<typeof Divider> = {
  title: 'Components/Divider',
  component: Divider,
  argTypes: {
    orientation: {
      control: { type: 'inline-radio' },
      options: ['horizontal', 'vertical'],
      defaultValue: 'horizontal',
    },
    border: {
      control: { type: 'inline-radio' },
      options: ['info', 'section'],
      defaultValue: 'info',
    },
    label: {
      control: { type: 'object' },
      defaultValue: 'A Separator with label',
    },
    length: {
      control: { type: 'inline-radio' },
      options: ['full', 'half'],
      defaultValue: 'full',
    },
    style: {
      control: { type: 'select', options: ['solid', 'dashed'] },
      description: 'The style of the line. Whether its `solid` or `dashed`',
      defaultValue: 'solid',
    },
  },
}

export default meta
type Story = StoryObj<typeof Divider>

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
    border: 'info',
    label: 'A Horizontal Divider',
  },
}

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    border: 'info',
    label:
      'A Vertical Divider. For this divider, the height value is inherited from parent component.',
  },
  render: (args) => (
    <div className="h-10">
      <Divider {...args} />
    </div>
  ),
}

export const SectionDivider: Story = {
  args: {
    orientation: 'horizontal',
    border: 'section',
    label: 'A Section Divider. With 8px thickness.',
  },
}

export const VerticalSectionDivider: Story = {
  args: {
    orientation: 'vertical',
    border: 'section',
    label:
      'A Vertical Section Divider. With 8px thickness. Again, height of divider is inherited from parent.',
  },
  render: (args) => (
    <div className="h-[100px]">
      <Divider {...args} />
    </div>
  ),
}

export const HalfLength: Story = {
  args: {
    orientation: 'horizontal',
    border: 'section',
    length: 'half',
    label: 'A Section Divider. With half the length.',
  },
}

export const Dashed: Story = {
  args: {
    orientation: 'horizontal',
    border: 'info',
    length: 'half',
    label: 'This is a dashed divider',
    style: 'dashed',
  },
}

export const Alignment: Story = {
  args: {
    orientation: 'horizontal',
    border: 'section',
    length: 'half',
    label: 'This divider below the label will be centered',
    align: 'center',
  },
}
