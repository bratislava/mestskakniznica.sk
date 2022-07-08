import SmCalendar from '@assets/images/calendar-sm.svg'
import Calendar from '@assets/images/calendar.svg'
import QrLogo from '@assets/images/camera.svg'
import Directions from '@assets/images/directions.svg'
import Euro from '@assets/images/euro-symbol.svg'
import Navigate from '@assets/images/navigate.svg'
import Share from '@assets/images/share.svg'
import { useUIContext } from '@bratislava/common-frontend-ui-context'
import { BlogPostSectionsDynamicZone, ComponentSectionsEventDetails, ComponentSectionsForm, PageSectionsDynamicZone, SectionsFragment } from '@bratislava/strapi-sdk-city-library'
import AddToCalendar from '@culturehq/add-to-calendar'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import QRCode from 'qrcode.react'
import React from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { dateTimeString, isEventPast } from '../../utils/utils'
import DateCardDisplay from '../Atoms/DateCardDispaly'
import Clickable from '../Atoms/EventClickable'
import DetailsRow from '../Atoms/EventDetailsRow'
import TagsDisplay from '../Atoms/TagsDisplay'
import { usePageWrapperContext } from '../layouts/PageWrapper'


export interface PageProps {
  eventDetails?: ComponentSectionsEventDetails
  sections?: ComponentSectionsForm[];
}

