/* eslint-disable @typescript-eslint/no-explicit-any */
import { Label } from '@/components/ui/label'
import { RadioGroupRoot, RadioGroupItem } from '@/components/ui/radio-group'
import { cn } from '@/lib/utils'
import { RadioGroup as RadioGroupPrimitive } from '@base-ui/react/radio-group'
import { useId, useState } from 'react'

type RadioItem<T = Record<string, any>, Value extends string = string> = {
  value: Value
  label: string
  disabled?: boolean
  variant?: 'default' | 'inset'
} & T

export type RadioGroupProps<
  T = Record<string, any>,
  Value extends string = string,
> = React.ComponentProps<typeof RadioGroupPrimitive<Value>> & {
  items: RadioItem<T, Value>[]
  itemClassName?: string
  radioPosition?: 'start' | 'end'
  orientation?: 'horizontal' | 'vertical'
  variant?: 'default' | 'inset'
  ['aria-invalid']?: boolean
  customRender?: (
    item: RadioItem<T, Value>,
    isSelected: boolean,
    radio: React.ReactNode,
  ) => React.ReactNode
}

export function RadioGroup<
  T extends Record<string, any> = Record<string, any>,
  Value extends string = string,
>({
  items,
  itemClassName,
  radioPosition = 'start',
  customRender,
  orientation = 'vertical',
  variant = 'default',
  disabled,
  value,
  defaultValue,
  onValueChange,
  ...props
}: RadioGroupProps<T, Value>) {
  const uid = useId()
  const [internalValue, setInternalValue] = useState<Value>(defaultValue as Value)

  // If controlled (value prop provided), use it; otherwise fall back to internal state
  const selectedValue = value !== undefined ? (value as Value) : internalValue

  const handleValueChange = (val: Value) => {
    setInternalValue(val)
    onValueChange?.(val, undefined as any) // Pass undefined for eventDetails since it's not provided by Base UI
  }

  return (
    <RadioGroupRoot
      {...props}
      value={value}
      defaultValue={defaultValue}
      onValueChange={handleValueChange}
      disabled={disabled}
      className={cn(
        orientation === 'horizontal' ? 'flex gap-4' : 'flex flex-col gap-4',
        props.className,
      )}
    >
      {items.map((item) => {
        const itemId = `${uid}-${item.value}`
        return (
          <Label
            htmlFor={itemId}
            key={item.value}
            className={cn(
              'flex items-center gap-2',
              orientation === 'vertical' && 'w-full',
              itemClassName,
            )}
          >
            {customRender ? (
              <div className={cn('relative', orientation === 'vertical' && 'w-full')}>
                {customRender(
                  item,
                  item.value === selectedValue,
                  <RadioGroupItem
                    aria-invalid={props['aria-invalid']}
                    value={item.value}
                    variant={item.variant || variant}
                    disabled={disabled || item.disabled}
                  />,
                )}
                <RadioGroupItem
                  value={item.value}
                  id={itemId}
                  className={cn(
                    radioPosition === 'end' && 'order-1',
                    'absolute top-0 left-0 opacity-0',
                  )}
                />
              </div>
            ) : (
              <>
                <RadioGroupItem
                  value={item.value}
                  id={itemId}
                  disabled={disabled || item.disabled}
                  aria-invalid={props['aria-invalid']}
                  variant={item.variant || variant}
                  className={cn(radioPosition === 'end' && 'order-1')}
                />
                {item.label}
              </>
            )}
          </Label>
        )
      })}
    </RadioGroupRoot>
  )
}
