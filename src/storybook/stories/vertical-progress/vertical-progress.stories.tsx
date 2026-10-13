import { TypographyContent } from '@/components/core/typography'
import { VerticalProgress } from '@/components/core/vertical-progress'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof VerticalProgress> = {
  title: 'Components/VerticalProgress',
  component: VerticalProgress,
}

export default meta
type Story = StoryObj<typeof VerticalProgress>

export const Default: Story = {
  args: {
    items: [
      {
        key: '1',
        variant: 'info',
        content: (
          <div className="flex flex-col pb-4">
            <TypographyContent strong>Payment Attempt</TypographyContent>
            <TypographyContent className="text-qb-muted-foreground">
              18 Dec 2025, 13:00:00
            </TypographyContent>
          </div>
        ),
      },
      {
        key: '2',
        variant: 'warning',
        content: (
          <div className="flex flex-col pb-4">
            <TypographyContent strong>Processing Payment</TypographyContent>
            <TypographyContent className="text-qb-muted-foreground">
              18 Dec 2025, 13:01:00
            </TypographyContent>
          </div>
        ),
      },
      {
        key: '3',
        variant: 'error',
        content: (
          <div className="flex flex-col pb-4">
            <TypographyContent strong>Payment Failed</TypographyContent>
            <TypographyContent className="text-qb-muted-foreground">
              18 Dec 2025, 13:05:00
            </TypographyContent>
            <TypographyContent>Reason: Insufficent Balance</TypographyContent>
          </div>
        ),
      },
      {
        key: '3',
        variant: 'success',
        content: (
          <div className="flex flex-col pb-4">
            <TypographyContent strong>Payment Success</TypographyContent>
            <TypographyContent className="text-qb-muted-foreground">
              18 Dec 2025, 13:05:00
            </TypographyContent>
            <TypographyContent>Amount: Rp. 1.000.000</TypographyContent>
          </div>
        ),
      },
    ],
  },
}
