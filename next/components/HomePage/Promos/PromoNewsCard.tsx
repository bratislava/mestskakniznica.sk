import MLink from '@modules/common/MLink'
import ShowMoreLink from '@modules/common/ShowMoreLink'
import { useNavikronos } from '@utils/navikronos'
import { useTranslation } from 'next-i18next'
import React from 'react'

interface IPromoNewsCard {
  title: string
  slug: string
}

const PromoNewsCard = ({ title, slug }: IPromoNewsCard) => {
  const { t } = useTranslation('common')
  const { getPathForEntity } = useNavikronos()

  const link = getPathForEntity({ type: 'notice', slug }) ?? ''

  return (
    <div className="group/showMore relative h-full w-full bg-promo-peach">
      <div className="pt-[18px] pl-5 pr-[25px] text-h2 text-foreground-heading line-clamp-5">
        <MLink href={link} variant="basic" stretched className="after:z-[1]">
          {title}
        </MLink>
      </div>

      <div className="absolute bottom-4 left-5">
        <ShowMoreLink href={link} tabIndex={-1} parentGroup>
          {t('showMore')}
        </ShowMoreLink>
      </div>
    </div>
  )
}

export default PromoNewsCard
