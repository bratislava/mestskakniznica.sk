import Image from 'next/image'

import EventDetailsDateBox from '@/components/Atoms/EventDetailsDateBox'
import TagsDisplay from '@/components/Atoms/TagsDisplay'
import CardWrapper from '@/modules/cards-and-rows/CardWrapper'
import MLink from '@/modules/common/MLink'
import FormatEventDateRange from '@/modules/formatting/FormatEventDateRange'
import { EventCardEntityFragment } from '@/services/graphql'
import { isDefined } from '@/utils/isDefined'
import { useNavikronos } from '@/utils/navikronos'

type PromoEventCardProps = {
  event?: EventCardEntityFragment | null
}

const PromoEventCard = ({ event }: PromoEventCardProps) => {
  const { getPathForStrapiEntity } = useNavikronos()

  if (!event) {
    return null
  }

  const { title, eventTags, eventCategory, dateFrom, dateTo, branch, listingImage, coverImage } =
    event

  const eventBranch = branch

  return (
    <CardWrapper className="relative m-auto flex size-full flex-col justify-between bg-promo-yellow">
      <div className="flex flex-col gap-y-3 px-4 py-3 md:gap-y-4 md:px-5 md:py-4">
        <TagsDisplay
          tags={eventTags?.filter(isDefined)}
          category={eventCategory?.title || ''}
          tagsCount={3}
        />

        <h3 className="text-h2">
          <MLink
            href={getPathForStrapiEntity(event) ?? '#'}
            variant="basic"
            stretched
            className="line-clamp-3 after:z-1"
          >
            {title}
          </MLink>
        </h3>
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
            {/* eslint-disable-next-line i18next/no-literal-string */}
            {eventBranch?.title && <div className="truncate">● {eventBranch.title}</div>}
          </div>
        </div>

        {listingImage ? (
          <div className="flex w-full">
            <Image
              width={600}
              height={360}
              className="object-cover"
              src={listingImage.url || ''}
              // Decorative image - no alt text
              alt=""
            />
          </div>
        ) : (
          coverImage && (
            <div className="flex w-full">
              <Image
                width={600}
                height={360}
                className="object-cover"
                src={coverImage.url || ''}
                // Decorative image - empty alt on purpose
                alt=""
              />
            </div>
          )
        )}
      </div>
    </CardWrapper>
  )
}

export default PromoEventCard
