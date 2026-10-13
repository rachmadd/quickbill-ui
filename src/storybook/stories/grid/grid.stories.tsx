import { Grid } from '@/components/core/grid'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof Grid> = {
  title: 'Core/Grid',
  component: Grid,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    cols: {
      control: { type: 'number', min: 1, max: 12 },
    },
    template: {
      control: { type: 'text' },
      description: 'Raw CSS `grid-template-columns` value. Overrides `cols` when both are set.',
    },
    gap: {
      control: { type: 'select' },
      options: ['0.5', '1', '1.5', '2', '2.5', '3', '4', '5', '6', '8', '10', '12'],
    },
    rowGap: {
      control: { type: 'select' },
      options: ['0.5', '1', '1.5', '2', '2.5', '3', '4', '5', '6', '8', '10', '12'],
    },
    colGap: {
      control: { type: 'select' },
      options: ['0.5', '1', '1.5', '2', '2.5', '3', '4', '5', '6', '8', '10', '12'],
    },
    alignItems: {
      control: { type: 'select' },
      options: ['start', 'end', 'center', 'stretch', 'baseline'],
    },
    justifyItems: {
      control: { type: 'select' },
      options: ['start', 'end', 'center', 'stretch'],
    },
    children: {
      control: { disable: true },
    },
  },
}

export default meta
type Story = StoryObj<typeof Grid>

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Convert an array of 12-based fractions to a grid-template-columns string.
 *  frCols(4, 8) → "4fr 8fr"  |  frCols(3, 6, 3) → "3fr 6fr 3fr" */
const frCols = (...parts: number[]) => parts.map((n) => `${n}fr`).join(' ')

const Cell = ({
  label,
  sub,
  className = '',
}: {
  label: string
  sub?: string
  className?: string
}) => (
  <div
    className={`flex flex-col items-center justify-center gap-1 rounded-lg border border-blue-200 bg-blue-50 px-4 py-5 text-sm font-medium text-blue-700 ${className}`}
  >
    <span>{label}</span>
    {sub && <span className="text-xs font-normal text-blue-400">{sub}</span>}
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
 * Use the controls panel to interactively explore all Grid props.
 * Set `template` to a raw CSS value (e.g. `"4fr 8fr"`) to try custom column widths.
 */
export const Playground: Story = {
  args: {
    cols: 3,
    gap: '4',
  },
  render: (args) => (
    <div className="w-full max-w-2xl">
      <Grid {...args}>
        {Array.from({ length: args.cols ?? 3 }, (_, i) => (
          <Cell key={i} label={`Item ${i + 1}`} />
        ))}
      </Grid>
    </div>
  ),
}

/**
 * Equal-width columns using the `cols` prop.
 * Each column gets `1fr` of the available width automatically.
 *
 * ```tsx
 * <Grid cols={2} gap="4">…</Grid>
 * <Grid cols={3} gap="4">…</Grid>
 * <Grid cols={4} gap="4">…</Grid>
 * ```
 */
export const EqualColumns: Story = {
  name: 'cols — equal width',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex w-full flex-col gap-8">
      {[2, 3, 4].map((n) => (
        <Section key={n} title={`cols={${n}}`}>
          <Grid cols={n} gap="4">
            {Array.from({ length: n * 2 }, (_, i) => (
              <Cell key={i} label={`Item ${i + 1}`} />
            ))}
          </Grid>
        </Section>
      ))}
    </div>
  ),
}

/**
 * Use the `template` prop to set unequal column widths using any valid
 * CSS `grid-template-columns` value. The helper `"Xfr Yfr"` maps directly
 * to a 12-column fraction — e.g. `"4fr 8fr"` gives a 4/12 + 8/12 split.
 *
 * ```tsx
 * // 4/12 + 8/12
 * <Grid template="4fr 8fr" gap="4">…</Grid>
 *
 * // 3/12 + 9/12
 * <Grid template="3fr 9fr" gap="4">…</Grid>
 *
 * // 3/12 + 6/12 + 3/12
 * <Grid template="3fr 6fr 3fr" gap="4">…</Grid>
 *
 * // Fixed sidebar + flexible content
 * <Grid template="240px 1fr" gap="4">…</Grid>
 * ```
 */
