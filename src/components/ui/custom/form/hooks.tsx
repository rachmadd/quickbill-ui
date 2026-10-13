import {
  useWatch,
  useFormContext,
  type FieldPath,
  type FieldValues,
  type DeepPartialSkipArrayKey,
  type FieldPathValues,
} from 'react-hook-form'

function useFormWatch<
  TFieldValues extends FieldValues = FieldValues,
  TFieldNames extends readonly FieldPath<TFieldValues>[] = readonly FieldPath<TFieldValues>[],
  TTransformedValues = TFieldValues,
  TComputeValue = unknown,
>(props: {
  name: readonly [...TFieldNames]
  defaultValue?: DeepPartialSkipArrayKey<TFieldValues>
  disabled?: boolean
  exact?: boolean
  compute: (fieldValue: FieldPathValues<TFieldValues, TFieldNames>) => TComputeValue
}): TComputeValue {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { control } = useFormContext<TFieldValues, any, TTransformedValues>()

  return useWatch<TFieldValues, TFieldNames, TTransformedValues, TComputeValue>({
    control,
    ...props,
  })
}

export { useFormWatch }
