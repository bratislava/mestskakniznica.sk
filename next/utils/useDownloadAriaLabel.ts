import { UploadFileEntityFragment } from '@services/graphql'
import { filesize } from 'filesize'
import { useTranslation } from 'next-i18next'
import { useCallback } from 'react'

export const useDownloadAriaLabel = () => {
  const { t, i18n } = useTranslation('common')

  // borrowed from project https://github.com/bratislava/marianum
  const getDownloadAriaLabel = useCallback(
    (file: UploadFileEntityFragment, title: string): string => {
      if (!file.attributes) {
        return t('downloadFile')
      }
      const { size, ext } = file.attributes
      const formattedSize = filesize(size * 1000, { round: 1, locale: i18n.language })
      const extFormatted = ext ?? t('unknownFormat')

      return t('downloadFileAriaLabel', {
        title,
        ext: extFormatted,
        size: formattedSize,
      })
    },
    [i18n.language, t]
  )
  return { getDownloadAriaLabel }
}
