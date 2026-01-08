import { useTranslation } from 'next-i18next'
import React, { forwardRef, ReactNode } from 'react'
import { Dialog as ReactAriaDialog, DialogProps } from 'react-aria-components'

import { CloseIcon } from '@/assets/icons'
import Button from '@/modules/common/Button'

type TitleProps = { title: string; 'aria-label'?: string } | { title?: never; 'aria-label': string }

type Props = { children: ReactNode } & TitleProps & Omit<DialogProps, 'children' | 'aria-label'>

/*
 * Based on OLO: https://github.com/bratislava/olo.sk/blob/master/next/src/components/lib/ModalDialog/Dialog.tsx
 *
 * Styling of Dialog to have fixed header and scrollable body is challenging.
 * Working solution was to use flexbox as mentioned here: https://stackoverflow.com/questions/4069734/fixed-header-footer-with-scrollable-content
 */

const Dialog = forwardRef<HTMLElement, Props>(({ children, title, ...props }, ref) => {
  const { t } = useTranslation()

  return (
    <ReactAriaDialog
      ref={ref}
      {...props}
      className="relative flex h-full flex-col overflow-y-hidden rounded-lg focus:outline-none"
    >
      {({ close }) => (
        <>
          {title ? (
            <div className="flex shrink-0 items-center gap-6 border-b border-border-light px-4 py-4.5 lg:px-6 lg:py-4">
              <h2 className="grow text-h5">{title}</h2>
              <Button
                aria-label={t('common.close')}
                className="absolute right-6 top-6 -m-4"
                variant="plain-primary"
                onPress={close}
              >
                <CloseIcon className="size-6" />
              </Button>
            </div>
          ) : null}
          <div className="flex grow flex-col overflow-y-scroll px-4 py-6 lg:px-6">{children}</div>
          {/* Render the close button above content, without using z-index, if no Dialog title is provided */}
          {title ? null : (
            <Button
              aria-label={t('common.close')}
              className="absolute right-6 top-6 -m-2"
              variant="plain-primary"
              onPress={close}
            >
              <CloseIcon className="size-6" />
            </Button>
          )}
        </>
      )}
    </ReactAriaDialog>
  )
})

export default Dialog
