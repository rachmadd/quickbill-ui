import type { PropsWithChildren, FC, ReactNode } from 'react'
import { useThemeInjectorContext } from '.'

export type ThemeInjectorSuspenseProps = PropsWithChildren<{
  fallback?: ReactNode
}>

const ThemeInjectorSuspense: FC<ThemeInjectorSuspenseProps> = ({ children, fallback }) => {
  const context = useThemeInjectorContext()
  return <>{context?.isInjecting ? fallback : children}</>
}

export { ThemeInjectorSuspense }
