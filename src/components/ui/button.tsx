import { Button as ButtonPrimitive } from '@base-ui/react/button'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { Spinner } from './spinner'

const buttonVariants = {
  default:
    'bg-btn-bg text-btn-foreground hover:bg-btn-hover-bg/90 shadow-(--elevation-light) disabled:bg-btn-disabled-bg disabled:text-btn-disabled-foreground disabled:shadow-none',
  destructive:
    'bg-btn-destructive-bg text-btn-destructive-foreground hover:bg-btn-destructive-hover-bg/90 focus-visible:ring-btn-destructive-focus-ring/20 disabled:opacity-50',
  outline: `ring ring-btn-outline-ring text-btn-outline-foreground bg-btn-outline-bg shadow-(--elevation-light)
            hover:bg-btn-outline-hover-bg hover:text-btn-outline-hover-foreground
            disabled:ring-btn-outline-disabled-ring disabled:text-btn-outline-disabled-foreground disabled:shadow-none`,
  secondary:
    'bg-btn-secondary-bg text-btn-secondary-foreground hover:bg-btn-secondary-hover-bg/80 disabled:opacity-50',
  'secondary-outline':
    'ring ring-btn-secondary_outline-ring/80 text-btn-secondary_outline-foreground bg-btn-secondary_outline-bg shadow-(--elevation-light) hover:bg-btn-secondary_outline-hover-bg/20 disabled:ring-btn-secondary_outline-disabled-ring disabled:text-btn-secondary_outline-disabled-foreground disabled:shadow-none',
  ghost:
    'hover:bg-btn-ghost-hover-bg/40 bg-btn-ghost-bg disabled:text-btn-ghost-disabled-foreground disabled:shadow-none',
  link: 'text-btn-link-foreground disabled:opacity-50',
}

export const buttonSizes = {
  xs: "h-6 gap-0 px-3 has-[>svg]:px-2 text-[12px] leading-[16px] [&>svg:not([class*='size-'])]:size-3",
  sm: "h-8 gap-2 px-5 has-[>svg]:px-2.5 text-[12px] leading-[18px] [&>svg:not([class*='size-'])]:size-3.5",
  default:
    "h-9 px-6 py-[7px] has-[>svg]:px-4 text-[13px] leading-[20px] [&>svg:not([class*='size-'])]:size-4",
  lg: "px-6 py-3 has-[>svg]:px-5 text-[15px] leading-[22px] [&>svg:not([class*='size-'])]:size-5",
  'icon-xs': "size-6 [&>svg:not([class*='size-'])]:size-3",
  'icon-sm': "size-7.5 [&>svg:not([class*='size-'])]:size-4",
  icon: "size-9 [&>svg:not([class*='size-'])]:size-5",
  'icon-lg': "size-10 [&>svg:not([class*='size-'])]:size-6",
}

const buttonSizesAtSm = {
  xs: "sm:h-6 sm:gap-0 sm:px-3 sm:has-[>svg]:px-2 sm:text-[12px] sm:leading-[16px] sm:[&>svg:not([class*='size-'])]:size-3",
  sm: "sm:h-8 sm:gap-2 sm:px-5 sm:has-[>svg]:px-2.5 sm:text-[12px] sm:leading-[18px] sm:[&>svg:not([class*='size-'])]:size-3.5",
  default:
    "sm:h-9 sm:px-6 sm:py-[7px] sm:has-[>svg]:px-4 sm:text-[13px] sm:leading-[20px] sm:[&>svg:not([class*='size-'])]:size-4",
  lg: '',
  'icon-xs': "sm:size-6 sm:[&>svg:not([class*='size-'])]:size-3",
  'icon-sm': "sm:size-7.5 sm:[&>svg:not([class*='size-'])]:size-4",
  icon: "sm:size-9 sm:[&>svg:not([class*='size-'])]:size-5",
  'icon-lg': "sm:size-10 sm:[&>svg:not([class*='size-'])]:size-6",
}

export const buttonCva = cva(
  `focus-visible:border-btn-focus-border focus-visible:ring-btn-focus-ring/30 aria-invalid:ring-btn-aria_invalid-ring/20 aria-invalid:border-btn-aria_invalid-border inline-flex items-center justify-center gap-2 text-sm
  font-semibold
  whitespace-nowrap transition-all
  outline-none
  select-none hover:cursor-pointer focus-visible:ring-[2px] focus-visible:ring-offset-1
  disabled:pointer-events-none disabled:hover:cursor-not-allowed
  `,
  {
    variants: {
      variant: buttonVariants,
      size: buttonSizes,
      pill: {
        true: 'rounded-full',
        false: 'rounded-md',
      },
      loading: {
        true: 'pointer-events-none disabled:hover:cursor-not-allowed',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      pill: true,
      loading: false,
    },
  },
)

function Button({
  className,
  variant = 'default',
  size = 'default',
  loading = false,
  pill = true,
  largerInMobile = false,
  children,
  type = 'button',
  ripple = true,
  ...props
}: ButtonPrimitive.Props &
  VariantProps<typeof buttonCva> & { largerInMobile?: boolean; ripple?: boolean }) {
  const effectiveSize = largerInMobile ? 'lg' : size
  const responsiveOverride = largerInMobile ? buttonSizesAtSm[size ?? 'default'] : undefined

  return (
    <ButtonPrimitive
      data-slot="button"
      data-ripple={ripple}
      data-loading={String(loading)}
      focusableWhenDisabled={loading ?? undefined}
      type={type}
      className={cn(
        'relative',
        buttonCva({ variant, size: effectiveSize, className, loading, pill }),
        responsiveOverride,
      )}
      {...props}
    >
      {children}
      {loading && (
        <div
          className={cn(
            'pointer-events-none justify-center opacity-100',
            variant === 'ghost' || variant === 'link' ? 'bg-inherit-inherit' : 'bg-inherit',
          )}
        >
          <Spinner
            size={16}
            className={cn(
              variant === 'default' || variant === 'destructive'
                ? 'text-btn-destructive-foreground!'
                : 'text-btn-bg!',
            )}
          />
        </div>
      )}
    </ButtonPrimitive>
  )
}

export { Button, buttonVariants }
