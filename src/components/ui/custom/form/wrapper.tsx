'use client'
import { Flex } from '@/components/core/flex'
import type { FC, ReactNode, PropsWithChildren } from 'react'

type FormWrapperProps = PropsWithChildren<{
  label: ReactNode
  className?: string
}>

const FormWrapper: FC<FormWrapperProps> = ({ className, label, children }) => {
  return (
    <Flex direction="col" alignItems="start" gap="2" className={className}>
      {label && <div className="w-full">{label}</div>}
      <div className="w-full">{children}</div>
    </Flex>
  )
}

export { FormWrapper }
