import {
  Case,
  DefaultCase,
  For,
  If,
  Repeat,
  Show,
  SwitchCase,
} from '@/components/core/control-flow'
import { Badge } from '@/components/ui/badge'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { SyntaxHighlighter } from 'storybook/internal/components'
import { ThemeProvider, convert, themes } from 'storybook/theming'
import { useState } from 'react'

const meta: Meta = {
  title: 'Core/Control Flow',
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj

// ---------------------------------------------------------------------------
// Layout helpers
// ---------------------------------------------------------------------------

const Page = ({ children }: { children: React.ReactNode }) => (
  <div className="mx-auto max-w-3xl space-y-12 px-8 py-10">{children}</div>
)

const Section = ({
  id,
  title,
  subtitle,
  children,
}: {
  id?: string
  title: string
  subtitle: string
  children: React.ReactNode
}) => (
  <section id={id} className="flex flex-col gap-6">
    <div className="border-b border-gray-200 pb-3">
      <h2 className="text-xl font-bold text-gray-900">{title}</h2>
      <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
    </div>
    {children}
  </section>
)

const darkTheme = convert(themes.light)

// Wraps SyntaxHighlighter in Storybook's ThemeProvider so theme.color.defaultText
// is defined even when the story renders in canvas mode (outside docs context).
const CodeBlock = ({ code }: { code: string }) => (
  <ThemeProvider theme={darkTheme}>
    <div className="m-2 rounded-xl border border-gray-200 bg-gray-50">
      <SyntaxHighlighter language="tsx" copyable padded bordered={false} format={false}>
        {code}
      </SyntaxHighlighter>
    </div>
  </ThemeProvider>
)

const ExampleBlock = ({
  title,
  description,
  code,
  children,
}: {
  title?: string
  description?: string
  code: string
  children: React.ReactNode
}) => (
  <div className="flex flex-col gap-3 overflow-hidden rounded-xl border border-gray-200 bg-white">
    {(title || description) && (
      <div className="px-5 pt-5">
        {title && <p className="text-sm font-semibold text-gray-800">{title}</p>}
        {description && <p className="mt-0.5 text-xs text-gray-500">{description}</p>}
      </div>
    )}
    <div className="px-5 pb-5">
      <div className="flex min-h-13 flex-wrap items-center gap-3 rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
        {children}
      </div>
    </div>
    <CodeBlock code={code} />
  </div>
)

const CalloutBox = ({
  type = 'info',
  children,
}: {
  type?: 'info' | 'tip' | 'warning'
  children: React.ReactNode
}) => {
  const styles = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    tip: 'bg-green-50 border-green-200 text-green-800',
    warning: 'bg-amber-50 border-amber-200 text-amber-800',
  }
  const icons = { info: 'ℹ️', tip: '💡', warning: '⚠️' }
  return (
    <div className={`flex gap-2 rounded-lg border px-4 py-3 text-xs ${styles[type]}`}>
      <span>{icons[type]}</span>
      <span>{children}</span>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Static code strings (kept outside render to avoid re-creation)
// ---------------------------------------------------------------------------

const IF_PROPS = `// Props
type IfProps = {
  condition: boolean   // When false, renders nothing
  children: ReactNode
}

// Import
import { If } from 'quickbill-ui'`

const SHOW_PROPS = `// Props
type ShowProps = {
  when: boolean        // Condition to evaluate
  fallback?: ReactNode // Rendered when 'when' is false (defaults to null)
  children: ReactNode  // Rendered when 'when' is true
}

// Import
import { Show } from 'quickbill-ui'`

const SWITCH_PROPS = `// Props
type SwitchCaseProps<T> = {
  value: T         // The value to match against
  children: ReactNode
}

type CaseProps<T> = {
  value: T         // Renders when this equals SwitchCase's value
  children: ReactNode
}

type DefaultCaseProps = {
  children: ReactNode  // Renders when no Case matches
}

// Import
import { SwitchCase, Case, DefaultCase } from 'quickbill-ui'`

const FOR_PROPS = `// Props
type ForProps<T> = {
  each: T[]                                        // The array to iterate over
  children: (item: T, index: number) => ReactNode  // Render function
  fallback?: ReactNode                             // Shown when each is empty
}

// Import
import { For } from 'quickbill-ui'`

const REPEAT_PROPS = `// Props
type RepeatProps = {
  times: number                           // How many times to render
  children: (index: number) => ReactNode  // Render function, receives 0-based index
}

// Import
import { Repeat } from 'quickbill-ui'`

const BEFORE_CODE = `{isLoggedIn && <Dashboard />}

{isLoggedIn ? <Dashboard /> : <Login />}

{status === 'loading' ? <Spinner />
  : status === 'error' ? <Error />
  : <Content />}

{items.map((item) => (
  <Item key={item.id} {...item} />
))}

{Array.from({ length: 5 }, (_, i) => (
  <Skeleton key={i} />
))}`

const AFTER_CODE = `<If condition={isLoggedIn}>
  <Dashboard />
</If>

<Show when={isLoggedIn} fallback={<Login />}>
  <Dashboard />
</Show>

<SwitchCase value={status}>
  <Case value="loading"><Spinner /></Case>
  <Case value="error"><Error /></Case>
  <DefaultCase><Content /></DefaultCase>
</SwitchCase>

<For each={items}>
  {(item) => <Item key={item.id} {...item} />}
</For>

<Repeat times={5}>
  {(i) => <Skeleton key={i} />}
</Repeat>`

// ---------------------------------------------------------------------------
// Demo data
// ---------------------------------------------------------------------------

type Status = 'idle' | 'loading' | 'success' | 'error'
type Role = 'admin' | 'editor' | 'viewer'
const FRUITS = ['Apple', 'Banana', 'Cherry', 'Durian', 'Elderberry']

// ---------------------------------------------------------------------------
// Story
// ---------------------------------------------------------------------------

/**
 * Control flow components replace raw JavaScript expressions inside JSX with
 * readable, self-documenting elements. Instead of `{condition && <A />}` or
 * `{condition ? <A /> : <B />}`, you write `<If>`, `<Show>`, `<SwitchCase>`,
 * `<For>`, and `<Repeat>` — making templates scannable without needing to
 * parse JS logic inline.
 *
 * **When to use these vs. plain JS**
 * - Prefer these components inside `return` JSX blocks where readability matters.
 * - Prefer plain JS logic (`if`, `switch`, `map`) inside helper functions or
 *   outside JSX, where there's no templating benefit.
 */
export const Showcase: Story = {
  name: 'All Control Flow Components',
  render: () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [role, setRole] = useState<Role>('viewer')
    const [status, setStatus] = useState<Status>('idle')
    const [items, setItems] = useState(FRUITS)
    const [count, setCount] = useState(3)
    const [loading, setLoading] = useState(true)

    return (
      <Page>
        {/* ---------------------------------------------------------------- */}
        {/* OVERVIEW                                                         */}
        {/* ---------------------------------------------------------------- */}
        <section className="flex flex-col gap-3">
          <h1 className="text-2xl font-bold text-gray-900">Control Flow</h1>
          <p className="text-sm leading-relaxed text-gray-600">
            A set of lightweight utility components for expressing conditional and iterative logic
            declaratively inside JSX. They have zero runtime overhead — each component simply
            returns the appropriate children or{' '}
            <code className="rounded bg-gray-100 px-1">null</code>.
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {[
              { name: 'If', desc: 'Show when condition is true' },
              { name: 'Show', desc: 'If / else with fallback' },
              { name: 'SwitchCase', desc: 'Match a value to a branch' },
              { name: 'For', desc: 'Render a list from an array' },
              { name: 'Repeat', desc: 'Render n times by index' },
            ].map(({ name, desc }) => (
              <div key={name} className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
                <code className="text-sm font-bold text-blue-700">{`<${name}>`}</code>
                <p className="mt-1 text-xs text-gray-500">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* IF                                                               */}
        {/* ---------------------------------------------------------------- */}
        <Section
          id="if"
          title="<If />"
          subtitle="Renders its children only when the condition prop evaluates to true. Nothing is rendered otherwise — no placeholder, no empty wrapper."
        >
          <CalloutBox type="info">
            <span>
              Use <code>{'<If>'}</code> when you need a single branch with no else. If you need an
              else branch, use <code>{'<Show fallback={…}>'}</code> instead.
            </span>
          </CalloutBox>

          <ExampleBlock
            title="Basic usage"
            description="The badge only appears after clicking the toggle button."
            code={`<If condition={isLoggedIn}>
  <Badge variant="default">Welcome back!</Badge>
</If>`}
          >
            <button
              onClick={() => setIsLoggedIn((v) => !v)}
              className="rounded-full bg-blue-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
            >
              {isLoggedIn ? 'Log out' : 'Log in'}
            </button>
            <If condition={isLoggedIn}>
              <Badge variant="default">Welcome back!</Badge>
            </If>
          </ExampleBlock>

          <ExampleBlock
            title="Guarding a UI section"
            description="Only admins and editors see the action buttons."
            code={`<If condition={role === 'admin' || role === 'editor'}>
  <div className="flex gap-2">
    <Button size="sm">Edit</Button>
    <Button size="sm" variant="destructive">Delete</Button>
  </div>
</If>`}
          >
            <div className="flex w-full flex-wrap items-center gap-3">
              <div className="flex gap-2">
                {(['admin', 'editor', 'viewer'] as Role[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => setRole(r)}
                    className={`rounded-full px-3 py-1 text-xs font-medium capitalize transition-colors ${role === r ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    {r}
                  </button>
                ))}
              </div>
              <If condition={role === 'admin' || role === 'editor'}>
                <div className="flex gap-2">
                  <Badge variant="default">Edit</Badge>
                  <Badge variant="destructive">Delete</Badge>
                </div>
              </If>
              <If condition={role === 'viewer'}>
                <Badge variant="secondary">Read-only access</Badge>
              </If>
            </div>
          </ExampleBlock>

          <CodeBlock code={IF_PROPS} />
        </Section>

        {/* ---------------------------------------------------------------- */}
        {/* SHOW                                                             */}
        {/* ---------------------------------------------------------------- */}
        <Section
          id="show"
          title="<Show />"
          subtitle="Renders children when the when prop is true, otherwise renders the fallback. Think of it as a ternary operator turned into JSX."
        >
          <CalloutBox type="tip">
            <span>
              <code>{'<Show>'}</code> replaces <code>{'condition ? <A /> : <B />'}</code>. Both
              branches are always declared — only one is mounted.
            </span>
          </CalloutBox>

          <ExampleBlock
            title="Basic if / else"
            description="Shows different content depending on authentication state."
            code={`<Show
  when={isLoggedIn}
  fallback={<Badge variant="secondary">Please log in</Badge>}
>
  <Badge variant="default">Dashboard</Badge>
</Show>`}
          >
            <Show when={isLoggedIn} fallback={<Badge variant="secondary">Please log in</Badge>}>
              <Badge variant="default">Dashboard</Badge>
            </Show>
            <p className="text-xs text-gray-400">← Toggle via the Log in button above</p>
          </ExampleBlock>

          <ExampleBlock
            title="Loading / loaded state"
            description="A common pattern for async data — show a skeleton while loading."
            code={`const [loading, setLoading] = useState(true)

<Show
  when={!loading}
  fallback={
    <div className="h-8 w-48 animate-pulse rounded bg-gray-200" />
  }
>
  <p>Invoice #INV-2025-001 — Rp 1.500.000</p>
</Show>`}
          >
            <div className="flex w-full flex-col gap-3">
              <Show
                when={!loading}
                fallback={<div className="h-8 w-48 animate-pulse rounded bg-gray-200" />}
              >
                <p className="text-sm font-medium">Invoice #INV-2025-001 — Rp 1.500.000</p>
              </Show>
              <button
                onClick={() => setLoading((v) => !v)}
                className="self-start rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600 hover:bg-gray-200"
              >
                Toggle loading
              </button>
            </div>
          </ExampleBlock>

          <CodeBlock code={SHOW_PROPS} />
        </Section>

        {/* ---------------------------------------------------------------- */}
        {/* SWITCH CASE                                                      */}
        {/* ---------------------------------------------------------------- */}
        <Section
          id="switch"
          title="<SwitchCase /> + <Case /> + <DefaultCase />"
          subtitle="Declarative pattern matching: renders the first <Case> whose value equals the SwitchCase value prop, or <DefaultCase> if none match."
        >
          <CalloutBox type="info">
            <span>
              Named <code>SwitchCase</code> (not <code>Switch</code>) to avoid a naming collision
              with the form toggle Switch component already exported from this library.
            </span>
          </CalloutBox>

          <ExampleBlock
            title="Request status indicator"
            description="Each status maps to a different badge variant. DefaultCase acts as the safety net."
            code={`<SwitchCase value={status}>
  <Case value="idle">
    <Badge variant="secondary">Idle</Badge>
  </Case>
  <Case value="loading">
    <Badge variant="warning">Loading…</Badge>
  </Case>
  <Case value="success">
    <Badge variant="success">Success!</Badge>
  </Case>
  <Case value="error">
    <Badge variant="destructive">Error</Badge>
  </Case>
  <DefaultCase>
    <Badge variant="secondary">Unknown</Badge>
  </DefaultCase>
</SwitchCase>`}
          >
            <div className="flex w-full flex-col gap-3">
              <div className="flex flex-wrap gap-2">
                {(['idle', 'loading', 'success', 'error'] as Status[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatus(s)}
                    className={`rounded-full px-3 py-1 text-xs font-medium capitalize transition-colors ${status === s ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <SwitchCase value={status}>
                <Case value="idle">
                  <Badge variant="secondary">Idle — waiting to start</Badge>
                </Case>
                <Case value="loading">
                  <Badge variant="warning">Loading…</Badge>
                </Case>
                <Case value="success">
                  <Badge variant="success">Success!</Badge>
                </Case>
                <Case value="error">
                  <Badge variant="destructive">Error occurred</Badge>
                </Case>
                <DefaultCase>
                  <Badge variant="secondary">Unknown status</Badge>
                </DefaultCase>
              </SwitchCase>
            </div>
          </ExampleBlock>

          <ExampleBlock
            title="Role-based UI"
            description="Render entirely different UI blocks depending on the user's role."
            code={`<SwitchCase value={role}>
  <Case value="admin">
    <p>Full access: view, edit, delete, manage users.</p>
  </Case>
  <Case value="editor">
    <p>Partial access: view and edit only.</p>
  </Case>
  <Case value="viewer">
    <p>Read-only access.</p>
  </Case>
  <DefaultCase>
    <p>No access. Contact your administrator.</p>
  </DefaultCase>
</SwitchCase>`}
          >
            <SwitchCase value={role}>
              <Case value="admin">
                <div className="text-sm">
                  <span className="font-medium">Admin:</span> Full access — view, edit, delete,
                  manage users.
                </div>
              </Case>
              <Case value="editor">
                <div className="text-sm">
                  <span className="font-medium">Editor:</span> Partial access — view and edit only.
                </div>
              </Case>
              <Case value="viewer">
                <div className="text-sm">
                  <span className="font-medium">Viewer:</span> Read-only access.
                </div>
              </Case>
              <DefaultCase>
                <div className="text-sm text-red-600">No access. Contact your administrator.</div>
              </DefaultCase>
            </SwitchCase>
          </ExampleBlock>

          <CodeBlock code={SWITCH_PROPS} />
        </Section>

        {/* ---------------------------------------------------------------- */}
        {/* FOR                                                              */}
        {/* ---------------------------------------------------------------- */}
        <Section
          id="for"
          title="<For />"
          subtitle="Renders a list from an array using a render-prop child. Automatically shows a fallback when the array is empty, replacing the common map + length check pattern."
        >
          <CalloutBox type="tip">
            <span>
              Always set a unique <code>key</code> inside the render child, just like you would with
              a regular <code>Array.map()</code>.
            </span>
          </CalloutBox>

          <ExampleBlock
            title="Removable tag list with empty fallback"
            description="Click a tag to remove it. When all are removed the fallback message appears."
            code={`<For
  each={items}
  fallback={<span className="text-sm text-gray-400">No items yet.</span>}
>
  {(item) => (
    <button key={item} onClick={() => remove(item)}>
      {item} ×
    </button>
  )}
</For>`}
          >
            <div className="flex w-full flex-col gap-3">
              <div className="flex flex-wrap gap-2">
                <For
                  each={items}
                  fallback={
                    <span className="text-sm text-gray-400 italic">
                      All items removed — fallback is shown.
                    </span>
                  }
                >
                  {(item) => (
                    <button
                      key={item}
                      onClick={() => setItems((prev) => prev.filter((i) => i !== item))}
                      className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600"
                    >
                      {item} ×
                    </button>
                  )}
                </For>
              </div>
              {items.length < FRUITS.length && (
                <button
                  onClick={() => setItems(FRUITS)}
                  className="self-start text-xs text-blue-500 underline"
                >
                  Reset
                </button>
              )}
            </div>
          </ExampleBlock>

          <ExampleBlock
            title="Index-aware rendering"
            description="The render child receives the current index as the second argument — useful for zebra stripes or separators."
            code={`<For each={invoices}>
  {(invoice, index) => (
    <div
      key={invoice.id}
      className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
    >
      <span>{invoice.number}</span>
      <span>{invoice.amount}</span>
    </div>
  )}
</For>`}
          >
            <For each={['INV-001', 'INV-002', 'INV-003']}>
              {(inv, index) => (
                <div
                  key={inv}
                  className={`flex w-full items-center justify-between rounded px-3 py-2 text-sm ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                >
                  <span className="font-mono font-medium">{inv}</span>
                  <span className="text-xs text-gray-400">row {index}</span>
                </div>
              )}
            </For>
          </ExampleBlock>

          <CodeBlock code={FOR_PROPS} />
        </Section>

        {/* ---------------------------------------------------------------- */}
        {/* REPEAT                                                           */}
        {/* ---------------------------------------------------------------- */}
        <Section
          id="repeat"
          title="<Repeat />"
          subtitle="Calls a render-prop child a fixed number of times, passing the zero-based index. Useful for skeleton loaders, star ratings, grid placeholders, and any pattern that repeats N times without a backing array."
        >
          <CalloutBox type="tip">
            <span>
              Always use the <code>index</code> argument as the <code>key</code> since there's no
              natural ID — it's stable for fixed-count renders.
            </span>
          </CalloutBox>

          <ExampleBlock
            title="Star rating display"
            description="Five stars rendered by index, coloured gold."
            code={`<Repeat times={5}>
  {(i) => (
    <span key={i} className="text-2xl text-yellow-400">★</span>
  )}
</Repeat>`}
          >
            <Repeat times={5}>
              {(i) => (
                <span key={i} className="text-2xl text-yellow-400">
                  ★
                </span>
              )}
            </Repeat>
          </ExampleBlock>

          <ExampleBlock
            title="Skeleton loader rows"
            description="Placeholder rows while data is loading. Adjust 'times' to match expected row count."
            code={`<Repeat times={count}>
  {(i) => (
    <div key={i} className="flex gap-3">
      <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
      <div className="h-4 w-40 animate-pulse rounded bg-gray-200" />
      <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
    </div>
  )}
</Repeat>`}
          >
            <div className="flex w-full flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500">Rows:</span>
                {[1, 3, 5].map((n) => (
                  <button
                    key={n}
                    onClick={() => setCount(n)}
                    className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${count === n ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    {n}
                  </button>
                ))}
              </div>
              <Repeat times={count}>
                {(i) => (
                  <div key={i} className="flex gap-3">
                    <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
                    <div className="h-4 w-40 animate-pulse rounded bg-gray-200" />
                    <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
                  </div>
                )}
              </Repeat>
            </div>
          </ExampleBlock>

          <ExampleBlock
            title="Index-based visual variation"
            description="Use the index to drive opacity, size, or colour — fading dots, progress pips, etc."
            code={`<Repeat times={5}>
  {(i) => (
    <div
      key={i}
      className="rounded-full bg-blue-500"
      style={{ width: 12 + i * 4, height: 12 + i * 4, opacity: 0.3 + i * 0.17 }}
    />
  )}
</Repeat>`}
          >
            <div className="flex items-end gap-2">
              <Repeat times={5}>
                {(i) => (
                  <div
                    key={i}
                    className="rounded-full bg-blue-500"
                    style={{ width: 12 + i * 4, height: 12 + i * 4, opacity: 0.3 + i * 0.17 }}
                  />
                )}
              </Repeat>
            </div>
          </ExampleBlock>

          <CodeBlock code={REPEAT_PROPS} />
        </Section>

        {/* ---------------------------------------------------------------- */}
        {/* BEFORE / AFTER COMPARISON                                        */}
        {/* ---------------------------------------------------------------- */}
        <section className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-gray-50 p-6">
          <h3 className="text-base font-bold text-gray-800">Quick reference — before vs. after</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p className="mb-2 text-xs font-semibold tracking-widest text-red-500 uppercase">
                Before (inline JS)
              </p>
              <CodeBlock code={BEFORE_CODE} />
            </div>
            <div>
              <p className="mb-2 text-xs font-semibold tracking-widest text-green-600 uppercase">
                After (control flow)
              </p>
              <CodeBlock code={AFTER_CODE} />
            </div>
          </div>
        </section>
      </Page>
    )
  },
}
