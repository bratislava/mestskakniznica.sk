import ScrollIcon from '@assets/images/scroll-icon.svg'
import { useTranslation } from 'next-i18next'

function ScrollToTop() {
  const { t } = useTranslation('common')
  const scrollTop = () => {
    window?.scrollTo(0, 0)
  }

  const checkScrollTop = () => {
    const btn = document.querySelector('#backToTopBtn') as HTMLElement | null;
    if (btn) {
      btn.style.display = document.body.scrollTop > 300 || document.documentElement.scrollTop > 300 ? 'block' : 'none';
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
