import { GeneralQuery } from '@bratislava/strapi-sdk-city-library'
import * as React from 'react'
import { createContext, useContext } from 'react'

const GeneralContext = createContext<GeneralQuery | null>(null)

export const GeneralContextProvider = ({
  children,
  general,
}: {
  children: React.ReactNode
  general: GeneralQuery
}) => {
  return <GeneralContext.Provider value={general}>{children}</GeneralContext.Provider>
}

export const useGeneralContext = () => {
  const result = useContext(GeneralContext)

  // General context is required in the whole app, so it's correct that it fails when used and
  // not initialized.
  if (!result) {
    throw new Error('GeneralContext is not initialized.')
  }

  return result
}
