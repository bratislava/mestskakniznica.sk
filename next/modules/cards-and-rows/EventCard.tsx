import Placeholder from '@assets/images/list-item-thumbnail.jpeg'
import TagsDisplay from '@components/Atoms/TagsDisplay'
import MImage from '@modules/common/MImage'
import MLink from '@modules/common/MLink'
import FormatEventDateRange from '@modules/formatting/FormatEventDateRange'
import {
  EventBranchFragment,
  EventCategoryFragment,
  EventTagsFragment,
  UploadImageFragment,
} from '@services/graphql'
import { isDefined } from '@utils/isDefined'
import { useNavikronos } from '@utils/navikronos'
import { useTranslation } from 'next-i18next'

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
  const { t } = useTranslation('common')
  const { getPathForEntity } = useNavikronos()

  return (
    <div className="relative">
      <div className="relative h-[200px]">
        <MImage
          className="object-cover"
          image={
            listingImage?.url
              ? listingImage
              : coverImage?.url
              ? coverImage
              : { url: Placeholder.src }
          }
          fallbackAlt={t('eventDetailImagePlaceholder')}
          fallbackImage={Placeholder.src}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          fill
          priority
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

      <h3 className="pt-2 text-h5 line-clamp-3">
        <MLink variant="basic" stretched href={getPathForEntity({ type: 'event', slug }) ?? '#'}>
          {title}
        </MLink>
      </h3>

      <div className="pt-2 text-sm text-foreground-body">
        <FormatEventDateRange dateFrom={dateFrom} dateTo={dateTo} />
      </div>

      {branch?.title && (
        <div className="pt-2 text-sm text-foreground-body">&#9679; {branch.title}</div>
      )}
    </div>
  )
}

export default EventCard
