import Image from 'next/image'
import Link from 'next/link'

import { EventCardEntityFragment } from '../../../graphql'
import { WithAttributes } from '../../../utils/isDefined'
import { dateTimeString } from '../../../utils/utils'
import DateCardDisplay from '../../Atoms/DateCardDispaly'
import TagsDisplay from '../../Atoms/TagsDisplay'
import { usePageWrapperContext } from '../../layouts/PageWrapper'

interface IPromoEventCardProps {
  event: WithAttributes<EventCardEntityFragment> | null | undefined
}

const PromoEventCard = ({ event }: IPromoEventCardProps) => {
  const { locale } = usePageWrapperContext()

  if (!event) {
    return null
  }

  const {
    title,
    slug,
    eventTags,
    description,
    eventCategory,
    dateFrom,
    dateTo,
    eventLocality,
    listingImage,
    coverImage,
  } = event.attributes

  return (
    <Link key={title} href={slug || ''} passHref>
      <a href={slug || ''}>
        <div className="h-full w-full">
          <div className="relative m-auto flex h-full cursor-pointer flex-col justify-between bg-promo-yellow">
            <div className="flex flex-wrap pl-5 pt-4 text-base">
              <TagsDisplay
                tags={eventTags?.data || []}
                category={eventCategory?.data?.attributes?.title || ''}
                tagsCount={3}
              />
            </div>

            <div className="m-auto mt-3 w-full justify-end pl-5 pr-[19px] text-h2 text-black line-clamp-3 hover:underline">
              {title}
            </div>
            <div>
              <div className="flex space-x-4 overflow-hidden px-5 pb-6 pt-3">
                <div className="flex h-[62px] w-[60px] min-w-[60px] bg-white text-center">
                  <DateCardDisplay
                    dateFrom={dateFrom || ''}
                    dateTo={dateTo || ''}
                    textSize="text-[18px]"
                  />
                </div>
                <div className="m-auto overflow-hidden">
                  <div className="overflow-hidden text-ellipsis whitespace-pre text-sm">
                    {dateTimeString(dateFrom || '', dateTo || '', locale)}
                  </div>
                  {eventLocality?.data?.attributes?.title && (
                    <div className="overflow-hidden text-ellipsis whitespace-pre text-sm">
                      &#9679; {eventLocality.data.attributes.title}
                    </div>
                  )}
                </div>
              </div>

              {listingImage && listingImage.data?.attributes ? (
                <div className="flex w-full">
                  <Image
                    width={600}
                    height={360}
                    objectFit="cover"
                    src={listingImage?.data?.attributes?.url || ''}
                    alt={listingImage?.data?.attributes?.alternativeText || `Cover for ${title}`}
                  />
                </div>
              ) : (
                coverImage &&
                coverImage.data?.attributes && (
                  <div className="flex w-full">
                    <Image
                      width={600}
                      height={360}
                      objectFit="cover"
                      src={coverImage?.data?.attributes?.url || ''}
                      alt={coverImage?.data?.attributes?.alternativeText || `Cover for ${title}`}
                    />
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </a>
    </Link>
  )
}

export default PromoEventCard
