declare module '*.svg' {
  import * as React from 'react'

  const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string; className?: string }
  >

  const src = ReactComponent
  export default src
}

declare module '*.svg?url' {
  const content: unknown
  export default content
}

declare module '*.css'
