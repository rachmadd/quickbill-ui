import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Flex } from '@/components/core/flex'
import { Typography } from '@/components/core/typography'
import { Icon } from '@/components/icons'

const meta: Meta<typeof ToggleGroup> = {
  title: 'Components/ToggleGroup',
  component: ToggleGroup,
  tags: ['autodocs'],
  subcomponents: { ToggleGroupItem },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A group of toggle buttons built on top of [Base UI Toggle Group](https://base-ui.com/react/components/toggle-group).
Supports single or multiple selection, horizontal/vertical orientation, and three visual variants.

## Anatomy

\`\`\`tsx
import { ToggleGroup, ToggleGroupItem } from 'quickbill-ui'

<ToggleGroup variant="default" size="default">
  <ToggleGroupItem value="left">Left</ToggleGroupItem>
  <ToggleGroupItem value="center">Center</ToggleGroupItem>
  <ToggleGroupItem value="right">Right</ToggleGroupItem>
</ToggleGroup>
\`\`\`

| Prop | Type | Default | Description |
|---|---|---|---|
| \`variant\` | \`default \\| outline \\| ghost\` | \`default\` | Visual style of each item |
| \`size\` | \`sm \\| default \\| lg\` | \`default\` | Size of each item |
| \`spacing\` | \`number\` | \`2\` | Gap between items using Tailwind spacing scale. Set to \`0\` for a joined/segmented look |
| \`orientation\` | \`horizontal \\| vertical\` | \`horizontal\` | Layout direction |
| \`multiple\` | \`boolean\` | \`false\` | Allow multiple items to be pressed simultaneously |
| \`disabled\` | \`boolean\` | \`false\` | Disable all items in the group |
| \`value\` | \`string[]\` | — | Controlled pressed values |
| \`defaultValue\` | \`string[]\` | — | Initial pressed values (uncontrolled) |
| \`onValueChange\` | \`(values: string[]) => void\` | — | Called when the selection changes |
        `,
      },
    },
  },
  argTypes: {
    variant: {
      description: 'Visual style applied to all items in the group',
      control: 'radio',
      options: ['default', 'outline', 'ghost'],
    },
    size: {
      description: 'Size of each toggle item',
      control: 'radio',
      options: ['sm', 'default', 'lg'],
    },
    spacing: {
      description:
        'Gap between items using the Tailwind spacing scale. Use `0` for a joined (segmented) appearance.',
      control: 'number',
    },
    orientation: {
      description: 'Layout direction of the group',
      control: 'radio',
      options: ['horizontal', 'vertical'],
    },
    multiple: {
      description: 'Allow multiple items to be pressed at once',
      control: 'boolean',
    },
    disabled: {
      description: 'Disable all items in the group',
      control: 'boolean',
    },
    value: {
      description: 'Controlled array of pressed item values',
      control: false,
    },
    defaultValue: {
      description: 'Initial pressed values for uncontrolled usage',
      control: false,
    },
    onValueChange: {
      description: 'Callback fired when the selection changes',
      control: false,
    },
  },
}

export default meta
type Story = StoryObj<typeof ToggleGroup>

/** Basic horizontal group — only one item can be pressed at a time. */
export const Default: Story = {
  render: () => (
    <ToggleGroup defaultValue={['center']}>
      <ToggleGroupItem value="left">Left</ToggleGroupItem>
      <ToggleGroupItem value="center">Center</ToggleGroupItem>
      <ToggleGroupItem value="right">Right</ToggleGroupItem>
    </ToggleGroup>
  ),
}

/**
 * Pass `multiple` to let users press more than one item simultaneously.
 * Useful for formatting controls where bold + italic can be active at the same time.
 */
export const Multiple: Story = {
  render: () => (
    <ToggleGroup multiple defaultValue={['bold']}>
      <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
      <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
      <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
    </ToggleGroup>
  ),
}

/** All three visual variants side by side: `default`, `outline`, and `ghost`. */
export const Variants: Story = {
  render: () => (
    <Flex direction="col" gap="4">
      <Flex gap="2" alignItems="center">
        <Typography level="sm" className="w-16 text-right">
          default
        </Typography>
        <ToggleGroup variant="default" defaultValue={['all']}>
          <ToggleGroupItem value="all">Semua</ToggleGroupItem>
          <ToggleGroupItem value="success">Berhasil</ToggleGroupItem>
          <ToggleGroupItem value="processing">Processing</ToggleGroupItem>
        </ToggleGroup>
      </Flex>
      <Flex gap="2" alignItems="center">
        <Typography level="sm" className="w-16 text-right">
          outline
        </Typography>
        <ToggleGroup variant="outline" defaultValue={['all']}>
          <ToggleGroupItem value="all">Semua</ToggleGroupItem>
          <ToggleGroupItem value="success">Berhasil</ToggleGroupItem>
          <ToggleGroupItem value="processing">Processing</ToggleGroupItem>
        </ToggleGroup>
      </Flex>
      <Flex gap="2" alignItems="center">
        <Typography level="sm" className="w-16 text-right">
          ghost
        </Typography>
        <ToggleGroup variant="ghost" defaultValue={['all']}>
          <ToggleGroupItem value="all">Semua</ToggleGroupItem>
          <ToggleGroupItem value="success">Berhasil</ToggleGroupItem>
          <ToggleGroupItem value="processing">Processing</ToggleGroupItem>
        </ToggleGroup>
      </Flex>
    </Flex>
  ),
}

