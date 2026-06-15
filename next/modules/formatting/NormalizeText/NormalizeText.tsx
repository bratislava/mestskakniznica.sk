import { useTranslation } from 'next-i18next/pages'
import { PropsWithChildren, useMemo } from 'react'

import { normalizeSkText } from './normalizeSkText'

const NormalizeText = ({ children }: PropsWithChildren<object>) => {
  const { i18n } = useTranslation()

  return useMemo(() => {
    if (i18n?.language === 'sk' && typeof children === 'string') {
      return <>{normalizeSkText(children)}</>
    }

    return <>{children}</>
  }, [children, i18n?.language])
}

export default NormalizeText
