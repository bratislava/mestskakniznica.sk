import {
  CalendarIcon,
  CameraIcon,
  EuroIcon,
  NavigateIcon,
  PlaceIcon,
  ShareIcon,
} from '@assets/icons'
import FormatEventDateRange from '@modules/formatting/FormatEventDateRange'
import RichText from '@modules/formatting/RichText'
import { EventEntityFragment } from '@services/graphql'
import { isEventPast } from '@utils/utils'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import QRCode from 'qrcode.react'
import React from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import Placeholder from '../../assets/images/event-detail-placeholder.jpg'
import Clickable from '../Atoms/EventClickable'
import EventDetailsDateBox from '../Atoms/EventDetailsDateBox'
import DetailsRow from '../Atoms/EventDetailsRow'
import TagsDisplay from '../Atoms/TagsDisplay'

export interface PageProps {
  event?: EventEntityFragment
}

const EventDetails = ({ event }: PageProps) => {
  const { t } = useTranslation('common')
  const { asPath } = useRouter()
  const [isEventInThePast, setIsEventInThePast] = React.useState(false)

  const eventBranch = event?.attributes?.branch?.data?.attributes

  const copyToClipBoard = () => {
    navigator.clipboard.writeText(`https://www.mestskakniznica.sk${asPath}`)
  }

  const fireSwal = () => {
    const withContent = withReactContent(Swal)
    withContent.fire({
      html: (
        <QRCode
          value={event?.attributes?.title || ''}
          className="m-auto"
          renderAs="svg"
          size={240}
        />
      ),
      position: 'center',
      width: 350,
      confirmButtonText: t('close'),
      confirmButtonColor: '#2f2f2f',
      customClass: {
        popup: 'rounded-none',
        confirmButton: 'rounded-none',
      },
    })
  }

  React.useMemo(() => {
    setIsEventInThePast(isEventPast(event?.attributes?.dateTo))
  }, [event])

  // fallback to placeholder
  const bannerProps = {
    url: Placeholder.src,
    width: Placeholder.width,
    height: Placeholder.height,
    alternativeText: t('eventDetailImagePlaceholder'),
    ...event?.attributes?.coverImage?.data?.attributes,
  }

  return (
    <>
      <img
        src={bannerProps.url}
        width={bannerProps.width || 0}
        height={bannerProps.height || 0}
        alt={bannerProps.alternativeText || t('eventDetailImagePlaceholder')}
        className="object-cover object-center md:h-[300px] lg:h-[400px]"
      />
      <div className="block grid-cols-9 gap-x-16 pt-10 lg:grid">
        <div className="col-span-1 hidden h-[108px] w-[108px] bg-promo-yellow text-center lg:flex">
          <EventDetailsDateBox
            dateFrom={event?.attributes?.dateFrom}
            dateTo={event?.attributes?.dateTo}
            textClassname="text-h3"
          />
        </div>
        <div className="col-span-5">
          <div className="text-sm">
            <TagsDisplay
              tags={event?.attributes?.eventTags?.data || []}
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
              {t('eventReservation')}
            </a>
          )}
        </div> */}
      </div>

      <div className="flex grid-cols-9 flex-col-reverse gap-x-16 pt-10 lg:grid">
        <div className="col-span-6">
          <div className="mt-8 border-b border-border-dark pb-10 lg:mt-0">
            <div className="text-[24px]">{t('description')}</div>
            <div className="pt-5 text-[16px] text-foreground-body">
              <RichText content={event?.attributes?.description ?? ''} />
            </div>
          </div>
          {(event?.attributes?.guests?.length || 0) > 0 && (
            <div className="border-b border-border-dark py-10">
              <div className="text-[24px]">{t('eventGuests')}</div>
              <div className="grid grid-cols-3 pt-5">
                {event?.attributes?.guests?.map((guest) => (
                  <div key={guest?.id} className="flex pr-[24px]">
                    <img
                      src={guest?.avatar?.data?.attributes?.url}
                      width={guest?.avatar?.data?.attributes?.width || 0}
                      height={guest?.avatar?.data?.attributes?.height || 0}
                      alt={guest?.name || 'Guest name.'}
                      className="flex h-12 w-12 items-center justify-center rounded-full object-cover"
                    />
                    <span className="m-auto text-[16px]">
                      {guest?.name} {guest?.surname}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* {(eventDetails?.partners?.length || 0) > 0 && (
            <div className="border-b border-border-dark pb-10 pt-10">
              <div className="text-[24px]">{t('eventPartners')}</div>
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
            <div className="block h-auto border-y border-border-dark py-3 lg:flex lg:h-[70px] lg:border lg:p-0">
              {/* <div className="hidden lg:block pl-6 w-[169px] text-base m-auto"> */}
              {/*  {t('eventShareAndSave')} */}
              {/* </div> */}
              {/* TODO add AddToCalendar functionality */}
              {/* {!isEventInThePast && ( */}
              {/*  <div className="my-3 lg:m-auto"> */}
              {/*    <AddToCalendar */}
              {/*      event={{ */}
              {/*        name: event?.attributes?.title || '', */}
              {/*        details: event?.attributes?.description?.replace(/\n/g, ' ') || null, */}
              {/*        location: eventBranch?.title || null, */}
              {/*        startsAt: new Date(event?.attributes?.dateFrom).toISOString(), */}
              {/*        endsAt: new Date(event?.attributes?.dateTo).toISOString(), */}
              {/*      }} */}
              {/*      filename="library-event" */}
              {/*    > */}
              {/*      <div className="flex text-sm uppercase"> */}
              {/*        <CalendarIcon className="h-5 w-5" /> */}
              {/*        &nbsp; {t('eventAddToCalendar')} */}
              {/*      </div> */}
              {/*    </AddToCalendar> */}
              {/*  </div> */}
              {/* )} */}

              <Clickable
                actionLink={copyToClipBoard}
                classDiv="my-3 lg:m-auto"
                svgIcon={<ShareIcon />}
                text={t('eventShare')}
                copyText
              />
              <Clickable
                actionLink={fireSwal}
                classDiv="my-3 lg:m-auto"
                svgIcon={<CameraIcon />}
                text={t('eventQr')}
              />
            </div>
          </div>
        </div>
        <div className="col-span-3 text-[24px]">
          {t('details')}
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
                  {/* TODO AddToCalndar functionality back */}
                  {/* {!isEventInThePast && ( */}
                  {/*  <div className="pl-9 pt-3"> */}
                  {/*    <AddToCalendar */}
                  {/*      event={{ */}
                  {/*        name: event?.attributes?.title || '', */}
                  {/*        details: event?.attributes?.description?.replace(/\n/g, ' ') || null, */}
                  {/*        location: eventBranch?.title || null, */}
                  {/*        startsAt: new Date(event?.attributes?.dateFrom).toISOString(), */}
                  {/*        endsAt: new Date(event?.attributes?.dateTo).toISOString(), */}
                  {/*      }} */}
                  {/*      filename="library-event" */}
                  {/*    > */}
                  {/*      <div className="flex text-sm uppercase"> */}
                  {/*        <CalendarIcon className="h5 w-5" /> */}
                  {/*        &nbsp; {t('eventAddToCalendar')} */}
                  {/*      </div> */}
                  {/*    </AddToCalendar> */}
                  {/*  </div> */}
                  {/* )} */}
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
                      text={t('navigate')}
                    />
                  )}
                </div>

                <DetailsRow
                  classWrapper="flex pt-5"
                  svgIcon={<EuroIcon />}
                  text={
                    !event?.attributes?.price || event?.attributes?.price == 0
                      ? t('noCharge').toString()
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
