import { Toaster as Sonner, type ToasterProps } from 'sonner'
import type { CSSProperties } from 'react'
import { Icon } from '../icons'
import { cn } from '@/lib/utils'

export type QuickbillToasterProps = ToasterProps & {
  toastWidth?: number | string
}

const Toaster = ({
  toastWidth,
  toastOptions,
  position: positionProp,
  ...props
}: QuickbillToasterProps) => {
  const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 0
  const isMobile = screenWidth < 640
  const position = positionProp ?? (isMobile ? 'bottom-left' : 'top-center')
  const isCenteredPlacement = position.includes('center')
  const resolvedToastWidth =
    toastWidth === undefined
      ? undefined
      : typeof toastWidth === 'number'
        ? `${toastWidth}px`
        : toastWidth

  const mergedToastOptions: ToasterProps['toastOptions'] = {
    unstyled: true,
    closeButton: true,
    ...toastOptions,
    style: {
      ...toastOptions?.style,
    },
    classNames: {
      title: 'font-medium text-[16px] leading-[24px]',
      description: 'font-normal text-[14px]',
      icon: 'mt-0.5 mr-2',
      cancelButton:
        'group-[.toast]:bg-qb-muted group-[.toast]:text-qb-muted-foreground group-[.toast]:ml-10',
      actionButton:
        'uppercase font-semibold text-xs ml-10 mr-2 align-top hover:cursor-pointer h-[min-content] mt-1 tracking-wide',
      closeButton:
        'group-[.toast]:!bg-transparent group-[.toast]:!border-none order-last text-xl h-[min-content] mt-0.5 [&>svg]:w-[18px] [&>svg]:h-[18px] ml-auto hover:cursor-pointer',
      loader: '!left-6',
      default:
        'group-[.toaster]:bg-white group-[.toaster]:shadow-md group-[.toaster]:border group-[.toaster]:border-qb-mist-20 group-[.toaster]:text-qb-mist-90',
      loading:
        'group-[.toaster]:!bg-qb-mist-60 group-[.toaster]:shadow-md group-[.toaster]:pl-8.5 group-[.toaster]:text-white group-[.toaster]:border-none',
      error:
        'group-[.toaster]:!bg-[#D32F2F] group-[.toaster]:shadow-md group-[.toaster]:text-white group-[.toaster]:border-none',
      success:
        'group-[.toaster]:!bg-[#34A853] group-[.toaster]:shadow-md group-[.toaster]:text-white group-[.toaster]:border-none',
      info: 'group-[.toaster]:!bg-[#0288D1] group-[.toaster]:shadow-md group-[.toaster]:text-white group-[.toaster]:border-none',
      warning:
        'group-[.toaster]:!bg-[#EF6C00] group-[.toaster]:shadow-md group-[.toaster]:text-white group-[.toast]:text-qb-mist-90 group-[.toaster]:border-none',
      ...toastOptions?.classNames,
      toast: cn(
        'toast relative flex w-full gap-1 rounded-md px-4 py-2 text-sm group-[.toaster]:-ml-[0.5px]',
        isCenteredPlacement ? 'mx-auto' : 'mx-0',
        toastOptions?.classNames?.toast,
      ),
    },
  }
  return (
    <Sonner
      theme="light"
      className="toaster group quickbill-ui"
      position={position}
      visibleToasts={3}
      icons={{
        success: <Icon name="CheckCircleOutlined" size={22} />,
        info: <Icon name="InfoOutlined" size={22} />,
        warning: <Icon name="WarningAmberOutlined" size={22} />,
        error: <Icon name="ErrorOutlined" size={22} />,
        loading: (
          <Icon name="DualCircularIndeterminateProgress" size={22} className="animate-spin" />
        ),
      }}
      style={
        {
          '--normal-bg': 'var(--qb-mist-0)',
          '--normal-text': 'var(--qb-mist-70)',
          '--normal-border': 'var(--qb-border)',
          '--border-radius': 'var(--qb-radius)',
          '--mobile-offset-left': '0',
          '--mobile-offset-right': '0',
          ...(resolvedToastWidth
            ? {
                width: resolvedToastWidth,
                maxWidth: 'calc(100vw - 2rem)',
              }
            : {}),
        } as CSSProperties
      }
      toastOptions={{
        ...mergedToastOptions,
      }}
      {...props}
    />
  )
}

export { Toaster }
