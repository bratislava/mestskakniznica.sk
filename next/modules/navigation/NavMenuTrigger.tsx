import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import React, { forwardRef } from 'react'

import cn from '@/utils/cn'

type NavMenuTriggerProps = {
  label: string
  isFirst?: boolean
}

const NavMenuTrigger = forwardRef<HTMLButtonElement, NavMenuTriggerProps>(
  ({ label, isFirst = false }, forwardedRef) => {
    return (
      <NavigationMenu.Trigger
        ref={forwardedRef}
        // To disable "onHover" behaviour, needs to be set also in NavMenuContent
        // https://github.com/radix-ui/primitives/issues/1630#issuecomment-1237106380
        onPointerMove={(event) => event.preventDefault()}
        onPointerLeave={(event) => event.preventDefault()}
        className={cn(
          // Using `ring-inset` because offset doesn't look appealing in this context
          'flex h-full w-full items-end pb-1 text-h5 outline-none ring-inset transition hover:underline focus-visible:ring data-[state=open]:underline',
          { 'pl-3': !isFirst },
        )}
      >
        {label}
      </NavigationMenu.Trigger>
    )
  },
)

export default NavMenuTrigger
