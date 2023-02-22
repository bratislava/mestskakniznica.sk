import MLink from '@modules/common/MLink'
import FormatEventDateRange from '@modules/formatting/FormatEventDateRange'
import {
  EventBranchFragment,
  EventCategoryFragment,
  EventTagsFragment,
  UploadImageFragment,
} from '@services/graphql'
import { EventInListingMeili } from '@services/meili/meiliTypes'
import { isDefined } from '@utils/isDefined'
import { useNavikronos } from '@utils/navikronos'
import { useTranslation } from 'next-i18next'

import Placeholder from '../../assets/images/event-list-placeholder.jpg'
import TagsDisplay from '../Atoms/TagsDisplay'

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
    // TODO refactor link to meet html validation standards

    <div className="relative">
      <img
        className="h-[200px] w-full flex-1 object-cover"
        alt={t('eventDetailImagePlaceholder')}
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

      <div className="justify-end pt-2 text-h5 line-clamp-3">
        <MLink variant="basic" stretched href={getPathForEntity({ type: 'event', slug }) ?? ''}>
          {title}
        </MLink>
      </div>
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
