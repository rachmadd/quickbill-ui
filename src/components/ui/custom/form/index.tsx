import type { BaseSyntheticEvent, ReactNode } from 'react'
import {
  useForm,
  useWatch,
  FormProvider,
  type UseFormReturn,
  type FieldValues,
  type UseFormProps,
  type FieldErrors,
} from 'react-hook-form'
import { FormLabel } from './label'
import { FormController } from './controller'
import { FormWrapper } from './wrapper'
import { FormField } from './field'
import { FormError } from './error'
import { FormWatchField, FormWatchContext } from './watch'
import { ExternalFormContext, useExternalFormContext } from './context'
import { useFormWatch } from './hooks'

export type FormV2SubmitHandler<V extends FieldValues, E extends FieldValues> = (
  data: V,
  methods: UseFormReturn<V>,
  externalContext: UseFormReturn<E>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  event?: BaseSyntheticEvent<object, any, any> | undefined,
) => unknown | Promise<unknown>

interface FormProps<
  V extends FieldValues,
  ExternalContextType extends FieldValues,
> extends UseFormProps<V> {
  onSubmit: FormV2SubmitHandler<V, ExternalContextType>
  children: ReactNode | ((form: UseFormReturn<V>) => ReactNode)
  id?: string
  initialContext?: ExternalContextType
  debugMode?: boolean
  onInvalid?: (errors: FieldErrors<V>) => void
  formClassName?: string
}

function Form<
  V extends FieldValues = FieldValues,
  ExternalContextType extends FieldValues = FieldValues,
>({
  children,
  onSubmit,
  id,
  initialContext,
  debugMode,
  onInvalid,
  formClassName,
  ...useFormProps
}: FormProps<V, ExternalContextType>) {
  const methods = useForm<V>(useFormProps)
  const contextMethods = useForm<ExternalContextType>({ values: initialContext })

  // Watch all fields for debug mode
  const fieldValues = useWatch({ control: methods.control })

  if (debugMode) {
    console.log('[DEBUG] Fields:', fieldValues)
  }

  return (
    <ExternalFormContext.Provider value={contextMethods}>
      <FormProvider {...methods}>
        <form
          id={id}
          onSubmit={methods.handleSubmit(
            (data, e) => onSubmit(data, methods, contextMethods, e),
            onInvalid,
          )}
          className={formClassName}
        >
          {typeof children === 'function' ? children(methods) : children}
        </form>
      </FormProvider>
    </ExternalFormContext.Provider>
  )
}

export {
  Form,
  FormLabel,
  FormController,
  FormWrapper,
  FormField,
  FormError,
  FormWatchField,
  FormWatchContext,
  useExternalFormContext,
  useFormWatch,
  ExternalFormContext,
}
