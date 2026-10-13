import React, { type ReactNode } from 'react'
import type {
  ControllerFieldState,
  ControllerProps,
  ControllerRenderProps,
  FieldValues,
  Path,
  UseFormReturn,
  UseFormStateReturn,
} from 'react-hook-form'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'
import { FormController } from './controller'
import { FormWrapper } from './wrapper'
import { useExternalFormContext } from './context'
import { TypographyContent } from '@/components/core/typography'
import { Label } from '../../label'
import { Flex } from '@/components/core/flex'

interface FormFieldProps<
  TFieldValues extends FieldValues,
  TExternalContext extends FieldValues = FieldValues,
  TTransformedValues = TFieldValues,
> extends Omit<
  ControllerProps<TFieldValues, Path<TFieldValues>, TTransformedValues>,
  'control' | 'render' | 'name'
> {
  label?: string
  required?: boolean
  validMessage?: string
  name: Path<TFieldValues>
  description?: ReactNode
  hideErrMessage?: boolean
  className?: string
  labelClassName?: string
  render: ({
    field,
    fieldState,
    formState,
    id,
    externalContext,
  }: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    field: ControllerRenderProps<TFieldValues, any>
    fieldState: ControllerFieldState
    formState: UseFormStateReturn<TFieldValues>
    id: string
    externalContext?: UseFormReturn<TExternalContext> | null
  }) => React.ReactElement
}

function FormField<
  TFieldValues extends FieldValues,
  TExternalContext extends FieldValues = FieldValues,
  TTransformedValues = TFieldValues,
>({
  label,
  required = false,
  validMessage,
  description,
  hideErrMessage = false,
  className,
  labelClassName,
  name,
  render,
  ...controllerProps
}: FormFieldProps<TFieldValues, TExternalContext, TTransformedValues>) {
  const id = React.useId()
  const externalContext = useExternalFormContext<TExternalContext>()
  return (
    <FormWrapper
      label={
        <Label
          htmlFor={id}
          required={required}
          className={cn('text-qb-mist-70 inline', labelClassName)}
        >
          {label}
        </Label>
      }
      className={className}
    >
      <FormController<TFieldValues, Path<TFieldValues>>
        {...controllerProps}
        name={name}
        render={(renderProps) => {
          const error = renderProps.fieldState.error
          const fieldId = {
            formItemId: `${name}-form-item`,
            formDescriptionId: `${name}-form-item-description`,
            formMessageId: `${name}-form-item-message`,
          }
          return (
            <Flex direction="col" gap="2">
              <Slot
                id={id}
                aria-describedby={
                  !error
                    ? `${fieldId.formDescriptionId}`
                    : `${fieldId.formDescriptionId} ${fieldId.formMessageId}`
                }
                aria-invalid={!!error}
              >
                {render({ ...renderProps, id, externalContext })}
              </Slot>
              {!hideErrMessage && renderProps.fieldState.error && (
                <TypographyContent level="sm" className="text-qb-negative-main">
                  {renderProps.fieldState.error?.message}
                </TypographyContent>
              )}
              {validMessage && (
                <TypographyContent level="sm" className="text-qb-success-main">
                  {validMessage}
                </TypographyContent>
              )}
              {description && (
                <TypographyContent level="sm" className="text-qb-mist-60">
                  {description}
                </TypographyContent>
              )}
            </Flex>
          )
        }}
      />
    </FormWrapper>
  )
}

export { FormField }
