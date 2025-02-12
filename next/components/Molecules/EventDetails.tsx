import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { QRCodeSVG } from 'qrcode.react'
import React from 'react'
import { DialogTrigger } from 'react-aria-components'

import {
  CalendarIcon,
  CameraIcon,
  EuroIcon,
  NavigateIcon,
  PlaceIcon,
  ShareIcon,
} from '@/assets/icons'
import EventDetailPlaceholder from '@/assets/images/event-detail-placeholder.jpg'
import Clickable from '@/components/Atoms/EventClickable'
import EventDetailsDateBox from '@/components/Atoms/EventDetailsDateBox'
import DetailsRow from '@/components/Atoms/EventDetailsRow'
import TagsDisplay from '@/components/Atoms/TagsDisplay'
import { Documents } from '@/components/ui'
import Button from '@/modules/common/Button'
import ImageGallery from '@/modules/common/ImageGallery/ImageGallery'
import Dialog from '@/modules/common/ModalDialog/Dialog'
import Modal from '@/modules/common/ModalDialog/Modal'
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
  const { asPath } = useRouter()

  const eventBranch = event?.attributes?.branch?.data?.attributes

  const copyToClipBoard = () => {
    navigator.clipboard.writeText(`https://www.mestskakniznica.sk${asPath}`)
  }

  const filteredImages = event?.attributes?.gallery?.data?.filter(isDefined) ?? []

  return (
    <>
      <div className="relative w-full shrink-0 md:h-75 lg:h-[400px]">
        <StrapiImage
          image={
            event?.attributes?.coverImage?.data?.attributes ||
            getImagePlaceholder(EventDetailPlaceholder)
          }
          alt="" // Empty alt on purpose
          className="object-cover"
        />
      </div>
      <div className="block grid-cols-9 gap-x-16 pt-10 lg:grid">
        <div className="col-span-1 hidden size-27 bg-promo-yellow text-center lg:flex">
          <EventDetailsDateBox
            dateFrom={event?.attributes?.dateFrom}
            dateTo={event?.attributes?.dateTo}
            textClassname="text-h3"
          />
        </div>
        <div className="col-span-5">
          <div className="text-sm">
            <TagsDisplay
              tags={
                event?.attributes?.eventTags?.data
                  .map((eventTagEntity) => eventTagEntity.attributes)
                  .filter(isDefined) || []
              }
              category={event?.attributes?.eventCategory?.data?.attributes?.title || ''}
              tagsCount={5}
            />
          </div>
          <h1 className="py-3 text-h3">{event?.attributes?.title}</h1>
          <div className="text-sm text-foreground-body">
            <FormatEventDateRange
              dateFrom={event?.attributes?.dateFrom}
              dateTo={event?.attributes?.dateTo}
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
              <RichText content={event?.attributes?.description ?? ''} />
            </div>
            {filteredImages.length > 0 ? (
              <div className="pt-5">
                <ImageGallery images={filteredImages} variant="below" />
              </div>
            ) : null}
          </div>
          {event?.attributes?.documents && (
            <Documents
              className="mt-8"
              title={event.attributes.documents.title}
              documents={[
                ...(event.attributes.documents.documents?.data.filter(isDefined) ?? []),
                ...(event.attributes.documents.disclosures?.data.filter(isDefined) ?? []),
              ]}
            />
          )}
          {(event?.attributes?.guests?.length || 0) > 0 && (
            <div className="border-b border-border-dark py-10">
              <div className="text-[24px]">{t('eventDetails.eventGuests')}</div>
              <div className="grid grid-cols-3 pt-5">
                {event?.attributes?.guests?.map((guest) => {
                  const avatar = guest?.avatar?.data?.attributes

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
            <div className="block h-auto border-y border-border-dark py-3 lg:flex lg:h-17.5 lg:border lg:p-0">
              <Clickable
                actionLink={copyToClipBoard}
                classDiv="my-3 lg:m-auto"
                svgIcon={<ShareIcon />}
                text={t('eventDetails.eventShare')}
                copyText
              />
              <DialogTrigger>
                <Button
                  variant="plain-primary"
                  className="my-3 lg:m-auto"
                  startIcon={<CameraIcon />}
                >
                  {t('eventDetails.eventQr')}
                </Button>
                <Modal>
                  <Dialog aria-label={t('eventDetails.eventQr')}>
                    <QRCodeSVG
                      value={event?.attributes?.title || ''}
                      className="m-auto"
                      size={240}
                      includeMargin
                    />
                  </Dialog>
                </Modal>
              </DialogTrigger>
            </div>
          </div>
        </div>
        <div className="col-span-3 text-[24px]">
          {t('eventDetails.details')}
          <div className="pt-5">
            <div className="border-y border-border-dark text-base lg:border">
              <div className="m-5">
                <div className="border-b border-border-light pb-5">
                  <DetailsRow
                    classWrapper="flex"
                    svgIcon={<CalendarIcon />}
                    text={
                      <FormatEventDateRange
                        dateFrom={event?.attributes?.dateFrom}
                        dateTo={event?.attributes?.dateTo}
                      />
                    }
                  />
                </div>
                <div className="border-b border-border-light py-5">
                  <DetailsRow
                    classWrapper="flex"
                    svgIcon={<PlaceIcon />}
                    text={`${
                      eventBranch?.title && eventBranch?.address
                        ? `${eventBranch?.title}, ${eventBranch.address}`
                        : ``
                    }`}
                  />
                  {eventBranch?.address && (
                    <Clickable
                      actionLink={`https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&destination=${eventBranch.address}`}
                      classDiv="pl-9 pt-3"
                      svgIcon={<NavigateIcon />}
                      text={t('eventDetails.navigate')}
                    />
                  )}
                </div>

                <DetailsRow
                  classWrapper="flex pt-5"
                  svgIcon={<EuroIcon />}
                  text={
                    !event?.attributes?.price || event?.attributes?.price === 0
                      ? t('eventDetails.noCharge').toString()
                      : event?.attributes?.price?.toString() || ''
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
