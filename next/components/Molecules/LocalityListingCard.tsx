import Link from 'next/link'
import { useTranslation } from 'next-i18next'

import { ILocality } from '../../utils/types'

const LocalityCard = ({
  localityTitle,
  localityAddress,
  localitySections,
  localitySlug,
  localityOpenFrom,
  localityOpenTo,
}: ILocality) => {
  const { t } = useTranslation('homepage')
  return (
    <div key={localityTitle} className="relative w-[280px] pb-5">
      <div className="h-[400px] w-[580px] border-[1px] border-gray-900 pb-16 pl-8">
        <div className="pt-6 text-[28px] hover:underline">{localityTitle}</div>
        <div className="pt-3 pb-8 text-sm leading-[19.6px] text-gray-universal-70">
          {localityAddress.navigateTo}
        </div>
        {localitySections?.map((item) => (
          <div
            key={item.localitySectionTitle}
            className="pb-2 text-[14px] leading-[19.6px] text-gray-universal-70"
          >
            {item.localitySectionTitle}
          </div>
        ))}
        <div className="absolute bottom-20 left-8 text-sm leading-[19.6px] text-gray-universal-70">
          {t('localityOpeningText')}
          <div>
            {localityOpenFrom} - {localityOpenTo}
          </div>
        </div>
        <div className="absolute bottom-[-25px] left-8 cursor-pointer pt-6 pb-16 text-[14px]">
          <Link href={localitySlug || ''} passHref>
            <a className="uppercase hover:underline" href={localitySlug}>
              {t('localityDetailText')} {'>'}
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LocalityCard
