'use client'
import { type ElementType, type Ref, type PropsWithChildren, type ComponentProps } from 'react'

type SnapshotProps<Element> = {
  as?: ElementType
  ref?: Ref<Element>
  props?: ComponentProps<ElementType>
}

// a snapshot component that renders a child element to be snapped out of window and be used to draw in a canvas
function Snapshot<Element = HTMLDivElement>({
  children,
  as = 'div',
  ref,
  props,
}: PropsWithChildren<SnapshotProps<Element>>) {
  const Component = as
  return (
    <Component ref={ref} style={{ position: 'absolute', top: 9999, left: 9999 }} {...props}>
      {children}
    </Component>
  )
}

Snapshot.displayName = 'Snapshot'
export { Snapshot }
