/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flex } from '@/components/core/flex'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof Flex> = {
  title: 'Core/Flex',
  component: Flex,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    direction: {
      control: { type: 'radio' },
      options: ['row', 'col'],
    },
    justifyContent: {
      control: { type: 'select' },
      options: [
        'flex-start',
        'flex-end',
        'center',
        'space-between',
        'space-around',
        'space-evenly',
      ],
    },
    alignItems: {
      control: { type: 'select' },
      options: ['flex-start', 'flex-end', 'center', 'stretch', 'baseline'],
    },
    gap: {
      control: { type: 'select' },
      options: ['0.5', '1', '1.5', '2', '2.5', '3', '4', '5', '6', '8', '10', '12'],
    },
    children: {
      control: { disable: true },
    },
  },
}

export default meta
type Story = StoryObj<typeof Flex>

// ---------------------------------------------------------------------------
// Shared demo items
// ---------------------------------------------------------------------------

const Item = ({ label, className = '' }: { label: string; className?: string }) => (
  <div
    className={`flex items-center justify-center rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 ${className}`}
  >
    {label}
  </div>
)

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-3">
    <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase">{title}</p>
    {children}
  </div>
)

const Container = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full rounded-lg border border-dashed border-gray-200 bg-gray-50 p-3">
    {children}
  </div>
)

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

/**
 * Use the controls panel to interactively explore all Flex props.
 */
export const Playground: Story = {
  args: {
    direction: 'row',
    gap: '3',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  render: (args) => (
    <div className="w-96">
      <Container>
        <Flex {...args}>
          <Item label="Item 1" />
          <Item label="Item 2" />
          <Item label="Item 3" />
        </Flex>
      </Container>
    </div>
  ),
}

/**
 * `direction="row"` (default) — items laid out horizontally left to right.
 */
export const Row: Story = {
  args: {
    direction: 'row',
    gap: '3',
  },
  render: (args) => (
    <Flex {...args}>
      <Item label="Item 1" />
      <Item label="Item 2" />
      <Item label="Item 3" />
    </Flex>
  ),
}

/**
 * `direction="col"` — items stacked vertically top to bottom.
 */
export const Column: Story = {
  args: {
    direction: 'col',
    gap: '3',
  },
  render: (args) => (
    <Flex {...args}>
      <Item label="Item 1" />
      <Item label="Item 2" />
      <Item label="Item 3" />
    </Flex>
  ),
}

/**
 * All six `justifyContent` values compared in a single view.
 * Each row contains three items laid out with the labelled distribution.
 */
export const JustifyContent: Story = {
  name: 'justifyContent — all values',
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  render: () => (
    <div className="flex w-full flex-col gap-6">
      {(
        [
          'flex-start',
          'flex-end',
          'center',
          'space-between',
          'space-around',
          'space-evenly',
        ] as const
      ).map((value) => (
        <Section key={value} title={value}>
          <Container>
            <Flex direction="row" gap="3" justifyContent={value}>
              <Item label="A" />
              <Item label="B" />
              <Item label="C" />
            </Flex>
          </Container>
        </Section>
      ))}
    </div>
  ),
}

/**
 * All five `alignItems` values compared. Items are given different heights so
 * the cross-axis alignment is clearly visible.
 */
export const AlignItems: Story = {
  name: 'alignItems — all values',
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  render: () => (
    <div className="flex w-full flex-col gap-6">
      {(['flex-start', 'flex-end', 'center', 'stretch', 'baseline'] as const).map((value) => (
        <Section key={value} title={value}>
          <Container>
            <Flex direction="row" gap="3" alignItems={value} className="h-24">
              <Item label="Short" />
              <Item label="Taller" className="py-6" />
              <Item label="Medium" className="py-4" />
            </Flex>
          </Container>
        </Section>
      ))}
    </div>
  ),
}

/**
 * Gap scale from tight to loose. Use a smaller gap for dense toolbars or icon rows,
 * a larger gap for card grids or section separators.
 */
export const Gap: Story = {
  name: 'gap — scale comparison',
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  render: () => (
    <div className="flex w-full flex-col gap-6">
      {(['1', '3', '6', '10', '12'] as const).map((size) => (
        <Section key={size} title={`gap="${size}"`}>
          <Container>
            <Flex direction="row" gap={size}>
              <Item label="A" />
              <Item label="B" />
              <Item label="C" />
            </Flex>
          </Container>
        </Section>
      ))}
    </div>
  ),
}

/**
 * `space-between` is the go-to pattern for navigation bars and card headers —
 * one group pinned to the left, another to the right.
 *
 * ```tsx
 * <Flex justifyContent="space-between" alignItems="center">
 *   <span>Logo</span>
 *   <Flex gap="2">
 *     <Button variant="ghost">Login</Button>
 *     <Button>Sign Up</Button>
 *   </Flex>
 * </Flex>
 * ```
 */
export const SpaceBetween: Story = {
  name: 'Pattern — space-between (navbar)',
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div className="w-120">
      <div className="rounded-xl border border-gray-200 bg-white px-5 py-3 shadow-sm">
        <Flex justifyContent="space-between" alignItems="center">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-blue-600" />
            <span className="text-sm font-bold text-gray-900">QuickBill</span>
          </div>
          <Flex gap="2">
            <div className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600">
              Login
            </div>
            <div className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white">
              Sign Up
            </div>
          </Flex>
        </Flex>
      </div>
    </div>
  ),
}

