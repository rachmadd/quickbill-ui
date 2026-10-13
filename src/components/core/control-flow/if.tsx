import type { ReactNode } from 'react'

type IfProps = {
  condition: boolean
  children: ReactNode
}

const If = ({ condition, children }: IfProps) => {
  if (!condition) return null
  return <>{children}</>
}

If.displayName = 'If'

export { If }
