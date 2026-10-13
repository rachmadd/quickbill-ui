import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import InputCurrency from '@/components/ui/composed/input-currency'

const meta: Meta<typeof InputCurrency> = {
  title: 'Components/Fields/InputCurrency',
  component: InputCurrency,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A currency input with thousands-separator formatting powered by react-imask.

- \`onChange\` receives \`(numericValue: number | null, maskedValue: string)\`.
- \`withCurrency\` toggles the currency prefix (default \`true\`, prefix \`"Rp"\`).
- \`allowDecimal\` enables two-decimal-place mode with comma as radix (default \`false\`).
- Leading zeros are stripped automatically.
        `,
      },
    },
  },
  argTypes: {
    withCurrency: { control: 'boolean' },
    allowDecimal: { control: 'boolean' },
    currency: { control: 'text' },
    disabled: { control: 'boolean' },
    'aria-invalid': { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof InputCurrency>

export const Default: Story = {
  render: () => {
    const [value, setValue] = React.useState('')
    const [numeric, setNumeric] = React.useState<number | null>(null)
    return (
      <div className="flex w-80 flex-col gap-4">
        <InputCurrency
          value={value}
          onChange={(num, masked) => {
            setNumeric(num)
            setValue(masked)
          }}
        />
        <div className="text-muted-foreground text-sm">Numeric: {numeric ?? '—'}</div>
        <div className="text-muted-foreground text-sm">Masked: {value || '—'}</div>
      </div>
    )
  },
}

export const WithDecimal: Story = {
  render: () => {
    const [value, setValue] = React.useState('')
    const [numeric, setNumeric] = React.useState<number | null>(null)
    return (
      <div className="flex w-80 flex-col gap-4">
        <InputCurrency
          value={value}
          allowDecimal
          onChange={(num, masked) => {
            setNumeric(num)
            setValue(masked)
          }}
        />
        <div className="text-muted-foreground text-sm">Numeric: {numeric ?? '—'}</div>
        <div className="text-muted-foreground text-sm">Masked: {value || '—'}</div>
      </div>
    )
  },
}

export const WithoutCurrencyPrefix: Story = {
  render: () => {
    const [value, setValue] = React.useState('')
    return (
      <div className="flex w-80 flex-col gap-4">
        <InputCurrency
          value={value}
          withCurrency={false}
          onChange={(_, masked) => setValue(masked)}
          placeholder="0"
        />
        <div className="text-muted-foreground text-sm">Masked: {value || '—'}</div>
      </div>
    )
  },
}

export const CustomCurrency: Story = {
  render: () => {
    const [value, setValue] = React.useState('')
    return (
      <div className="flex w-80 flex-col gap-4">
        <InputCurrency value={value} currency="$" onChange={(_, masked) => setValue(masked)} />
        <div className="text-muted-foreground text-sm">Masked: {value || '—'}</div>
      </div>
    )
  },
}

export const States: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <InputCurrency value="" onChange={() => {}} />
      <InputCurrency value="" onChange={() => {}} disabled />
      <InputCurrency value="" onChange={() => {}} aria-invalid />
    </div>
  ),
}
