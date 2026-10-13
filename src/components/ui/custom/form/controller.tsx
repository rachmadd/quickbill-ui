import {
  Controller,
  useFormContext,
  type FieldPath,
  type FieldValues,
  type ControllerProps,
} from 'react-hook-form'

type FormControllerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> = Omit<ControllerProps<TFieldValues, TName, TTransformedValues>, 'control'>

function FormController<V extends FieldValues, N extends FieldPath<V> = FieldPath<V>>(
  props: FormControllerProps<V, N>,
) {
  const { control } = useFormContext<V>()

  return <Controller<V, N> control={control} {...props} />
}

export { FormController }
