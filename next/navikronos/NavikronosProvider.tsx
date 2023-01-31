import { createContext, PropsWithChildren, useContext, useMemo, useState } from 'react'
import config from 'tailwindcss/defaultConfig'

import { useNavikronosConfig } from './NavikronosConfigProvider'
import { getNavikronosObject, NavikronosObject } from './navikronosObject'
import { NavikronosClientNavigation, NavikronosConfig } from './types'

const NavikronosContext = createContext<NavikronosObject | null>(null)

export const NavikronosProvider = ({
  children,
  navigation,
  currentRoute,
}: PropsWithChildren<{ navigation: NavikronosClientNavigation; currentRoute: string }>) => {
  const config = useNavikronosConfig()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const navikronos = useMemo(
    () => getNavikronosObject(config, navigation, currentRoute),
    [config, navigation, currentRoute]
  )
  return <NavikronosContext.Provider value={navikronos}>{children}</NavikronosContext.Provider>
}

const useNavikronos = () => {
  const navikronos = useContext(NavikronosContext)

  if (!config) {
    throw new Error('TODO message')
  }

  return navikronos
}
