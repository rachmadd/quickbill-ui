import {
  DialogRoot,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogBody,
  DialogClose,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { useState, type FC, type PropsWithChildren } from 'react'
import { Separator } from '@/components/ui/separator'
import { Button } from '../button'
import { Icon } from '@/components/icons'

type LabelWithClassname = {
  label: string
  className?: string
}

export type DialogComponentProps = PropsWithChildren<{
  title: string | LabelWithClassname
  content?: React.ReactElement
  footer?: React.ReactElement
  className?: string
  classNames?: {
    header?: string
    content?: string
    footer?: string
  }
  divider?: boolean
  contentClassName?: string
  footerClassName?: string
  showCloseButton?: boolean
  onOpenAutoFocus?: boolean
  closeOnBackdropClick?: boolean
  closePosition?: 'left' | 'right'
  closeIcon?: 'chevron-left' | 'x'
}> &
  React.ComponentProps<typeof DialogRoot>

const Dialog: FC<DialogComponentProps> = ({
  children,
  title,
  open,
  footer,
  onOpenChange,
  content,
  className,
  classNames,
  defaultOpen = false,
  closeOnBackdropClick = true,
  divider = true,
  closeIcon = 'x',
  closePosition = 'left',
  showCloseButton = true,
  ...props
}) => {
  const [localOpen, setLocalOpen] = useState(defaultOpen)

  const openState = open !== undefined ? open : localOpen

  return (
    <DialogRoot
      open={openState}
      onOpenChange={(open, eventDetails) => {
        onOpenChange?.(open, eventDetails)
        setLocalOpen(open)
      }}
      defaultOpen={defaultOpen}
      disablePointerDismissal={!closeOnBackdropClick}
      {...props}
    >
      {children && (
        <DialogTrigger nativeButton={false} render={<div role="button" />}>
          {children}
        </DialogTrigger>
      )}
      <DialogContent className={cn('w-[90%] gap-0 rounded-2xl sm:w-[600px]', className)}>
        <DialogHeader className={cn('px-4 py-3', classNames?.header)} showCloseButton={false}>
          <div
            className={cn(
              'flex items-center gap-2',
              closePosition === 'right' && 'flex-row-reverse justify-between',
            )}
          >
            {showCloseButton && (
              <DialogClose
                render={
                  <Button variant="ghost" className={'shadow-elevation-soft'} size="icon-sm">
                    <Icon
                      name={closeIcon === 'x' ? 'CloseOutlined' : 'ChevronLeftOutlined'}
                      className="pointer-events-none size-6"
                    />
                    <span className="sr-only">Close</span>
                  </Button>
                }
              />
            )}
            <DialogTitle
              className={cn(
                typeof title !== 'string' && title.className,
                'text-qb-mist-90 text-lg font-semibold',
              )}
            >
              {typeof title === 'string' ? title : title.label}
            </DialogTitle>
          </div>
        </DialogHeader>
        {divider && <Separator className="w-full" />}
        <DialogBody className={cn('p-4', classNames?.content)}>{content}</DialogBody>
        <DialogFooter
          className={cn(
            'flex flex-col gap-2 px-4 py-3 sm:flex-row sm:gap-4',
            !footer && 'pt-0',
            classNames?.footer,
          )}
        >
          {footer}
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  )
}

export { Dialog }
