import TagsDisplay from '@/components/Atoms/TagsDisplay'
import CardWrapper from '@/modules/cards-and-rows/CardWrapper'
import MLink from '@/modules/common/MLink'
import StrapiImage, { getImagePlaceholder } from '@/modules/common/StrapiImage'
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
      <div className="relative h-40.5 w-full shrink-0">
        <StrapiImage
          image={listingImage || coverImage || getImagePlaceholder()}
          alt="" // Empty alt on purpose
          fill
          className="object-cover"
        />
      </div>

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
