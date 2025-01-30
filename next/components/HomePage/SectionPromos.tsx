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
      // heights include padding that is used together with negative margin to make the whole focus rings visible
      listClassName="my-10 h-[366px] gap-4 md:h-[506px] py-2 -my-2 lg:gap-5 px-4 lg:px-0 lg:mx-0"
      itemClassName="w-10/12 max-w-[268px] md:max-w-[379px]"
      className="my-10"
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
                element: <PromoNewsCard notice={promo} />,
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
