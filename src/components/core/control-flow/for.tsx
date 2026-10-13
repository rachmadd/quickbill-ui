import type { ReactNode } from 'react'

type ForProps<T> = {
  each: T[]
  children: (item: T, index: number) => ReactNode
  fallback?: ReactNode
}

const For = <T,>({ each, children, fallback = null }: ForProps<T>): ReactNode => {
  if (each.length === 0) return <>{fallback}</>
  return <>{each.map((item, index) => children(item, index))}</>
}

For.displayName = 'For'

export { For }
