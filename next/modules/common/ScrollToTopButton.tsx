import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import { useEventListener } from 'usehooks-ts'

import { ChevronLeftIcon } from '@/assets/icons'
import Button from '@/modules/common/Button'

const handleScrollToTop = () => {
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
}

const ScrollToTopButton = () => {
  const { t } = useTranslation()

  const [visible, setVisible] = useState(false)

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setVisible(true)
    } else {
      setVisible(false)
    }
  }

  useEventListener('scroll', handleScroll)

  return (
    <Button
      variant="unstyled"
      aria-label={t('goToTopAriaLabel')}
      id="backToTopBtn"
      // z-index is here to display over mapbox info-button
      className={`fixed bottom-5 right-5 z-10 flex h-10 w-10 rotate-90 cursor-pointer items-center justify-center rounded-full border border-border-dark bg-white hover:border-button-hover md:bottom-10 md:right-10 ${
        visible ? 'visible' : 'invisible'
      }`}
      onPress={handleScrollToTop}
    >
      <ChevronLeftIcon />
    </Button>
  )
}

export default ScrollToTopButton
