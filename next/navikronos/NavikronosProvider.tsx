import { createContext, PropsWithChildren, useContext, useMemo, useState } from 'react'
import config from 'tailwindcss/defaultConfig'

import { useNavikronosConfig } from './NavikronosConfigProvider'
import { getNavikronosObject, NavikronosObject } from './navikronosObject'
import { NavikronosClientNavigation, NavikronosConfig, NavikronosStaticProps } from './types'

const NavikronosContext = createContext<NavikronosObject | null>(null)

export const NavikronosProvider = ({
  staticProps,
  children,
}: PropsWithChildren<{ staticProps: NavikronosStaticProps }>) => {
  const config = useNavikronosConfig()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const navikronos = useMemo(() => getNavikronosObject(config, staticProps), [config, staticProps])
  return <NavikronosContext.Provider value={navikronos}>{children}</NavikronosContext.Provider>
}

export const useNavikronos = () => {
  const navikronos = useContext(NavikronosContext)

  if (!config) {
    throw new Error('TODO message')
  }

  return navikronos
}
