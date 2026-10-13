'use client'

import React, { type PropsWithChildren, useCallback, useState } from 'react'
import type { AlertDialogComponentProps } from '../ui/composed/alert-dialog'
import { cn } from '@/lib/utils'
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
  createAlertDialogHandle,
} from '../ui/alert-dialog'
import { Spinner } from '../ui/spinner'

type ConfirmationProps = Omit<
  AlertDialogComponentProps,
  'open' | 'onOpenChange' | 'defaultOpen' | 'children'
>

export const alertDialogHandle = createAlertDialogHandle<ConfirmationProps>()

const AlertDialogProvider = (props: PropsWithChildren) => {
  return (
    <>
      {props.children}
      <SharedAlertDialog />
    </>
  )
}

const SharedAlertDialog = () => {
  const [loading, setLoading] = useState(false)

  return (
    <AlertDialogRoot defaultOpen={false} handle={alertDialogHandle}>
      {({ payload }) => {
        if (!payload) return null
        const {
          title,
          className,
          confirm = { label: 'OK' },
          cancel = { label: 'Cancel' },
          onConfirm,
          media,
          suffixContent,
          prefixContent,
          content,
          showCancel = true,
          onCancel,
        } = payload
        return (
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
                    typeof content !== 'string' &&
                      !React.isValidElement(content) &&
                      content.className,
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
                  variant={cancel.variant}
                  className="order-first flex-1"
                  size="lg"
                  onClick={() => {
                    onCancel?.()
                  }}
                >
                  {cancel.label}
                </AlertDialogCancel>
              )}
              <AlertDialogAction
                className="flex-1"
                variant={confirm.variant}
                size="lg"
                disabled={loading}
                onClick={(e) => {
                  if (onConfirm) {
                    e.preventDefault()
                    setLoading(true)

                    Promise.resolve(onConfirm())
                      .then(() => {
                        alertDialogHandle.close()
                      })
                      .catch((err) => {
                        console.error('[ConfirmationDialog] Error occured', err)
                        alertDialogHandle.close()
                      })
                      .finally(() => {
                        setLoading(false)
                      })
                  } else {
                    alertDialogHandle.close()
                  }
                }}
              >
                {loading ? <Spinner className="text-white" /> : confirm.label}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        )
      }}
    </AlertDialogRoot>
  )
}

const useAlertDialog = () => {
  const alert = useCallback(
    (props: ConfirmationProps) => alertDialogHandle.openWithPayload(props),
    [],
  )
  return { alert }
}

export { useAlertDialog, AlertDialogProvider }
