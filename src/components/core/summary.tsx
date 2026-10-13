import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { Flex } from './flex'
import { TypographyContent } from './typography'

const summaryCva = cva('flex flex-col', {
  variants: {
    variant: {
      default: 'bg-qb-mist-0',
      filled: 'bg-qb-mist-10 rounded-xl py-2',
    },
    divider: {
      true: 'divide-qb-mist-30 divide-y',
      false: 'divide-none',
    },
  },
  defaultVariants: {
    variant: 'default',
    divider: false,
  },
})

export type SummaryComponentProps = {
  items: {
    key: string
    label: string | React.ReactNode
    value: React.ReactNode
    className?: string
  }[]
} & React.ComponentProps<'div'> &
  VariantProps<typeof summaryCva>

const Summary: React.FC<SummaryComponentProps> = ({ items, variant, divider, className }) => {
  return (
    <div className={cn(summaryCva({ variant, divider, className }))}>
      {items.map((item) => (
        <Flex className={cn('justify-between gap-4 px-4 py-1.5', item.className)} key={item.key}>
          {typeof item.label === 'string' ? (
            <TypographyContent>{item.label}</TypographyContent>
          ) : (
            item.label
          )}
          <TypographyContent strong className="text-right">
            {item.value}
          </TypographyContent>
        </Flex>
      ))}
    </div>
  )
}

export { Summary }
