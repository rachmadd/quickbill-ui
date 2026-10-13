import { useState, type PropsWithChildren, useEffect, createContext, useContext } from 'react'
import { type ComponentToken, type TokenValue } from './tokens'

function isRecord(value: unknown): value is Record<string | number | symbol, unknown> {
  return (
    typeof value === 'object' && // Must be an object type
    value !== null && // Exclude null (typeof null is 'object')
    !Array.isArray(value) // Exclude arrays (typeof [] is 'object')
  )
}

type ThemeToken<T extends { [key: string]: TokenValue } = {}> = ComponentToken & T

type ThemeInjectorProps<T extends { [key: string]: TokenValue }> = PropsWithChildren<{
  tokens: Partial<ThemeToken<T>>
}>

type ThemeInjectorState = {
  isInjecting: boolean
}

const ThemeInjectorContext = createContext<ThemeInjectorState>({
  isInjecting: true,
})

export const useThemeInjectorContext = () => useContext(ThemeInjectorContext) ?? undefined

function ThemeInjector<T extends { [key: string]: TokenValue } = {}>({
  tokens,
  children,
}: ThemeInjectorProps<T>) {
  const [isInjecting, setInjecting] = useState(true)

  useEffect(() => {
    const root = document.documentElement
    const setTokenProperty = (key: string, value: TokenValue) => {
      root.style.setProperty(`--${key}`, value)
    }

    const setTokenObject = (tokenObj: object) => {
      Object.entries(tokenObj).forEach(([key, value]) => {
        if (!isRecord(value)) {
          setTokenProperty(key, value)
          return
        }

        setTokenObject(value)
      })
    }

    setInjecting(true)
    setTokenObject(tokens)
    setInjecting(false)
  }, [tokens])

  return (
    <div className={isInjecting ? 'opacity-0' : '0'}>
      <ThemeInjectorContext.Provider value={{ isInjecting }}>
        {children}
      </ThemeInjectorContext.Provider>
    </div>
  )
}

export { ThemeInjector, type ThemeInjectorProps, type TokenValue, type ThemeToken }
export * from './suspense'
