import { EventCardEntityFragment } from '@bratislava/strapi-sdk-city-library'
import Link from 'next/link'

import { dateTimeString } from '../../utils/utils'
import TagsDisplay from '../Atoms/TagsDisplay'
import { usePageWrapperContext } from '../layouts/PageWrapper'

interface EventListingProps {
  event: EventCardEntityFragment
}

function EventListingCard({ event: { attributes } }: EventListingProps) {
  const { locale } = usePageWrapperContext()

  return (
    <Link key={attributes?.slug} href={attributes?.slug || ''} passHref>
      <a className="m-auto h-[360px] w-full cursor-pointer">
        <div className="w-full">
          <img
            className="h-[200px] w-full flex-1 object-cover"
            alt={'Event card'}
            src={
              attributes?.listingImage?.data?.attributes?.url ||
              attributes?.coverImage?.data?.attributes?.url
            }
            height="200px"
          />

          <div className="flex pt-4 text-xs">
            <TagsDisplay
              tags={attributes?.eventTags?.data}
              category={attributes?.eventCategory?.data?.attributes?.title || ''}
              tagsCount={2}
            />
          </div>

          <div className="justify-end pt-2 text-default hover:underline">{attributes?.title}</div>
          <div className="pt-2 text-xs text-gray-600">
            {dateTimeString(attributes?.dateFrom || '', attributes?.dateTo || '', locale)}
          </div>
          {attributes?.eventLocality?.data?.attributes?.title && (
            <div className="pt-2 text-xs text-gray-600">
              &#9679; {attributes?.eventLocality.data?.attributes.title}
            </div>
          )}
        </div>
      </a>
    </Link>
  )
}

export default EventListingCard
