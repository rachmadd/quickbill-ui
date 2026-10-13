'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Icon } from '@/components/icons'
import type { VariantProps } from 'class-variance-authority'
import { Button, buttonCva } from '../ui/button'

type CopyButtonProps = Omit<React.ComponentProps<'button'>, 'loading'> &
  VariantProps<typeof buttonCva> & {
    value: string
    showIcon?: boolean
    successIconName?: 'CheckCircleOutlined2'
    /** teks saat sukses */
    successText?: string
    /** durasi status “copied” sebelum reset (ms) */
    resetAfter?: number
  } & { loading?: boolean }

export function CopyButton({
  className,
  variant,
  size,
  pill = true,
  value,
  showIcon,
  successIconName = 'CheckCircleOutlined2',
  successText,
  resetAfter = 1400,
  children,
  onClick,
  ...props
}: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      window.setTimeout(() => setCopied(false), resetAfter)
    } catch {
      try {
        const el = document.createElement('textarea')
        el.value = value
        el.style.position = 'fixed'
        el.style.opacity = '0'
        document.body.appendChild(el)
        el.select()
        const ok = document.execCommand('copy')
        document.body.removeChild(el)
        if (ok) {
          setCopied(true)
          window.setTimeout(() => setCopied(false), resetAfter)
        }
      } catch {
        setCopied(false)
      }
    }
  }

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    onClick?.(e)
    if (!e.defaultPrevented) handleCopy()
  }

  return (
    <Button
      type="button"
      onClick={handleClick}
      variant={variant}
      size={size}
      pill={pill}
      className={cn(className)}
      {...props}
    >
      {showIcon && <Icon name={copied ? successIconName : 'CopyOutlined'} size={22} />}
      {children && (
        <span className="leading-none">
          {copied ? (successText ?? 'Copied!') : (children ?? 'Copy')}
        </span>
      )}
      <span aria-live="polite" className="sr-only">
        {copied ? 'Copied to clipboard' : ''}
      </span>
    </Button>
  )
}

export type { CopyButtonProps }
