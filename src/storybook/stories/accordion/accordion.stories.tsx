import { useState } from 'react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  subcomponents: { AccordionContent, AccordionItem, AccordionTrigger },
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A vertically stacked set of interactive headings that each reveal or hide associated content with a smooth height transition.

Built on top of [Base UI Accordion](https://base-ui.com/react/components/accordion).

### Usage

\`\`\`tsx
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'

<Accordion defaultValue={['item-1']}>
  <AccordionItem value="item-1">
    <AccordionTrigger>What is QuickBill?</AccordionTrigger>
    <AccordionContent>
      QuickBill is an all-in-one invoicing platform for businesses.
    </AccordionContent>
  </AccordionItem>
</Accordion>
\`\`\`

### Anatomy

| Component | Description |
|---|---|
| \`<Accordion>\` | Root container. Accepts \`multiple\`, \`defaultValue\`, \`value\`, \`onValueChange\`, \`disabled\` |
| \`<AccordionItem>\` | A single collapsible section. Requires a unique \`value\` string |
| \`<AccordionTrigger>\` | The clickable header. Accepts \`iconSize\` to control the chevron |
| \`<AccordionContent>\` | The panel body — animated open/close via CSS height transition |
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-105">
        <Story />
      </div>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof Accordion>

/**
 * Basic accordion with a single panel open at a time. Use `defaultValue` with an array of item `value` strings to pre-open specific panels on first render.
 *
 * ```tsx
 * <Accordion defaultValue={['item-1']}>
 *   <AccordionItem value="item-1">
 *     <AccordionTrigger>Title</AccordionTrigger>
 *     <AccordionContent>Content</AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 * ```
 */
export const Default: Story = {
  args: {
    multiple: false,
    defaultValue: ['item-1'],
  },
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem value="item-1">
        <AccordionTrigger>What is included in the plan?</AccordionTrigger>
        <AccordionContent>
          Our flagship product combines cutting-edge technology with sleek design. Built with
          premium materials, it offers unparalleled performance and reliability. Key features
          include advanced processing capabilities and an intuitive user interface designed for both
          beginners and experts.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>How does shipping work?</AccordionTrigger>
        <AccordionContent>
          We offer worldwide shipping through trusted courier partners. Standard delivery takes 3–5
          business days, while express shipping ensures delivery within 1–2 business days. All
          orders are carefully packaged and fully insured.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Can I cancel my subscription?</AccordionTrigger>
        <AccordionContent>
          Yes. You can cancel at any time from your account settings. Your access continues until
          the end of the current billing period. No partial refunds are issued for unused time.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

/**
 * Set `multiple={true}` to allow several panels to be open simultaneously. Useful for settings panels or comparison views where the user needs to see multiple sections at once.
 *
 * ```tsx
 * <Accordion multiple defaultValue={['item-1', 'item-2']}>
 *   ...
 * </Accordion>
 * ```
 */
export const Multiple: Story = {
  args: {
    multiple: true,
    defaultValue: ['item-1', 'item-2'],
  },
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Billing</AccordionTrigger>
        <AccordionContent>
          Invoices are generated automatically at the end of each billing cycle. You can download
          them from the Billing section in your dashboard.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Account</AccordionTrigger>
        <AccordionContent>
          Update your profile information, password, and notification preferences from the Account
          settings page.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Integrations</AccordionTrigger>
        <AccordionContent>
          Connect QuickBill with third-party tools like Stripe, Xero, and QuickBooks through the
          Integrations hub.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

/**
 * Pass all item values to `defaultValue` to start with every panel expanded. Users can still collapse individual items.
 */
export const AllOpen: Story = {
  args: {
    multiple: true,
    defaultValue: ['item-1', 'item-2', 'item-3'],
  },
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Overview</AccordionTrigger>
        <AccordionContent>
          A high-level summary of your account activity, usage, and recent transactions.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Usage</AccordionTrigger>
        <AccordionContent>
          Detailed breakdown of API calls, storage consumed, and feature usage for the current
          billing period.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Recent Transactions</AccordionTrigger>
        <AccordionContent>
          A list of the last 10 invoices, payments received, and any pending charges on your
          account.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

/**
 * Individual items can be disabled by adding `disabled` to `<AccordionItem>`. Disabled items cannot be toggled and are visually dimmed. Use when certain sections are conditionally unavailable.
 *
 * ```tsx
 * <AccordionItem value="item-2" disabled>
 *   <AccordionTrigger>Locked Section</AccordionTrigger>
 *   <AccordionContent>...</AccordionContent>
 * </AccordionItem>
 * ```
 */
export const DisabledItem: Story = {
  args: {
    defaultValue: ['item-1'],
  },
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Available — click to toggle</AccordionTrigger>
        <AccordionContent>This section is fully interactive.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" disabled>
        <AccordionTrigger>Disabled — requires upgrade</AccordionTrigger>
        <AccordionContent>You should not be able to open this.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Available — click to toggle</AccordionTrigger>
        <AccordionContent>This section is also interactive.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

/**
 * Setting `disabled` on the root `<Accordion>` disables all items at once. Useful when content is loading, the user lacks permission, or the section is in read-only mode.
 *
 * ```tsx
 * <Accordion disabled defaultValue={['item-1']}>
 *   ...
 * </Accordion>
 * ```
 */
export const DisabledAll: Story = {
  args: {
    disabled: true,
    defaultValue: ['item-1'],
  },
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Billing</AccordionTrigger>
        <AccordionContent>
          Pre-opened but the trigger is disabled — cannot be closed.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Account</AccordionTrigger>
        <AccordionContent>Cannot be opened.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Integrations</AccordionTrigger>
        <AccordionContent>Cannot be opened.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

/**
 * The `iconSize` prop on `<AccordionTrigger>` controls the chevron icon size in pixels. Defaults to `16`. Increase it for larger touch targets or prominent headings.
 *
 * ```tsx
 * <AccordionTrigger iconSize={20}>Large icon</AccordionTrigger>
 * ```
 */
export const CustomIconSize: Story = {
  args: {
    defaultValue: ['item-sm'],
  },
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem value="item-sm">
        <AccordionTrigger iconSize={12}>Small icon (12px)</AccordionTrigger>
        <AccordionContent>Using iconSize={12} — compact trigger row.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-md">
        <AccordionTrigger iconSize={16}>Default icon (16px)</AccordionTrigger>
        <AccordionContent>Using the default iconSize={16}.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-lg">
        <AccordionTrigger iconSize={24}>Large icon (24px)</AccordionTrigger>
        <AccordionContent>Using iconSize={24} — prominent trigger row.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

/**
 * `<AccordionContent>` accepts any React content — paragraphs, lists, links, badges, or other components. Consecutive `<p>` tags receive automatic bottom margin via `[&_p:not(:last-child)]:mb-4`.
 */
export const RichContent: Story = {
  args: {
    defaultValue: ['item-1'],
  },
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem value="item-1">
        <AccordionTrigger>System requirements</AccordionTrigger>
        <AccordionContent>
          <p>Minimum requirements to run the application:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
            <li>Node.js 18 or later</li>
            <li>4 GB RAM minimum, 8 GB recommended</li>
            <li>macOS 13+, Windows 10+, or Ubuntu 22.04+</li>
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Multiple paragraphs</AccordionTrigger>
        <AccordionContent>
          <p>
            QuickBill processes invoices using bank-level encryption (AES-256). All data is
            transmitted over TLS 1.3 and stored in certified data centres.
          </p>
          <p>
            We are SOC 2 Type II compliant and conduct annual third-party penetration tests. Your
            financial data is never shared with advertisers or third parties.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Links and actions</AccordionTrigger>
        <AccordionContent>
          <p className="mb-3">
            Read our full documentation for implementation details and API reference.
          </p>
          <a
            href="https://base-ui.com/react/components/accordion"
            target="_blank"
            rel="noopener noreferrer"
            className="text-qb-primary text-sm font-medium underline-offset-4 hover:underline"
          >
            View Base UI Accordion docs →
          </a>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

/**
 * Controlled mode using `value` and `onValueChange`. Use this when the open/close state must be driven by parent logic — for example, opening a specific panel in response to a route change or search result.
 *
 * ```tsx
 * const [value, setValue] = useState<string[]>(['item-1'])
 *
 * <Accordion value={value} onValueChange={setValue}>
 *   ...
 * </Accordion>
 * ```
 */
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(['item-1'])

    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          {['item-1', 'item-2', 'item-3'].map((id) => (
            <button
              key={id}
              onClick={() =>
                setValue((prev) =>
                  prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id],
                )
              }
              className="rounded border px-3 py-1 text-xs font-medium"
            >
              Toggle {id}
            </button>
          ))}
        </div>
        <p className="text-muted-foreground text-xs">Open: [{value.join(', ')}]</p>
        <Accordion value={value} onValueChange={setValue} multiple>
          <AccordionItem value="item-1">
            <AccordionTrigger>Panel 1</AccordionTrigger>
            <AccordionContent>
              Controlled by external state. Use the buttons above.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Panel 2</AccordionTrigger>
            <AccordionContent>
              Controlled by external state. Use the buttons above.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Panel 3</AccordionTrigger>
            <AccordionContent>
              Controlled by external state. Use the buttons above.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    )
  },
}

/**
 * A real-world FAQ layout. Accordions are well-suited for FAQ sections because they let users scan all questions without scrolling through long answers.
 */
export const FAQ: Story = {
  args: {
    multiple: false,
  },
  render: (args) => (
    <div className="flex flex-col gap-3">
      <h2 className="text-base font-semibold">Frequently Asked Questions</h2>
      <Accordion {...args}>
        <AccordionItem value="q1">
          <AccordionTrigger>How do I create my first invoice?</AccordionTrigger>
          <AccordionContent>
            Navigate to <strong>Invoices → New Invoice</strong>, fill in your client details, add
            line items, and click <strong>Send</strong>. Your client will receive a payment link by
            email.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="q2">
          <AccordionTrigger>What payment methods are supported?</AccordionTrigger>
          <AccordionContent>
            QuickBill supports credit/debit cards, bank transfers (ACH), and PayNow. Additional
            payment gateways can be configured in <strong>Settings → Payments</strong>.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="q3">
          <AccordionTrigger>Can I customise the invoice template?</AccordionTrigger>
          <AccordionContent>
            Yes. Go to <strong>Settings → Branding</strong> to upload your logo, set brand colours,
            and choose a layout. Changes apply to all future invoices immediately.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="q4">
          <AccordionTrigger>Is my data backed up automatically?</AccordionTrigger>
          <AccordionContent>
            All data is backed up in real-time across multiple availability zones. Point-in-time
            recovery is available for the last 30 days on Pro plans and above.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="q5">
          <AccordionTrigger>How do I contact support?</AccordionTrigger>
          <AccordionContent>
            Use the live chat widget in the bottom-right corner of the dashboard, or email{' '}
            <a
              href="mailto:support@example.com"
              className="text-qb-primary underline-offset-4 hover:underline"
            >
              support@example.com
            </a>
            . Pro and Enterprise customers receive priority response within 2 hours.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
}