/** All three sizes side by side: `sm`, `default`, and `lg`. */
export const Sizes: Story = {
  render: () => (
    <Flex direction="col" gap="4" alignItems="start">
      <Flex gap="2" alignItems="center">
        <Typography level="sm" className="w-8 text-right">
          sm
        </Typography>
        <ToggleGroup size="sm" defaultValue={['month']}>
          <ToggleGroupItem value="day">Hari</ToggleGroupItem>
          <ToggleGroupItem value="week">Minggu</ToggleGroupItem>
          <ToggleGroupItem value="month">Bulan</ToggleGroupItem>
        </ToggleGroup>
      </Flex>
      <Flex gap="2" alignItems="center">
        <Typography level="sm" className="w-8 text-right">
          md
        </Typography>
        <ToggleGroup size="default" defaultValue={['month']}>
          <ToggleGroupItem value="day">Hari</ToggleGroupItem>
          <ToggleGroupItem value="week">Minggu</ToggleGroupItem>
          <ToggleGroupItem value="month">Bulan</ToggleGroupItem>
        </ToggleGroup>
      </Flex>
      <Flex gap="2" alignItems="center">
        <Typography level="sm" className="w-8 text-right">
          lg
        </Typography>
        <ToggleGroup size="lg" defaultValue={['month']}>
          <ToggleGroupItem value="day">Hari</ToggleGroupItem>
          <ToggleGroupItem value="week">Minggu</ToggleGroupItem>
          <ToggleGroupItem value="month">Bulan</ToggleGroupItem>
        </ToggleGroup>
      </Flex>
    </Flex>
  ),
}

/**
 * `spacing={0}` joins items into a single segmented control — borders collapse and
 * corners are squared on shared edges. Higher spacing values spread items apart.
 */
export const Spacing: Story = {
  render: () => (
    <Flex direction="col" gap="6" alignItems="start">
      <Flex direction="col" gap="1">
        <Typography level="sm">spacing=0 (segmented / joined)</Typography>
        <ToggleGroup variant="outline" spacing={0} defaultValue={['center']}>
          <ToggleGroupItem value="left">Left</ToggleGroupItem>
          <ToggleGroupItem value="center">Center</ToggleGroupItem>
          <ToggleGroupItem value="right">Right</ToggleGroupItem>
        </ToggleGroup>
      </Flex>
      <Flex direction="col" gap="1">
        <Typography level="sm">spacing=2 (default)</Typography>
        <ToggleGroup variant="outline" spacing={2} defaultValue={['center']}>
          <ToggleGroupItem value="left">Left</ToggleGroupItem>
          <ToggleGroupItem value="center">Center</ToggleGroupItem>
          <ToggleGroupItem value="right">Right</ToggleGroupItem>
        </ToggleGroup>
      </Flex>
      <Flex direction="col" gap="1">
        <Typography level="sm">spacing=4</Typography>
        <ToggleGroup variant="outline" spacing={4} defaultValue={['center']}>
          <ToggleGroupItem value="left">Left</ToggleGroupItem>
          <ToggleGroupItem value="center">Center</ToggleGroupItem>
          <ToggleGroupItem value="right">Right</ToggleGroupItem>
        </ToggleGroup>
      </Flex>
    </Flex>
  ),
}

/**
 * Set `orientation="vertical"` to stack items in a column.
 * The group automatically uses arrow-up/down for keyboard navigation.
 */
export const Vertical: Story = {
  render: () => (
    <Flex gap="6" alignItems="start">
      <Flex direction="col" gap="1">
        <Typography level="sm">vertical + spacing=2</Typography>
        <ToggleGroup orientation="vertical" defaultValue={['invoice']}>
          <ToggleGroupItem value="invoice">Invoice</ToggleGroupItem>
          <ToggleGroupItem value="expense">Expense</ToggleGroupItem>
          <ToggleGroupItem value="report">Report</ToggleGroupItem>
        </ToggleGroup>
      </Flex>
      <Flex direction="col" gap="1">
        <Typography level="sm">vertical + spacing=0</Typography>
        <ToggleGroup
          orientation="vertical"
          spacing={0}
          variant="outline"
          defaultValue={['invoice']}
        >
          <ToggleGroupItem value="invoice">Invoice</ToggleGroupItem>
          <ToggleGroupItem value="expense">Expense</ToggleGroupItem>
          <ToggleGroupItem value="report">Report</ToggleGroupItem>
        </ToggleGroup>
      </Flex>
    </Flex>
  ),
}

