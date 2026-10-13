import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { Icon } from '../icons'
import { Button } from '../ui/button'
import { toast } from 'sonner'

export const infoboxVariants = {
  default: 'bg-qb-info-10 border-qb-info-10 text-qb-info-dark',
  warning: 'bg-qb-daisy-10 border-qb-daisy-10  text-qb-warning-dark',
  success: 'bg-qb-success-10 border-qb-success-10  text-success-dark',
  error: 'bg-qb-negative-10 border-qb-negative-10 text-qb-negative-dark',
} as const

const infoboxCva = cva(
  'rounded-md flex items-start justify-between font-medium select-none w-full',
  {
    variants: {
      variant: infoboxVariants,
      size: {
        sm: 'px-4 py-1.5',
        default: 'px-4 py-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

const getIcon = (variant: keyof typeof infoboxVariants) => {
  switch (variant) {
    case 'success':
      return <Icon name="CheckCircleOutlined" className="text-qb-success-main" size={22} />
    case 'warning':
      return <Icon name="AlertIconOutlined" className="text-qb-warning-main" size={22} />
    case 'error':
      return <Icon name="WarningCircleOutlined" className="text-qb-negative-main" size={22} />
    case 'default':
    default:
      return <Icon name="InfoCircleOutlined" className="text-qb-info-main" size={22} />
  }
}

type CustomizeLabel = {
  label: string
  className?: string
}

type InfoBoxComponentProps = {
  variant?: VariantProps<typeof infoboxCva>['variant']
  size?: VariantProps<typeof infoboxCva>['size']
  title: string | CustomizeLabel
  className?: string
  style?: React.CSSProperties
  width?: number | string
  description?: string | CustomizeLabel
  closable?: boolean
  loading?: boolean
  onClose?: () => void
  action?: {
    label: string
    onClick?: () => void
  }
}

export const toastInfoBox = ({
  duration = 3000,
  width,
  ...props
}: InfoBoxComponentProps & {
  duration?: number
}) => {
  const resolvedWidth =
    width === undefined ? undefined : typeof width === 'number' ? `${width}px` : width

  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 640 : false

  return toast.custom(
    (id) => (
      <div
        style={
          resolvedWidth && isMobile
            ? {
                width: resolvedWidth,
                maxWidth: 'calc(100vw - 2rem)',
                margin: '0 auto',
              }
            : undefined
        }
      >
        <InfoBox
          key={id}
          {...props}
          onClose={() => {
            toast.dismiss(id)
          }}
          style={props.style}
          className="shadow-elevation w-full"
        />
      </div>
    ),
    {
      duration,
      style: {
        ...(resolvedWidth && !isMobile
          ? {
              width: resolvedWidth,
              maxWidth: 'calc(100vw - 2rem)',
              left: '50%',
              transform: 'translateX(-50%) var(--y)',
            }
          : {}),
        border: 0,
        padding: 0,
        display: 'block',
        boxShadow: 'none',
      },
    },
  )
}

const InfoBox: React.FC<InfoBoxComponentProps> = ({
  className,
  style,
  title,
  description,
  closable,
  action,
  variant,
  size,
  onClose,
  loading,
}) => {
  const icon = getIcon(variant ?? 'default')
  const hasActions = closable || action

  const labelColor = {
    default: 'text-qb-info-dark',
    warning: 'text-qb-warning-dark',
    success: 'text-success-dark',
    error: 'text-qb-negative-dark',
  }

  return (
    <div className={cn(infoboxCva({ variant, size }), className)} style={style}>
      <div className="flex grow items-start">
        <div className={cn('mt-0.5 mr-3 mb-0.5 shrink-0')}>
          {loading ? (
            <div className="flex size-5 items-center justify-center">
              <Icon name="DualCircularIndeterminateProgress" size={20} className="animate-spin" />
            </div>
          ) : (
            icon
          )}
        </div>
        <div className={cn('mr-2 flex min-w-0 grow flex-col gap-1 pt-0.5')}>
          <div className="flex justify-between">
            {typeof title === 'string' ? (
              <div className={cn('text-sm font-semibold')}>{title}</div>
            ) : (
              <div className={cn('text-sm leading-6 font-semibold', title.className)}>
                {title.label}
              </div>
            )}
            {hasActions && (
              <div className={cn('ml-2 flex shrink-0 items-start space-x-2')}>
                {action && (
                  <button
                    onClick={action.onClick}
                    className={cn(
                      '-mt-1 inline-flex items-center rounded-full px-1.5 py-0.5 text-[13px] font-bold hover:cursor-pointer',
                      labelColor[variant ?? 'default'],
                    )}
                  >
                    {action.label}
                  </button>
                )}

                {closable && (
                  <Button
                    variant={'ghost'}
                    size={'icon-xs'}
                    className={cn('-mt-1 rounded-full transition-colors hover:bg-current/10')}
                    type="button"
                    onClick={onClose}
                  >
                    <Icon name="CloseOutlined" className="size-6" />
                  </Button>
                )}
              </div>
            )}
          </div>
          {description && (
            <>
              {typeof description === 'string' ? (
                <p className={cn('text-sm font-normal')}>{description}</p>
              ) : (
                <p className={cn('text-sm font-normal', description.className)}>
                  {description.label}
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export { InfoBox, infoboxCva }
