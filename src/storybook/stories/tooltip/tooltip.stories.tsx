import { Tooltip } from '@/components/ui/custom/tooltip'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
}
export default meta

type Story = StoryObj<typeof Tooltip>
export const Primary: Story = {
  args: {
    children: <Badge>Hover to show tooltip</Badge>,
    content: 'Ini adalah biaya admin',
  },
}
export const LongText: Story = {
  args: {
    children: <Badge>Hover to show tooltip</Badge>,
    content:
      'Biaya Admin metode bayar. Khusus VA perhitungan biaya admin dihitung per mitra. Ini adalah contoh maksimal size untuk tooltip.',
    className: 'w-[300px]',
  },
}
export const HTMLContent: Story = {
  args: {
    children: <Badge>Hover to show tooltip</Badge>,
    content: (
      <div>
        Items:
        <ul className="list-disc pl-3">
          <li className="">Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </div>
    ),
    className: 'w-[200px]',
  },
}
export const WithArrow: Story = {
  args: {
    children: <Badge>Hover to show tooltip</Badge>,
    arrow: true,
    content: 'Example tooltip content with arrow',
  },
}
export const DelayDuration: Story = {
  args: {
    children: <Badge>Hover to show tooltip</Badge>,
    arrow: true,
    delayDuration: 1000,
    content: 'Example tooltip content with delayed duration',
  },
}
export const ControlledOpenState: Story = {
  args: {
    arrow: true,
    content: 'Example tooltip content with controlled State',
  },
  render: (args) => {
    const [open, setOpen] = React.useState(false)
    return (
      <>
        <Tooltip open={open} {...args}>
          <Button onClick={() => setOpen((open) => !open)}>Click to Open</Button>
        </Tooltip>
      </>
    )
  },
}
export const CustomSideAndAlign: Story = {
  args: {
    children: <Badge>Bottom-Start</Badge>,
    arrow: true,
    side: 'bottom',
    align: 'start',
    content: 'Example tooltip with Custom Side and Aligning',
  },
  render: () => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-1">
          <Tooltip
            content="Example tooltip with Side to Bottom and Align To Start"
            arrow
            side="bottom"
            align="start"
          >
            <Badge variant={'default'}>Bottom-Start</Badge>
          </Tooltip>

          <Tooltip
            content="Example tooltip with Side to Bottom and Align To Center"
            arrow
            side="bottom"
            align="center"
          >
            <Badge variant={'default'}>Bottom-Center</Badge>
          </Tooltip>

          <Tooltip
            content="Example tooltip with Side to Bottom and Align To End"
            arrow
            side="bottom"
            align="end"
          >
            <Badge variant={'default'}>Bottom-End</Badge>
          </Tooltip>
        </div>

        <div className="flex flex-wrap gap-1">
          <Tooltip
            content="Example tooltip with Side to Top and Align To Start"
            arrow
            side="top"
            align="start"
          >
            <Badge variant={'default'}>Top-Start</Badge>
          </Tooltip>

          <Tooltip
            content="Example tooltip with Side to Top and Align To Center"
            arrow
            side="top"
            align="center"
          >
            <Badge variant={'default'}>Top-Center</Badge>
          </Tooltip>

          <Tooltip
            content="Example tooltip with Side to Top and Align To End"
            arrow
            side="top"
            align="end"
          >
            <Badge variant={'default'}>Top-End</Badge>
          </Tooltip>
        </div>

        <div className="flex flex-wrap gap-1">
          <Tooltip
            content="Example tooltip with Side to Left and Align To Start"
            arrow
            side="left"
            align="start"
          >
            <Badge variant={'default'}>Left-Start</Badge>
          </Tooltip>

          <Tooltip
            content="Example tooltip with Side to Left and Align To Center"
            arrow
            side="left"
            align="center"
          >
            <Badge variant={'default'}>Left-Center</Badge>
          </Tooltip>

          <Tooltip
            content="Example tooltip with Side to Left and Align To End"
            arrow
            side="left"
            align="end"
          >
            <Badge variant={'default'}>Left-End</Badge>
          </Tooltip>
        </div>

        <div className="flex flex-wrap gap-1">
          <Tooltip
            content="Example tooltip with Side to Right and Align To Start"
            arrow
            side="right"
            align="start"
          >
            <Badge variant={'default'}>Right-Start</Badge>
          </Tooltip>

          <Tooltip
            content="Example tooltip with Side to Right and Align To Center"
            arrow
            side="right"
            align="center"
          >
            <Badge variant={'default'}>Right-Center</Badge>
          </Tooltip>

          <Tooltip
            content="Example tooltip with Side to Right and Align To End"
            arrow
            side="right"
            align="end"
          >
            <Badge variant={'default'}>Right-End</Badge>
          </Tooltip>
        </div>
      </div>
    )
  },
}
