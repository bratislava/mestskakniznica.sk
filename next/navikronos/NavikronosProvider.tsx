import { Context, createContext, PropsWithChildren, useContext, useMemo } from 'react'

import { NavikronosStaticProps } from './internal/internalTypes'
import { getNavikronosCurrentRouteObject, NavikronosObject } from './internal/treeObject'
import { useNavikronosConfig } from './NavikronosConfigProvider'
import { NavikronosConfig } from './types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const NavikronosContext = createContext<NavikronosObject<any> | null>(null)

export const NavikronosProvider = <Config extends NavikronosConfig>({
  staticProps,
  children,
}: PropsWithChildren<{ staticProps: NavikronosStaticProps<Config> }>) => {
  const config = useNavikronosConfig()

  const navikronos = useMemo(
    () => getNavikronosCurrentRouteObject(config, staticProps),
    [config, staticProps]
  )

  return <NavikronosContext.Provider value={navikronos}>{children}</NavikronosContext.Provider>
}

const useNavikronos = <Config extends NavikronosConfig>() => {
  const navikronos = useContext(NavikronosContext as Context<NavikronosObject<Config> | null>)

  if (!navikronos) {
    throw new Error(
      'You must retrieve static props using `navikronosGetStaticProps` and wrap page using `wrapNavikronosProvider` in order to use `useNavikronos` hook.'
    )
  }

  return navikronos
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const createUseNavikronosHook = <Config extends NavikronosConfig>(config: Config) => {
  return useNavikronos<Config>
}
