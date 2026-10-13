import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const meta: Meta = {
  title: 'Hooks/useRippleEffect',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A hook that registers a global \`mousedown\` listener to create ink-ripple effects on any element
marked with \`data-ripple="true"\`.

**You normally do not call this hook directly.** It is already registered once at the application
root by \`<QuickbillUi>\`. Calling it again registers a second listener — avoid that.

\`\`\`tsx
// app root — called once
import { QuickbillUi } from 'quickbill-ui'

<QuickbillUi>
  <App />
</QuickbillUi>

// If you are NOT using QuickbillUi, call the hook once at the top of your root component
import { useRippleEffect } from 'quickbill-ui'

function RootLayout({ children }) {
  useRippleEffect()   // registers the global listener
  return <>{children}</>
}
\`\`\`

Once the hook is active, opt any element in by adding \`data-ripple="true"\`:

\`\`\`tsx
// Any HTML element
<button data-ripple="true">Click me</button>
<div data-ripple="true" data-ripple-color="rgba(255,255,255,0.35)">Card</div>

// Built-in Button uses it via the ripple prop (default: true)
<Button>Default ripple</Button>
<Button ripple={false}>No ripple</Button>
\`\`\`

---

## Data attributes

| Attribute | Type | Default | Description |
|---|---|---|---|
| \`data-ripple\` | \`"true" \\| "false"\` | — | Opts the element in (\`"true"\`) or out (\`"false"\`) |
| \`data-ripple-color\` | CSS color string | \`currentColor\` | Ripple fill color |
| \`data-ripple-duration\` | number (ms) | \`450\` | Ripple animation duration |

---

## How it works

1. A single \`mousedown\` listener is attached to \`document\`.
2. On each click, it walks up the DOM from \`event.target\` to find the nearest
   \`[data-ripple="true"]\` ancestor.
3. A \`<span>\` is absolutely-positioned at the click coordinate, animated with a CSS keyframe
   (\`.quickbill-ui-ripple-element\`), then removed after the animation completes.
4. The element's \`position\` is temporarily set to \`relative\` if it is \`static\`,
   and restored afterwards.
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj

// ---------------------------------------------------------------------------
// Shared demo helpers
// ---------------------------------------------------------------------------

const DemoCard = ({ children, label }: { children: React.ReactNode; label: string }) => (
  <div className="flex flex-col items-center gap-3">
    <p className="text-xs font-medium text-gray-500">{label}</p>
    {children}
  </div>
)

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

/**
 * The built-in `<Button>` component opts in to ripples by default via `data-ripple="true"`.
 * Click any button to see the ink ripple expand from the click point.
 *
 * ```tsx
 * // ripple is enabled by default — no extra setup needed
 * <Button>Primary</Button>
 * <Button variant="outline">Outline</Button>
 * ```
 */
export const Default: Story = {
  render: () => (
    <div className="flex flex-wrap justify-center gap-3">
      <Button>Primary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
}

/**
 * Disable the ripple on a specific `<Button>` by passing `ripple={false}`.
 * All other behaviour (styling, click handling) is unchanged.
 *
 * ```tsx
 * <Button ripple={false}>No ripple</Button>
 * ```
 */
export const DisabledOnButton: Story = {
  name: 'Disabled (ripple={false})',
  render: () => (
    <div className="flex flex-wrap justify-center gap-4">
      <DemoCard label="ripple (default)">
        <Button>With Ripple</Button>
      </DemoCard>
      <DemoCard label="ripple={false}">
        <Button ripple={false}>No Ripple</Button>
      </DemoCard>
    </div>
  ),
}

/**
 * Add `data-ripple="true"` directly to any HTML element to enable the ripple effect on it.
 * This works without any React wrapper — the global listener detects the attribute.
 *
 * ```tsx
 * <div
 *   data-ripple="true"
 *   className="cursor-pointer rounded-xl bg-blue-600 px-6 py-4 text-white"
 * >
 *   Click me
 * </div>
 * ```
 */
export const OnAnyElement: Story = {
  name: 'data-ripple on any element',
  render: () => (
    <div className="flex flex-wrap justify-center gap-4">
      <DemoCard label="<div>">
        <div
          data-ripple="true"
          className="cursor-pointer rounded-xl bg-blue-600 px-8 py-4 text-sm font-medium text-white select-none"
        >
          Click me
        </div>
      </DemoCard>
      <DemoCard label="<li> inside <ul>">
        <ul className="w-44 divide-y divide-gray-100 overflow-hidden rounded-xl border border-gray-200 bg-white text-sm">
          {['Dashboard', 'Invoices', 'Settings'].map((item) => (
            <li
              key={item}
              data-ripple="true"
              className="cursor-pointer px-4 py-3 text-gray-700 select-none"
            >
              {item}
            </li>
          ))}
        </ul>
      </DemoCard>
      <DemoCard label="<a> tag">
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          data-ripple="true"
          className="block rounded-lg bg-gray-100 px-5 py-2.5 text-sm text-gray-800 select-none"
        >
          Link element
        </a>
      </DemoCard>
    </div>
  ),
}

/**
 * Control the ripple fill colour with `data-ripple-color`. Any valid CSS color works —
 * use `rgba()` with low opacity for subtle effects on dark backgrounds.
 *
 * ```tsx
 * // Light ripple on a dark background
 * <div data-ripple="true" data-ripple-color="rgba(255,255,255,0.35)">…</div>
 *
 * // Brand-coloured ripple
 * <div data-ripple="true" data-ripple-color="rgba(99,102,241,0.4)">…</div>
 *
 * // Default (currentColor of the element)
 * <div data-ripple="true">…</div>
 * ```
 */
export const CustomColor: Story = {
  name: 'data-ripple-color',
  render: () => (
    <div className="flex flex-wrap justify-center gap-4">
      <DemoCard label="rgba(255,255,255,0.35) — light on dark">
        <div
          data-ripple="true"
          data-ripple-color="rgba(255,255,255,0.35)"
          className="cursor-pointer rounded-xl bg-indigo-600 px-8 py-4 text-sm font-medium text-white select-none"
        >
          Click me
        </div>
      </DemoCard>
      <DemoCard label="rgba(0,0,0,0.12) — dark on light">
        <div
          data-ripple="true"
          data-ripple-color="rgba(0,0,0,0.12)"
          className="cursor-pointer rounded-xl border border-gray-200 bg-white px-8 py-4 text-sm font-medium text-gray-800 select-none"
        >
          Click me
        </div>
      </DemoCard>
      <DemoCard label="rgba(99,102,241,0.4) — brand colour">
        <div
          data-ripple="true"
          data-ripple-color="rgba(99,102,241,0.4)"
          className="cursor-pointer rounded-xl bg-gray-50 px-8 py-4 text-sm font-medium text-gray-800 ring-1 ring-indigo-200 select-none"
        >
          Click me
        </div>
      </DemoCard>
    </div>
  ),
}

/**
 * Control the animation speed with `data-ripple-duration` (milliseconds).
 * Lower values feel snappier; higher values produce a slower, more prominent wave.
 *
 * ```tsx
 * <div data-ripple="true" data-ripple-duration="150">Fast (150 ms)</div>
 * <div data-ripple="true" data-ripple-duration="450">Default (450 ms)</div>
 * <div data-ripple="true" data-ripple-duration="900">Slow (900 ms)</div>
 * ```
 */
export const CustomDuration: Story = {
  name: 'data-ripple-duration',
  render: () => (
    <div className="flex flex-wrap justify-center gap-4">
      {[
        { label: 'Fast — 150 ms', duration: 150 },
        { label: 'Default — 450 ms', duration: 450 },
        { label: 'Slow — 900 ms', duration: 900 },
      ].map(({ label, duration }) => (
        <DemoCard key={duration} label={label}>
          <div
            data-ripple="true"
            data-ripple-color="rgba(255,255,255,0.35)"
            data-ripple-duration={String(duration)}
            className="cursor-pointer rounded-xl bg-blue-600 px-8 py-4 text-sm font-medium text-white select-none"
          >
            Click me
          </div>
        </DemoCard>
      ))}
    </div>
  ),
}

/**
 * All three data attributes work together. Combine `data-ripple-color` and
 * `data-ripple-duration` to create the exact feel you want.
 *
 * ```tsx
 * <div
 *   data-ripple="true"
 *   data-ripple-color="rgba(255,255,255,0.4)"
 *   data-ripple-duration="300"
 * >
 *   Custom card
 * </div>
 * ```
 */
export const InteractivePlayground: Story = {
  name: 'Playground',
  render: () => {
    const [color, setColor] = useState('rgba(255,255,255,0.35)')
    const [duration, setDuration] = useState(450)

    const colorOptions = [
      { label: 'White', value: 'rgba(255,255,255,0.35)' },
      { label: 'Dark', value: 'rgba(0,0,0,0.15)' },
      { label: 'Brand', value: 'rgba(99,102,241,0.5)' },
      { label: 'Red', value: 'rgba(239,68,68,0.4)' },
    ]

    return (
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="w-24 text-xs font-medium text-gray-500">Color:</span>
            <div className="flex gap-2">
              {colorOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setColor(opt.value)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${color === opt.value ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-24 text-xs font-medium text-gray-500">Duration:</span>
            <div className="flex gap-2">
              {[150, 300, 450, 900].map((d) => (
                <button
                  key={d}
                  onClick={() => setDuration(d)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${duration === d ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  {d} ms
                </button>
              ))}
            </div>
          </div>
        </div>

        <div
          data-ripple="true"
          data-ripple-color={color}
          data-ripple-duration={String(duration)}
          className="cursor-pointer rounded-2xl bg-indigo-600 px-16 py-8 text-base font-semibold text-white shadow-lg select-none"
        >
          Click anywhere on this card
        </div>

        <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-500">
          <Badge variant="secondary">data-ripple-color: {color}</Badge>
          <Badge variant="secondary">data-ripple-duration: {duration}</Badge>
        </div>
      </div>
    )
  },
}
