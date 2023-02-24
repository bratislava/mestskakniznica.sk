import PromoEventCard from '@modules/cards-and-rows/PromoEventCard'
import PromoNewsCard from '@modules/cards-and-rows/PromoNewsCard'
import { EventCardEntityFragment, NoticeListingEntityFragment } from '@services/graphql'
import { isDefined, withAttributes } from '@utils/isDefined'

import Carousel from '../../modules/common/Carousel/Carousel'

interface SectionPromosProps {
  promos: (EventCardEntityFragment | NoticeListingEntityFragment)[]
}

// TODO: sizes are now hardcoded, should be calculated to fit the screen

const SectionPromos = ({ promos }: SectionPromosProps) => {
  return (
    <Carousel
      listClassName="my-10 h-[350px] gap-4 px-4 lg:px-0 md:h-[490px] lg:gap-5"
      itemClassName="w-10/12 max-w-[268px] md:max-w-[379px]"
      shiftIndex={3}
      items={promos
        ?.map((promo) => {
          switch (promo.__typename) {
            case 'EventEntity':
              return {
                element: <PromoEventCard event={withAttributes(promo)} />,
                key: promo?.attributes?.slug,
              }

            case 'NoticeEntity':
              return {
                element: (
                  <PromoNewsCard
                    title={promo?.attributes?.title ?? ''}
                    slug={promo?.attributes?.slug ?? ''}
                  />
                ),
                key: promo?.attributes?.slug,
              }

            default:
              return { element: null, key: undefined }
          }
        })
        .filter(isDefined)}
    />
  )
}

export default SectionPromos
