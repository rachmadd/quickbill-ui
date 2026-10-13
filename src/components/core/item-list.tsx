import { cn } from '@/lib/utils'
import { InfiniteScrollLoader } from '@/components/ui/composed/infinite-scroll-loader'

export type ItemListInfiniteScroll = {
  hasNextPage?: boolean
  isLoading?: boolean
  onLoadMore?: () => void
}

export type ItemListProps<T> = {
  items: T[]
  getKey?: (item: T) => React.Key
  render: (item: T, index: number) => React.ReactNode
  className?: string
  divider?: boolean
  infiniteScroll?: ItemListInfiniteScroll
}

function ItemList<T>({
  items,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getKey = (item: T) => (item as any).id,
  render,
  className,
  divider = true,
  infiniteScroll,
}: ItemListProps<T>) {
  return (
    <div className={cn('flex flex-col', divider && 'divide-qb-mist-30 divide-y', className)}>
      {items.map((item, index) => (
        <div key={getKey(item)} className="px-4 py-2">
          {render(item, index)}
        </div>
      ))}
      {infiniteScroll?.hasNextPage && (
        <InfiniteScrollLoader
          className="mt-4"
          onLoadMore={infiniteScroll.onLoadMore ?? (() => {})}
          isLoading={infiniteScroll.isLoading}
        />
      )}
    </div>
  )
}

export { ItemList }
