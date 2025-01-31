import { useTranslation } from 'next-i18next'
import { useCallback } from 'react'

import { UploadFileEntityFragment } from '@/services/graphql'

import { getFileSize } from './utils'

export const useDownloadAriaLabel = () => {
  const { t, i18n } = useTranslation('common')

  // borrowed from project https://github.com/bratislava/marianum
  const getDownloadAriaLabel = useCallback(
    (file: UploadFileEntityFragment, title?: string): string => {
      if (!file.attributes) {
        return t('useDownloadAriaLabel.openFile')
      }
      const { size, ext, name } = file.attributes
      const formattedSize = getFileSize(size, i18n.language)
      const extFormatted = ext?.replace('.', '') ?? t('useDownloadAriaLabel.unknownFormat')

      return t('useDownloadAriaLabel.openFileAriaLabel', {
        title: title || name,
        ext: extFormatted,
        size: formattedSize,
      })
    },
    [i18n.language, t]
  )
  return { getDownloadAriaLabel }
}
