import { EventCardEntityFragment, PageEntity, PromoNewsCardFragment } from '../../graphql'
import PromoNewsCard from './Promos/PromoNewsCard'
import PromoEventCard from './Promos/PromoEventCard'
import { withAttributes } from '../../utils/isDefined'
interface SectionPromosProps {
  promos: (EventCardEntityFragment | PromoNewsCardFragment)[]
}

function SectionPromos({ promos }: SectionPromosProps) {
  return (
    <section className="-mx-4 overflow-x-auto">
      <div className="flex h-auto w-fit gap-4 px-4 py-10 lg:grid lg:grid-cols-3 lg:gap-8">
        {promos?.map((promo) => {
          switch (promo.__typename) {
            case 'EventEntity':
              return (
                <div
                  key={promo.attributes?.slug}
                  className="w-[80vw] flex-shrink-0 sm:w-[calc(50vw_-_24px)] lg:w-full"
                >
                  <PromoEventCard event={withAttributes(promo)} />
                </div>
              )

            case 'PageEntity':
              return (
                <div
                  key={promo?.attributes?.slug}
                  className="w-[80vw] flex-shrink-0 sm:w-[calc(50vw_-_24px)] lg:w-full"
                >
                  <PromoNewsCard
                    title={promo?.attributes?.title ?? ''}
                    slug={promo?.attributes?.slug ?? ''}
                  />
                </div>
              )

            default:
              return null
              break
          }
        })}
      </div>
    </section>
  )
}

export default SectionPromos
