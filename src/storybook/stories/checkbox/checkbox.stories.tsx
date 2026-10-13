import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Checkbox } from '@/components/ui/checkbox'
import { Flex } from '@/components/core/flex'
import { Typography } from '@/components/core/typography'

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Fields/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A three-state checkbox control: unchecked, checked, and indeterminate. Built on top of [Base UI Checkbox](https://base-ui.com/react/components/checkbox).

---

## Usage

\`\`\`tsx
import { Checkbox } from '@/components/ui/checkbox'

<Checkbox defaultChecked onCheckedChange={(checked) => console.log(checked)} />
\`\`\`

---

## Anatomy

| Part | Description |
|---|---|
| \`<Checkbox>\` | Root element — renders the box and manages checked state |
| \`Indicator\` | The checkmark or dash icon shown when checked or indeterminate (internal) |

## States

| State | Prop | Visual |
|---|---|---|
| Unchecked | _(default)_ | Empty bordered box |
| Checked | \`checked\` / \`defaultChecked\` | Filled blue box with checkmark |
| Indeterminate | \`indeterminate\` | Filled blue box with dash — signals partial selection |
| Disabled | \`disabled\` | Reduced opacity, non-interactive |
| Invalid | \`aria-invalid\` | Red border and ring |

## Accessibility

- Rendered as a native \`<button role="checkbox">\` — works with screen readers out of the box.
- Always pair with a visible \`<label>\` linked via \`id\` / \`htmlFor\`, or pass \`aria-label\`.
- Supports keyboard activation via \`Space\`.
        `,
      },
    },
  },
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Controlled checked state.',
    },
    defaultChecked: {
      control: 'boolean',
      description: 'Initial checked state for uncontrolled usage.',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Renders a dash instead of a checkmark — used for partial selection.',
    },
    disabled: {
      control: 'boolean',
      description: 'Prevents interaction and renders at reduced opacity.',
    },
    'aria-invalid': {
      control: 'boolean',
      description: 'Marks the checkbox as invalid — adds a red border and ring.',
    },
    onCheckedChange: {
      description: 'Callback fired when the checked state changes.',
    },
  },
}

export default meta
type Story = StoryObj<typeof Checkbox>

// ---------------------------------------------------------------------------
// Default
// ---------------------------------------------------------------------------

export const Default: Story = {
  args: {
    defaultChecked: false,
  },
}

// ---------------------------------------------------------------------------
// Checked
// ---------------------------------------------------------------------------

/**
 * The checkbox in its checked state.
 */
export const Checked: Story = {
  args: {
    checked: true,
  },
}

// ---------------------------------------------------------------------------
// Indeterminate
// ---------------------------------------------------------------------------

/**
 * `indeterminate` renders a dash instead of a checkmark — used to indicate partial
 * selection in a "select all" parent when only some children are checked.
 *
 * ```tsx
 * <Checkbox indeterminate />
 * ```
 */
export const Indeterminate: Story = {
  render: () => (
    <Flex gap="4" alignItems="center">
      {(
        [
          { label: 'Unchecked', props: {} },
          { label: 'Indeterminate', props: { indeterminate: true } },
          { label: 'Checked', props: { checked: true } },
        ] as const
      ).map(({ label, props }) => (
        <Flex key={label} direction="col" gap="2" alignItems="center">
          <Checkbox {...props} />
          <Typography level="sm" className="text-muted-foreground">
            {label}
          </Typography>
        </Flex>
      ))}
    </Flex>
  ),
}

// ---------------------------------------------------------------------------
// Disabled
// ---------------------------------------------------------------------------

/**
 * All three states when `disabled`. Pointer events are blocked and the
 * control renders at reduced opacity.
 */
export const Disabled: Story = {
  render: () => (
    <Flex gap="4" alignItems="center">
      {(
        [
          { label: 'Unchecked', props: { disabled: true } },
          { label: 'Indeterminate', props: { disabled: true, indeterminate: true } },
          { label: 'Checked', props: { disabled: true, checked: true } },
        ] as const
      ).map(({ label, props }) => (
        <Flex key={label} direction="col" gap="2" alignItems="center">
          <Checkbox {...props} />
          <Typography level="sm" className="text-muted-foreground">
            {label}
          </Typography>
        </Flex>
      ))}
    </Flex>
  ),
}

