import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Switch } from '@/components/ui/switch'
import { Flex } from '@/components/core/flex'
import { Typography } from '@/components/core/typography'

const meta: Meta<typeof Switch> = {
  title: 'Components/Fields/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A toggle control for binary on/off state. Built on top of [Base UI Switch](https://base-ui.com/react/components/switch).

---

## Usage

\`\`\`tsx
import { Switch } from '@/components/ui/switch'

<Switch defaultChecked onCheckedChange={(checked) => console.log(checked)} />
\`\`\`

---

## Anatomy

| Part | Description |
|---|---|
| \`<Switch>\` | Root element — renders the track and manages checked state |
| \`Thumb\` | The circular knob that slides across the track (internal) |

## Accessibility

- Rendered as a native \`<button role="switch">\` — works with screen readers out of the box.
- Always pair with a visible \`<label>\` or an \`aria-label\` prop for accessibility.
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
    disabled: {
      control: 'boolean',
      description: 'Prevents interaction and renders at reduced opacity.',
    },
    onCheckedChange: {
      description: 'Callback fired when the checked state changes.',
    },
  },
}

export default meta
type Story = StoryObj<typeof Switch>

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
 * The switch in its checked (on) state.
 */
export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
}

// ---------------------------------------------------------------------------
// Disabled
// ---------------------------------------------------------------------------

/**
 * Both checked and unchecked states when `disabled`. Pointer events are blocked
 * and the control renders at reduced opacity.
 */
export const Disabled: Story = {
  render: () => (
    <Flex gap="6" alignItems="center">
      <Flex direction="col" gap="2" alignItems="center">
        <Switch disabled />
        <Typography level="sm" className="text-muted-foreground">
          Off
        </Typography>
      </Flex>
      <Flex direction="col" gap="2" alignItems="center">
        <Switch disabled defaultChecked />
        <Typography level="sm" className="text-muted-foreground">
          On
        </Typography>
      </Flex>
    </Flex>
  ),
}

// ---------------------------------------------------------------------------
// With Label
// ---------------------------------------------------------------------------

/**
 * Always pair a `<Switch>` with a `<label>` linked via `id` / `htmlFor`.
 * Clicking the label toggles the switch — important for usability and accessibility.
 *
 * ```tsx
 * <div className="flex items-center gap-2">
 *   <Switch id="notifications" />
 *   <label htmlFor="notifications">Enable notifications</label>
 * </div>
 * ```
 */
export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Switch id="notifications" />
      <label htmlFor="notifications" className="cursor-pointer text-sm select-none">
        Enable notifications
      </label>
    </div>
  ),
}

// ---------------------------------------------------------------------------
// Controlled
// ---------------------------------------------------------------------------

/**
 * Drive the switch from external state using `checked` + `onCheckedChange`.
 * Useful when you need to react to the value or sync it with a form.
 *
 * ```tsx
 * const [enabled, setEnabled] = useState(false)
 *
 * <Switch checked={enabled} onCheckedChange={setEnabled} />
 * ```
 */
export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(false)

    return (
      <Flex direction="col" gap="4" alignItems="center">
        <div className="flex items-center gap-2">
          <Switch id="controlled" checked={checked} onCheckedChange={setChecked} />
          <label htmlFor="controlled" className="cursor-pointer text-sm select-none">
            {checked ? 'Enabled' : 'Disabled'}
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
// Settings List
// ---------------------------------------------------------------------------

/**
 * A common pattern: a list of labeled switches for toggling independent settings.
 * Each switch manages its own state independently.
 */
export const SettingsList: Story = {
  render: () => {
    const [settings, setSettings] = useState({
      emailNotifications: true,
      smsAlerts: false,
      autoReminders: true,
      weeklyDigest: false,
    })

    const toggle = (key: keyof typeof settings) =>
      setSettings((prev) => ({ ...prev, [key]: !prev[key] }))

    const items = [
      {
        key: 'emailNotifications',
        label: 'Email notifications',
        description: 'Receive updates via email',
      },
      { key: 'smsAlerts', label: 'SMS alerts', description: 'Get critical alerts by SMS' },
      {
        key: 'autoReminders',
        label: 'Auto reminders',
        description: 'Send payment reminders automatically',
      },
      { key: 'weeklyDigest', label: 'Weekly digest', description: 'Summary email every Monday' },
    ] as const

    return (
      <div className="w-80 divide-y rounded-xl border">
        {items.map(({ key, label, description }) => (
          <div key={key} className="flex items-center justify-between px-4 py-3">
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-medium">{label}</span>
              <span className="text-muted-foreground text-xs">{description}</span>
            </div>
            <Switch id={key} checked={settings[key]} onCheckedChange={() => toggle(key)} />
          </div>
        ))}
      </div>
    )
  },
}

// ---------------------------------------------------------------------------
// Form Field
// ---------------------------------------------------------------------------

/**
 * Switch used as a form field with a supporting description and a submit action.
 * The `checked` state is read on submit — no uncontrolled form magic needed.
 */
export const FormField: Story = {
  render: () => {
    const [autoSend, setAutoSend] = useState(false)
    const [submitted, setSubmitted] = useState<boolean | null>(null)

    return (
      <Flex direction="col" gap="4" className="w-72">
        <div className="rounded-xl border p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-0.5">
              <label htmlFor="auto-send" className="cursor-pointer text-sm font-medium">
                Auto-send invoices
              </label>
              <span className="text-muted-foreground text-xs">
                Automatically send invoices to clients on the due date.
              </span>
            </div>
            <Switch id="auto-send" checked={autoSend} onCheckedChange={setAutoSend} />
          </div>
        </div>

        <button
          className="bg-qb-primary rounded-lg px-4 py-2 text-sm font-medium text-white"
          onClick={() => setSubmitted(autoSend)}
        >
          Save settings
        </button>

        {submitted !== null && (
          <Typography level="sm" className="text-muted-foreground text-center">
            Saved: auto-send is <strong>{submitted ? 'on' : 'off'}</strong>
          </Typography>
        )}
      </Flex>
    )
  },
}
