import ScrollIcon from '@assets/images/scroll-icon.svg'
import { useTranslation } from 'next-i18next'

const ScrollToTop = () => {
  const { t } = useTranslation('common')
  const scrollTop = () => {
    window?.scrollTo(0, 0)
  }

  const checkScrollTop = () => {
    let btn = document.getElementById('backToTopBtn')
    if (btn) {
      if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        btn.style.display = 'block'
      } else {
        btn.style.display = 'none'
      }
    }
  }
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', checkScrollTop)
  }

  return (
    <div className="fixed bottom-5 md:bottom-10 right-5 md:right-10 cursor-pointer bg-white rounded-full">
      <button aria-label={t('goToTopAriaLabel')} id="backToTopBtn" style={{ display: 'none' }} onClick={scrollTop}>
        <ScrollIcon />
      </button>
    </div>
  )
}

export default ScrollToTop
