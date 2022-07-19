import Image from 'next/image'
import Link from 'next/link'

import { IEvent } from '../../../utils/types'
import { dateTimeString } from '../../../utils/utils'
import DateCardDisplay from '../../Atoms/DateCardDispaly'
import TagsDisplay from '../../Atoms/TagsDisplay'
import { usePageWrapperContext } from '../../layouts/PageWrapper'

function EventCard({
  dateFrom,
  dateTo,
  eventTitle,
  eventTags,
  listingImage,
  slug,
  eventLocality,
  eventCategory,
}: IEvent) {
  const { locale } = usePageWrapperContext()

  return (
    <Link key={eventTitle} href={slug || ''} passHref>
      <a href={slug}>
        <div className="h-full w-full">
          <div className="relative m-auto flex h-full cursor-pointer flex-col justify-between bg-promo-yellow">
            <div className="flex flex-wrap pl-5 pt-4 text-sm">
              <TagsDisplay tags={eventTags?.data || []} category={eventCategory?.attributes?.title || ''} tagsCount={3} />
            </div>

            <div className="text-black m-auto mt-3 w-full justify-end pl-5 pr-[19px] text-lg line-clamp-3 hover:underline">
              {eventTitle}
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
                  <div className="overflow-hidden text-ellipsis whitespace-pre text-xs">
                    {dateTimeString(dateFrom || '', dateTo || '', locale)}
                  </div>
                  {eventLocality?.attributes?.title && (
                    <div className="text-xs whitespace-pre overflow-hidden text-ellipsis">
                      &#9679; {eventLocality.attributes.title}
                    </div>
                  )}
                </div>
              </div>

              {listingImage !== null && listingImage && (
                <div className="flex w-full">
                  <Image
                    width={600}
                    height={360}
                    objectFit="cover"
                    src={listingImage.url}
                    alt={listingImage?.alternativeText || `Cover for ${eventTitle}`}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </a>
    </Link>
  )
}

export default EventCard
