import { createContext, useContext } from 'react'
import type { FieldValues, UseFormReturn } from 'react-hook-form'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ExternalFormContext = createContext<UseFormReturn<any> | null>(null)

export const useExternalFormContext = <T extends FieldValues>(): UseFormReturn<T> | null => {
  const context = useContext<UseFormReturn<T> | null>(
    ExternalFormContext,
  ) as UseFormReturn<T> | null

  return context
}
