import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import {
  type PropsWithChildren,
  type ReactNode,
  createContext,
  useState,
  useRef,
  useTransition,
  type RefObject,
} from 'react'
import { Snapshot } from './snapshot'

type SnapshotOptions = {
  // file name without pdf extension
  fileName: string
  type: 'pdf' | 'png'
}

type SnapshotProviderState<E extends HTMLElement> = {
  download: (component: ReactNode, options: SnapshotOptions) => Promise<boolean>
  downloadRef: (ref: RefObject<E | null>, options: SnapshotOptions) => Promise<boolean>
  isDownloading: boolean
}

const SnapshotContext = createContext<SnapshotProviderState<HTMLElement>>({
  download: async () => {
    return false
  },
  downloadRef: async () => {
    return false
  },
  isDownloading: false,
})

type SnapshotProviderProps<E extends React.ElementType> = {
  as?: E
  props?: React.ComponentProps<E>
}

function SnapshotProvider<Element extends HTMLElement, ElementType extends React.ElementType>({
  children,
  as,
  props,
}: PropsWithChildren<SnapshotProviderProps<ElementType>>) {
  const [node, setNode] = useState<ReactNode>()
  const elementSnapshotRef = useRef<Element>(null)
  const [isDownloading, startTransition] = useTransition()

  const downloadPdf = async (canvas: HTMLCanvasElement, fileName: string) => {
    const imgData = canvas.toDataURL('image/png')
    const pdfInstance = new jsPDF('p', 'px', [canvas.width, canvas.height])
    const imgWidth = canvas.width // A4 width in mm
    const pageHeight = canvas.height + 10 // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    let heightLeft = imgHeight

    let position = 0

    pdfInstance.addImage(imgData, 'PNG', position, 0, imgWidth, imgHeight)
    heightLeft -= pageHeight

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight
      pdfInstance.addPage()
      pdfInstance.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
    }

    pdfInstance.save(`${fileName}.pdf`)
  }

  const downloadPng = async (canvas: HTMLCanvasElement, fileName: string) => {
    const imgData = canvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.href = imgData
    link.download = `${fileName}.png`
    link.click()
  }

  const downloadRef = async (
    ref: RefObject<HTMLElement | null>,
    options: SnapshotOptions,
  ): Promise<boolean> =>
    new Promise<boolean>((resolve, reject) => {
      setTimeout(() => {
        startTransition(async () => {
          const element = ref.current

          if (!element) {
            reject("Pdf snapshot isn't ready")
            setNode(undefined)
            return
          }
          const canvas = await html2canvas(element)

          switch (options.type) {
            case 'pdf':
              await downloadPdf(canvas, options.fileName)
              break
            case 'png':
              await downloadPng(canvas, options.fileName)
              break
          }

          resolve(true)
          setNode(undefined)
        })
      }, 500)
    })

  const download = async (component: ReactNode, options: SnapshotOptions): Promise<boolean> =>
    new Promise<boolean>((resolve, reject) => {
      setNode(component)
      setTimeout(() => {
        startTransition(async () => {
          const element = elementSnapshotRef.current
          if (!element) {
            reject("Pdf snapshot isn't ready")
            setNode(undefined)
            return
          }
          const canvas = await html2canvas(element)
          switch (options.type) {
            case 'pdf':
              await downloadPdf(canvas, options.fileName)
              break
            case 'png':
              await downloadPng(canvas, options.fileName)
              break
          }
          resolve(true)
          setNode(undefined)
        })
      }, 500)
    })

  return (
    <SnapshotContext.Provider
      value={{
        download,
        isDownloading,
        downloadRef,
      }}
    >
      {children}
      <Snapshot<Element> as={as} props={props} ref={elementSnapshotRef}>
        {node}
      </Snapshot>
    </SnapshotContext.Provider>
  )
}

SnapshotProvider.displayName = 'SnapshotProvider'

export { SnapshotProvider, SnapshotContext, type SnapshotProviderState, type SnapshotOptions }
