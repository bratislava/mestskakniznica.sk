import ArrowLeft from '@assets/images/arrow-left.svg'
import Button from '@modules/common/Button'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import { useEventListener } from 'usehooks-ts'

const handleScrollToTop = () => {
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
}

const ScrollToTop = () => {
  const { t } = useTranslation('common')

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
      className={`fixed bottom-5 right-5 flex h-10 w-10 rotate-90 cursor-pointer items-center justify-center rounded-full border border-border-dark bg-white hover:border-button-hover md:bottom-10 md:right-10 ${
        visible ? 'visible' : 'invisible'
      }`}
      onPress={handleScrollToTop}
    >
      <ArrowLeft />
    </Button>
  )
}

export default ScrollToTop
