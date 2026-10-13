import { useState, type ComponentProps, type CSSProperties, type PropsWithChildren } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { toast } from 'sonner'
import { InfoBox } from '@/components/core/infobox'
import { TypographyContent } from '@/components/core/typography'
import { VerticalProgress } from '@/components/core/vertical-progress'
import { Icon } from '@/components/icons'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Checkbox } from '@/components/ui/checkbox'
import { Dropdown, type DropdownItem } from '@/components/ui/composed/dropdown'
import InputCurrency from '@/components/ui/composed/input-currency'
import { DataTable, type TableColumn } from '@/components/ui/data-table'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

type Invoice = {
  invoiceNo: string
  customer: string
  amount: string
  status: 'PAID' | 'PENDING' | 'OVERDUE'
}

const INVOICES: Invoice[] = [
  { invoiceNo: 'INV-2041', customer: 'Aurora Studio', amount: 'Rp 12.500.000', status: 'PAID' },
  { invoiceNo: 'INV-2042', customer: 'Kopi Senja', amount: 'Rp 3.200.000', status: 'PENDING' },
  { invoiceNo: 'INV-2043', customer: 'Nusa Logistik', amount: 'Rp 48.900.000', status: 'PAID' },
  { invoiceNo: 'INV-2044', customer: 'Bata Digital', amount: 'Rp 7.750.000', status: 'OVERDUE' },
]

const STATUS_BADGE_VARIANT = {
  PAID: 'success',
  PENDING: 'warning',
  OVERDUE: 'destructive',
} as const

const INVOICE_COLUMNS: TableColumn<Invoice, unknown>[] = [
  { accessorKey: 'invoiceNo', header: 'Invoice' },
  { accessorKey: 'customer', header: 'Customer' },
  { accessorKey: 'amount', header: 'Amount' },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <Badge variant={STATUS_BADGE_VARIANT[row.original.status]}>{row.original.status}</Badge>
    ),
  },
]

const INVOICE_ACTIONS = {
  shortcut: [
    {
      key: 'approve',
      label: 'Approve',
      icon: <Icon name="CheckOutlined" className="text-qb-success-main" />,
      onClick: (row: { original: Invoice }) => toast.success(`${row.original.invoiceNo} approved`),
    },
  ],
  dropdown: [
    {
      key: 'copy',
      label: 'Copy reference ID',
      icon: <Icon name="CopyOutlined" />,
      onClick: (row: { original: Invoice }) => toast.info(`Copied ${row.original.invoiceNo}`),
    },
  ],
}

const WORKSPACE_MENU_ITEMS: DropdownItem[] = [
  { label: 'Create invoice' },
  { label: 'Send reminder' },
  { label: 'Export to CSV' },
  { label: 'Archive' },
]

const BACKDROP_STYLE: CSSProperties = {
  backgroundColor: '#0a1030',
  backgroundImage: [
    'radial-gradient(60% 50% at 15% 10%, rgba(59,130,246,0.55) 0%, transparent 70%)',
    'radial-gradient(50% 45% at 90% 20%, rgba(168,85,247,0.45) 0%, transparent 70%)',
    'radial-gradient(55% 50% at 50% 100%, rgba(14,165,233,0.35) 0%, transparent 70%)',
  ].join(','),
}

const GRID_MASK = 'radial-gradient(ellipse at 50% 20%, black 20%, transparent 75%)'

const GRID_STYLE: CSSProperties = {
  backgroundImage:
    'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
  backgroundSize: '44px 44px',
  maskImage: GRID_MASK,
  WebkitMaskImage: GRID_MASK,
}

const Panel = ({
  title,
  className,
  children,
}: PropsWithChildren<{ title: string; className?: string }>) => (
  <section
    className={cn(
      'flex flex-col gap-4 rounded-2xl bg-white/95 p-6 shadow-2xl ring-1 shadow-black/30 ring-white/30 backdrop-blur',
      className,
    )}
  >
    <h3 className="text-qb-mist-70 text-xs font-semibold tracking-wider uppercase">{title}</h3>
    {children}
  </section>
)

const Hero = () => (
  <header className="flex flex-col items-center gap-5 text-center text-white">
    <h1 className="flex items-center gap-4">
      <img src="/logo/dark-horizontal.svg" alt="Quickbill" className="h-16 md:h-20" />
      <span className="text-6xl leading-none font-light tracking-wide md:text-7xl">UI</span>
    </h1>
    <p className="max-w-2xl text-lg text-white/70">
      A React component library that extends shadcn/ui with Quickbill design tokens. Accessible,
      composable building blocks, from simple buttons to data tables and payment-ready inputs.
    </p>
    <div className="flex gap-3">
      <Button size="lg">Get started</Button>
      <Button size="lg" variant="outline">
        Browse components
      </Button>
    </div>
  </header>
)

const InvoicesPanel = () => (
  <Panel title="Data table" className="lg:col-span-2">
    <DataTable columns={INVOICE_COLUMNS} data={INVOICES} actions={INVOICE_ACTIONS} />
  </Panel>
)

