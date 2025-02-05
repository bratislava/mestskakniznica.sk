import { useTranslation } from 'next-i18next'
import React from 'react'

import CardWrapper from '@/modules/cards-and-rows/CardWrapper'
import MLink from '@/modules/common/MLink'
import ShowMoreLink from '@/modules/common/ShowMoreLink'
import { NoticeListingEntityFragment } from '@/services/graphql'
import { useNavikronos } from '@/utils/navikronos'

type PromoNewsCardProps = {
  notice: NoticeListingEntityFragment
}

const PromoNewsCard = ({ notice }: PromoNewsCardProps) => {
  const { t } = useTranslation()
  const { getPathForStrapiEntity } = useNavikronos()

  const link = getPathForStrapiEntity(notice) ?? '#'

  return (
    <CardWrapper className="group/showMore relative flex h-full w-full flex-col justify-between bg-promo-peach py-3 pl-4 pr-5 lg:pr-[25px] lg:pl-5 lg:pb-[15px] lg:pt-[18px]">
      <h3 className="text-h2">
        <MLink href={link} variant="basic" stretched className="outline-none line-clamp-3">
          {notice.attributes?.title}
        </MLink>
      </h3>

      <ShowMoreLink href={link} tabIndex={-1} parentGroup>
        {t('common.showMore')}
      </ShowMoreLink>
    </CardWrapper>
  )
}

export default PromoNewsCard
