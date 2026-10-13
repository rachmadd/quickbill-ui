import type { FC } from 'react'
import {
  EmptyBase,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  emptyMediaVariants,
  EmptyTitle,
} from '../empty'
import type React from 'react'
import type { VariantProps } from 'class-variance-authority'

type CustomizeLabel = {
  label: string
  className?: string
}

export type EmptyComponentProps = {
  title: string | CustomizeLabel
  description?: string | CustomizeLabel
  media?: React.ReactNode
  mediaVariant?: VariantProps<typeof emptyMediaVariants>['variant']
  action?: React.ReactNode
  content?: React.ReactNode
  className?: string
}

const Empty: FC<EmptyComponentProps> = ({
  title,
  description,
  mediaVariant,
  media,
  content,
  action,
  className,
}) => {
  return (
    <EmptyBase className={className}>
      <EmptyHeader>
        <EmptyMedia variant={mediaVariant}>{media}</EmptyMedia>
        {typeof title === 'string' ? (
          <EmptyTitle>{title}</EmptyTitle>
        ) : (
          <EmptyTitle className={title.className}>{title.label}</EmptyTitle>
        )}
        {description && (
          <>
            {typeof description === 'string' ? (
              <EmptyDescription>{description}</EmptyDescription>
            ) : (
              <EmptyDescription className={description.className}>
                {description.label}
              </EmptyDescription>
            )}
          </>
        )}
      </EmptyHeader>
      <EmptyContent>{content}</EmptyContent>
      {action}
    </EmptyBase>
  )
}

export { Empty }
