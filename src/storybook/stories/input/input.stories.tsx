import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from '@/components/ui/composed/input'
import { Icon } from '@/components/icons'

const meta: Meta<typeof Input> = {
  title: 'Components/Fields/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A flexible Input component built on Base UI primitives with extensive customization options.

## Features

- **Multiple Sizes**: Small, default, and large variants
- **Variants**: Default and ghost styling
- **Content Addons**: Prefix and suffix content or buttons
- **Input Types**: Support for all HTML input types
- **Form Integration**: Full accessibility and form support
- **Controlled/Uncontrolled**: Flexible state management
- **Custom Styling**: Extensive className customization

## Base UI Integration

This component is built on [Base UI Input](https://base-ui.com/react/components/input) primitives, providing:
- Accessibility-first design
- Keyboard navigation
- Screen reader support
- Touch-friendly interactions
- Performance optimizations
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'default', 'lg'],
      description: 'Input size variant',
      defaultValue: 'default',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'ghost'],
      description: 'Input visual variant',
      defaultValue: 'default',
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
      description: 'HTML input type',
      defaultValue: 'text',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the input',
    },
    'aria-invalid': {
      control: 'boolean',
      description: 'Mark input as invalid',
    },
    prefix: {
      control: 'text',
      description: 'Content to display before the input',
    },
    suffix: {
      control: 'text',
      description: 'Content to display after the input',
    },
    prefixButton: {
      control: false,
      description: 'Button configuration for prefix',
    },
    suffixButton: {
      control: false,
      description: 'Button configuration for suffix',
    },
    className: {
      control: 'text',
      description: 'CSS class for the root element',
    },
    classNames: {
      control: false,
      description: 'Object with CSS classes for specific parts',
    },
  },
}

export default meta

type Story = StoryObj<typeof Input>

export const Basic: Story = {
  args: {
    placeholder: 'Enter your text...',
    type: 'text',
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <Input inputSize="xs" placeholder="Extra small input" />
      <Input inputSize="sm" placeholder="Small input" />
      <Input inputSize="default" placeholder="Default input" />
      <Input inputSize="lg" placeholder="Large input" />
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
<Input size="sm" placeholder="Small input" />
<Input size="default" placeholder="Default input" />
<Input size="lg" placeholder="Large input" />
\`\`\`
        `,
      },
    },
  },
}

export const Variants: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <Input variant="default" placeholder="Default variant" />
      <Input variant="filled" placeholder="Filled variant" />
      <Input variant="ghost" placeholder="Ghost variant" />
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
<Input variant="default" placeholder="Default variant" />
<Input variant="ghost" placeholder="Ghost variant" />
\`\`\`
        `,
      },
    },
  },
}

export const InputTypes: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <Input type="text" placeholder="Text input" />
      <Input type="email" placeholder="Email address" />
      <Input type="password" placeholder="Password" />
      <Input type="number" placeholder="Number" />
      <Input type="tel" placeholder="Phone number" />
      <Input type="url" placeholder="Website URL" />
      <Input type="search" placeholder="Search..." />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
## Input Types

Supports all standard HTML input types with appropriate browser behavior and validation.

\`\`\`tsx
<Input type="email" placeholder="Email address" />
<Input type="password" placeholder="Password" />
<Input type="number" placeholder="Number" />
\`\`\`
        `,
      },
    },
  },
}

export const WithPrefix: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <Input
        prefix={<Icon name="SearchOutlined" className="text-muted-foreground" />}
        placeholder="Search..."
        type="search"
      />
      <Input
        prefix={<span className="text-muted-foreground">$</span>}
        placeholder="Amount"
        type="number"
      />
      <Input
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
<Input
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
      <Input
        suffix={<span className="text-muted-foreground">USD</span>}
        placeholder="Amount"
        type="number"
      />
      <Input
        suffix={<span className="text-muted-foreground">@example.com</span>}
        placeholder="Username"
        type="text"
      />
      <Input
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
<Input
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
      <Input
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
      <Input
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
<Input
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
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Controlled text input"
        />
        <div className="text-muted-foreground text-sm">Value: {value}</div>

        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
        />
        <div className="text-muted-foreground text-sm">Email: {email}</div>

        <Input
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

<Input
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
      <Input defaultValue="Default text" placeholder="Uncontrolled input" />
      <Input type="email" placeholder="Email with default value" defaultValue="user@example.com" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
## Uncontrolled Inputs

For simple use cases, use uncontrolled mode with \`defaultValue\`.

\`\`\`tsx
<Input
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
      <Input placeholder="Normal state" />
      <Input placeholder="Disabled state" disabled />
      <Input placeholder="Invalid state" aria-invalid />
      <Input placeholder="Disabled invalid" disabled aria-invalid />
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
<Input disabled />
<Input aria-invalid />
\`\`\`
        `,
      },
    },
  },
}

export const CustomStyling: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <Input placeholder="Custom root class" className="border-2 border-blue-500" />
      <Input
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
<Input
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
