import { useTranslation } from 'next-i18next'
import { PropsWithChildren, useMemo } from 'react'
import { I18nProvider } from 'react-aria'

// Copied from: https://github.com/bratislava/marianum/blob/762d10222bd33352b77a44d902620181b07107c1/next/components/atoms/MI18nProvider.tsx

// eslint-disable-next-line @typescript-eslint/ban-types
const MI18nProvider = ({ children }: PropsWithChildren<{}>) => {
  const { i18n } = useTranslation()
  const locale = useMemo(() => {
    if (i18n?.language === 'en') {
      /* https://unix.stackexchange.com/a/62317
       * https://github.com/date-fns/date-fns/issues/1996#issuecomment-984811417 */
      return 'en-IE'
    }
    return 'sk-SK'
  }, [i18n])

  return <I18nProvider locale={locale}>{children}</I18nProvider>
}

export default MI18nProvider
