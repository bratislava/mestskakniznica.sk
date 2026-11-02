import { createContext, PropsWithChildren, useContext } from 'react'

import { NavikronosConfig } from './config-type'

const NavikronosConfigContext = createContext<NavikronosConfig | null>(null)

export const NavikronosConfigProvider = ({
  children,
  config,
}: PropsWithChildren<{ config: NavikronosConfig }>) => {
  return (
    <NavikronosConfigContext.Provider value={config}>{children}</NavikronosConfigContext.Provider>
  )
}

export const useNavikronosConfig = () => {
  const config = useContext(NavikronosConfigContext)

  if (!config) {
    throw new Error('You must provide Navikronos config to use "useNavikronosConfig".')
  }

  return config
}
