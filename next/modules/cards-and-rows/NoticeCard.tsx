import Placeholder from '@assets/images/list-item-thumbnail.jpeg'
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
  const { getPathForEntity } = useNavikronos()

  const { image, link, date } = useMemo(() => {
    return {
      image: notice.attributes?.listingImage?.data,
      link: getPathForEntity({ type: 'notice', slug: notice.attributes?.slug }),
      date: notice.attributes?.publishedAt,
    }
  }, [notice, t])

  return (
    <div className="group/showMore relative flex h-full w-full shrink-0 flex-col justify-between">
      <div className="flex h-full flex-col">
        {/* TODO: Replace with MImage */}
        <img
          className="mb-4 h-48 w-full object-cover"
          alt=""
          src={image?.attributes?.url || Placeholder.src}
        />

        <div className="mb-2 text-sm text-foreground-body">
          <FormatDate value={date} valueType="ISO" />
        </div>
        <h3 className="mb-6 text-h5 line-clamp-3">
          <MLink href={link ?? ''} variant="basic" stretched>
            {notice.attributes?.title}
          </MLink>
        </h3>
      </div>
      <ShowMoreLink href={link ?? ''} tabIndex={-1} parentGroup>
        {t('showMore')}
      </ShowMoreLink>
    </div>
  )
}

export default NoticeCard
