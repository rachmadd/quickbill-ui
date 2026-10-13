import {
  AlertDialogRoot,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Spinner } from '@/components/ui/spinner'
import { cn } from '@/lib/utils'
import React, { useState, type FC, type PropsWithChildren } from 'react'
import { buttonVariants } from '../button'
import type { AlertDialogRootProps } from '@base-ui/react'

type LabelWithClassname = {
  label: string
  className?: string
}

export type AlertDialogComponentProps = PropsWithChildren<{
  title: string | LabelWithClassname
  media?: React.ReactElement
  content?: string | LabelWithClassname | React.ReactElement
  confirm?: {
    label: string
    variant?: keyof typeof buttonVariants
  }
  cancel?: {
    label: string
    variant?: keyof typeof buttonVariants
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onConfirm?: () => Promise<any> | void
  onCancel?: () => void
  onOpenChange?: (open: boolean) => void
  showCancel?: boolean
  prefixContent?: React.ReactElement
  suffixContent?: React.ReactElement
  className?: string
}> &
  Omit<React.ComponentProps<FC<AlertDialogRootProps>>, 'onOpenChange'>

const AlertDialog: FC<AlertDialogComponentProps> = ({
  children,
  media,
  title,
  content,
  open,
  onOpenChange,
  onConfirm,
  onCancel,
  prefixContent,
  suffixContent,
  confirm = {
    label: 'OK',
  },
  cancel = {
    label: 'Cancel',
  },
  defaultOpen = false,
  showCancel = true,
  className,
}) => {
  const [localOpen, setLocalOpen] = useState(defaultOpen)
  const [loading, setLoading] = useState(false)

  const openState = open !== undefined ? open : localOpen

  return (
    <AlertDialogRoot
      open={openState}
      onOpenChange={(open) => {
        onOpenChange?.(open)
        setLocalOpen(open)
        if (!open) {
          onCancel?.()
        }
      }}
      defaultOpen={defaultOpen}
    >
      {children && (
        <AlertDialogTrigger nativeButton={false} render={<div role="button" />}>
          {children}
        </AlertDialogTrigger>
      )}
      <AlertDialogContent className={cn('w-[90%] gap-2 rounded-2xl p-6 sm:w-150', className)}>
        <AlertDialogHeader className="gap-4">
          <AlertDialogMedia className="w-32 sm:w-41">{media}</AlertDialogMedia>
          <AlertDialogTitle
            className={cn(
              typeof title !== 'string' && title.className,
              'text-qb-mist-90 text-center text-lg font-semibold md:text-2xl',
            )}
          >
            {typeof title === 'string' ? title : title.label}
          </AlertDialogTitle>
        </AlertDialogHeader>

        <div className="flex flex-col gap-1">
          {prefixContent}
          {content && (
            <AlertDialogDescription
              className={cn(
                typeof content !== 'string' && !React.isValidElement(content) && content.className,
                'text-qb-mist-70 text-center text-sm font-normal md:text-lg',
              )}
            >
              {typeof content === 'string' || React.isValidElement(content)
                ? content
                : content.label}
            </AlertDialogDescription>
          )}
          {suffixContent}
        </div>
        <AlertDialogFooter className="flex flex-col gap-2 sm:flex-row sm:gap-4">
          {showCancel && (
            <AlertDialogCancel
              disabled={loading}
              size={'lg'}
              variant={cancel.variant}
              className="order-first flex-1"
            >
              {cancel.label}
            </AlertDialogCancel>
          )}
          <AlertDialogAction
            className="flex-1"
            size={'lg'}
            variant={confirm.variant}
            disabled={loading}
            onClick={(e) => {
              if (onConfirm) {
                e.preventDefault()
                setLoading(true)

                Promise.resolve(onConfirm())
                  .then(() => {
                    onOpenChange?.(false)
                    setLocalOpen(false)
                  })
                  .catch((err) => {
                    console.error('[AlertDialog] Error occured', err)
                    onOpenChange?.(false)
                    setLocalOpen(false)
                  })
                  .finally(() => {
                    setLoading(false)
                  })
              } else {
                onOpenChange?.(false)
                setLocalOpen(false)
              }
            }}
          >
            {loading ? <Spinner className="text-white" /> : confirm.label}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogRoot>
  )
}

export { AlertDialog }
