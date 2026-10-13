import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

type OverlayComponentProps = React.ComponentProps<'div'> & {
  show?: boolean
}

const Overlay = ({ show, className, ...props }: OverlayComponentProps) => {
  const [isMounted, setIsMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let mountTimer: ReturnType<typeof setTimeout>
    let visibleTimer: ReturnType<typeof setTimeout>

    if (show) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsMounted(true)

      visibleTimer = setTimeout(() => {
        setIsVisible(true)
      }, 10)
    } else {
      setIsVisible(false)

      mountTimer = setTimeout(() => {
        setIsMounted(false)
      }, 300)
    }

    return () => {
      clearTimeout(mountTimer)
      clearTimeout(visibleTimer)
    }
  }, [show])

  if (!isMounted) {
    return null
  }

  return (
    <div
      className={cn(
        'dropdown-overlay bg-qb-blue-100/60 fixed top-0 right-0 bottom-0 left-0 h-full w-full',
        'transition-opacity',
        `duration-300`,
        isVisible ? 'opacity-100' : 'opacity-0',
        className,
      )}
      {...props}
    />
  )
}

export { Overlay }
