'use client'
import { useContext } from 'react'
import { SnapshotContext, type SnapshotProviderState } from './context'

const useSnapshot = <Element extends HTMLElement>(): SnapshotProviderState<Element> => {
  const context = useContext(SnapshotContext)

  if (!context) {
    throw new Error('useSnapshot must be used within a SnapshotProvider')
  }

  return context
}

export { useSnapshot }
