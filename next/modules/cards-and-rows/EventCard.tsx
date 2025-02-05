import { useTranslation } from 'next-i18next'

import Placeholder from '@/assets/images/list-item-thumbnail.jpeg'
import TagsDisplay from '@/components/Atoms/TagsDisplay'
import CardWrapper from '@/modules/cards-and-rows/CardWrapper'
import MLink from '@/modules/common/MLink'
import FormatEventDateRange from '@/modules/formatting/FormatEventDateRange'
import {
  EventBranchFragment,
  EventCategoryFragment,
  EventTagsFragment,
  UploadImageFragment,
} from '@/services/graphql'
import { isDefined } from '@/utils/isDefined'
import { useNavikronos } from '@/utils/navikronos'

type EventCardProps = {
  title?: string
  dateFrom?: string
  dateTo?: string
  slug?: string
  listingImage?: UploadImageFragment | null
  coverImage?: UploadImageFragment | null
  eventTags?: EventTagsFragment[]
  eventCategory?: EventCategoryFragment | null
  branch?: EventBranchFragment | null
}

const EventCard = ({
  title,
  dateFrom,
  dateTo,
  slug,
  listingImage,
  coverImage,
  eventTags,
  eventCategory,
  branch,
}: EventCardProps) => {
  const { getPathForEntity } = useNavikronos()

  return (
    <CardWrapper className="relative">
      <img
        className="h-40.5 w-full flex-1 object-cover"
        alt=""
        src={listingImage?.url || coverImage?.url || Placeholder.src}
        height="200px"
      />

      <div className="flex pt-4 text-sm">
        {eventTags && (
          <TagsDisplay
            tags={eventTags.filter(isDefined)}
            category={eventCategory?.title || ''}
            tagsCount={2}
          />
        )}
      </div>

      <h3 className="pt-2 text-h5">
        <MLink
          variant="basic"
          stretched
          href={getPathForEntity({ type: 'event', slug }) ?? '#'}
          className="line-clamp-3"
        >
          {title}
        </MLink>
      </h3>

      <div className="pt-2 text-sm text-foreground-body">
        <FormatEventDateRange dateFrom={dateFrom} dateTo={dateTo} />
      </div>

      {branch?.title && (
        <div className="pt-2 text-sm text-foreground-body">&#9679; {branch.title}</div>
      )}
    </CardWrapper>
  )
}

export default EventCard
