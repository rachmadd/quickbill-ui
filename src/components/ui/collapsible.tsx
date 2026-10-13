import { type FC, useState, type PropsWithChildren } from 'react'
import { Icon } from '../icons' // Ensure this path matches your project
import { cn } from '@/lib/utils'

type CollapsibleProps = PropsWithChildren<{
  defaultOpen?: boolean
  heading?: React.ReactNode
  className?: string
}>

const Collapsible: FC<CollapsibleProps> = ({
  defaultOpen = false,
  className,
  heading,
  children,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen)

  return (
    <div
      className={cn(
        'rounded-2xl bg-white px-4 py-3 shadow-[0px_0px_10px_rgba(0,0,0,0.1)]',
        className,
      )}
    >
      {/* Removed 'gap-y-3' here. 
         Ideally, spacing between header and content should be handled inside 
         the collapsible area so the margin/padding animates away too.
      */}
      <div className="flex flex-col">
        <div
          className="flex cursor-pointer flex-row items-center gap-x-4"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="grow">{heading}</div>
          <div>
            <Icon
              name={'ChevronDownOutlined'}
              size={24}
              className={cn(
                'text-qb-mist-80 transition-transform duration-300',
                isOpen && 'rotate-180',
              )}
            />
          </div>
        </div>

        {/* The Animation Wrapper */}
        <div
          className={cn(
            'grid transition-[grid-template-rows] duration-300 ease-in-out',
            isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* CRITICAL: The inner div with overflow-hidden */}
          <div className="overflow-hidden">
            {/* Add top padding here so it slides out with the content */}
            <div className="pt-3 opacity-100 transition-opacity duration-500">{children}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
export { Collapsible }
