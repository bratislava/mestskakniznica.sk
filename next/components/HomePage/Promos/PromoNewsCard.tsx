import MLink from '@modules/common/MLink'
import ShowMoreLink from '@modules/common/ShowMoreLink'
import { useTranslation } from 'next-i18next'
import React from 'react'

interface IPromoNewsCard {
  title: string
  slug: string
}

const PromoNewsCard = ({ title, slug }: IPromoNewsCard) => {
  const { t } = useTranslation('common')
  return (
    <div className="group/showMore relative h-full w-full bg-promo-peach">
      <div className="pt-[18px] pl-5 pr-[25px] text-h2 text-foreground-heading line-clamp-5">
        <MLink href={slug} variant="basic" stretched className="after:z-[1]">
          {title}
        </MLink>
      </div>

      <div className="absolute bottom-4 left-5">
        <ShowMoreLink href={slug} tabIndex={-1} parentGroup>
          {t('showMore')}
        </ShowMoreLink>
      </div>
    </div>
  )
}

export default PromoNewsCard
