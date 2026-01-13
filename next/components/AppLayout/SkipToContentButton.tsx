import { useTranslation } from 'next-i18next'

import Button from '@/modules/common/Button'

/* Based on approach here: https://levelup.gitconnected.com/build-an-accessible-skip-to-content-anchor-link-with-react-140903f3bd7e */
const handleSkip = () => {
  const contentElement: HTMLElement | null = document.querySelector('main:first-of-type')
  if (contentElement) {
    contentElement.setAttribute('tabindex', '0')
    contentElement.focus()
    setTimeout(() => contentElement.removeAttribute('tabindex'), 1000)
  }
}

const SkipToContentButton = () => {
  const { t } = useTranslation()

  return (
    <Button
      onPress={handleSkip}
      className="fixed left-0 top-5 -translate-x-100 bg-button-dark text-base text-white transition-transform focus:translate-x-0 md:top-8"
    >
      {t('skipNavigation')}
    </Button>
  )
}

export default SkipToContentButton
