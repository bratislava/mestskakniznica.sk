import { useTranslation } from 'next-i18next'
import React, { useMemo } from 'react'

import CardWrapper from '@/modules/cards-and-rows/CardWrapper'
import MLink from '@/modules/common/MLink'
import ShowMoreLink from '@/modules/common/ShowMoreLink'
import StrapiImage, { getImagePlaceholder } from '@/modules/common/StrapiImage'
import FormatDate from '@/modules/formatting/FormatDate'
import { NoticeListingEntityFragment } from '@/services/graphql'
import { useNavikronos } from '@/utils/navikronos'

type NoticeCardProps = {
  notice: NoticeListingEntityFragment
}

const NoticeCard = ({ notice }: NoticeCardProps) => {
  const { t } = useTranslation()
  const { getPathForStrapiEntity } = useNavikronos()

  const { image, link, date } = useMemo(() => {
    return {
      image: notice.attributes?.listingImage?.data,
      link: getPathForStrapiEntity(notice),
      date: notice.attributes?.publishedAt,
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notice, t])

  return (
    <CardWrapper className="group/showMore relative flex size-full shrink-0 flex-col justify-between">
      <div className="flex h-full flex-col">
        <div className="relative mb-4 h-40.5 w-full shrink-0">
          <StrapiImage
            image={image?.attributes ?? getImagePlaceholder()}
            alt="" // Empty alt on purpose
            fill
            className="object-cover"
          />
        </div>

        <div className="mb-2 text-sm text-foreground-body">
          <FormatDate value={date} valueType="ISO" />
        </div>
        <h3 className="mb-6 text-h5">
          <MLink href={link ?? '#'} variant="basic" stretched className="line-clamp-3">
            {notice.attributes?.title}
          </MLink>
        </h3>
      </div>
      <ShowMoreLink href={link ?? '#'} tabIndex={-1} parentGroup>
        {t('common.showMore')}
      </ShowMoreLink>
    </CardWrapper>
  )
}

export default NoticeCard
