'use client'

import * as React from 'react'
import * as SeparatorPrimitive from '@radix-ui/react-separator'

import { cn } from '@/lib/utils'

type DividerProps = React.ComponentPropsWithRef<typeof SeparatorPrimitive.Root> & {
  label?: string
  border?: 'info' | 'section'
  length?: 'full' | 'half'
  style?: 'solid' | 'dashed'
  // align the divider relative to the label
  align?: 'start' | 'center' | 'end'
}

const Divider: React.FC<DividerProps> = ({
  className,
  orientation = 'horizontal',
  border = 'info',
  decorative = true,
  label,
  length = 'full',
  style = 'solid',
  align = 'start',
  ref,
  ...props
}) => (
  <div
    className={cn('flex flex-col')}
    style={{ height: orientation === 'horizontal' ? 'auto' : '100%' }}
  >
    {label && <div className="text-qb-mist-70 block bg-white font-medium">{label}</div>}{' '}
    {style == 'solid' ? (
      <SeparatorPrimitive.Root
        ref={ref}
        decorative={decorative}
        orientation={orientation}
        className={cn(
          'shrink-0',
          align === 'start' && 'self-start',
          align === 'center' && 'self-center',
          align === 'end' && 'self-end',
          border === 'info' &&
            'bg-qb-mist-30 data-[orientation=horizontal]:h-[1px] data-[orientation=vertical]:w-[1px]',
          border === 'section' &&
            'bg-qb-mist-20 data-[orientation=horizontal]:h-2 data-[orientation=vertical]:w-2',
          length === 'full' &&
            'data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full',
          length === 'half' &&
            'data-[orientation=horizontal]:w-[50%] data-[orientation=vertical]:h-[50%]',
          className,
        )}
        {...props}
      />
    ) : (
      <div
        className={cn(
          // align
          align === 'start' && 'self-start',
          align === 'center' && 'self-center',
          align === 'end' && 'self-end',
          // length
          length === 'full' && align !== 'center' ? 'w-full' : 'w-50%',
          orientation === 'vertical' && length === 'full' && 'h-full',
          orientation === 'vertical' && length === 'half' && 'h-1/2',
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={cn(
            // length
            orientation === 'horizontal' && length === 'full' && 'w-full',
            orientation === 'horizontal' && length === 'half' && align !== 'center' && 'w-1/2',
            orientation === 'horizontal' &&
              length == 'half' &&
              (align === 'center' || align === 'end') &&
              'w-full',
            // border thickness
            orientation === 'horizontal' && border === 'info' && 'h-0.5',
            orientation === 'horizontal' && border === 'section' && 'h-2',
            orientation === 'vertical' && border === 'info' && 'w-0.5',
            orientation === 'vertical' && border === 'section' && 'w-2',
            // stroke color
            border === 'info' && 'stroke-qb-mist-30 stroke-1',
            border === 'section' && 'stroke-qb-mist-20 stroke-[8]',
            className,
          )}
        >
          <line
            x1={align === 'end' && length == 'half' ? '50%' : '0'}
            y1="1"
            x2="100%"
            y2="1"
            height={border === 'info' ? 1 : 8}
            strokeDasharray={'4,4'}
            strokeWidth={border === 'info' ? 1 : 8}
            className={cn(className)}
          />
        </svg>
      </div>
    )}
  </div>
)

export { Divider }
