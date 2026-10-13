import { Icon } from '@/components/icons'
import { InputPassword } from '@/components/ui/composed/input-password'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

const meta: Meta<typeof InputPassword> = {
  title: 'Components/Fields/InputPassword',
  component: InputPassword,
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: { type: 'boolean' },
    },
    placeholder: {
      control: 'text',
    },
    variant: {
      control: 'select',
      options: ['default', 'ghost'],
    },
  },
}

export default meta
type Story = StoryObj<typeof InputPassword>

export const Default: Story = {
  args: {
    disabled: false,
    placeholder: '*********',
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <InputPassword inputSize="xs" placeholder="Extra small input" />
      <InputPassword inputSize="sm" placeholder="Small input" />
      <InputPassword inputSize="default" placeholder="Default input" />
      <InputPassword inputSize="lg" placeholder="Large input" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
## Size Variants

The input supports three size variants:

- **Small (sm)**: Compact for tight spaces
- **Default**: Standard size for most use cases
- **Large (lg)**: Prominent for important inputs

\`\`\`tsx
<InputPassword size="sm" placeholder="Small input" />
<InputPassword size="default" placeholder="Default input" />
<InputPassword size="lg" placeholder="Large input" />
\`\`\`
        `,
      },
    },
  },
}

export const Variants: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <InputPassword variant="default" placeholder="Default variant" />
      <InputPassword variant="filled" placeholder="Filled variant" />
      <InputPassword variant="ghost" placeholder="Ghost variant" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
## Visual Variants

- **Default**: Standard input with background and border
- **Ghost**: Transparent background, minimal styling

\`\`\`tsx
<InputPassword variant="default" placeholder="Default variant" />
<InputPassword variant="ghost" placeholder="Ghost variant" />
\`\`\`
        `,
      },
    },
  },
}

export const InputTypes: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <InputPassword type="text" placeholder="Text input" />
      <InputPassword type="email" placeholder="Email address" />
      <InputPassword type="password" placeholder="Password" />
      <InputPassword type="number" placeholder="Number" />
      <InputPassword type="tel" placeholder="Phone number" />
      <InputPassword type="url" placeholder="Website URL" />
      <InputPassword type="search" placeholder="Search..." />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
## Input Types

Supports all standard HTML input types with appropriate browser behavior and validation.

\`\`\`tsx
<InputPassword type="email" placeholder="Email address" />
<InputPassword type="password" placeholder="Password" />
<InputPassword type="number" placeholder="Number" />
\`\`\`
        `,
      },
    },
  },
}

export const WithPrefix: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <InputPassword
        prefix={<Icon name="SearchOutlined" className="text-muted-foreground" />}
        placeholder="Search..."
        type="search"
      />
      <InputPassword
        prefix={<span className="text-muted-foreground">$</span>}
        placeholder="Amount"
        type="number"
      />
      <InputPassword
        prefix={<span className="text-muted-foreground">https://</span>}
        placeholder="example.com"
        type="url"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
## Prefix Content

Add visual context or icons before the input field.

\`\`\`tsx
<InputPassword
  prefix={<Icon name="SearchOutlined" />}
  placeholder="Search..."
  type="search"
/>
\`\`\`
        `,
      },
    },
  },
}

export const WithSuffix: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <InputPassword
        suffix={<span className="text-muted-foreground">USD</span>}
        placeholder="Amount"
        type="number"
      />
      <InputPassword
        suffix={<span className="text-muted-foreground">@example.com</span>}
        placeholder="Username"
        type="text"
      />
      <InputPassword
        suffix={<Icon name="CalendarOutlined" className="text-muted-foreground" />}
        placeholder="Select date"
        type="text"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
## Suffix Content

Add units, domains, or icons after the input field.

\`\`\`tsx
<InputPassword
  suffix={<span className="text-muted-foreground">USD</span>}
  placeholder="Amount"
  type="number"
/>
\`\`\`
        `,
      },
    },
  },
}

