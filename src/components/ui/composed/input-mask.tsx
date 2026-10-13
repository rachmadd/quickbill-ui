/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Ref } from 'react'
import { type IMaskInputProps, IMaskMixin } from 'react-imask'
import { Input, type InputProps } from './input'

type Props = Omit<InputProps, 'prefix' | 'size'> & {
  value: string
  prefixInput?: React.ReactNode
  inputRef?: Ref<HTMLInputElement>
}

const InputMaskBase = IMaskMixin<HTMLInputElement, Omit<Props, 'size'>>(
  ({ inputRef, prefixInput, ...props }) => {
    return <Input {...props} prefix={prefixInput} inputSize={'default'} ref={inputRef} />
  },
)

export const InputMask = InputMaskBase as React.ComponentType<Props & IMaskInputProps<any>>