/**
 * Use `className="flex-wrap"` to let items wrap to the next line instead of
 * overflowing. Useful for tag lists, badge rows, and button groups where the
 * item count is dynamic.
 *
 * ```tsx
 * <Flex gap="2" className="flex-wrap">
 *   {tags.map(tag => <Badge key={tag}>{tag}</Badge>)}
 * </Flex>
 * ```
 */
export const Wrap: Story = {
  name: 'Pattern — wrap',
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div className="w-72">
      <Container>
        <Flex gap="2" className="flex-wrap">
          {['React', 'TypeScript', 'Tailwind', 'Storybook', 'Vite', 'ESLint', 'Prettier'].map(
            (tag) => (
              <div
                key={tag}
                className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
              >
                {tag}
              </div>
            ),
          )}
        </Flex>
      </Container>
    </div>
  ),
}

/**
 * Use `className` with Tailwind responsive prefixes to switch direction at a breakpoint.
 * The pattern below stacks items vertically on mobile and switches to a row on `sm` (≥ 640 px).
 *
 * ```tsx
 * // Stacks on mobile, row on sm+
 * <Flex gap="3" className="flex-col sm:flex-row">
 *   <Card>Primary action</Card>
 *   <Card>Secondary action</Card>
 * </Flex>
 * ```
 *
 * The two containers below simulate both breakpoints side by side.
 */
export const Responsive: Story = {
  name: 'Pattern — responsive direction',
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  render: () => (
    <div className="flex w-full flex-col gap-8">
      <Section title="Mobile — flex-col (< 640 px)">
        <div className="w-72">
          <Container>
            <Flex gap="3" className="flex-col">
              <Item label="Primary Action" className="w-full" />
              <Item label="Secondary Action" className="w-full" />
            </Flex>
          </Container>
        </div>
      </Section>

      <Section title="Desktop — flex-row (≥ 640 px)">
        <div className="w-120">
          <Container>
            <Flex gap="3" className="flex-row">
              <Item label="Primary Action" className="flex-1" />
              <Item label="Secondary Action" className="flex-1" />
            </Flex>
          </Container>
        </div>
      </Section>

      <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-800">
        In your app, combine both with a responsive class:{' '}
        <code className="rounded bg-amber-100 px-1 font-mono">
          className="flex-col sm:flex-row"
        </code>
      </div>
    </div>
  ),
}

/**
 * A common pattern for form footers and dialog action bars: cancel on the left,
 * primary action on the right, filling the available width equally.
 *
 * ```tsx
 * <Flex gap="3">
 *   <Button variant="outline" className="flex-1">Cancel</Button>
 *   <Button className="flex-1">Confirm</Button>
 * </Flex>
 * ```
 */
export const EqualWidth: Story = {
  name: 'Pattern — equal-width children (flex-1)',
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div className="w-80">
      <Container>
        <Flex gap="3">
          <div className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-600">
            Cancel
          </div>
          <div className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white">
            Confirm
          </div>
        </Flex>
      </Container>
    </div>
  ),
}

/**
 * Center content both horizontally and vertically — useful for empty states,
 * loading placeholders, or hero sections.
 *
 * ```tsx
 * <Flex
 *   direction="col"
 *   justifyContent="center"
 *   alignItems="center"
 *   gap="3"
 *   className="h-64"
 * >
 *   <Icon />
 *   <p>No invoices yet</p>
 * </Flex>
 * ```
 */
export const CenterBoth: Story = {
  name: 'Pattern — center both axes',
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div className="w-80">
      <Container>
        <Flex direction="col" justifyContent="center" alignItems="center" gap="2" className="h-48">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-2xl">
            📄
          </div>
          <p className="text-sm font-medium text-gray-700">No invoices yet</p>
          <p className="text-xs text-gray-400">Create your first invoice to get started</p>
        </Flex>
      </Container>
    </div>
  ),
}
