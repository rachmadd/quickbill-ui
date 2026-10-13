import type { Meta, StoryObj } from '@storybook/react-vite'
import { UploadImage as UploadImageComponent } from '@/components/ui/upload-image'
import { useState, useEffect } from 'react'

const UploadImage = (args: React.ComponentProps<typeof UploadImageComponent>) => {
  const [value, setValue] = useState<File | string | null>(args.value || null)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setValue(args.value || null)
  }, [args.value])

  return (
    <UploadImageComponent
      {...args}
      value={value}
      onChange={(file) => {
        setValue(file)
        args.onChange?.(file)
      }}
      onRemove={() => {
        setValue(null)
        args.onRemove?.()
      }}
    />
  )
}

const meta = {
  title: 'Components/Fields/UploadImage',
  component: UploadImageComponent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A component for uploading images with drag-and-drop support, preview, and validation.',
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    subLabel: { control: 'text' },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    error: { control: 'text' },
    accept: { control: 'text' },
    maxSize: { control: 'number' },
  },
  args: {
    label: 'Logo Perusahaan',
    subLabel: 'Format JPG atau PNG maksimal 10MB.',
    required: false,
    disabled: false,
    accept: 'image/png, image/jpeg',
    maxSize: 10 * 1024 * 1024,
  },
} satisfies Meta<typeof UploadImageComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => <UploadImage {...args} />,
}

export const WithInitialImage: Story = {
  render: (args) => <UploadImage {...args} />,
  args: {
    value: 'https://placehold.co/400',
  },
}

export const Disabled: Story = {
  render: (args) => <UploadImage {...args} />,
  args: {
    disabled: true,
  },
}

export const DisabledWithImage: Story = {
  render: (args) => <UploadImage {...args} />,
  args: {
    disabled: true,
    value: 'https://placehold.co/400',
  },
}

export const WithError: Story = {
  render: (args) => <UploadImage {...args} />,
  args: {
    error: 'File terlalu besar. Maksimum 10MB.',
  },
}

export const CustomLabels: Story = {
  render: (args) => <UploadImage {...args} />,
  args: {
    label: 'Profile Picture',
    subLabel: 'Recommended size: 400x400px',
  },
}

export const CustomFileNamePreviews: Story = {
  render: (args) => <UploadImage {...args} />,
  args: {
    fileNamePreview: true,
  },
}
