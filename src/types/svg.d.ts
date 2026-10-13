declare module '*.svg?url' {
  const src: string
  export default src
}

// This handles the standard `import MyIcon from './icon.svg'`
declare module '*.svg' {
  import * as React from 'react'
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>
  const src: string
  export default src
}

// This handles `import myIconUrl from './icon.svg?url'`
declare module '*.svg?url' {
  const src: string
  export default src
}

// This handles `import MyIcon from './icon.svg?react'`
declare module '*.svg?react' {
  import * as React from 'react'
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>
  const src: string
  export default src
}
