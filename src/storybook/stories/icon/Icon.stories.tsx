import { Icon, iconPaths } from '@/components/icons'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  argTypes: {
    size: {
      control: { type: 'number' },
      min: 10,
      max: 64,
    },
    name: {
      control: { type: 'select' },
      options: Object.keys(iconPaths),
    },
    className: {
      control: { type: 'text' },
      defaultValue: 'text-neutral-600',
    },
  },
}

export default meta
type Story = StoryObj<typeof Icon>

const SAMPLE_ICONS: { name: Parameters<typeof Icon>[0]['name']; color: string }[] = [
  { name: 'HomeOutlined', color: 'text-qb-primary' },
  { name: 'SearchOutlined', color: 'text-qb-blue-60' },
  { name: 'SettingsOutlined', color: 'text-qb-mist-70' },
  { name: 'UserOutlined', color: 'text-qb-info-main' },
  { name: 'InvoiceOutlined', color: 'text-qb-success-main' },
  { name: 'MoneyOutlined', color: 'text-qb-daisy-70' },
  { name: 'CheckCircleOutlined', color: 'text-qb-success-dark' },
  { name: 'TrashOutlined', color: 'text-qb-negative-main' },
  { name: 'EditOutlined', color: 'text-qb-warning-main' },
  { name: 'DownloadOutlined', color: 'text-qb-blue-80' },
  { name: 'SendOutlined', color: 'text-qb-daisy-50' },
  { name: 'BellOutlined', color: 'text-qb-warning-dark' },
]

export const Example: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6 p-4">
      {SAMPLE_ICONS.map(({ name, color }) => (
        <div key={name} className="flex flex-col items-center gap-1">
          <Icon name={name} size={24} className={color} />
          <span className="text-qb-muted-foreground text-xs">{name}</span>
        </div>
      ))}
    </div>
  ),
}
