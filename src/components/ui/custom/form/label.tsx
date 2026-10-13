import { TypographyContent } from '@/components/core/typography'
import type { PropsWithChildren, FC } from 'react'

type FormLabelProps = PropsWithChildren<{
  required?: boolean
  className?: string
}>

const FormLabel: FC<FormLabelProps> = ({ required = false, className, children }) => {
  return (
    <TypographyContent className={className}>
      <label>{children}</label>
      {required && (
        <>
          &nbsp;
          <span className="text-qb-negative-main text-base">*</span>
        </>
      )}
    </TypographyContent>
  )
}

export { FormLabel }