export const WithButtons: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <InputPassword
        placeholder="Search..."
        type="search"
        prefixButton={{
          label: 'Search',
          content: <Icon name="SearchOutlined" />,
          onClick: () => console.log('Search clicked'),
        }}
        suffixButton={{
          label: 'Clear',
          content: <Icon name="CloseOutlined" />,
          onClick: () => console.log('Clear clicked'),
        }}
      />
      <InputPassword
        placeholder="Password"
        type="password"
        suffixButton={{
          label: 'Toggle visibility',
          content: <Icon name="EyeOutlined" />,
          onClick: () => console.log('Toggle password visibility'),
        }}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
## Interactive Buttons

Add clickable buttons as prefix or suffix elements.

\`\`\`tsx
<InputPassword
  placeholder="Search..."
  prefixButton={{
    label: 'Search',
    content: <Icon name="SearchOutlined" />,
    onClick: () => handleSearch(),
  }}
  suffixButton={{
    label: 'Clear',
    content: <Icon name="CloseOutlined" />,
    onClick: () => handleClear(),
  }}
/>
\`\`\`
        `,
      },
    },
  },
}

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState('Hello World')
    const [email, setEmail] = React.useState('')
    const [number, setNumber] = React.useState(42)

    return (
      <div className="flex w-80 flex-col gap-4">
        <InputPassword
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Controlled text input"
        />
        <div className="text-muted-foreground text-sm">Value: {value}</div>

        <InputPassword
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
        />
        <div className="text-muted-foreground text-sm">Email: {email}</div>

        <InputPassword
          type="number"
          value={number}
          onChange={(e) => setNumber(Number(e.target.value) || 0)}
          placeholder="Number"
        />
        <div className="text-muted-foreground text-sm">Number: {number}</div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: `
## Controlled Inputs

For full control over input values, use controlled mode with \`value\` and \`onChange\`.

\`\`\`tsx
const [value, setValue] = useState('')

<InputPassword
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder="Controlled input"
/>
\`\`\`

This is useful for:
- Form validation and submission
- Input formatting and masking
- Synchronizing with external state
- Implementing custom input behavior
        `,
      },
    },
  },
}

export const Uncontrolled: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <InputPassword defaultValue="Default text" placeholder="Uncontrolled input" />
      <InputPassword
        type="email"
        placeholder="Email with default value"
        defaultValue="user@example.com"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
## Uncontrolled Inputs

For simple use cases, use uncontrolled mode with \`defaultValue\`.

\`\`\`tsx
<InputPassword
  defaultValue="Default text"
  placeholder="Uncontrolled input"
/>
\`\`\`

The component manages its own internal state, and you can access the value through form submission or refs.
        `,
      },
    },
  },
}

export const States: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <InputPassword placeholder="Normal state" />
      <InputPassword placeholder="Disabled state" disabled />
      <InputPassword placeholder="Invalid state" aria-invalid />
      <InputPassword placeholder="Disabled invalid" disabled aria-invalid />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
## Input States

- **Normal**: Default interactive state
- **Disabled**: Non-interactive, grayed out
- **Invalid**: Error styling with red border
- **Disabled + Invalid**: Combined disabled and invalid states

\`\`\`tsx
<InputPassword disabled />
<InputPassword aria-invalid />
\`\`\`
        `,
      },
    },
  },
}

export const CustomStyling: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <InputPassword placeholder="Custom root class" className="border-2 border-blue-500" />
      <InputPassword
        placeholder="Custom input styling"
        classNames={{
          input: 'font-mono text-green-600',
          prefix: 'bg-blue-50',
          suffix: 'bg-red-50',
        }}
        prefix={<span>🔍</span>}
        suffix={<span>✓</span>}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
## Custom Styling

Use \`className\` for root-level styling and \`classNames\` for specific parts.

\`\`\`tsx
<InputPassword
  className="border-2 border-blue-500"
  classNames={{
    input: 'font-mono text-green-600',
    prefix: 'bg-blue-50',
    suffix: 'bg-red-50',
  }}
  prefix={<span>🔍</span>}
  suffix={<span>✓</span>}
/>
\`\`\`
        `,
      },
    },
  },
}
