import { useTranslation } from 'next-i18next'

const SkipNavigation = () => {
  const { t } = useTranslation(['common'])
  return (
    <button
      onClick={() => {
        const contentElement = document.getElementById('content-anchor')
        if (contentElement) {
          contentElement.setAttribute('tabindex', '0')
          contentElement.focus()
          contentElement.removeAttribute('tabindex')
        }
      }}
      className="transform text-base bg-gray-900 text-white fixed left-0 top-5 md:top-8 focus:translate-x-0 -translate-x-100 transition-transform"
    >
      {t('skipNavigation')}
    </button>
  )
}

export default SkipNavigation
