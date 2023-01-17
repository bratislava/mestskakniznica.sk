import { EventCardEntityFragment, NoticeListingEntityFragment } from '@services/graphql'
import { withAttributes } from '@utils/isDefined'

import PromoEventCard from './Promos/PromoEventCard'
import PromoNewsCard from './Promos/PromoNewsCard'

interface SectionPromosProps {
  promos: (EventCardEntityFragment | NoticeListingEntityFragment)[]
}

// TODO: sizes are now hardcoded, should be calculated to fit the screen

const SectionPromos = ({ promos }: SectionPromosProps) => {
  return (
    <section className="overflow-x-auto">
      <div className="my-10 flex h-[350px] w-fit gap-4 md:h-[490px] lg:gap-5">
        {promos?.map((promo) => {
          switch (promo.__typename) {
            case 'EventEntity':
              return (
                <div key={promo.attributes?.slug} className="w-[268px] shrink-0 md:w-[379px]">
                  <PromoEventCard event={withAttributes(promo)} />
                </div>
              )

            case 'NoticeEntity':
              return (
                <div key={promo?.attributes?.slug} className="w-[268px] shrink-0 md:w-[379px]">
                  <PromoNewsCard
                    title={promo?.attributes?.title ?? ''}
                    slug={promo?.attributes?.slug ?? ''}
                  />
                </div>
              )

            default:
              return null
          }
        })}
      </div>
    </section>
  )
}

export default SectionPromos
