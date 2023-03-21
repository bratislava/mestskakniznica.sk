import { ComponentType } from 'react'

import { NavikronosStaticProps } from './internal/internalTypes'
import { NavikronosProvider } from './NavikronosProvider'

export const wrapNavikronosProvider = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Props extends { navikronosStaticProps: NavikronosStaticProps<any> }
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
