import MLink from '@modules/common/MLink'
import ShowMoreLink from '@modules/common/ShowMoreLink'
import { useNavikronos } from '@utils/navikronos'
import { useTranslation } from 'next-i18next'
import React from 'react'

type PromoNewsCardProps = {
  title: string
  slug: string
}

const PromoNewsCard = ({ title, slug }: PromoNewsCardProps) => {
  const { t } = useTranslation('common')
  const { getPathForEntity } = useNavikronos()

  const link = getPathForEntity({ type: 'notice', slug }) ?? ''

  return (
    <div className="group/showMore relative flex h-full w-full flex-col justify-between bg-promo-peach py-3 pl-4 pr-5 lg:pr-[25px] lg:pl-5 lg:pb-[15px] lg:pt-[18px]">
      <h3 className="text-h2 line-clamp-5">
        <MLink href={link} variant="basic" stretched>
          {title}
        </MLink>
      </h3>

      <ShowMoreLink href={link} tabIndex={-1} parentGroup>
        {t('showMore')}
      </ShowMoreLink>
    </div>
  )
}

export default PromoNewsCard
