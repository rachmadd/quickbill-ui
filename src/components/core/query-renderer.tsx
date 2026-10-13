import { Empty } from '../ui/custom/empty'
import { Skeleton } from '../ui/skeleton'

function QueryRenderer<TData extends object>({
  data,
  loading,
  error,
  render,
  loadingRender,
  errorRender,
}: {
  data: TData | undefined
  loading: boolean
  error: unknown
  render: (data: TData) => React.ReactElement
  loadingRender?: React.ReactElement
  errorRender?: React.ReactElement | ((error: unknown) => React.ReactElement)
  onRetry?: () => void
}) {
  if (loading) {
    if (loadingRender) return loadingRender
    return <Skeleton style={{ width: '100%', height: 200 }} />
  }

  if (error) {
    if (errorRender) {
      if (typeof errorRender === 'function') {
        return errorRender(error)
      } else {
        return errorRender
      }
    }
    if (error instanceof Error) {
      return <Empty title={error.name} description={error.message} />
    }
    return (
      <Empty
        title={'Something went wrong'}
        description={'There is an Error while trying to fetch your data'}
      />
    )
  }

  if (data !== undefined && typeof data !== 'boolean' && data) return render(data)
  return null
}

export default QueryRenderer
