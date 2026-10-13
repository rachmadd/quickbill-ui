import { Portal as RadixPortal, type PortalProps } from '@radix-ui/react-portal'
export default function Portal(props: PortalProps) {
  return (
    <RadixPortal {...props}>
      <div className="quickbill-ui">{props.children}</div>
    </RadixPortal>
  )
}
