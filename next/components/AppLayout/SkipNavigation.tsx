import { useTranslation } from 'next-i18next'

function SkipNavigation() {
  const { t } = useTranslation(['common'])
  return (
    <button
      onClick={() => {
        const contentElement = document.querySelector('#content-anchor') as HTMLElement | null
        if (contentElement) {
          contentElement.setAttribute('tabindex', '0')
          contentElement.focus()
          contentElement.removeAttribute('tabindex')
        }
      }}
      className="fixed left-0 top-5 -translate-x-100 transform bg-gray-900 text-base text-white transition-transform focus:translate-x-0 md:top-8"
    >
      {t('skipNavigation')}
    </button>
  )
}

export default SkipNavigation
