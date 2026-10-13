'use client'
import { Spinner } from '@/components/ui/spinner'
import { cn } from '@/lib/utils'
import React from 'react'

export function InfiniteScrollLoader({
  onLoadMore,
  isLoading,
  size = 24,
  className,
}: {
  onLoadMore: () => void
  isLoading?: boolean
  size?: number
  className?: string
}) {
  const loaderRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const element = loaderRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          onLoadMore()
        }
      },
      { threshold: 0.5, rootMargin: '50px' },
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [isLoading, onLoadMore])

  return (
    <div
      ref={loaderRef}
      className={cn('text-qb-primary flex w-full items-center justify-center', className)}
    >
      <Spinner size={size} />
    </div>
  )
}
