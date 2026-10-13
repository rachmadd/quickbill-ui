import type { ReactNode } from 'react'

type ShowProps = {
  when: boolean
  fallback?: ReactNode
  children: ReactNode
}

/**
 * Renders `children` when `when` is true, otherwise renders `fallback` (default null).
 * Use this instead of `If` when you need an else branch.
 */
const Show = ({ when, fallback = null, children }: ShowProps) => {
  return when ? <>{children}</> : <>{fallback}</>
}

Show.displayName = 'Show'

export { Show }
