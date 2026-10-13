import { cn } from '@/lib/utils'
import type { CSSProperties, PropsWithChildren } from 'react'
import React from 'react'

type GridGap =
  | '0.5'
  | '1'
  | '1.5'
  | '2'
  | '2.5'
  | '3'
  | '3.5'
  | '4'
  | '4.5'
  | '5'
  | '5.5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12'

type GridProps = {
  cols?: number
  /** Raw CSS `grid-template-columns` value. Takes precedence over `cols` when both are set.
   * Use this for unequal column widths, fixed sidebars, or auto-fill patterns.
   * @example "4fr 8fr"                            // 1/3 + 2/3
   * @example "240px 1fr"                          // fixed sidebar + flexible content
   * @example "repeat(auto-fill, minmax(200px, 1fr))" // responsive auto-fill
   */
  template?: string
  gap?: GridGap
  rowGap?: GridGap
  colGap?: GridGap
  alignItems?: CSSProperties['alignItems']
  justifyItems?: CSSProperties['justifyItems']
  className?: string
  style?: CSSProperties
}

const gapClass: Record<GridGap, string> = {
  '0.5': 'gap-0.5',
  '1': 'gap-1',
  '1.5': 'gap-1.5',
  '2': 'gap-2',
  '2.5': 'gap-2.5',
  '3': 'gap-3',
  '3.5': 'gap-3.5',
  '4': 'gap-4',
  '4.5': 'gap-4.5',
  '5': 'gap-5',
  '5.5': 'gap-5.5',
  '6': 'gap-6',
  '7': 'gap-7',
  '8': 'gap-8',
  '9': 'gap-9',
  '10': 'gap-10',
  '11': 'gap-11',
  '12': 'gap-12',
}

const rowGapClass: Record<GridGap, string> = {
  '0.5': 'gap-y-0.5',
  '1': 'gap-y-1',
  '1.5': 'gap-y-1.5',
  '2': 'gap-y-2',
  '2.5': 'gap-y-2.5',
  '3': 'gap-y-3',
  '3.5': 'gap-y-3.5',
  '4': 'gap-y-4',
  '4.5': 'gap-y-4.5',
  '5': 'gap-y-5',
  '5.5': 'gap-y-5.5',
  '6': 'gap-y-6',
  '7': 'gap-y-7',
  '8': 'gap-y-8',
  '9': 'gap-y-9',
  '10': 'gap-y-10',
  '11': 'gap-y-11',
  '12': 'gap-y-12',
}

const colGapClass: Record<GridGap, string> = {
  '0.5': 'gap-x-0.5',
  '1': 'gap-x-1',
  '1.5': 'gap-x-1.5',
  '2': 'gap-x-2',
  '2.5': 'gap-x-2.5',
  '3': 'gap-x-3',
  '3.5': 'gap-x-3.5',
  '4': 'gap-x-4',
  '4.5': 'gap-x-4.5',
  '5': 'gap-x-5',
  '5.5': 'gap-x-5.5',
  '6': 'gap-x-6',
  '7': 'gap-x-7',
  '8': 'gap-x-8',
  '9': 'gap-x-9',
  '10': 'gap-x-10',
  '11': 'gap-x-11',
  '12': 'gap-x-12',
}

const Grid = React.forwardRef<
  HTMLDivElement,
  PropsWithChildren<GridProps & React.HTMLAttributes<HTMLDivElement>>
>((props, ref) => {
  const {
    cols,
    template,
    gap,
    rowGap,
    colGap,
    alignItems,
    justifyItems,
    children,
    className,
    style,
    ...divProps
  } = props

  const gridTemplateColumns = template ?? (cols ? `repeat(${cols}, minmax(0, 1fr))` : undefined)

  return (
    <div
      ref={ref}
      className={cn(
        'grid',
        gap && gapClass[gap],
        rowGap && rowGapClass[rowGap],
        colGap && colGapClass[colGap],
        className,
      )}
      style={{
        gridTemplateColumns,
        alignItems,
        justifyItems,
        ...style,
      }}
      {...divProps}
    >
      {children}
    </div>
  )
})

Grid.displayName = 'Grid'

export { Grid, type GridProps, type GridGap }
