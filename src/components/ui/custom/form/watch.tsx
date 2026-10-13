'use client'
import type { WatchProps, FieldPath, FieldValues } from 'react-hook-form'
import { useFormContext, Watch } from 'react-hook-form'
import { useExternalFormContext } from './context'

type FormWatchFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends
    | FieldPath<TFieldValues>
    | FieldPath<TFieldValues>[]
    | readonly FieldPath<TFieldValues>[]
    | undefined = undefined,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TContext = any,
  TTransformedValues = TFieldValues,
  TComputeValue = undefined,
> = Omit<
  WatchProps<TFieldName, TFieldValues, TContext, TTransformedValues, TComputeValue>,
  'control'
>

function FormWatchField<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends
    | FieldPath<TFieldValues>
    | FieldPath<TFieldValues>[]
    | readonly FieldPath<TFieldValues>[]
    | undefined = FieldPath<TFieldValues>[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TContext = any,
  TTransformedValues = TFieldValues,
  TComputeValue = undefined,
>(
  props: FormWatchFieldProps<TFieldValues, TFieldName, TContext, TTransformedValues, TComputeValue>,
) {
  const { control } = useFormContext<TFieldValues>()
  return <Watch {...props} control={control} />
}

type FormWatchContextProps<ExternalContextType extends FieldValues = FieldValues> = {
  name?: FieldPath<ExternalContextType> | readonly FieldPath<ExternalContextType>[] | undefined
  render: (values: unknown[]) => React.ReactNode
}

function FormWatchContext<ExternalContextType extends FieldValues = FieldValues>({
  name,
  render,
}: FormWatchContextProps<ExternalContextType>) {
  const context = useExternalFormContext<ExternalContextType>()

  if (!context) {
    return undefined
  }

  const { control } = context

  return <Watch name={name} control={control} render={render} />
}

export { FormWatchField, FormWatchContext }
