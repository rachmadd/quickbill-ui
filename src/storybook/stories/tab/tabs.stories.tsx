import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Flex } from '@/components/core/flex'
import { Typography } from '@/components/core/typography'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/icons'

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A tabs component built on top of [Base UI Tabs](https://base-ui.com/react/components/tabs).
Supports horizontal/vertical orientation, two visual variants, controlled state, disabled tabs, and icon slots.

\`\`\`tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from 'quickbill-ui'

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab One</TabsTrigger>
    <TabsTrigger value="tab2">Tab Two</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content for Tab One</TabsContent>
  <TabsContent value="tab2">Content for Tab Two</TabsContent>
</Tabs>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    orientation: {
      description: 'Layout direction of the tabs',
      control: 'radio',
      options: ['horizontal', 'vertical'],
    },
    value: {
      description: 'Controlled active tab value',
      control: 'text',
    },
    defaultValue: {
      description: 'Default active tab for uncontrolled usage',
      control: 'text',
    },
    onValueChange: {
      description: 'Callback fired when the active tab changes',
      control: false,
    },
    className: {
      description: 'CSS class for the root element',
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof Tabs>

/** Basic horizontal tabs using the default pill variant. */
export const Default: Story = {
  render: () => (
    <Tabs defaultValue="tab1">
      <TabsList>
        <TabsTrigger value="tab1">Pembayaran Masuk</TabsTrigger>
        <TabsTrigger value="tab2">Pencairan Saldo</TabsTrigger>
        <TabsTrigger value="tab3">Riwayat</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" className="p-4">
        Konten untuk Pembayaran Masuk
      </TabsContent>
      <TabsContent value="tab2" className="p-4">
        Konten untuk Pencairan Saldo
      </TabsContent>
      <TabsContent value="tab3" className="p-4">
        Konten untuk Riwayat
      </TabsContent>
    </Tabs>
  ),
}

/**
 * Two `TabsList` variants side-by-side:
 * - `default` — pill background on the active tab
 * - `line` — underline indicator on the active tab
 */
export const Variants: Story = {
  render: () => (
    <Flex direction="col" gap="8">
      <Flex direction="col" gap="2">
        <Typography level="sm">variant=default</Typography>
        <Tabs defaultValue="tab1">
          <TabsList variant="default">
            <TabsTrigger value="tab1">Ringkasan</TabsTrigger>
            <TabsTrigger value="tab2">Detail</TabsTrigger>
            <TabsTrigger value="tab3">Lampiran</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" className="p-4">
            Konten Ringkasan
          </TabsContent>
          <TabsContent value="tab2" className="p-4">
            Konten Detail
          </TabsContent>
          <TabsContent value="tab3" className="p-4">
            Konten Lampiran
          </TabsContent>
        </Tabs>
      </Flex>

      <Flex direction="col" gap="2">
        <Typography level="sm">variant=line</Typography>
        <Tabs defaultValue="tab1">
          <TabsList variant="line">
            <TabsTrigger value="tab1">Ringkasan</TabsTrigger>
            <TabsTrigger value="tab2">Detail</TabsTrigger>
            <TabsTrigger value="tab3">Lampiran</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" className="p-4">
            Konten Ringkasan
          </TabsContent>
          <TabsContent value="tab2" className="p-4">
            Konten Detail
          </TabsContent>
          <TabsContent value="tab3" className="p-4">
            Konten Lampiran
          </TabsContent>
        </Tabs>
      </Flex>
    </Flex>
  ),
}

/**
 * Setting `orientation="vertical"` stacks the trigger list on the left
 * and renders the active panel to the right.
 */
export const Vertical: Story = {
  render: () => (
    <Flex direction="col" gap="8">
      <Flex direction="col" gap="2">
        <Typography level="sm">orientation=vertical, variant=default</Typography>
        <Tabs defaultValue="tab1" orientation="vertical" className="w-96">
          <TabsList variant="default">
            <TabsTrigger value="tab1">Akun</TabsTrigger>
            <TabsTrigger value="tab2">Notifikasi</TabsTrigger>
            <TabsTrigger value="tab3">Keamanan</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" className="p-4">
            Pengaturan Akun
          </TabsContent>
          <TabsContent value="tab2" className="p-4">
            Pengaturan Notifikasi
          </TabsContent>
          <TabsContent value="tab3" className="p-4">
            Pengaturan Keamanan
          </TabsContent>
        </Tabs>
      </Flex>

      <Flex direction="col" gap="2">
        <Typography level="sm">orientation=vertical, variant=line</Typography>
        <Tabs defaultValue="tab1" orientation="vertical" className="w-96">
          <TabsList variant="line">
            <TabsTrigger value="tab1">Akun</TabsTrigger>
            <TabsTrigger value="tab2">Notifikasi</TabsTrigger>
            <TabsTrigger value="tab3">Keamanan</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" className="p-4">
            Pengaturan Akun
          </TabsContent>
          <TabsContent value="tab2" className="p-4">
            Pengaturan Notifikasi
          </TabsContent>
          <TabsContent value="tab3" className="p-4">
            Pengaturan Keamanan
          </TabsContent>
        </Tabs>
      </Flex>
    </Flex>
  ),
}

/**
 * Individual `TabsTrigger` elements accept a `disabled` prop.
 * Disabled tabs cannot be focused or activated.
 */
export const DisabledTab: Story = {
  render: () => (
    <Tabs defaultValue="tab1">
      <TabsList>
        <TabsTrigger value="tab1">Aktif</TabsTrigger>
        <TabsTrigger value="tab2" disabled>
          Dinonaktifkan
        </TabsTrigger>
        <TabsTrigger value="tab3">Aktif Lainnya</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" className="p-4">
        Tab pertama aktif
      </TabsContent>
      <TabsContent value="tab2" className="p-4">
        Tab ini tidak dapat diakses
      </TabsContent>
      <TabsContent value="tab3" className="p-4">
        Tab ketiga aktif
      </TabsContent>
    </Tabs>
  ),
}

/**
 * Fully controlled tabs: the active tab is managed by the parent via `value` + `onValueChange`.
 * Useful when you need to drive tab state from external logic, URL params, or a stepper.
 */
export const Controlled: Story = {
  render: () => {
    const tabs = ['Faktur', 'Pembayaran', 'Kredit']
    const [active, setActive] = useState('Faktur')

    return (
      <Flex direction="col" gap="4">
        <Flex gap="2">
          {tabs.map((tab) => (
            <Button
              key={tab}
              variant={active === tab ? 'default' : 'outline'}
              onClick={() => setActive(tab)}
            >
              Buka {tab}
            </Button>
          ))}
        </Flex>
        <Tabs value={active} onValueChange={setActive}>
          <TabsList>
            {tabs.map((tab) => (
              <TabsTrigger key={tab} value={tab}>
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabs.map((tab) => (
            <TabsContent key={tab} value={tab} className="p-4">
              Konten untuk <strong>{tab}</strong>
            </TabsContent>
          ))}
        </Tabs>
        <Typography level="sm">
          Tab aktif: <strong>{active}</strong>
        </Typography>
      </Flex>
    )
  },
}

/**
 * `TabsTrigger` supports icon nodes as children alongside text.
 * Icons are sized automatically via the `[&_svg]:size-4` rule.
 */
export const WithIcons: Story = {
  render: () => (
    <Flex direction="col" gap="8">
      <Flex direction="col" gap="2">
        <Typography level="sm">Icons with default variant</Typography>
        <Tabs defaultValue="invoice">
          <TabsList>
            <TabsTrigger value="invoice">
              <Icon name="InvoiceOutlined" />
              Faktur
            </TabsTrigger>
            <TabsTrigger value="payment">
              <Icon name="MoneyOutlined" />
              Pembayaran
            </TabsTrigger>
            <TabsTrigger value="report">
              <Icon name="TableOutlined" />
              Laporan
            </TabsTrigger>
          </TabsList>
          <TabsContent value="invoice" className="p-4">
            Daftar Faktur
          </TabsContent>
          <TabsContent value="payment" className="p-4">
            Daftar Pembayaran
          </TabsContent>
          <TabsContent value="report" className="p-4">
            Laporan Keuangan
          </TabsContent>
        </Tabs>
      </Flex>

      <Flex direction="col" gap="2">
        <Typography level="sm">Icons with line variant</Typography>
        <Tabs defaultValue="invoice">
          <TabsList variant="line">
            <TabsTrigger value="invoice">
              <Icon name="InvoiceOutlined" />
              Faktur
            </TabsTrigger>
            <TabsTrigger value="payment">
              <Icon name="MoneyOutlined" />
              Pembayaran
            </TabsTrigger>
            <TabsTrigger value="report">
              <Icon name="TableOutlined" />
              Laporan
            </TabsTrigger>
          </TabsList>
          <TabsContent value="invoice" className="p-4">
            Daftar Faktur
          </TabsContent>
          <TabsContent value="payment" className="p-4">
            Daftar Pembayaran
          </TabsContent>
          <TabsContent value="report" className="p-4">
            Laporan Keuangan
          </TabsContent>
        </Tabs>
      </Flex>
    </Flex>
  ),
}

/**
 * Tabs with richer panel content — useful to preview how tabs look in real product layouts.
 */
export const RichContent: Story = {
  render: () => (
    <Tabs defaultValue="summary" className="w-120">
      <TabsList variant="line">
        <TabsTrigger value="summary">Ringkasan</TabsTrigger>
        <TabsTrigger value="activity">Aktivitas</TabsTrigger>
        <TabsTrigger value="settings">Pengaturan</TabsTrigger>
      </TabsList>
      <TabsContent value="summary">
        <Flex direction="col" gap="3" className="p-4">
          <Typography>Ringkasan Akun</Typography>
          <Typography level="sm" className="text-qb-mist-50">
            Total Tagihan: <strong>Rp 12.500.000</strong>
          </Typography>
          <Typography level="sm" className="text-qb-mist-50">
            Tagihan Tertunda: <strong>3 faktur</strong>
          </Typography>
          <Typography level="sm" className="text-qb-mist-50">
            Terakhir Dibayar: <strong>20 Mei 2026</strong>
          </Typography>
        </Flex>
      </TabsContent>
      <TabsContent value="activity">
        <Flex direction="col" gap="2" className="p-4">
          <Typography>Aktivitas Terbaru</Typography>
          {['Faktur #001 dibuat', 'Pembayaran #002 diterima', 'Kredit #003 diterapkan'].map(
            (item) => (
              <Typography key={item} level="sm" className="text-qb-mist-50">
                — {item}
              </Typography>
            ),
          )}
        </Flex>
      </TabsContent>
      <TabsContent value="settings">
        <Flex direction="col" gap="2" className="p-4">
          <Typography>Pengaturan</Typography>
          <Typography level="sm" className="text-qb-mist-50">
            Konfigurasi preferensi akun Anda di sini.
          </Typography>
        </Flex>
      </TabsContent>
    </Tabs>
  ),
}
