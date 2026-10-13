import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import { Input, type InputProps } from './input'
import { Button } from '../button'
import { Icon } from '@/components/icons'

const InputPassword = React.forwardRef<HTMLInputElement, InputProps>(({ ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <Input
      {...props}
      type={showPassword ? 'text' : 'password'}
      className={cn('', props.className)}
      suffix={
        <Button
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          tabIndex={-1}
          onClick={() => setShowPassword((prev) => !prev)}
          variant={'ghost'}
          size={'icon'}
          type="button"
        >
          <Icon
            name={showPassword ? 'EyeCrossedOutlined' : 'EyeOutlined'}
            className="text-qb-mist-80"
          />
        </Button>
      }
      ref={ref}
    />
  )
})
InputPassword.displayName = 'InputPassword'

export { InputPassword }
