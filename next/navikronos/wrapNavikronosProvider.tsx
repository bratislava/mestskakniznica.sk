import { NavikronosProvider } from './NavikronosProvider'
import { ComponentType } from 'react'
import { NavikronosConfig, NavikronosStaticProps } from './types'

export const wrapNavikronosProvider = <
  Config extends NavikronosConfig,
  K extends { navikronosStaticProps: NavikronosStaticProps<Config> },
  P extends ComponentType<K>
>(
  Wrapped: ComponentType<K>
) => {
  return (props: K) => {
    return (
      <NavikronosProvider staticProps={props.navikronosStaticProps}>
        <Wrapped {...props} />
      </NavikronosProvider>
    )
  }
}
