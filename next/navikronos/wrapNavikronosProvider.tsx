import { NavikronosProvider } from './NavikronosProvider'
import { ComponentProps } from 'react'
import { NavikronosStaticProps } from './types'

export const wrapNavikronosProvider = <
  K extends { navikronosStaticProps: NavikronosStaticProps },
  P extends React.ComponentType<K>
>(
  Wrapped: React.ComponentType<K>
) => {
  return (props: K) => {
    return (
      <NavikronosProvider staticProps={props.navikronosStaticProps}>
        <Wrapped {...props} />
      </NavikronosProvider>
    )
  }
}
