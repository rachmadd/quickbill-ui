'use client'
import type { ReactNode } from 'react'
import { useFormState, useFormContext } from 'react-hook-form'
import type { FieldValues, FieldPath, FieldErrors } from 'react-hook-form'

type FormErrorProps<V extends FieldValues = FieldValues, FV extends FieldPath<V> = FieldPath<V>> = {
  name: FV
  render: (error: FieldErrors<V>, isDirty: boolean) => ReactNode
}

function FormError<V extends FieldValues, FV extends FieldPath<V>>({
  name,
  render,
}: FormErrorProps<V, FV>) {
  const { control } = useFormContext<V>()
  const { errors, isDirty } = useFormState<V>({
    control,
    name,
  })

  return <>{render(errors, isDirty)}</>
}

export { FormError }