/**
 * Icon-only items — useful for compact toolbars.
 * Use `aria-label` on each `ToggleGroupItem` to keep the group accessible.
 */
export const WithIcons: Story = {
  render: () => (
    <Flex direction="col" gap="4" alignItems="start">
      <Typography level="sm">View switcher</Typography>
      <ToggleGroup defaultValue={['grid']}>
        <ToggleGroupItem value="grid" aria-label="Grid view">
          <Icon name="GridOutlined" size={16} />
        </ToggleGroupItem>
        <ToggleGroupItem value="column" aria-label="Column view">
          <Icon name="ColumnOutlined" size={16} />
        </ToggleGroupItem>
        <ToggleGroupItem value="list" aria-label="List view">
          <Icon name="List" size={16} />
        </ToggleGroupItem>
      </ToggleGroup>
    </Flex>
  ),
}

/**
 * Mix icons and text in the same item.
 * The icon sits inline with the label for a richer tab-like control.
 */
export const IconWithText: Story = {
  render: () => (
    <ToggleGroup variant="outline" spacing={0} defaultValue={['grid']}>
      <ToggleGroupItem value="grid">
        <Icon name="GridOutlined" size={14} />
        Grid
      </ToggleGroupItem>
      <ToggleGroupItem value="list">
        <Icon name="List" size={14} />
        List
      </ToggleGroupItem>
      <ToggleGroupItem value="column">
        <Icon name="ColumnOutlined" size={14} />
        Column
      </ToggleGroupItem>
    </ToggleGroup>
  ),
}

/**
 * `disabled` on the root disables the entire group — no item can be interacted with.
 * Compare with `DisabledItem` which only disables specific items.
 */
export const Disabled: Story = {
  render: () => (
    <Flex direction="col" gap="4" alignItems="start">
      <Flex direction="col" gap="1">
        <Typography level="sm">Entire group disabled</Typography>
        <ToggleGroup disabled defaultValue={['center']}>
          <ToggleGroupItem value="left">Left</ToggleGroupItem>
          <ToggleGroupItem value="center">Center</ToggleGroupItem>
          <ToggleGroupItem value="right">Right</ToggleGroupItem>
        </ToggleGroup>
      </Flex>
    </Flex>
  ),
}

/**
 * Pass `disabled` on individual `ToggleGroupItem` elements to block specific options
 * while keeping the rest interactive.
 */
export const DisabledItem: Story = {
  render: () => (
    <ToggleGroup defaultValue={['all']}>
      <ToggleGroupItem value="all">Semua</ToggleGroupItem>
      <ToggleGroupItem value="success">Berhasil</ToggleGroupItem>
      <ToggleGroupItem value="processing" disabled>
        Processing
      </ToggleGroupItem>
      <ToggleGroupItem value="failed" disabled>
        Gagal
      </ToggleGroupItem>
    </ToggleGroup>
  ),
}

/**
 * Fully controlled: manage the selected `value` array externally via `useState`.
 * `onValueChange` receives the full array of currently pressed values.
 */
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(['month'])
    return (
      <Flex direction="col" gap="4" alignItems="start">
        <ToggleGroup value={value} onValueChange={(next) => setValue(next)}>
          <ToggleGroupItem value="day">Hari</ToggleGroupItem>
          <ToggleGroupItem value="week">Minggu</ToggleGroupItem>
          <ToggleGroupItem value="month">Bulan</ToggleGroupItem>
          <ToggleGroupItem value="year">Tahun</ToggleGroupItem>
        </ToggleGroup>
        <Typography level="sm">
          Active: <strong>{value.join(', ') || 'none'}</strong>
        </Typography>
      </Flex>
    )
  },
}

/**
 * Controlled multiple selection — `value` is an array, and pressing items
 * adds or removes from it. `onValueChange` always fires with the complete updated array.
 */
export const ControlledMultiple: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(['bold'])
    return (
      <Flex direction="col" gap="4" alignItems="start">
        <ToggleGroup multiple value={value} onValueChange={(next) => setValue(next)}>
          <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
          <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
          <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
          <ToggleGroupItem value="strikethrough">Strikethrough</ToggleGroupItem>
        </ToggleGroup>
        <Typography level="sm">
          Active: <strong>{value.join(', ') || 'none'}</strong>
        </Typography>
      </Flex>
    )
  },
}
