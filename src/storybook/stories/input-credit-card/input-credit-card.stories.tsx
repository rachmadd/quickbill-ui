import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { InputCreditCard } from '@/components/ui/composed/input-credit-card'

const meta: Meta<typeof InputCreditCard> = {
  title: 'Components/Fields/InputCreditCard',
  component: InputCreditCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A credit card number input with automatic \`0000-0000-0000-0000\` masking.

- \`onValueChange\` receives the **unmasked** 16-digit string (no dashes).
- Sets \`inputMode="numeric"\` and \`autoComplete="cc-number"\` for mobile and autofill.
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof InputCreditCard>

export const Default: Story = {
  render: () => {
    const [value, setValue] = React.useState('')
    return (
      <div className="flex w-80 flex-col gap-4">
        <InputCreditCard
          value={value}
          defaultValue=""
          onValueChange={(val) => setValue(val)}
          placeholder="0000-0000-0000-0000"
        />
        <div className="text-muted-foreground text-sm">Unmasked: {value}</div>
      </div>
    )
  },
}

export const WithDefaultValue: Story = {
  render: () => {
    const [value, setValue] = React.useState('4111111111111111')
    return (
      <div className="flex w-80 flex-col gap-4">
        <InputCreditCard
          value={value}
          defaultValue="4111111111111111"
          onValueChange={(val) => setValue(val)}
        />
        <div className="text-muted-foreground text-sm">Unmasked: {value}</div>
      </div>
    )
  },
}

export const States: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <InputCreditCard value="" defaultValue="" onValueChange={() => {}} placeholder="Normal" />
      <InputCreditCard
        value=""
        defaultValue=""
        onValueChange={() => {}}
        placeholder="Disabled"
        disabled
      />
      <InputCreditCard
        value=""
        defaultValue=""
        onValueChange={() => {}}
        placeholder="Invalid"
        aria-invalid
      />
    </div>
  ),
}
