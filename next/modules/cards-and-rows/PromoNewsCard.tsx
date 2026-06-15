import { useTranslation } from 'next-i18next/pages'

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
    <CardWrapper className="group/showMore relative flex size-full flex-col justify-between bg-promo-peach py-3 pr-5 pl-4 lg:pt-[18px] lg:pr-[25px] lg:pb-[15px] lg:pl-5">
      <h3 className="text-h2">
        <MLink href={link} variant="basic" stretched className="line-clamp-3 outline-none">
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
