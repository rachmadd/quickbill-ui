import { cn } from '@/lib/utils'
import { Icon } from '../icons'

type SpinnerProps = {
  size?: number
}

function Spinner({ className, size = 18, ...props }: React.ComponentProps<'svg'> & SpinnerProps) {
  return (
    <Icon
      {...props}
      name="Loader"
      aria-label="Loading"
      className={cn('animate-spin', 'text-qb-primary', className)}
      size={size}
    />
  )
}

export { Spinner }
