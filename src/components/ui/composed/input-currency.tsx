import type { Ref } from 'react'
import { type InputProps } from './input'
import { InputMask } from './input-mask'

type InputCurrencyProps = Omit<InputProps, 'value' | 'onChange' | 'size' | 'prefix'> & {
  value: string
  onChange?: (value: number | null, maskedValue: string) => void
  prefixInput?: React.ReactNode
  withCurrency?: boolean
  currency?: string
  allowDecimal?: boolean
  inputRef?: Ref<HTMLInputElement>
}

export default function InputCurrency({
  value,
  onChange,
  withCurrency = true,
  allowDecimal = false,
  currency = 'Rp',
  ...props
}: InputCurrencyProps) {
  const sanitizeLeadingZeros = (rawUnmaskedValue: string) => {
    const [intPartRaw, fracPart] = rawUnmaskedValue.split('.')
    const intPartSanitized = intPartRaw.replace(/^0+(?=\d)/, '')
    const normalizedIntPart = intPartSanitized === '' ? '0' : intPartSanitized

    if (fracPart === undefined) return normalizedIntPart
    return `${normalizedIntPart}.${fracPart}`
  }

  const integerMask = {
    mask: Number,
    thousandsSeparator: '.',
    scale: 0,
    min: 0,
    max: 999999999999,
    autofix: true,
  }

  const decimalMask = {
    mask: Number,
    thousandsSeparator: '.',
    radix: ',',
    mapToRadix: ['.'],
    scale: 2,
    min: 0,
    max: 999999999999,
    autofix: true,
  }
  return (
    <InputMask
      value={value}
      mask={withCurrency ? `${currency}num` : 'num'}
      lazy={true}
      prefix={undefined}
      prefixInput={props.prefixInput}
      placeholder={withCurrency ? `${currency}0` : '0'}
      unmask={true}
      blocks={{
        num: allowDecimal ? decimalMask : integerMask,
      }}
      prepare={(append, masked) => {
        // If we are NOT allowing decimals, and the user types '0' into an empty field
        // 'masked.unmaskedValue' represents the current raw number string
        if (!allowDecimal && append === '0' && masked.unmaskedValue === '') {
          return ''
        }
        return append
      }}
      onAccept={(value, mask) => {
        if (value === '' || value === null) {
          onChange?.(null, '')
          return
        }

        const sanitizedUnmaskedValue = sanitizeLeadingZeros(value)
        const maskAny = mask as unknown as { unmaskedValue?: string; value?: string }

        const numericValue = parseFloat(sanitizedUnmaskedValue)
        const maskedValue = maskAny?.value ?? ''

        onChange?.(isNaN(numericValue) ? null : numericValue, maskedValue)
      }}
      {...props}
    />
  )
}
