import React from 'react'
import { TypographyContent } from '@/components/core/typography'
import { cn } from '@/lib/utils'

export interface DataEntryClassNames {
  label?: string
  value?: string
}

export interface DataEntryProps {
  label: string
  value?: React.ReactNode | React.ReactNode[]
  renderValue?: (value: React.ReactNode) => React.ReactNode
  orientation?: 'vertical' | 'horizontal'
  className?: string
  classNames?: DataEntryClassNames
  showPlaceholder?: boolean
}

export function DataEntry({
  label,
  value,
  renderValue,
  orientation = 'vertical',
  className,
  classNames,
  showPlaceholder = true,
}: DataEntryProps) {
  const isEmpty = value === undefined || value === null || value === ''
  const shouldHideValue = isEmpty && !showPlaceholder && !renderValue

  const renderSingleValue = (value: React.ReactNode) => {
    if (renderValue) return renderValue(value)

    if (typeof value === 'string') {
      return (
        <TypographyContent
          level="md"
          strong
          className={cn('wrap-break-words text-qb-mist-90', classNames?.value)}
        >
          {value || '-'}
        </TypographyContent>
      )
    }

    return value
  }

  const renderedValue = (() => {
    if (shouldHideValue) return null

    if (Array.isArray(value)) {
      const items = value.length > 0 ? value : showPlaceholder ? ['-'] : []
      return items.map((item, index) => (
        <React.Fragment key={index}>{renderSingleValue(item)}</React.Fragment>
      ))
    }

    const resolvedValue = value ?? '-'
    return renderSingleValue(resolvedValue)
  })()

  return (
    <div
      className={cn(
        'flex gap-1',
        orientation === 'vertical' ? 'flex-col' : 'flex-row items-center',
        className,
      )}
    >
      <TypographyContent level="sm" className={cn('text-qb-mist-70', classNames?.label)}>
        {label}
      </TypographyContent>
      {renderedValue}
    </div>
  )
}
