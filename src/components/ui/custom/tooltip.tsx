import { type FC, type PropsWithChildren, useEffect, useState } from 'react'
import { TooltipRoot, TooltipContent, TooltipTrigger } from '../tooltip'
import { cn } from '@/lib/utils'
import { Popover, PopoverContent, PopoverTrigger } from '../popover'

type TooltipComponentProps = Omit<React.ComponentProps<typeof TooltipContent>, 'content'> & {
  content: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  /**
   * The duration from when the pointer enters the trigger until the tooltip gets opened. This will
   * override the prop with the same name passed to Provider.
   * @defaultValue 700
   */
  delayDuration?: number
  /**
   * When `true`, trying to hover the content will result in the tooltip closing as the pointer leaves the trigger.
   * @defaultValue false
   */
  disableHoverableContent?: boolean
  arrow?: boolean
}

const Tooltip: FC<PropsWithChildren<TooltipComponentProps>> = ({
  children,
  content,
  open,
  defaultOpen,
  onOpenChange,
  delayDuration,
  disableHoverableContent,
  arrow,
  ...contentProps
}) => {
  const [isTouch, setIsTouch] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const mediaQuery = window.matchMedia('(pointer: coarse)')

    const handleChange = (event: MediaQueryListEvent) => {
      setIsTouch(event.matches)
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsTouch(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleChange)

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [])

  const { className, sideOffset = 4, ...restContentProps } = contentProps

  if (isTouch) {
    return (
      <Popover open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
        <PopoverTrigger nativeButton={false} render={<div />}>
          {children}
        </PopoverTrigger>
        <PopoverContent
          sideOffset={sideOffset}
          className={cn(
            'bg-qb-mist-60 animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md border-0 px-3 py-1.5 text-xs text-balance text-white ring-0 outline-none focus-visible:ring-0 focus-visible:outline-none',
            className,
          )}
          side={'bottom'}
          collisionBoundary={'clipping-ancestors'}
        >
          {content}
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <TooltipRoot
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      disableHoverablePopup={disableHoverableContent}
    >
      <TooltipTrigger render={<div />} delay={delayDuration}>
        {children}
      </TooltipTrigger>
      <TooltipContent
        {...restContentProps}
        className={className}
        sideOffset={sideOffset}
        arrow={arrow}
      >
        {content}
      </TooltipContent>
    </TooltipRoot>
  )
}

export { Tooltip }
