import { Flex } from '@/components/core/flex'
import { Typography } from '@/components/core/typography'
import { cn } from '@/lib/utils'
import type { PropsWithChildren } from 'react'

export const StoryDecorator = ({
  children,
  description,
  className,
}: PropsWithChildren<{ description?: React.ReactNode; className?: string }>) => {
  return (
    <Flex direction="col" gap="4" className={cn('rounded-lg px-4 py-2', className)}>
      {description ? <Typography>{description}</Typography> : null}
      <Flex direction="row" gap="2" alignItems="center">
        {children}
      </Flex>
    </Flex>
  )
}
