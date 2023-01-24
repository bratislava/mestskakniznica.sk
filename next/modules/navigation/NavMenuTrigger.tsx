import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import cx from 'classnames'
import React, { forwardRef } from 'react'

type NavMenuTriggerProps = {
  label: string
  isFirst?: boolean
}

const NavMenuTrigger = forwardRef<any, NavMenuTriggerProps>(
  ({ label, isFirst = false }, forwardedRef) => {
    return (
      <NavigationMenu.Trigger
        ref={forwardedRef}
        // Uncomment this to disable "onHover" behaviour, needs to be uncommented also in NavMenuContent
        // onPointerMove={(event) => event.preventDefault()}
        // onPointerLeave={(event) => event.preventDefault()}
        className={cx('flex h-full w-full items-end pb-1 text-h5', { 'pl-3': !isFirst })}
      >
        {label}
      </NavigationMenu.Trigger>
    )
  }
)

export default NavMenuTrigger