// ---------------------------------------------------------------------------
// Invalid
// ---------------------------------------------------------------------------

/**
 * Setting `aria-invalid` turns the border and focus ring red — use this to signal
 * a validation error. Works on all three states.
 */
export const Invalid: Story = {
  render: () => (
    <Flex gap="4" alignItems="center">
      {(
        [
          { label: 'Unchecked', props: { 'aria-invalid': true } },
          { label: 'Indeterminate', props: { 'aria-invalid': true, indeterminate: true } },
          { label: 'Checked', props: { 'aria-invalid': true, checked: true } },
        ] as const
      ).map(({ label, props }) => (
        <Flex key={label} direction="col" gap="2" alignItems="center">
          <Checkbox {...props} />
          <Typography level="sm" className="text-muted-foreground">
            {label}
          </Typography>
        </Flex>
      ))}
    </Flex>
  ),
}

// ---------------------------------------------------------------------------
// With Label
// ---------------------------------------------------------------------------

/**
 * Always pair a `<Checkbox>` with a `<label>` linked via `id` / `htmlFor`.
 * Clicking the label toggles the checkbox — important for usability and accessibility.
 *
 * ```tsx
 * <div className="flex items-center gap-2">
 *   <Checkbox id="terms" />
 *   <label htmlFor="terms">I accept the terms and conditions</label>
 * </div>
 * ```
 */
export const WithLabel: Story = {
  render: () => {
    const [checked, setChecked] = useState(false)

    return (
      <div className="flex items-center gap-2">
        <Checkbox id="rememberMe" checked={checked} onCheckedChange={setChecked} />
        <label htmlFor="rememberMe" className="cursor-pointer text-sm select-none">
          Remember me
        </label>
      </div>
    )
  },
}

// ---------------------------------------------------------------------------
// Controlled
// ---------------------------------------------------------------------------

/**
 * Drive the checkbox from external state using `checked` + `onCheckedChange`.
 *
 * ```tsx
 * const [checked, setChecked] = useState(false)
 *
 * <Checkbox checked={checked} onCheckedChange={setChecked} />
 * ```
 */
export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(false)

    return (
      <Flex direction="col" gap="4" alignItems="center">
        <div className="flex items-center gap-2">
          <Checkbox id="controlled" checked={checked} onCheckedChange={setChecked} />
          <label htmlFor="controlled" className="cursor-pointer text-sm select-none">
            {checked ? 'Checked' : 'Unchecked'}
          </label>
        </div>
        <Typography level="sm" className="text-muted-foreground">
          State: <strong>{checked ? 'on' : 'off'}</strong>
        </Typography>
      </Flex>
    )
  },
}

// ---------------------------------------------------------------------------
// Select All
// ---------------------------------------------------------------------------

/**
 * The classic "select all" pattern — the parent checkbox shows `indeterminate` when
 * only some children are checked, and becomes fully checked when all are selected.
 *
 * ```tsx
 * const allChecked = items.every((i) => i.checked)
 * const someChecked = items.some((i) => i.checked)
 *
 * <Checkbox
 *   checked={allChecked}
 *   indeterminate={!allChecked && someChecked}
 *   onCheckedChange={(checked) => toggleAll(Boolean(checked))}
 * />
 * ```
 */
