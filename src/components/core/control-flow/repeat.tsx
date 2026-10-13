import type { ReactNode } from 'react'

type RepeatProps = {
  times: number
  children: (index: number) => ReactNode
}

const Repeat = ({ times, children }: RepeatProps): ReactNode => {
  return <>{Array.from({ length: times }, (_, i) => children(i))}</>
}

Repeat.displayName = 'Repeat'

export { Repeat }
