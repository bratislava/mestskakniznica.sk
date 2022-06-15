import Link from 'next/link'
import { useTranslation } from 'next-i18next'

import { ILocality } from '../../utils/types'

function LocalityCard({
  localityTitle,
  localityAddress,
  localitySections,
  localitySlug,
  localityOpenFrom,
  localityOpenTo,
}: ILocality) {
  const { t } = useTranslation('homepage')
  return (
    <div key={localityTitle} className="w-[280px] relative pb-5">
      <div className="h-[400px] w-[580px] border-[1px] border-gray-900 pb-16 pl-8">
        <div className="pt-6 hover:underline text-[28px]">{localityTitle}</div>
        <div className="text-sm pt-3 leading-[19.6px] text-gray-universal-70 pb-8">{localityAddress.navigateTo}</div>
        {localitySections?.map((item) => (
          <div key={item.localitySectionTitle} className="text-[14px] leading-[19.6px] text-gray-universal-70 pb-2">
            {item.localitySectionTitle}
          </div>
        ))}
        <div className="text-sm leading-[19.6px] text-gray-universal-70 absolute bottom-20 left-8">
          {t('localityOpeningText')}
          <div>
            {localityOpenFrom} - {localityOpenTo}
          </div>
        </div>
        <div className="text-[14px] cursor-pointer pt-6 pb-16 absolute bottom-[-25px] left-8">
          <Link href={localitySlug || ''} passHref>
            <a className="hover:underline uppercase" href={localitySlug}>
              {t('localityDetailText')} {'>'}
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LocalityCard
