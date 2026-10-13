import type { Meta, StoryObj } from '@storybook/react-vite'
import { Collapsible } from '@/components/ui/collapsible'

const meta: Meta<typeof Collapsible> = {
  title: 'Components/Collapsible',
  component: Collapsible,
  argTypes: {
    defaultOpen: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
    heading: {
      control: { type: 'object' },
      defaultValue: (
        <span className="text-sm font-semibold">
          Pembayaran dari&nbsp;
          <span className="text-sm">Cikada Sayyidil Akbarulloh</span>
        </span>
      ),
    },
    className: {
      control: { type: 'text' },
      defaultValue: '',
    },
    children: {
      control: { type: 'object' },
      defaultValue: <>This is an Collapsible content</>,
    },
  },
}

export default meta
type Story = StoryObj<typeof Collapsible>

export const Default: Story = {
  args: {
    defaultOpen: false,
    heading: (
      <span className="text-sm font-semibold">
        Pembayaran dari&nbsp;
        <span
          className="text-qb-blue-90 underline"
          onClick={(e) => {
            e.stopPropagation()
            window.location.href = 'https://id.linkedin.com/in/cikadasa'
          }}
        >
          Cikada Sayyidil Akbarulloh
        </span>
      </span>
    ),
    className: 'w-[500px]',
    children: (
      <div className="text-sm">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed imperdiet, nisl eget aliquam
          aliquet, nisl nisl aliquet nisl, eget aliquam nisl nisl eget nisl. Sed imperdiet, nisl
          eget aliquam aliquet, nisl nisl aliquet nisl, eget aliquam nisl nisl eget nisl.
        </p>
      </div>
    ),
  },
}
