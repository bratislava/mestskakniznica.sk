import cx from 'classnames'
import FocusTrap from 'focus-trap-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'next-i18next'
import { ReactNode, useEffect, useRef } from 'react'
import { AriaOverlayProps, OverlayContainer, useModal, useOverlay } from 'react-aria'
import { twMerge } from 'tailwind-merge'
import { useIsClient, useLockedBody } from 'usehooks-ts'

import { CloseIcon } from '@/assets/icons'
import Button from '@/modules/common/Button'

export type ModalProps = {
  children: ReactNode
  showCloseButton?: boolean
  underlayClassName?: string
  overlayClassName?: string
  centerVertically?: boolean
  noAnimation?: boolean
} & AriaOverlayProps

// https://github.com/bratislava/marianum.sk/blob/master/next/components/atoms/Modal.tsx

const Modal = (props: ModalProps) => {
  const {
    isOpen,
    onClose,
    children,
    isDismissable,
    underlayClassName,
    overlayClassName,
    showCloseButton = false,
    centerVertically = true,
    noAnimation = false,
  } = props
  const { t } = useTranslation()
  const ref = useRef<HTMLDivElement | null>(null)
  const { overlayProps, underlayProps } = useOverlay(
    { ...props, isDismissable: isDismissable === undefined ? true : isDismissable },
    ref
  )
  const [, setLockedBody] = useLockedBody(isOpen)

  useEffect(() => {
    setLockedBody(isOpen ?? false)
  }, [isOpen, setLockedBody])

  const { modalProps } = useModal()

  const isClient = useIsClient()

  return isClient ? (
    <OverlayContainer>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="relative z-50"
            transition={{ duration: noAnimation ? 0 : 0.2 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div
              {...underlayProps}
              className={twMerge(
                'fixed inset-0 z-50 overflow-y-auto overflow-x-hidden bg-dark/40',
                underlayClassName
              )}
            >
              <div className={cx({ 'flex min-h-full items-center': centerVertically })}>
                <FocusTrap>
                  <div
                    className={twMerge('mx-auto flex w-fit items-center', overlayClassName)}
                    {...overlayProps}
                    {...modalProps}
                    ref={ref}
                  >
                    {showCloseButton && (
                      <Button
                        variant="primary"
                        className="pointer-events-auto fixed top-6 right-6 z-30"
                        aria-label={t('modal.closeModal')}
                        onPress={onClose}
                      >
                        <CloseIcon />
                      </Button>
                    )}
                    {children}
                  </div>
                </FocusTrap>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </OverlayContainer>
  ) : null
}

export default Modal
