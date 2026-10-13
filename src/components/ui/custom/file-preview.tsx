import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Icon } from '@/components/icons'
import { Typography } from '@/components/core/typography'
import { Flex } from '@/components/core/flex'
import { DialogRoot, DialogContent, DialogHeader, DialogBody } from '@/components/ui/dialog'
import { useState } from 'react'
import { useAlertDialog } from '@/components/hooks/use-alert-dialog'
import warnSrc from '@/components/illustration/warn.svg?url'

export interface FilePreviewClassNames {
  preview?: string
  label?: string
  dialog?: string
}

export interface FilePreviewProps {
  url: string
  withDownloadButton?: boolean
  withPreviewButton?: boolean
  label?: string
  className?: string
  classNames?: FilePreviewClassNames
  type?: 'image' | 'document'
}

// .jpg, .jpeg, .jfif, .pjpeg, .pjp, .png, .svg, .webp, .pdf
const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp', 'png', 'svg', 'webp']
const PDF_EXTENSION = 'pdf'

const getExtension = (url: string) => {
  try {
    const cleanUrl = url.split(/[?#]/)[0]
    const match = cleanUrl.match(/\.([a-z0-9]+)$/i)
    return match ? match[1].toLowerCase() : ''
  } catch {
    return ''
  }
}

const filePreview = {
  isImage(url: string) {
    const ext = getExtension(url)
    // Fallback to image if no extension is found, or if it explicitly matches image extensions
    return ext === '' || IMAGE_EXTENSIONS.includes(ext)
  },
  isPdf(url: string) {
    return getExtension(url) === PDF_EXTENSION
  },
}

export function FilePreview({
  url,
  withDownloadButton = false,
  withPreviewButton = true,
  label,
  className,
  classNames,
  type,
}: FilePreviewProps) {
  const isExplicitImage = type === 'image'
  const ext = getExtension(url)

  const isImage = isExplicitImage || (!type && filePreview.isImage(url))
  const isDocument = type === 'document' || (!type && !isImage)
  const isDocumentWithoutExt = type === 'document' && ext === ''
  const isImageWithoutExt = type === 'image' && ext === ''
  const isIconWithoutExt = isDocumentWithoutExt || isImageWithoutExt

  const [previewOpen, setPreviewOpen] = useState(false)
  const { alert } = useAlertDialog()

  return (
    <div className="flex items-center gap-2">
      <Card
        variant="outlined"
        className={cn('flex items-center justify-between gap-6 p-4 shadow-none', className)}
      >
        <Flex alignItems="center" justifyContent="flex-start" gap="2">
          <div
            className={cn(
              'flex size-10 items-center justify-center rounded-sm object-contain',
              isIconWithoutExt ? 'bg-qb-blue-15' : 'bg-qb-mist-20',
            )}
          >
            {isImage && !isImageWithoutExt && (
              <img src={url} className="h-full w-full object-contain" />
            )}
            {isImageWithoutExt && (
              <Icon name="ImageOutlined" size={24} className="text-qb-blue-70" />
            )}
            {isDocument && (
              <Icon
                name="DocumentOutlined"
                size={24}
                className={isDocumentWithoutExt ? 'text-qb-blue-70' : undefined}
              />
            )}
          </div>
          {label && (
            <Typography level="md" strong className={classNames?.label}>
              {label}
            </Typography>
          )}
        </Flex>
        <Flex alignItems="center" justifyContent="flex-end" gap="2">
          {withPreviewButton && (
            <Button
              variant="ghost"
              size="icon"
              className="cursor-pointer"
              onClick={() => {
                if (isIconWithoutExt) {
                  alert({
                    title: 'Dokumen Tidak Dapat Dibuka',
                    media: <img src={warnSrc} width={120} height={120} />,
                    content: 'Format dokumen mungkin tidak didukung atau file rusak.',
                    showCancel: false,
                    confirm: { label: 'Oke' },
                    className: 'w-full',
                  })
                } else if (isImage) {
                  setPreviewOpen(true)
                } else {
                  window.open(url, '_blank')
                }
              }}
            >
              <Icon className="text-qb-blue-70 size-6" name="EyeOutlined" />
            </Button>
          )}
          {withDownloadButton && (
            <Button
              variant="ghost"
              size="icon-sm"
              className="cursor-pointer"
              onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
                window.open(url, '_blank')
              }}
            >
              <Icon className="text-qb-blue-70 size-6" name="DownloadOutlined" />
            </Button>
          )}
        </Flex>
      </Card>

      <DialogRoot open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent
          className={cn('overflow-hidden p-0 sm:w-[80vw] sm:max-w-[558px]', classNames?.dialog)}
        >
          <DialogHeader className="border-qb-mist-20 min-h-14 w-full border-b"></DialogHeader>
          <DialogBody className="bg-qb-mist-10 p-0">
            <div className="flex items-center justify-center overflow-hidden">
              <img
                src={url}
                className="h-[368px] w-[560px] object-contain"
                alt={label || 'Preview'}
              />
            </div>
          </DialogBody>
        </DialogContent>
      </DialogRoot>
    </div>
  )
}
