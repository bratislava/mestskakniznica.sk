import { ComponentType } from 'react'

import { NavikronosProvider } from './NavikronosProvider'
import { NavikronosConfig, NavikronosStaticProps } from './types'

export const wrapNavikronosProvider = <
  Config extends NavikronosConfig,
  Props extends { navikronosStaticProps: NavikronosStaticProps<Config> }
>(
  Wrapped: ComponentType<Props>
) => {
  // eslint-disable-next-line react/function-component-definition
  return (props: Props) => {
    return (
      // eslint-disable-next-line react/destructuring-assignment
      <NavikronosProvider staticProps={props.navikronosStaticProps}>
        <Wrapped {...props} />
      </NavikronosProvider>
    )
  }
}
