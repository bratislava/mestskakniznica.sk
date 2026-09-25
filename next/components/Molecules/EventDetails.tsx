import { useTranslation } from 'next-i18next/pages'

import { CalendarIcon, EuroIcon, NavigateIcon, PlaceIcon } from '@/assets/icons'
import EventDetailPlaceholder from '@/assets/images/event-detail-placeholder.jpg'
import EventDetailsDateBox from '@/components/Atoms/EventDetailsDateBox'
import DetailsRow from '@/components/Atoms/EventDetailsRow'
import TagsDisplay from '@/components/Atoms/TagsDisplay'
import { Assets } from '@/components/ui'
import Button from '@/modules/common/Button'
import ImageGallery from '@/modules/common/ImageGallery/ImageGallery'
import ShareBlock from '@/modules/common/ShareBlock/ShareBlock'
import StrapiImage, { getImagePlaceholder } from '@/modules/common/StrapiImage'
import FormatEventDateRange from '@/modules/formatting/FormatEventDateRange'
import RichText from '@/modules/formatting/RichText'
import { EventEntityFragment } from '@/services/graphql'
import { isDefined } from '@/utils/isDefined'

export interface PageProps {
  event?: EventEntityFragment
}

const EventDetails = ({ event }: PageProps) => {
  const { t } = useTranslation()

  const eventBranch = event?.branch
  const filteredImages = event?.gallery?.filter(isDefined) ?? []

  return (
    <>
      <StrapiImage
        image={
          event?.coverImage ||
          getImagePlaceholder(EventDetailPlaceholder)
        }
        alt="" // Empty alt on purpose
        className="w-full object-cover md:h-75 lg:h-[400px]"
        // By providing unique key to cover image, we prevent displaying other event's image while loading the currently displayed event's image
        key={event?.slug}
      />

      <div className="block grid-cols-9 gap-x-16 pt-10 lg:grid">
        <div className="col-span-1 hidden size-27 bg-promo-yellow text-center lg:flex">
          <EventDetailsDateBox
            dateFrom={event?.dateFrom}
            dateTo={event?.dateTo}
            textClassname="text-h3"
          />
        </div>
        <div className="col-span-5">
          <div className="text-sm">
            <TagsDisplay
              tags={event?.eventTags.filter(isDefined) ?? []}
              category={event?.eventCategory?.title || ''}
              tagsCount={5}
            />
          </div>
          <h1 className="py-3 text-h1 lg:text-h2">{event?.title}</h1>
          <div className="text-sm text-foreground-body">
            <FormatEventDateRange
              dateFrom={event?.dateFrom}
              dateTo={event?.dateTo}
            />
          </div>
        </div>
        {/* TODO validate this - what is event reservation and is it used ? */}
        {/* <div className="col-span-3 mt-4 w-full lg:m-auto">
          {!isEventInThePast && (
            <a
              href="#detail_podujatia"
              className="h-12 w-full border border-border-dark bg-button-dark text-white hover:bg-button-hover"
            >
              {t('eventDetails.eventReservation')}
            </a>
          )}
        </div> */}
      </div>

      <div className="flex grid-cols-9 flex-col-reverse gap-x-16 pt-10 lg:grid">
        <div className="col-span-6">
          <div className="mt-8 border-b border-border-dark pb-10 lg:mt-0">
            <div className="text-[24px]">{t('eventDetails.description')}</div>
            <div className="pt-5">
              <RichText content={event?.description ?? ''} />
            </div>
            {filteredImages.length > 0 ? (
              <div className="pt-5">
                <ImageGallery images={filteredImages} variant="below" />
              </div>
            ) : null}
          </div>
          {event?.assets && (
            <Assets
              className="mt-8"
              title={event.assets.title}
              assets={[
                ...(event.assets.assets.filter(isDefined) ?? []),
                ...(event.assets.disclosures.filter(isDefined) ?? []),
              ]}
            />
          )}
          {(event?.guests?.length || 0) > 0 && (
            <div className="border-b border-border-dark py-10">
              <div className="text-[24px]">{t('eventDetails.eventGuests')}</div>
              <div className="grid grid-cols-3 pt-5">
                {event?.guests?.map((guest) => {
                  const avatar = guest?.avatar

                  return (
                    <div key={guest?.id} className="flex pr-[24px]">
                      {avatar ? (
                        <StrapiImage
                          image={avatar}
                          alt={guest?.name || avatar?.alternativeText}
                          className="flex size-12 items-center justify-center rounded-full object-cover"
                        />
                      ) : null}
                      <span className="m-auto text-[16px]">
                        {guest?.name} {guest?.surname}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
          {/* {(eventDetails?.partners?.length || 0) > 0 && (
            <div className="border-b border-border-dark pb-10 pt-10">
              <div className="text-[24px]">{t('eventDetails.eventPartners')}</div>
              <div className="grid grid-cols-3 pt-5">
                {eventDetails?.partners?.map((partner) => (
                  <div key={partner?.id} className="flex pr-[24px]">
                    <img
                      src={partner?.image?.url}
                      width={partner?.image?.width || 0}
                      height={partner?.image?.height || 0}
                      alt="partner"
                      className="rounded-full h-12 w-12 flex items-center justify-center object-cover"
                    />
                    <span className="m-auto text-[16px]">{partner?.title}</span>
                  </div>
                ))}
              </div>
            </div>
          )} */}
          <div className="pt-10">
            <ShareBlock
              text={t('EventDetail.shareBlock.text')}
              buttonText={t('EventDetail.shareBlock.buttonText')}
            />
          </div>
        </div>
        <div className="col-span-3 text-[24px]">
          {t('eventDetails.details')}
          <div className="pt-5">
            <div className="border-y border-border-dark text-base lg:border">
              <div className="py-5 lg:p-5">
                <div className="border-b border-border-light pb-5">
                  <DetailsRow
                    classWrapper="flex"
                    svgIcon={<CalendarIcon />}
                    text={
                      <FormatEventDateRange
                        dateFrom={event?.dateFrom}
                        dateTo={event?.dateTo}
                      />
                    }
                  />
                </div>
                {eventBranch?.title && eventBranch?.address ? (
                  <div className="border-b border-border-light py-5">
                    <DetailsRow
                      classWrapper="flex"
                      svgIcon={<PlaceIcon />}
                      text={`${eventBranch.title}, ${eventBranch.address}`}
                    />

                    <Button
                      variant="plain-primary"
                      href={`https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&destination=${eventBranch.address}`}
                      className="-mb-3 py-3 pr-3 pl-9"
                      noPadding
                      startIcon={<NavigateIcon />}
                      target="_blank"
                    >
                      {t('eventDetails.navigate')}
                    </Button>
                  </div>
                ) : null}

                <DetailsRow
                  classWrapper="flex pt-5"
                  svgIcon={<EuroIcon />}
                  text={
                    !event?.price || event?.price === 0
                      ? t('eventDetails.noCharge').toString()
                      : event?.price?.toString() || ''
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EventDetails
