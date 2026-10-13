'use client'
import { Switch as SwitchPrimitive } from '@base-ui/react/switch'

import { cn } from '@/lib/utils'

function Switch({ className, ...props }: SwitchPrimitive.Root.Props) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        'peer group/switch dark:aria-invalid:border-destructive/50 relative inline-flex h-[0.9rem] w-9 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none after:absolute after:-inset-x-3 after:-inset-y-2 hover:cursor-pointer',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-3',
        'aria-invalid:border-destructive aria-invalid:ring-destructive/20 aria-invalid:ring-3',
        'data-checked:bg-qb-primary/50 data-unchecked:bg-qb-mist-80/38',
        'data-disabled:cursor-not-allowed data-disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="group-data-checked/switch:bg-qb-primary pointer-events-none block size-5 rounded-full bg-white ring-0 filter-(--switch-drop-shadow) transition-transform group-data-checked/switch:translate-x-[calc(100%-2px)] group-data-unchecked/switch:-translate-x-1"
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
