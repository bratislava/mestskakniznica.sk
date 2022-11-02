import ScrollIcon from '@assets/images/scroll-icon.svg'
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
    <div className="fixed bottom-5 right-5 cursor-pointer rounded-full bg-white md:bottom-10 md:right-10">
      <button
        type="button"
        aria-label={t('goToTopAriaLabel')}
        id="backToTopBtn"
        className={`${visible ? 'visible' : 'invisible'}`}
        onClick={handleScrollToTop}
      >
        <ScrollIcon />
      </button>
    </div>
  )
}

export default ScrollToTop
