import MLink from '@modules/common/MLink'
import ShowMoreLink from '@modules/common/ShowMoreLink'
import { ILocality } from '@utils/types'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { useNavikronos } from '@utils/navikronos'

// TODO: Usage
const LocalityCard = ({
  localityTitle,
  localityAddress,
  localitySections,
  localitySlug,
  localityOpenFrom,
  localityOpenTo,
}: ILocality) => {
  const { t } = useTranslation('homepage')
  const { getPathForEntity } = useNavikronos()

  const href = getPathForEntity({ type: 'branch', slug: localitySlug }) ?? ''

  return (
    <div key={localityTitle} className="group/showMore relative w-[280px] pb-5">
      <div className="h-[400px] w-[580px] border-[1px] border-border-dark pb-16 pl-8">
        <div className="pt-6 text-[28px] hover:underline">
          <MLink href={href} variant="basic" stretched>
            {localityTitle}
          </MLink>
        </div>
        <div className="pt-3 pb-8 text-base text-foreground-body">{localityAddress.navigateTo}</div>
        {localitySections?.map((item) => (
          <div key={item.localitySectionTitle} className="pb-2 text-[14px] text-foreground-body">
            {item.localitySectionTitle}
          </div>
        ))}
        <div className="absolute bottom-20 left-8 text-base text-foreground-body">
          {t('localityOpeningText')}
          <div>
            {localityOpenFrom} - {localityOpenTo}
          </div>
        </div>
        <div className="absolute bottom-[-25px] left-8 cursor-pointer pt-6 pb-16 text-[14px]">
          <ShowMoreLink href={href} tabIndex={-1} parentGroup>
            {t('localityDetailText')}
          </ShowMoreLink>
        </div>
      </div>
    </div>
  )
}

export default LocalityCard
