import FormatEventDateRange from '@modules/common/FormatEventDateRange'
import MLink from '@modules/common/MLink'
import { WithAttributes } from '@utils/isDefined'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'

import { EventCardEntityFragment } from '../../../graphql'
import EventDetailsDateBox from '../../Atoms/EventDetailsDateBox'
import TagsDisplay from '../../Atoms/TagsDisplay'

interface IPromoEventCardProps {
  event: WithAttributes<EventCardEntityFragment> | null | undefined
}

const PromoEventCard = ({ event }: IPromoEventCardProps) => {
  const { t } = useTranslation('common')

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
      <div className="flex flex-wrap pl-5 pt-4 text-base">
        <TagsDisplay
          tags={eventTags?.data || []}
          category={eventCategory?.data?.attributes?.title || ''}
          tagsCount={3}
        />
      </div>

      <div className="mt-3 w-full pl-5 pr-[19px] text-h2 text-foreground-heading line-clamp-3">
        <MLink
          href={`${t('event_slug')}${slug}`}
          variant="basic"
          className="after:absolute after:inset-0 after:z-[1]"
        >
          {title}
        </MLink>
      </div>
      <div>
        <div className="flex space-x-4 overflow-hidden px-5 pb-6 pt-3">
          <div className="flex h-[62px] w-[60px] min-w-[60px] bg-white text-center">
            <EventDetailsDateBox
              dateFrom={dateFrom || ''}
              dateTo={dateTo || ''}
              textClassname="text-[18px]"
            />
          </div>
          <div className="m-auto overflow-hidden">
            <div className="overflow-hidden text-ellipsis whitespace-pre text-sm">
              <FormatEventDateRange dateFrom={dateFrom} dateTo={dateTo} />
            </div>
            {eventBranch?.title && (
              <div className="overflow-hidden text-ellipsis whitespace-pre text-sm">
                &#9679; {eventBranch.title}
              </div>
            )}
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
