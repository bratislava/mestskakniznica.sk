import MLink from '@modules/common/MLink'
import FormatEventDateRange from '@modules/formatting/FormatEventDateRange'
import { EventCardEntityFragment } from '@services/graphql'
import { WithAttributes } from '@utils/isDefined'
import Image from 'next/image'

import EventDetailsDateBox from '../../Atoms/EventDetailsDateBox'
import TagsDisplay from '../../Atoms/TagsDisplay'
import { useNavikronos } from '@utils/navikronos'

interface IPromoEventCardProps {
  event: WithAttributes<EventCardEntityFragment> | null | undefined
}

const PromoEventCard = ({ event }: IPromoEventCardProps) => {
  const { getPathForEntity } = useNavikronos()

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
    branch,
    listingImage,
    coverImage,
  } = event.attributes

  const eventBranch = branch?.data?.attributes

  return (
    <div className="relative m-auto flex h-full w-full flex-col justify-between bg-promo-yellow">
      <div className="flex flex-col gap-y-3 py-3 px-4 md:gap-y-4 md:py-4 md:px-5">
        <TagsDisplay
          tags={eventTags?.data || []}
          category={eventCategory?.data?.attributes?.title || ''}
          tagsCount={3}
        />

        <div className="text-h2 text-foreground-heading line-clamp-3">
          <MLink
            href={getPathForEntity({ type: 'event', slug }) ?? ''}
            variant="basic"
            stretched
            className="after:z-[1]"
          >
            {title}
          </MLink>
        </div>
      </div>
      <div>
        <div className="flex items-center gap-x-4 overflow-hidden px-4 pb-1 md:px-5 md:pb-5">
          <div className="hidden h-[62px] w-[60px] min-w-[60px] bg-white text-center md:flex">
            <EventDetailsDateBox
              dateFrom={dateFrom || ''}
              dateTo={dateTo || ''}
              textClassname="text-[18px]"
            />
          </div>
          <div className="overflow-hidden text-sm">
            <div>
              <FormatEventDateRange dateFrom={dateFrom} dateTo={dateTo} />
            </div>
            {eventBranch?.title && <div className="truncate">● {eventBranch.title}</div>}
          </div>
        </div>

        {listingImage && listingImage.data?.attributes ? (
          <div className="flex w-full">
            <Image
              width={600}
              height={360}
              className="object-cover"
              src={listingImage?.data?.attributes?.url || ''}
              // Decorative image - no alt text
              alt=""
            />
          </div>
        ) : (
          coverImage &&
          coverImage.data?.attributes && (
            <div className="flex w-full">
              <Image
                width={600}
                height={360}
                className="object-cover"
                src={coverImage?.data?.attributes?.url || ''}
                // Decorative image - empty alt on purpose
                alt=""
              />
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default PromoEventCard