export const CustomTemplate: Story = {
  name: 'template — unequal columns',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex w-full flex-col gap-8">
      <Section title='4/12 + 8/12  →  template="4fr 8fr"'>
        <Grid template={frCols(4, 8)} gap="4">
          <Cell label="4/12" sub="sidebar" />
          <Cell label="8/12" sub="content" />
        </Grid>
      </Section>

      <Section title='3/12 + 9/12  →  template="3fr 9fr"'>
        <Grid template={frCols(3, 9)} gap="4">
          <Cell label="3/12" sub="sidebar" />
          <Cell label="9/12" sub="content" />
        </Grid>
      </Section>

      <Section title='2/12 + 10/12  →  template="2fr 10fr"'>
        <Grid template={frCols(2, 10)} gap="4">
          <Cell label="2/12" sub="narrow" />
          <Cell label="10/12" sub="main" />
        </Grid>
      </Section>

      <Section title='3/12 + 6/12 + 3/12  →  template="3fr 6fr 3fr"'>
        <Grid template={frCols(3, 6, 3)} gap="4">
          <Cell label="3/12" />
          <Cell label="6/12" sub="wide center" />
          <Cell label="3/12" />
        </Grid>
      </Section>

      <Section title='2/12 + 8/12 + 2/12  →  template="2fr 8fr 2fr"'>
        <Grid template={frCols(2, 8, 2)} gap="4">
          <Cell label="2/12" />
          <Cell label="8/12" sub="content" />
          <Cell label="2/12" />
        </Grid>
      </Section>

      <Section title='4/12 + 4/12 + 4/12  →  template="4fr 4fr 4fr" (same as cols={3})'>
        <Grid template={frCols(4, 4, 4)} gap="4">
          <Cell label="4/12" />
          <Cell label="4/12" />
          <Cell label="4/12" />
        </Grid>
      </Section>
    </div>
  ),
}

/**
 * Use `template` with `px`, `minmax`, or mixed units for layouts that need
 * a fixed-size column alongside a flexible one.
 *
 * ```tsx
 * // Fixed sidebar + flexible main
 * <Grid template="240px 1fr" gap="4">…</Grid>
 *
 * // Icon column + text column
 * <Grid template="40px 1fr" gap="3">…</Grid>
 *
 * // Label + input + action button
 * <Grid template="120px 1fr 80px" gap="3">…</Grid>
 * ```
 */
export const FixedAndFlexible: Story = {
  name: 'template — fixed + flexible',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex w-full flex-col gap-8">
      <Section title='Fixed sidebar + flexible content  →  template="240px 1fr"'>
        <Grid template="240px 1fr" gap="4">
          <Cell label="240px" sub="fixed sidebar" className="py-10" />
          <Cell label="1fr" sub="flexible content" className="py-10" />
        </Grid>
      </Section>

      <Section title='Icon + label  →  template="40px 1fr"'>
        <Grid template="40px 1fr" gap="3">
          {[1, 2, 3].map((i) => (
            <>
              <Cell key={`icon-${i}`} label="🔔" className="py-2" />
              <Cell key={`text-${i}`} label={`Notification ${i}`} sub="Just now" className="py-2" />
            </>
          ))}
        </Grid>
      </Section>

      <Section title='Label + input + button  →  template="120px 1fr 80px"'>
        <Grid template="120px 1fr 80px" gap="3">
          <Cell label="Email" sub="label" className="py-2" />
          <Cell label="user@example.com" sub="input" className="py-2" />
          <Cell label="Send" sub="button" className="py-2" />
        </Grid>
      </Section>
    </div>
  ),
}

/**
 * `template="repeat(auto-fill, minmax(Xpx, 1fr))"` creates a responsive grid
 * that automatically places as many columns as fit the container width.
 * No breakpoints or media queries needed.
 *
 * ```tsx
 * <Grid template="repeat(auto-fill, minmax(160px, 1fr))" gap="4">
 *   {cards.map(card => <Card key={card.id} />)}
 * </Grid>
 * ```
 */