const TimelineEntry = ({
  title,
  time,
  detail,
}: {
  title: string
  time: string
  detail?: string
}) => (
  <div className="flex flex-col pb-4">
    <TypographyContent strong>{title}</TypographyContent>
    <TypographyContent className="text-qb-muted-foreground">{time}</TypographyContent>
    {detail ? <TypographyContent>{detail}</TypographyContent> : null}
  </div>
)

const PAYMENT_TIMELINE_ITEMS: ComponentProps<typeof VerticalProgress>['items'] = [
  {
    key: 'attempt',
    variant: 'info',
    content: <TimelineEntry title="Payment Attempt" time="18 Dec 2025, 13:00:00" />,
  },
  {
    key: 'processing',
    variant: 'warning',
    content: <TimelineEntry title="Processing Payment" time="18 Dec 2025, 13:01:00" />,
  },
  {
    key: 'failed',
    variant: 'error',
    content: (
      <TimelineEntry
        title="Payment Failed"
        time="18 Dec 2025, 13:05:00"
        detail="Reason: Insufficent Balance"
      />
    ),
  },
  {
    key: 'success',
    variant: 'success',
    content: (
      <TimelineEntry
        title="Payment Success"
        time="18 Dec 2025, 13:05:00"
        detail="Amount: Rp. 1.000.000"
      />
    ),
  },
]

const TimelinePanel = () => (
  <Panel title="Vertical progress">
    <VerticalProgress items={PAYMENT_TIMELINE_ITEMS} />
  </Panel>
)

const DropdownPanel = () => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <Panel title="Dropdown" className="min-h-72">
      <Dropdown
        items={WORKSPACE_MENU_ITEMS}
        open={isOpen}
        onOpenChange={setIsOpen}
        modal={false}
        overlay={false}
        align="start"
      >
        <Button variant="outline" className="self-start">
          Actions
          <Icon name="ChevronDownOutlined" />
        </Button>
      </Dropdown>
    </Panel>
  )
}

const FeedbackPanel = () => (
  <Panel title="Feedback" className="lg:col-span-2">
    <InfoBox variant="success" title="Invoice sent" description="Your customer got it by email." />
    <InfoBox variant="warning" title="Payment pending" description="Reminder goes out in 2 days." />
    <InfoBox variant="error" title="Payment failed" description="The card was declined." />
    <div className="flex flex-wrap items-center gap-2">
      <Button onClick={() => toast.success('Payment link copied')}>Show a toast</Button>
      <Badge variant="honeycomb">New</Badge>
      <Badge variant="secondary">Draft</Badge>
    </div>
  </Panel>
)

const FormPanel = () => {
  const [amount, setAmount] = useState('1500000')
  const [isNotifyOn, setIsNotifyOn] = useState(true)

  return (
    <Panel title="Fields">
      <InputCurrency value={amount} onChange={(_, maskedValue) => setAmount(maskedValue)} />
      <label className="flex items-center gap-2 text-sm">
        <Switch checked={isNotifyOn} onCheckedChange={setIsNotifyOn} />
        Email notifications
      </label>
      <label className="flex items-center gap-2 text-sm">
        <Checkbox defaultChecked />
        Remember this customer
      </label>
    </Panel>
  )
}

const TabsPanel = () => (
  <Panel title="Tabs and accordion" className="lg:col-span-2">
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="pt-3 text-sm">
        Tabs are built on Base UI with full keyboard support.
      </TabsContent>
      <TabsContent value="activity" className="pt-3 text-sm">
        Recent activity shows up here.
      </TabsContent>
      <TabsContent value="settings" className="pt-3 text-sm">
        Configure the workspace.
      </TabsContent>
    </Tabs>
    <Accordion defaultValue={['what']}>
      <AccordionItem value="what">
        <AccordionTrigger>What is Quickbill UI?</AccordionTrigger>
        <AccordionContent>shadcn/ui, tuned with Quickbill design tokens.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="how">
        <AccordionTrigger>How do I install it?</AccordionTrigger>
        <AccordionContent>Run npm install quickbill-ui.</AccordionContent>
      </AccordionItem>
    </Accordion>
  </Panel>
)

const CalendarPanel = () => {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <Panel title="Calendar" className="items-center">
      <Calendar mode="single" selected={date} onSelect={setDate} />
    </Panel>
  )
}

const Landing = () => (
  <div className="relative min-h-screen w-full overflow-hidden" style={BACKDROP_STYLE}>
    <div className="pointer-events-none absolute inset-0" style={GRID_STYLE} />
    <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-14 px-6 py-16">
      <Hero />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <InvoicesPanel />
        <FormPanel />
        <FeedbackPanel />
        <div className="flex flex-col gap-6">
          <TimelinePanel />
          <DropdownPanel />
        </div>
        <TabsPanel />
        <CalendarPanel />
      </div>
    </div>
  </div>
)

const meta: Meta<typeof Landing> = {
  title: 'Quickbill UI',
  component: Landing,
  parameters: { layout: 'fullscreen' },
}

export default meta
type Story = StoryObj<typeof Landing>

export const Overview: Story = {}
