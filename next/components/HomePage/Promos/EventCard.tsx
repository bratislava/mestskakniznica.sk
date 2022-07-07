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
        <div className="w-full h-full">
          <div className="bg-promo-yellow h-full m-auto cursor-pointer relative flex flex-col justify-between">
            <div className="flex flex-wrap pl-5 pt-4 text-sm">
              <TagsDisplay tags={eventTags || []} category={eventCategory?.attributes?.title || ''} tagsCount={3} />
            </div>

            <div className="text-black w-full mt-3 pl-5 justify-end text-lg m-auto hover:underline pr-[19px]">
              {eventTitle}
            </div>
            <div>
              <div className="px-5 pb-6 flex overflow-hidden space-x-4 pt-3">
                <div className="text-center h-[62px] w-[60px] flex bg-white min-w-[60px]">
                  <DateCardDisplay dateFrom={dateFrom || ''} dateTo={dateTo || ''} textSize="text-[18px]" />
                </div>
                <div className="m-auto overflow-hidden">
                  <div className="text-xs whitespace-pre overflow-hidden text-ellipsis">
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
