import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { InputMask } from '@/components/ui/composed/input-mask'

const meta: Meta<typeof InputMask> = {
  title: 'Components/Fields/InputMask',
  component: InputMask,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A masked input component that wraps [react-imask](https://imask.js.org/) with the project's \`Input\` UI.

## Features

- **Pattern masks**: Fixed character patterns (phone, date, credit card, etc.)
- **Number masks**: Integer and decimal formatting with separators
- **Dynamic masks**: Multiple mask options based on input
- **Unmasked value**: Access raw value without mask characters via \`onAccept\`
- **Prefix/Suffix**: Full support for \`Input\` addons via \`prefixInput\` prop

## Notes

- Use \`prefixInput\` (not \`prefix\`) to pass prefix content — the \`prefix\` prop is reserved for react-imask internals.
- \`onAccept\` fires on every accepted change, receiving \`(value, maskRef, event)\`.
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof InputMask>

export const PhoneMask: Story = {
  render: () => {
    const [value, setValue] = React.useState('')
    return (
      <div className="flex w-80 flex-col gap-4">
        <InputMask
          mask="+62 000-0000-0000"
          value={value}
          onAccept={(val) => setValue(val as string)}
          placeholder="+62 000-0000-0000"
          inputMode="numeric"
        />
        <div className="text-muted-foreground text-sm">Unmasked: {value}</div>
      </div>
    )
  },
}

export const DateMask: Story = {
  render: () => {
    const [value, setValue] = React.useState('')
    return (
      <div className="flex w-80 flex-col gap-4">
        <InputMask
          mask="00/00/0000"
          value={value}
          onAccept={(val) => setValue(val as string)}
          placeholder="DD/MM/YYYY"
          inputMode="numeric"
        />
        <div className="text-muted-foreground text-sm">Value: {value}</div>
      </div>
    )
  },
}

export const NumberMask: Story = {
  render: () => {
    const [value, setValue] = React.useState('')
    return (
      <div className="flex w-80 flex-col gap-4">
        <InputMask
          mask={Number as unknown as string}
          thousandsSeparator="."
          scale={0}
          min={0}
          max={999999999}
          value={value}
          onAccept={(val) => setValue(val as string)}
          placeholder="0"
          inputMode="numeric"
        />
        <div className="text-muted-foreground text-sm">Value: {value}</div>
      </div>
    )
  },
}

export const WithPrefix: Story = {
  render: () => {
    const [value, setValue] = React.useState('')
    return (
      <div className="flex w-80 flex-col gap-4">
        <InputMask
          mask="00/00/0000"
          value={value}
          onAccept={(val) => setValue(val as string)}
          placeholder="DD/MM/YYYY"
          prefixInput={<span className="text-muted-foreground text-sm">Date</span>}
          inputMode="numeric"
        />
        <div className="text-muted-foreground text-sm">Value: {value}</div>
      </div>
    )
  },
}

export const States: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <InputMask mask="000-000" value="" placeholder="Normal" />
      <InputMask mask="000-000" value="" placeholder="Disabled" disabled />
      <InputMask mask="000-000" value="" placeholder="Invalid" aria-invalid />
    </div>
  ),
}
