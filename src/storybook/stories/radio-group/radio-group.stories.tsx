import { Flex } from '@/components/core/flex'
import { Typography } from '@/components/core/typography'
import { Button } from '@/components/ui/button'
import { RadioGroup } from '@/components/ui/custom/radio-group'
import { Kbd } from '@/components/ui/kbd'
import { cn } from '@/lib/utils'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React, { useRef, useState } from 'react'

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/Fields/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A composable radio group built on top of [Base UI Radio](https://base-ui.com/react/components/radio-group).
Supports vertical/horizontal layouts, two visual variants, custom item rendering, controlled state,
and native form integration.

\`\`\`tsx
import { RadioGroup } from 'quickbill-ui'

// Basic usage
<RadioGroup
  items={[
    { label: 'Option A', value: 'a' },
    { label: 'Option B', value: 'b' },
  ]}
  defaultValue="a"
/>

// Controlled
<RadioGroup
  items={items}
  value={value}
  onValueChange={setValue}
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    orientation: {
      description: 'Layout orientation of the radio items',
      control: 'select',
      options: ['vertical', 'horizontal'],
    },
    variant: {
      description: 'Visual variant of the radio indicator',
      control: 'select',
      options: ['default', 'inset'],
    },
    radioPosition: {
      description: 'Position of the radio indicator relative to the label',
      control: 'select',
      options: ['start', 'end'],
    },
    disabled: {
      description: 'Disable the entire radio group',
      control: 'boolean',
    },
    required: {
      description: 'Mark the radio group as required for form validation',
      control: 'boolean',
    },
    name: {
      description: 'Name attribute for native form submission',
      control: 'text',
    },
    value: {
      description: 'Controlled selected value',
      control: false,
    },
    defaultValue: {
      description: 'Default selected value for uncontrolled usage',
      control: 'text',
    },
    onValueChange: {
      description: 'Callback fired when the selected value changes',
      control: false,
    },
    customRender: {
      description:
        'Custom renderer `(item, isSelected, radio) => ReactNode`. Replaces the default label + indicator row entirely.',
      control: false,
    },
    itemClassName: {
      description: 'CSS class applied to every item wrapper element',
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof RadioGroup>

const basicItems = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
]

/** Basic vertical list with a pre-selected default value. */
export const Default: Story = {
  args: {
    items: basicItems,
    defaultValue: 'option1',
  },
}

/**
 * `variant="default"` shows a hollow circle indicator; `variant="inset"` fills
 * the circle with the primary colour when selected.
 */
export const Variants: Story = {
  render: () => (
    <Flex gap="12" alignItems="start">
      <Flex direction="col" gap="2">
        <Typography level="sm">variant=default</Typography>
        <RadioGroup items={basicItems} defaultValue="option1" variant="default" />
      </Flex>
      <Flex direction="col" gap="2">
        <Typography level="sm">variant=inset</Typography>
        <RadioGroup items={basicItems} defaultValue="option1" variant="inset" />
      </Flex>
    </Flex>
  ),
}

/**
 * `radioPosition="end"` moves the indicator to the trailing side of the label.
 * Useful when pairing with full-width item containers.
 */
export const RadioPosition: Story = {
  render: () => (
    <Flex gap="12" alignItems="start">
      <Flex direction="col" gap="2">
        <Typography level="sm">radioPosition=start (default)</Typography>
        <RadioGroup items={basicItems} defaultValue="option1" radioPosition="start" />
      </Flex>
      <Flex direction="col" gap="2">
        <Typography level="sm">radioPosition=end</Typography>
        <RadioGroup items={basicItems} defaultValue="option1" radioPosition="end" />
      </Flex>
    </Flex>
  ),
}

/** `direction="horizontal"` places items side-by-side in a row. */
export const Direction: Story = {
  render: () => (
    <Flex direction="col" gap="8">
      <Flex direction="col" gap="2">
        <Typography level="sm">orientation=vertical (default)</Typography>
        <RadioGroup items={basicItems} defaultValue="option1" orientation="vertical" />
      </Flex>
      <Flex direction="col" gap="2">
        <Typography level="sm">orientation=horizontal</Typography>
        <RadioGroup items={basicItems} defaultValue="option1" orientation="horizontal" />
      </Flex>
    </Flex>
  ),
}

/** `disabled` prevents all interaction. Individual item `disabled` is reflected per-item. */
export const States: Story = {
  render: () => (
    <Flex gap="12" alignItems="start">
      <Flex direction="col" gap="2">
        <Typography level="sm">Normal</Typography>
        <RadioGroup items={basicItems} defaultValue="option1" />
      </Flex>
      <Flex direction="col" gap="2">
        <Typography level="sm">Disabled (whole group)</Typography>
        <RadioGroup items={basicItems} defaultValue="option1" disabled />
      </Flex>
      <Flex direction="col" gap="2">
        <Typography level="sm">Invalid (whole group)</Typography>
        <RadioGroup items={basicItems} defaultValue="option1" aria-invalid={true} />
      </Flex>
    </Flex>
  ),
}

/**
 * Fully controlled: `value` and `onValueChange` are owned by the parent.
 * External buttons demonstrate programmatic selection and clearing.
 */
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('option1')
    return (
      <Flex direction="col" gap="4">
        <Flex gap="2" className="flex-wrap">
          <Button variant="outline" onClick={() => setValue('option1')}>
            Set Option 1
          </Button>
          <Button variant="outline" onClick={() => setValue('option2')}>
            Set Option 2
          </Button>
          <Button variant="outline" onClick={() => setValue('option3')}>
            Set Option 3
          </Button>
          <Button variant="secondary-outline" onClick={() => setValue('')}>
            Clear
          </Button>
        </Flex>
        <RadioGroup items={basicItems} value={value} onValueChange={setValue} />
        <Typography level="sm">
          Selected: <strong>{value || 'none'}</strong>
        </Typography>
      </Flex>
    )
  },
}

/**
 * Use `customRender` to display a supporting description beneath each label.
 * The third argument (`radio`) is the styled indicator node — place it wherever you like.
 */
export const WithDescription: Story = {
  render: () => {
    const [value, setValue] = useState('monthly')
    const plans = [
      { label: 'Monthly', value: 'monthly', description: 'Billed every month. Cancel anytime.' },
      { label: 'Annual', value: 'annual', description: 'Save 20% with yearly billing.' },
      { label: 'Enterprise', value: 'enterprise', description: 'Custom pricing for large teams.' },
    ]
    return (
      <RadioGroup
        items={plans}
        value={value}
        onValueChange={setValue}
        customRender={(item, _isSelected, radio) => (
          <Flex alignItems="center" gap="3">
            {radio}
            <Flex direction="col">
              <Typography>{item.label}</Typography>
              <Typography level="sm" className="text-qb-mist-50">
                {item.description}
              </Typography>
            </Flex>
          </Flex>
        )}
      />
    )
  },
}

/**
 * `customRender` replaces each item with a card layout.
 * `isSelected` lets you apply active border/background styles to the card.
 */
export const CustomRender: Story = {
  render: () => {
    const items = [
      { label: 'Option 1', value: 'option1', description: 'This is option 1' },
      { label: 'Option 2', value: 'option2', description: 'This is option 2' },
      { label: 'Option 3', value: 'option3', description: 'This is option 3' },
    ]
    return (
      <Flex direction="col" gap="8">
        <Flex direction="col" gap="2">
          <Typography level="sm" className="flex items-center gap-2">
            <Kbd>Orientation=horizontal</Kbd>
            <Kbd>Variant=default</Kbd>
          </Typography>
          <RadioGroup
            orientation="horizontal"
            defaultValue="option1"
            items={items}
            customRender={(item, isSelected, radio) => (
              <div
                className={cn(
                  'flex items-start gap-6 rounded-md border border-gray-300 px-3 py-4',
                  isSelected && 'bg-qb-primary/10 border-qb-primary',
                )}
              >
                <Flex direction="col">
                  <div className="font-semibold">{item.label}</div>
                  {item.description}
                </Flex>
                {radio}
              </div>
            )}
          />
        </Flex>

        <Flex direction="col" gap="2">
          <Typography level="sm" className="flex items-center gap-2">
            <Kbd>Orientation=vertical</Kbd>
            <Kbd>Variant=inset</Kbd>
          </Typography>
          <RadioGroup
            orientation="vertical"
            items={items}
            defaultValue="option1"
            variant="inset"
            customRender={(item, isSelected, radio) => (
              <div
                className={cn(
                  'flex items-start justify-between gap-6 rounded-md border border-gray-300 px-3 py-4',
                  isSelected && 'bg-qb-primary/10 border-qb-primary',
                )}
              >
                <Flex direction="col">
                  <div className="font-semibold">{item.label}</div>
                  {item.description}
                </Flex>
                {radio}
              </div>
            )}
          />
        </Flex>
      </Flex>
    )
  },
}

/**
 * `itemClassName` applies a custom class to every item wrapper without needing `customRender`.
 * Handy for quick border/padding tweaks.
 */
export const CustomClassNames: Story = {
  render: () => (
    <Flex direction="col" gap="6">
      <Flex direction="col" gap="2">
        <Typography level="sm">itemClassName with border + padding</Typography>
        <RadioGroup
          items={basicItems}
          defaultValue="option1"
          itemClassName="border border-gray-200 rounded px-3 py-2 w-60"
        />
      </Flex>
      <Flex direction="col" gap="2">
        <Typography level="sm">radioPosition=end + full-width border</Typography>
        <RadioGroup
          items={basicItems}
          defaultValue="option1"
          radioPosition="end"
          itemClassName="border border-gray-200 rounded px-3 py-2 w-60 justify-between"
        />
      </Flex>
    </Flex>
  ),
}

/**
 * `name` and `required` integrate with native HTML form submission.
 * A hidden `<input>` carrying the `name` value participates in browser constraint validation.
 */
export const RequiredForm: Story = {
  render: () => {
    const formRef = useRef<HTMLFormElement>(null)
    const [submitted, setSubmitted] = useState<string | null>(null)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const data = new FormData(e.currentTarget)
      setSubmitted(data.get('plan') as string)
    }

    return (
      <form ref={formRef} onSubmit={handleSubmit}>
        <Flex direction="col" gap="4">
          <RadioGroup
            items={[
              { label: 'Monthly', value: 'monthly' },
              { label: 'Annual', value: 'annual' },
              { label: 'Enterprise', value: 'enterprise' },
            ]}
            name="plan"
            required
          />
          <Button type="submit">Submit</Button>
          {submitted !== null && (
            <Typography level="sm">
              Submitted: <strong>{submitted || '(empty)'}</strong>
            </Typography>
          )}
        </Flex>
      </form>
    )
  },
}
