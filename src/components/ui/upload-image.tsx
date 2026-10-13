'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Icon } from '@/components/icons'
import {
  DialogRoot,
  DialogContent,
  DialogTrigger,
  DialogClose,
  DialogTitle,
  DialogHeader,
} from '@/components/ui/dialog'

export interface UploadImageProps extends Omit<React.ComponentProps<'div'>, 'onChange'> {
  value?: File | string | null
  onChange?: (file: File | null) => void
  onRemove?: () => void
  accept?: string
  maxSize?: number // in bytes
  label?: string
  subLabel?: string
  required?: boolean
  disabled?: boolean
  error?: string
  fileNamePreview?: boolean
}

const TEN_MEGABYTES = 10 * 1024 * 1024 // 10MB
const ACCEPTED_FORMATS = 'image/png, image/jpeg'

const UploadImage = React.forwardRef<HTMLInputElement, UploadImageProps>(
  (
    {
      className,
      value,
      onChange,
      onRemove,
      accept = ACCEPTED_FORMATS,
      maxSize = TEN_MEGABYTES,
      label = 'Upload Image',
      subLabel = 'Format JPG atau PNG maksimal 10MB.',
      required = false,
      disabled,
      error,
      fileNamePreview = false,
      ...props
    },
    ref,
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null)
    const [previewUrl, setPreviewUrl] = React.useState<string | null>(null)
    const [fileName, setFileName] = React.useState<string | null>(null)
    const [isDragging, setIsDragging] = React.useState(false)
    const [openDialog, setOpenDialog] = React.useState(false)

    // Handle initial value and updates
    React.useEffect(() => {
      if (!value) {
        setPreviewUrl(null)
        setFileName(null)
        return
      }

      if (typeof value === 'string') {
        setPreviewUrl(value)
        // Extract filename from URL if possible, or just show 'Image'
        const name = value.split('/').pop() || 'Image'
        setFileName(decodeURIComponent(name))
      } else if (value instanceof File) {
        const url = URL.createObjectURL(value)
        setPreviewUrl(url)
        setFileName(value.name)

        return () => URL.revokeObjectURL(url)
      }
    }, [value])

    // Expose internal ref to parent
    React.useImperativeHandle(ref, () => inputRef.current!)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (file) {
        validateAndSetFile(file)
      }
    }

    const validateAndSetFile = (file: File) => {
      if (disabled) return

      // Validate size
      if (maxSize && file.size > maxSize) {
        console.error('File too large')
        return
      }

      // Validate type
      if (accept && !file.type.match(accept.replace(/,/g, '|').replace(/\s/g, ''))) {
        console.error('Invalid file type')
        return
      }

      onChange?.(file)
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setIsDragging(false)
      if (disabled) return

      const file = e.dataTransfer.files?.[0]
      if (file) {
        validateAndSetFile(file)
      }
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      if (!disabled) setIsDragging(true)
    }

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setIsDragging(false)
    }

    const handleRemove = (e: React.MouseEvent) => {
      e.stopPropagation()
      e.preventDefault()
      onChange?.(null)
      onRemove?.()
      if (inputRef.current) {
        inputRef.current.value = ''
      }
    }

    const triggerUpload = () => {
      if (!disabled) inputRef.current?.click()
    }

    const handleFileNameClick = () => {
      if (disabled) return

      if (fileNamePreview) {
        setOpenDialog(true)
      } else {
        inputRef.current?.click()
      }
    }

    // Empty State
    if (!value && !previewUrl) {
      return (
        <div className={cn('flex flex-row items-center gap-4', className)} {...props}>
          <div
            onClick={triggerUpload}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={cn(
              'border-qb-mist-50 relative size-[120px] shrink-0 rounded-lg border border-dashed transition-colors',
              'hover:bg-qb-mist-10 cursor-pointer',
              isDragging && 'bg-qb-blue-10 border-qb-primary',
              disabled && 'cursor-not-allowed opacity-50 hover:bg-transparent',
              error && 'border-qb-destructive',
            )}
          >
            <div className="absolute inset-0 grid place-items-center">
              <Icon
                name="PlusOutlined"
                size={32}
                className={cn('text-qb-primary', disabled && 'text-qb-mist-50')}
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-qb-mist-90 text-sm font-semibold">
              {label}{' '}
              {required ? <span className="text-qb-destructive">*</span> : <span>(Opsional)</span>}
            </span>
            <span className="text-qb-mist-70 text-xs">{subLabel}</span>
            {error && <span className="text-qb-destructive text-xs">{error}</span>}
          </div>
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            onChange={handleFileChange}
            className="hidden"
            disabled={disabled}
          />
        </div>
      )
    }

    // Filled State
    return (
      <div className={cn('flex flex-row items-center gap-4', className)} {...props}>
        <div className="group relative shrink-0">
          <DialogRoot
            open={fileNamePreview ? openDialog : undefined}
            onOpenChange={fileNamePreview ? setOpenDialog : undefined}
          >
            <DialogTrigger>
              <div
                className={cn(
                  'border-qb-mist-30 relative size-[120px] cursor-pointer overflow-hidden rounded-lg border',
                  disabled && 'cursor-default',
                )}
              >
                {/* Image Preview */}
                {previewUrl && (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="size-full bg-white object-contain"
                  />
                )}

                {!disabled && (
                  <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/5" />
                )}
              </div>
            </DialogTrigger>

            {/* Remove Button */}
            {!disabled && (
              <button
                type="button"
                onClick={handleRemove}
                className="border-qb-mist-30 text-qb-mist-60 hover:text-qb-destructive absolute top-1 right-1 z-2 rounded-full border bg-white p-0.5 shadow-sm transition-colors hover:cursor-pointer"
              >
                <Icon name="CloseOutlined" size={16} />
              </button>
            )}

            {/* Mobile/Full Preview Modal */}
            <DialogContent className="shadow-elevation-soft flex w-[90vw] flex-col gap-0 overflow-hidden rounded-2xl border-none bg-white p-2 sm:max-w-[450px] sm:p-4">
              <DialogHeader showCloseButton={false} className="px-0 py-0">
                <DialogTitle className="sr-only">Image Preview</DialogTitle>
                <div className="flex w-full items-center justify-end pb-2">
                  <DialogClose className="hover:bg-qb-mist-10 z-10 rounded-full p-1 text-[#3A3A3A] transition-colors">
                    <Icon name="CloseOutlined" size={24} />
                  </DialogClose>
                </div>
              </DialogHeader>

              <div className="bg-qb-mist-10 flex items-center justify-center overflow-hidden">
                {previewUrl && (
                  <img
                    src={previewUrl}
                    alt="Full Preview"
                    className="block h-auto max-h-[70vh] w-full object-contain"
                  />
                )}
              </div>
            </DialogContent>
          </DialogRoot>
        </div>

        <div className="flex min-w-0 flex-col gap-1">
          <span className="text-qb-mist-90 text-sm font-semibold">
            {label}{' '}
            {required ? <span className="text-qb-destructive">*</span> : <span>(Opsional)</span>}
          </span>
          <span
            className="text-qb-blue-50 cursor-pointer truncate text-sm hover:underline"
            onClick={handleFileNameClick}
            title={fileName || ''}
          >
            {fileName}
          </span>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
          disabled={disabled}
        />
      </div>
    )
  },
)

UploadImage.displayName = 'UploadImage'

export { UploadImage }