function EventDetails({ eventDetails, sections }: PageProps) {
  const { t } = useTranslation('common')
  const { asPath } = useRouter()
  const { Markdown: UIMarkdown } = useUIContext()
  const [isEventInThePast, setIsEventInThePast] = React.useState(false)
  const { locale } = usePageWrapperContext()

  const copyToClipBoard = () => {
    navigator.clipboard.writeText(`https://www.mestskakniznica.sk${asPath}`)
  }

  const fireSwal = () => {
    const withContent = withReactContent(Swal)
    withContent.fire({
      html: <QRCode value={eventDetails?.eventTitle || ''} className="m-auto" renderAs="svg" size={240} />,
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
    setIsEventInThePast(isEventPast(eventDetails?.dateTo))
  }, [eventDetails])

  return (
    <>
      <img
        src={eventDetails?.eventCoverImage?.data?.attributes?.url}
        width={eventDetails?.eventCoverImage?.data?.attributes?.width || 0}
        height={eventDetails?.eventCoverImage?.data?.attributes?.height || 0}
        alt={eventDetails?.eventCoverImage?.data?.attributes?.alternativeText || 'Event details'}
        className="md:h-[300px] lg:h-[400px] object-cover object-center"
      />
      <div className="block lg:grid grid-cols-9 pt-10 gap-x-16">
        <div className="col-span-1 h-[108px] w-[108px] bg-promo-yellow text-center lg:flex hidden">
          <DateCardDisplay dateFrom={eventDetails?.dateFrom} dateTo={eventDetails?.dateTo} textSize="text-lg" />
        </div>
        <div className="col-span-5">
          <div className="text-xs">
            <TagsDisplay
              tags={eventDetails?.eventTags?.data || []}
              category={eventDetails?.eventCategory?.data?.attributes?.title || ''}
              tagsCount={5}
            />
          </div>
          <h1 className="text-[32px] py-[12px] leading-[38px]">{eventDetails?.eventTitle}</h1>
          <div className="text-[14px] text-gray-500">
            {dateTimeString(eventDetails?.dateFrom, eventDetails?.dateTo, locale)}
          </div>
        </div>
        <div className="col-span-3 mt-4 lg:m-auto w-full">
          {sections?.map((section) => (
            (section?.type) == 'detail_podujatia' && !isEventInThePast &&(
              <a
              href="#detail_podujatia"
              className="w-full h-12 base-button text-white bg-gray-universal-100 hover:bg-gray-universal-80 border border-gray-universal-100">
                {t('eventReservation')}
              </a>
            )
          ))}
        </div>
      </div>

      <div className="flex flex-col-reverse lg:grid grid-cols-9 pt-10 gap-x-16">
        <div className="col-span-6">
          <div className="border-b border-gray-700 pb-10 mt-8 lg:mt-0">
            <div className="text-[24px]">{t('description')}</div>
            <div className="text-gray-500 text-[16px] pt-5">
              <UIMarkdown content={eventDetails?.eventDescription || ''} />
            </div>
          </div>
          {(eventDetails?.guests?.length || 0) > 0 && (
            <div className="border-b border-gray-700 pb-10 pt-10">
              <div className="text-[24px]">{t('eventGuests')}</div>
              <div className="grid grid-cols-3 pt-5">
                {eventDetails?.guests?.map((guest) => (
                  <div key={guest?.id} className="flex pr-[24px]">
                    <img
                      src={guest?.avatar?.data?.attributes?.url}
                      width={guest?.avatar?.data?.attributes?.width || 0}
                      height={guest?.avatar?.data?.attributes?.height || 0}
                      alt={guest?.name || 'Guest name.'}
                      className="rounded-full h-12 w-12 flex items-center justify-center object-cover"
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
            <div className="border-b border-gray-700 pb-10 pt-10">
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
            <div className="border-t border-b h-auto py-3 block lg:border border-gray-900 lg:h-[70px] lg:flex lg:p-0">
              {/* <div className="hidden lg:block pl-6 w-[169px] text-sm m-auto"> */}
              {/*  {t('eventShareAndSave')} */}
              {/* </div> */}
              {!isEventInThePast && (
                <div className="my-3 lg:m-auto">
                  <AddToCalendar
                    event={{
                      name: eventDetails?.eventTitle || '',
                      details: eventDetails?.eventDescription?.replace(/\n/g, ' ') || null,
                      location: eventDetails?.eventLocality?.data?.attributes?.title || null,
                      startsAt: new Date(eventDetails?.dateFrom).toISOString(),
                      endsAt: new Date(eventDetails?.dateTo).toISOString(),
                    }}
                    filename="library-event"
                  >
                    <div className="flex text-xs uppercase">
                      <SmCalendar />
                      &nbsp; {t('eventAddToCalendar')}
                    </div>
                  </AddToCalendar>
                </div>
              )}

              <Clickable
                actionLink={copyToClipBoard}
                classA="flex text-xs uppercase"
                classDiv="my-3 lg:m-auto"
                svgIcon={<Share />}
                text={t('eventShare')}
                copyText
              />
              <Clickable
                actionLink={fireSwal}
                classA="flex text-xs uppercase"
                classDiv="my-3 lg:m-auto"
                svgIcon={<QrLogo />}
                text={t('eventQr')}
              />
            </div>
          </div>
        </div>
        <div className="col-span-3 text-[24px]">
          {t('details')}
          <div className="pt-5">
            <div className="border-t border-b lg:border border-gray-900 text-sm">
              <div className="m-5">
                <div className="border-b border-gray-300 pb-5">
                  <DetailsRow
                    classWrapper="flex"
                    svgIcon={<Calendar />}
                    text={dateTimeString(eventDetails?.dateFrom, eventDetails?.dateTo, locale)}
                  />
                  {!isEventInThePast && (
                    <div className="pl-9 pt-3">
                      <AddToCalendar
                        event={{
                          name: eventDetails?.eventTitle || '',
                          details: eventDetails?.eventDescription?.replace(/\n/g, ' ') || null,
                          location: eventDetails?.eventLocality?.data?.attributes?.title || null,
                          startsAt: new Date(eventDetails?.dateFrom).toISOString(),
                          endsAt: new Date(eventDetails?.dateTo).toISOString(),
                        }}
                        filename="library-event"
                      >
                        <div className="flex text-xs uppercase">
                          <SmCalendar />
                          &nbsp; {t('eventAddToCalendar')}
                        </div>
                      </AddToCalendar>
                    </div>
                  )}
                </div>
                <div className="border-b border-gray-300 py-5">
                  <DetailsRow
                    classWrapper="flex"
                    svgIcon={<Navigate />}
                    text={`${eventDetails?.eventLocality?.data?.attributes?.title}${
                      eventDetails?.eventLocality?.data?.attributes?.eventAddress ? `, ${eventDetails?.eventLocality?.data?.attributes?.eventAddress}` : ``
                    }`}
                  />
                  <Clickable
                    actionLink={`https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&destination=${eventDetails?.eventLocality?.data?.attributes?.navigateTo}`}
                    classA="flex text-sm uppercase"
                    classDiv="pl-9 pt-3"
                    svgIcon={<Directions />}
                    text={t('navigate')}
                  />
                </div>

                <DetailsRow
                  classWrapper="flex pt-5"
                  svgIcon={<Euro />}
                  text={eventDetails?.price == 0 ? t('noCharge').toString() : eventDetails?.price?.toString() || ''}
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
