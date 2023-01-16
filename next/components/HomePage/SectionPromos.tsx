import { EventCardEntityFragment, NoticeListingEntityFragment } from '@services/graphql'
import { withAttributes } from '@utils/isDefined'

import Carousel from '../Molecules/Carousel/Carousel'
import PromoEventCard from './Promos/PromoEventCard'
import PromoNewsCard from './Promos/PromoNewsCard'

interface SectionPromosProps {
  promos: (EventCardEntityFragment | NoticeListingEntityFragment)[]
}

// TODO: sizes are now hardcoded, should be calculated to fit the screen

const SectionPromos = ({ promos }: SectionPromosProps) => {
  return (
    <Carousel
      listClassName="my-10 h-[350px] gap-4 px-4 md:h-[490px] lg:gap-5"
      itemClassName="w-10/12 max-w-[268px] md:max-w-[379px]"
      shiftIndex={3}
      items={promos?.map((promo) => {
        let element = null
        if (promo.__typename === 'EventEntity') {
          element = <PromoEventCard event={withAttributes(promo)} />
        } else if (promo.__typename === 'NoticeEntity') {
          element = (
            <PromoNewsCard
              title={promo?.attributes?.title ?? ''}
              slug={promo?.attributes?.slug ?? ''}
            />
          )
        }
        return { element, key: promo.attributes?.slug }
      })}
    />
  )
}

export default SectionPromos
