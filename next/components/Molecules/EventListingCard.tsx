import { EventCardFragment } from '@bratislava/strapi-sdk-city-library'
import Link from 'next/link'

import { IEvent } from '../../utils/types'
import { dateTimeString } from '../../utils/utils'
import TagsDisplay from '../Atoms/TagsDisplay'
import { usePageWrapperContext } from '../layouts/PageWrapper'

interface EventListingProps {
  event: EventCardFragment
}

function EventListingCard({ event: { attributes } }: EventListingProps) {
  const { locale } = usePageWrapperContext()

  return (
    <Link key={attributes?.slug} href={attributes?.slug || ''} passHref>
      <a className="m-auto cursor-pointer h-[360px] w-full">
        <div className="w-full">
          <img
            className="flex-1 h-[200px] w-full object-cover"
            alt={'Event card'}
            src={attributes?.listingImage?.data?.attributes?.url || attributes?.coverImage?.data?.attributes?.url}
            height="200px"
          />

          <div className="flex pt-4 text-xs">
            <TagsDisplay tags={attributes?.eventTags?.data} category={attributes?.eventCategory?.data?.attributes?.title || ''} tagsCount={2} />
          </div>

          <div className="text-default pt-2 justify-end hover:underline">{attributes?.title}</div>
          <div className="text-xs text-gray-600 pt-2">
            {dateTimeString(attributes?.dateFrom || '', attributes?.dateTo || '', locale)}
          </div>
          {attributes?.eventLocality?.data?.attributes?.title && (
            <div className="text-xs text-gray-600 pt-2">&#9679; {attributes?.eventLocality.data?.attributes.title}</div>
          )}
        </div>
      </a>
    </Link>
  )
}

export default EventListingCard
