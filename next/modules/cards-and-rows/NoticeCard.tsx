import Placeholder from '@assets/images/list-item-thumbnail.jpeg'
import MImage from '@modules/common/MImage'
import MLink from '@modules/common/MLink'
import ShowMoreLink from '@modules/common/ShowMoreLink'
import FormatDate from '@modules/formatting/FormatDate'
import { NoticeListingEntityFragment } from '@services/graphql'
import { useNavikronos } from '@utils/navikronos'
import { useTranslation } from 'next-i18next'
import React, { useMemo } from 'react'

type NoticeCardProps = {
  notice: NoticeListingEntityFragment
}

const NoticeCard = ({ notice }: NoticeCardProps) => {
  const { t } = useTranslation('common')
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
    <div className="group/showMore relative flex h-full w-full shrink-0 flex-col justify-between">
      <div className="flex h-full flex-col">
        <div className="relative h-[200px]">
          <MImage
            className="object-cover"
            image={image?.attributes || { url: Placeholder.src }}
            fallbackImage={Placeholder.src}
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            fill
            priority
          />
        </div>

        <div className="mb-2 text-sm text-foreground-body">
          <FormatDate value={date} valueType="ISO" />
        </div>
        <h3 className="mb-6 text-h5 line-clamp-3">
          <MLink href={link ?? '#'} variant="basic" stretched>
            {notice.attributes?.title}
          </MLink>
        </h3>
      </div>
      <ShowMoreLink href={link ?? '#'} tabIndex={-1} parentGroup>
        {t('showMore')}
      </ShowMoreLink>
    </div>
  )
}

export default NoticeCard
