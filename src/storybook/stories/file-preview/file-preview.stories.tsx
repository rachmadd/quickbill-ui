import { FilePreview } from '@/components/ui/custom/file-preview'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof FilePreview> = {
  title: 'Components/FilePreview',
  component: FilePreview,
  argTypes: {
    url: { control: { type: 'text' } },
    label: { control: { type: 'text' } },
    type: { control: { type: 'radio' }, options: ['image', 'document'] },
    withDownloadButton: { control: { type: 'boolean' } },
    withPreviewButton: { control: { type: 'boolean' } },
    className: { control: { type: 'text' }, description: 'Tailwind class for the card container' },
    classNames: {
      control: { type: 'object' },
      description: 'Tailwind classes for inner elements (preview, label)',
    },
  },
  args: {
    className: 'w-full max-w-[500px]',
    withDownloadButton: true,
    withPreviewButton: true,
  },
  render: (args) => <FilePreview {...args} />,
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    url: 'https://i.imgur.com/yYoYVg6.jpg',
    label: 'Foto KTP',
    type: 'image',
  },
}

export const Document: Story = {
  args: {
    url: 'https://www.rd.usda.gov/sites/default/files/pdf-sample_0.pdf',
    label: 'Invoice_Januari.pdf',
    type: 'document',
  },
}

export const WithoutExtension: Story = {
  args: {
    url: 'https://example.com/unknown-file',
    label: 'Unknown Document',
    type: 'document',
  },
}

export const WithoutLabel: Story = {
  args: {
    url: 'https://i.imgur.com/nmyWwfB.jpeg',
    type: 'image',
  },
}

export const OnlyPreviewButton: Story = {
  args: {
    url: 'https://i.imgur.com/lgJa8Zv.jpeg',
    label: 'Receipt-01.jpg',
    withDownloadButton: false,
    withPreviewButton: true,
  },
}

export const OnlyDownloadButton: Story = {
  args: {
    url: 'https://example.com/report.pdf',
    label: 'Report.pdf',
    withDownloadButton: true,
    withPreviewButton: false,
  },
}

export const WithoutButtons: Story = {
  args: {
    url: 'https://i.imgur.com/lgJa8Zv.jpeg',
    label: 'Receipt-01.jpg',
    withDownloadButton: false,
    withPreviewButton: false,
  },
}

export const BigImage: Story = {
  args: {
    url: 'https://t3.ftcdn.net/jpg/02/47/02/84/360_F_247028431_yPo8nwG9HuQN6oHyix8YnhYBeOXtF0c4.jpg',
    label: 'Big Image',
    type: 'image',
  },
}

export const PotraitImage: Story = {
  args: {
    url: 'https://www.jessleephotos.com/images/xl/Rainierfall.jpg',
    label: 'Potrait Image',
    type: 'image',
  },
}
