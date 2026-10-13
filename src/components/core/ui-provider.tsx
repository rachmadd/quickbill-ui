'use client'
import { useRippleEffect } from '@/lib/hooks/use-ripple-effect'
import type { FC, PropsWithChildren } from 'react'
import { TooltipProvider } from '../ui/tooltip'

const QuickbillUi: FC<PropsWithChildren> = ({ children }) => {
  useRippleEffect()
  return (
    <TooltipProvider>
      <div className="quickbill-ui">{children}</div>
    </TooltipProvider>
  )
}

export { QuickbillUi }