export const AutoFill: Story = {
  name: 'template — auto-fill (intrinsic responsive)',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex w-full flex-col gap-8">
      <Section title="auto-fill minmax(160px, 1fr)  →  items reflow as container resizes">
        <p className="text-xs text-gray-400">Resize the Storybook canvas to see columns reflow.</p>
        <Grid template="repeat(auto-fill, minmax(160px, 1fr))" gap="4">
          {Array.from({ length: 8 }, (_, i) => (
            <Cell key={i} label={`Card ${i + 1}`} className="py-6" />
          ))}
        </Grid>
      </Section>

      <Section title="auto-fill minmax(200px, 1fr)  →  fewer, wider columns">
        <Grid template="repeat(auto-fill, minmax(200px, 1fr))" gap="4">
          {Array.from({ length: 6 }, (_, i) => (
            <Cell key={i} label={`Card ${i + 1}`} className="py-6" />
          ))}
        </Grid>
      </Section>
    </div>
  ),
}

/**
 * Use Tailwind responsive prefixes via `className` to change the column count
 * at different breakpoints. The `cols` / `template` props set a base, and
 * `className` overrides at specific breakpoints.
 *
 * ```tsx
 * // 1 col on mobile, 2 on sm, 3 on lg
 * <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" gap="4">…</Grid>
 *
 * // Sidebar collapses to full-width on mobile
 * <Grid className="grid-cols-1 md:grid-cols-[240px_1fr]" gap="4">…</Grid>
 * ```
 */
export const Responsive: Story = {
  name: 'Pattern — responsive (className breakpoints)',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex w-full flex-col gap-10">
      <Section title="1 col → 2 col → 3 col (resize the canvas to see it change)">
        <p className="text-xs text-gray-400">
          {'  '}
          <code className="rounded bg-gray-100 px-1">
            className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          </code>
        </p>
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" gap="4">
          {Array.from({ length: 6 }, (_, i) => (
            <Cell key={i} label={`Item ${i + 1}`} className="py-6" />
          ))}
        </Grid>
      </Section>

      <Section title="Simulated breakpoints — side by side">
        <div className="flex flex-col gap-4">
          <div>
            <p className="mb-2 text-xs font-medium text-gray-400">Mobile — 1 column</p>
            <div className="w-64">
              <Container>
                <Grid cols={1} gap="3">
                  {Array.from({ length: 3 }, (_, i) => (
                    <Cell key={i} label={`Item ${i + 1}`} className="py-3" />
                  ))}
                </Grid>
              </Container>
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-medium text-gray-400">Tablet — 2 columns</p>
            <div className="w-96">
              <Container>
                <Grid cols={2} gap="3">
                  {Array.from({ length: 4 }, (_, i) => (
                    <Cell key={i} label={`Item ${i + 1}`} className="py-3" />
                  ))}
                </Grid>
              </Container>
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-medium text-gray-400">Desktop — 3 columns</p>
            <Container>
              <Grid cols={3} gap="3">
                {Array.from({ length: 6 }, (_, i) => (
                  <Cell key={i} label={`Item ${i + 1}`} className="py-3" />
                ))}
              </Grid>
            </Container>
          </div>
        </div>
      </Section>

      <Section title="Sidebar collapses on mobile">
        <p className="text-xs text-gray-400">
          {'  '}
          <code className="rounded bg-gray-100 px-1">
            className="grid-cols-1 md:grid-cols-[240px_1fr]"
          </code>
        </p>
        <Grid className="grid-cols-1 md:grid-cols-[240px_1fr]" gap="4">
          <Cell label="Sidebar" sub="240px on md+" className="py-10" />
          <Cell label="Main content" sub="flexible" className="py-10" />
        </Grid>
      </Section>
    </div>
  ),
}

/**
 * `rowGap` and `colGap` let you set different spacing for rows and columns independently.
 *
 * ```tsx
 * <Grid cols={3} rowGap="2" colGap="8">…</Grid>
 * ```
 */
export const AsymmetricGap: Story = {
  name: 'rowGap + colGap — asymmetric spacing',
  args: {
    cols: 3,
    rowGap: '2',
    colGap: '8',
  },
  render: (args) => (
    <Grid {...args}>
      {Array.from({ length: 6 }, (_, i) => (
        <Cell key={i} label={`Item ${i + 1}`} />
      ))}
    </Grid>
  ),
}

