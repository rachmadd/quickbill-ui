import * as React from 'react'
import { Checkbox as CheckboxPrimitive } from '@base-ui/react/checkbox'

import { cn } from '@/lib/utils'
import { Icon } from '../icons'

function Checkbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        'peer border-qb-mist-50 relative flex size-3.75 shrink-0 items-center justify-center rounded-[4px] border-2 transition-colors outline-none after:absolute after:-inset-x-3 after:-inset-y-2',
        'focus-visible:border-ring focus-visible:ring-ring/50 [&:not([data-disabled])]:active:border-ring [&:not([data-disabled])]:active:ring-ring/30 transition focus-visible:ring-2 focus-visible:ring-offset-1 [&:not([data-disabled])]:active:ring-3',
        'aria-invalid:border-qb-negative-main aria-invalid:aria-checked:ring-qb-negative-main/70 aria-invalid:data-indeterminate:ring-qb-negative-main/70 aria-invalid:aria-checked:size-3.5 aria-invalid:aria-checked:rounded-[3px] aria-invalid:aria-checked:ring-2 aria-invalid:aria-checked:ring-offset-[1px] aria-invalid:data-indeterminate:size-3.5 aria-invalid:data-indeterminate:rounded-[3px] aria-invalid:data-indeterminate:ring-2 aria-invalid:data-indeterminate:ring-offset-[1px]',
        'data-checked:border-qb-primary data-checked:bg-qb-primary data-indeterminate:border-qb-primary data-indeterminate:bg-qb-primary data-checked:text-white',
        'data-disabled:border-qb-mist-30 group-has-disabled/field:border-qb-mist-30 [&[data-disabled][data-checked]]:bg-qb-mist-50 [&[data-disabled][data-checked]]:border-qb-mist-50 [&[data-disabled][data-indeterminate]]:bg-qb-mist-50 [&[data-disabled][data-indeterminate]]:border-qb-mist-50 data-disabled:cursor-not-allowed',
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none [&>svg]:size-3.5"
      >
        {props.indeterminate ? (
          <div className="h-[1.5px] w-2.25 rounded-[1px] bg-white" />
        ) : (
          <Icon name="CheckOutlined" />
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