export const SelectAll: Story = {
  render: () => {
    const [items, setItems] = useState([
      { id: 'jakarta', label: 'Jakarta', checked: true },
      { id: 'bandung', label: 'Bandung', checked: false },
      { id: 'surabaya', label: 'Surabaya', checked: true },
      { id: 'medan', label: 'Medan', checked: false },
    ])

    const allChecked = items.every((i) => i.checked)
    const someChecked = items.some((i) => i.checked)

    const toggleAll = (checked: boolean) => setItems((prev) => prev.map((i) => ({ ...i, checked })))

    const toggleItem = (id: string) =>
      setItems((prev) => prev.map((i) => (i.id === id ? { ...i, checked: !i.checked } : i)))

    return (
      <div className="w-56 rounded-xl border">
        <div className="flex items-center gap-2 border-b px-4 py-3">
          <Checkbox
            id="select-all"
            checked={allChecked}
            indeterminate={!allChecked && someChecked}
            onCheckedChange={(checked) => toggleAll(Boolean(checked))}
          />
          <label htmlFor="select-all" className="cursor-pointer text-sm font-medium select-none">
            Select all cities
          </label>
        </div>
        <div className="flex flex-col divide-y">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-2 px-4 py-2.5">
              <Checkbox
                id={item.id}
                checked={item.checked}
                onCheckedChange={() => toggleItem(item.id)}
              />
              <label htmlFor={item.id} className="cursor-pointer text-sm select-none">
                {item.label}
              </label>
            </div>
          ))}
        </div>
      </div>
    )
  },
}

// ---------------------------------------------------------------------------
// Checkbox Group
// ---------------------------------------------------------------------------

/**
 * A group of independent checkboxes — each toggled separately. Common for
 * multi-select filters, permission sets, or column visibility toggles.
 */
export const CheckboxGroup: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(['email'])

    const toggle = (value: string) =>
      setSelected((prev) =>
        prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
      )

    const options = [
      { value: 'email', label: 'Email', description: 'Receive updates via email' },
      { value: 'sms', label: 'SMS', description: 'Get alerts on your phone' },
      { value: 'push', label: 'Push notifications', description: 'Browser or app notifications' },
      { value: 'whatsapp', label: 'WhatsApp', description: 'Messages via WhatsApp' },
    ]

    return (
      <Flex direction="col" gap="4" className="w-72">
        <Typography level="sm" className="font-medium">
          Notification channels
        </Typography>
        <div className="flex flex-col gap-3">
          {options.map(({ value, label, description }) => (
            <div key={value} className="flex items-start gap-3">
              <Checkbox
                id={value}
                checked={selected.includes(value)}
                onCheckedChange={() => toggle(value)}
                className="mt-0.5"
              />
              <div className="flex flex-col gap-0.5">
                <label htmlFor={value} className="cursor-pointer text-sm font-medium select-none">
                  {label}
                </label>
                <span className="text-muted-foreground text-xs">{description}</span>
              </div>
            </div>
          ))}
        </div>
        <Typography level="sm" className="text-muted-foreground">
          Selected: <strong>{selected.join(', ') || 'none'}</strong>
        </Typography>
      </Flex>
    )
  },
}

// ---------------------------------------------------------------------------
// Form Validation
// ---------------------------------------------------------------------------

/**
 * Shows `aria-invalid` driven by a form submission attempt.
 * The checkbox turns red when the field is required but left unchecked.
 */
export const FormValidation: Story = {
  render: () => {
    const [accepted, setAccepted] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const isInvalid = submitted && !accepted

    return (
      <Flex direction="col" gap="4" className="w-72">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <Checkbox
              id="terms"
              checked={accepted}
              onCheckedChange={(v) => {
                setAccepted(Boolean(v))
                setSubmitted(false)
              }}
              aria-invalid={isInvalid || undefined}
            />
            <label htmlFor="terms" className="cursor-pointer text-sm select-none">
              I accept the <span className="text-qb-primary underline">terms and conditions</span>
            </label>
          </div>
          {isInvalid && (
            <Typography level="sm" className="text-qb-negative-main pl-5">
              You must accept the terms to continue.
            </Typography>
          )}
        </div>

        <button
          className="bg-qb-primary rounded-lg px-4 py-2 text-sm font-medium text-white"
          onClick={() => setSubmitted(true)}
        >
          Submit
        </button>

        {submitted && accepted && (
          <Typography level="sm" className="text-center text-green-600">
            Submitted successfully.
          </Typography>
        )}
      </Flex>
    )
  },
}