/**
 * Gap scale from tight to loose — use a smaller gap for dense data tables
 * and a larger gap for card grids with breathing room.
 */
export const GapScale: Story = {
  name: 'gap — scale comparison',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex w-full flex-col gap-8">
      {(['1', '3', '6', '10'] as const).map((size) => (
        <Section key={size} title={`gap="${size}"`}>
          <Grid cols={4} gap={size}>
            {Array.from({ length: 4 }, (_, i) => (
              <Cell key={i} label={`Item ${i + 1}`} />
            ))}
          </Grid>
        </Section>
      ))}
    </div>
  ),
}

/**
 * All `alignItems` values compared. Items in each row have different heights
 * so cross-axis alignment is clearly visible.
 */
export const AlignItemsComparison: Story = {
  name: 'alignItems — all values',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex w-full flex-col gap-8">
      {(['start', 'center', 'end', 'stretch'] as const).map((align) => (
        <Section key={align} title={`alignItems="${align}"`}>
          <Grid
            cols={3}
            gap="4"
            alignItems={align}
            className="h-28 rounded-lg border border-dashed border-gray-200 p-2"
          >
            <Cell label="Short" className="py-1" />
            <Cell label="Taller" className="py-6" />
            <Cell label="Medium" className="py-3" />
          </Grid>
        </Section>
      ))}
    </div>
  ),
}

/**
 * All `justifyItems` values compared. Items shrink to their intrinsic width
 * so horizontal alignment within each cell is visible.
 */
export const JustifyItemsComparison: Story = {
  name: 'justifyItems — all values',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex w-full flex-col gap-8">
      {(['start', 'center', 'end', 'stretch'] as const).map((justify) => (
        <Section key={justify} title={`justifyItems="${justify}"`}>
          <Grid
            cols={3}
            gap="4"
            justifyItems={justify}
            className="rounded-lg border border-dashed border-gray-200 p-2"
          >
            <Cell label="A" className="w-16" />
            <Cell label="BB" className="w-20" />
            <Cell label="CCC" className="w-24" />
          </Grid>
        </Section>
      ))}
    </div>
  ),
}

/**
 * A typical dashboard using named areas — a header spanning full width,
 * a sidebar on the left, main content on the right, and a full-width footer.
 *
 * ```tsx
 * <Grid
 *   template="240px 1fr"
 *   rowGap="4"
 *   colGap="6"
 * >
 *   <div className="col-span-2">Header</div>
 *   <div>Sidebar</div>
 *   <div>Main</div>
 *   <div className="col-span-2">Footer</div>
 * </Grid>
 * ```
 */
export const DashboardLayout: Story = {
  name: 'Pattern — dashboard layout',
  parameters: { controls: { disable: true } },
  render: () => (
    <Grid template="240px 1fr" rowGap="4" colGap="6" className="w-full">
      <div className="col-span-2 flex items-center justify-between rounded-xl bg-gray-900 px-6 py-4">
        <span className="text-sm font-bold text-white">QuickBill</span>
        <span className="text-xs text-gray-400">Dashboard</span>
      </div>

      <div className="flex flex-col gap-3 rounded-xl bg-gray-100 p-4">
        {['Overview', 'Invoices', 'Clients', 'Reports', 'Settings'].map((item) => (
          <div key={item} className="rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-white">
            {item}
          </div>
        ))}
      </div>

      <Grid cols={2} gap="4">
        {['Total Revenue', 'Paid Invoices', 'Pending', 'Overdue'].map((label) => (
          <div key={label} className="rounded-xl border border-gray-200 bg-white p-4">
            <p className="text-xs text-gray-400">{label}</p>
            <p className="mt-1 text-xl font-bold text-gray-900">—</p>
          </div>
        ))}
      </Grid>

      <div className="col-span-2 rounded-xl border border-gray-200 bg-white px-6 py-4 text-sm text-gray-400">
        Footer · © 2025 QuickBill
      </div>
    </Grid>
  ),
}
