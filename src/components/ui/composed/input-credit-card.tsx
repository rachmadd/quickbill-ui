import type { InputProps } from './input'
import { type IMaskInputProps } from 'react-imask'
import { InputMask } from './input-mask'

type InputCreditCardProps = Omit<InputProps, 'prefix' | 'size' | 'value' | 'defaultValue'> & {
  value: string
  defaultValue: string
  onValueChange: // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ((value: string, maskRef: IMaskInputProps<any>, e?: InputEvent) => void) | undefined
}

export const InputCreditCard = (props: InputCreditCardProps) => {
  return (
    <InputMask
      mask="0000-0000-0000-0000"
      unmask={true}
      onAccept={(value, mask, e) => {
        props.onValueChange?.(value, mask, e)
      }}
      className="h-12"
      inputMode="numeric"
      id="creditCardNumber"
      autoComplete="cc-number"
      {...props}
    />
  )
}
