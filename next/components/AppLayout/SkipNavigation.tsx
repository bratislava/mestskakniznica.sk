import { useTranslation } from 'next-i18next'

const SkipNavigation = () => {
  const { t } = useTranslation(['common'])

  /* Based on approach here: https://levelup.gitconnected.com/build-an-accessible-skip-to-content-anchor-link-with-react-140903f3bd7e */
  const handleSkip = () => {
    const contentElement: HTMLElement | null = document.querySelector('#content-anchor')
    if (contentElement) {
      contentElement.setAttribute('tabindex', '0')
      contentElement.focus()
      setTimeout(() => contentElement.removeAttribute('tabindex'), 1000)
    }
  }

  return (
    <button
      type="button"
      onClick={handleSkip}
      className="fixed left-0 top-5 -translate-x-100 bg-button-dark text-base text-white transition-transform focus:translate-x-0 md:top-8"
    >
      {t('skipNavigation')}
    </button>
  )
}

export default SkipNavigation
