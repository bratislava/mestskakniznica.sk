import * as React from 'react'

const UIContext = React.createContext<IComponents>({
  Link: ({ children, ...props }) => <a {...props}>{children}</a>,
  Image: ({ alt, ...props }) => <img alt="Markdown content" {...props} />,
})

interface IComponents {
  Link: React.FC<{
    locale?: string
    className?: string
    href: string
    target?: string
    rel?: string
    children: React.ReactNode
  }>
  Image: React.FC<{ alt?: string; src: string; shadow: boolean }>
}

export const UIContextProvider = ({
  children,
  components,
}: {
  children: React.ReactNode
  components: IComponents
}) => {
  return <UIContext.Provider value={components}>{children}</UIContext.Provider>
}

export const useUIContext = () => React.useContext(UIContext)
