import type { Meta, StoryObj } from '@storybook/react-vite'
import { Empty } from '@/components/ui/custom/empty'
import { Icon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/composed/input'
import { illustrationOf } from '@/storybook/components/illustrations'

const meta: Meta<typeof Empty> = {
  title: 'Components/Empty',
  component: Empty,
}

export default meta
type Story = StoryObj<typeof Empty>

export const Default: Story = {
  args: {
    media: <Icon name="BoxFlatOutlined" />,
    mediaVariant: 'icon',
    title: 'No Invoice Yet',
    description:
      "You haven't created any projects yet. Get started by creating your first project.",
    action: (
      <Button pill={false} variant={'outline'}>
        Create new Invoice
      </Button>
    ),
  },
}

export const UsingImage: Story = {
  args: {
    className: 'min-w-[800px]',
    media: <img src={illustrationOf('emptyStateSrc')} width={80} height={80} />,
    title: 'Search Not Found',
    description: 'You may want to try using different keywords or checking for typos.',
  },
}

export const Customize: Story = {
  args: {
    className: 'max-w-[500px]',
    title: {
      label: '404',
      className: 'text-[48px] font-bold',
    },
    description:
      "The page you're looking for doesn't exist. Try searching for what you need below.",
    content: (
      <Input
        inputSize={'sm'}
        placeholder="Search Page"
        suffix={<Icon name="SearchOutlined" size={16} />}
      />
    ),
    action: (
      <Button variant={'link'} pill={false}>
        Back to home
      </Button>
    ),
  },
}
