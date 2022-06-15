import ChevronRightSvg from '@assets/images/chevron-right.svg'
import SectionSvg from '@assets/images/section.svg'
import { useUIContext } from '@bratislava/common-frontend-ui-context'
import {
  ComponentLocalityPartsLocalityOpeningHours,
  ComponentSectionsLocalityDetails,
} from '@bratislava/strapi-sdk-city-library'
import { Accordion, Button, CallToAction, LocalityMap } from '@bratislava/ui-city-library'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import React, { useMemo, useState } from 'react'

import { ReactComponent as Mail, ReactComponent as MailSvg } from '../../assets/images/mail.svg'
import { ReactComponent as Phone, ReactComponent as PhoneSvg } from '../../assets/images/phone.svg'
import { IEvent } from '../../utils/types'
import { dateTimeString } from '../../utils/utils'
import DateCardDisplay from '../Atoms/DateCardDispaly'
import { usePageWrapperContext } from '../layouts/PageWrapper'

export interface PageProps {
  localityDetails: ComponentSectionsLocalityDetails
  events: IEvent[] | undefined
  eventsListingUrl: string | undefined
}

function LocalityDetails({ localityDetails, events, eventsListingUrl }: PageProps) {
  const { locale } = usePageWrapperContext()
  const { Markdown: UIMarkdown } = useUIContext()
  const { t } = useTranslation('common')
  const [openLocality, setOpenLocality] = useState('')

  const listenAccordionState = (id: string, state: boolean) => {
    setOpenLocality(state ? id : '')
  }
  const mainSection = useMemo(() => localityDetails?.localitySections?.find((section) => section?.isMainSection), [localityDetails?.localitySections])

  const dayString = (day: string, from: string | null, to: string | null) => {
    if (from === to || from == null || to == null)
      return (
        <div className="grid grid-cols-2">
          <div>{day}</div>
          <div>{t('closed')}</div>
        </div>
      )

    return (
      <div className="grid grid-cols-2">
        <div>{day}</div>
        <div>{`${from.replace(':00.000', '')} - ${to.replace(':00.000', '')}`}</div>
      </div>
    )
  }

  const createContent = (
    section: ComponentLocalityPartsLocalityOpeningHours,
    onlyOpeningHours: boolean,
    showContactInfo: boolean
  ) => (
      <div className="h-full">
        {showContactInfo && (
          <div className="mb-3">
            <div className="flex items-center mb-2">
              <span className="inline-flex mr-4 mb-[1px]">
                <PhoneSvg />
              </span>
              <a href={`tel:${section.localitySectionPhone}`} className="hover:underline">
                {section.localitySectionPhone}
              </a>
            </div>
            <div className="flex items-center mb-2">
              <span className="inline-flex mr-4 mb-[1px]">
                <MailSvg />
              </span>
              <a href={`mailto:${section.localitySectionEmail}`} className="hover:underline">
                {section.localitySectionEmail}
              </a>
            </div>
          </div>
        )}
        <div className="pb-2">
          {dayString(
            locale == 'sk' ? 'Pondelok' : 'Monday',
            section.openingHoursMondayFrom,
            section.openingHoursMondayTo
          )}
        </div>
        <div className="pb-2">
          {dayString(
            locale == 'sk' ? 'Utorok' : 'Tuesday',
            section.openingHoursTuesdayFrom,
            section.openingHoursTuesdayTo
          )}
        </div>
        <div className="pb-2">
          {dayString(
            locale == 'sk' ? 'Streda' : 'Wednesday',
            section.openingHoursWednesdayFrom,
            section.openingHoursWednesdayTo
          )}
        </div>
        <div className="pb-2">
          {dayString(
            locale == 'sk' ? 'Štvrtok' : 'Thursday',
            section.openingHoursThursdayFrom,
            section.openingHoursThursdayTo
          )}
        </div>
        <div className="pb-2">
          {dayString(
            locale == 'sk' ? 'Piatok' : 'Friday',
            section.openingHoursFridayFrom,
            section.openingHoursFridayTo
          )}
        </div>
        <div className="pb-2">
          {dayString(
            locale == 'sk' ? 'Sobota' : 'Saturday',
            section.openingHoursSaturdayFrom,
            section.openingHoursSaturdayTo
          )}
        </div>
        <div className="pb-2">
          {dayString(
            locale == 'sk' ? 'Nedeľa' : 'Sunday',
            section.openingHoursSundayFrom,
            section.openingHoursSundayTo
          )}
        </div>
        {section.localitySectionDescription && !onlyOpeningHours && (
          <UIMarkdown content={section.localitySectionDescription} />
        )}
      </div>
    )

  const scrollButton = (anchor: string, text: string) => (
      <a href={anchor} className="hover:underline cursor-pointer uppercase whitespace-nowrap">
        {text}
      </a>
    )

  return (
    <div className="flex flex-col lg:flex-row gap-16 pt-12">
        <div className="w-full lg:w-2/3">
          <div className="border-b border-gray-700 pb-10">
            <div className="text-[32px] py-[12px]">
              <div className="pb-8">
                <h1 className="leading-10 lg:leading-6 md:leading-6">{localityDetails.localityTitle}</h1>
                <div className="-mx-4 overflow-x-auto">
                  <div className="flex gap-x-6 pt-9 px-4 text-xs uppercase">
                    {scrollButton('#description', t('description'))}
                    {(localityDetails.localityServices?.length || 0) > 0 && scrollButton('#services', t('services'))}
                    {(localityDetails.localitySections?.length || 0) > 0 && scrollButton('#sections', t('sections'))}
                    {scrollButton('#where', t('localityWhereToFind'))}
                  </div>
                </div>
              </div>
            </div>
            {localityDetails.localityDescription && (
              <div id="description">
                <div className="text-[24px]">{t('description')}</div>
                <div className="text-gray-500 text-[16px] pt-5">
                  <UIMarkdown content={localityDetails.localityDescription} paragraphClassName="text-sm" />
                </div>
              </div>
            )}
          </div>
          {(localityDetails.localityServices?.length || 0) > 0 && (
            <div className="border-b border-gray-700 pb-10 pt-10" id="services">
              <div className="text-[24px]">{t('services')}</div>
              <div className="grid sm:grid-cols-2 gap-4 flex-wrap pt-5">
                {localityDetails.localityServices?.map((service) => (
                  <CallToAction
                    title={service?.localityServicesPage?.title ?? ''}
                    href={service?.localityServicesPage?.slug ?? ''}
                    bottomText={t('more')}
                    className="flex pr-[24px] h-[180px]"
                    hasIcon={false}
                    uppercase={false}
                    customIcon={
                      <span className="inline-flex ml-2">
                        <ChevronRightSvg />
                      </span>
                    }
                    key={service?.localityServicesPage?.id ?? ''}
                  />
                ))}
              </div>
            </div>
          )}
          {(events?.length || 0) > 0 && (
            <div className="border-b border-gray-700 pb-12 pt-12 hidden" id="events">
              <div className="text-md2">{t('events')}</div>
              <div className="grid grid-cols-1 md:grid-cols-2">
                {events?.map((event) => (
                  <div className="w-full h-23 cursor-pointer" key={event.id}>
                    <div className="pt-4 h-10 text-gray-universal-70">
                      <Link href={event.slug || ''} passHref>
                        <a href={event.slug} className="flex">
                          <div className="flex w-16 h-16 bg-yellow-promo">
                            <DateCardDisplay
                              dateFrom={event.dateFrom || ''}
                              dateTo={event.dateTo || ''}
                              textSize="text-[18px]"
                              wrapperClass="w-16"
                            />
                          </div>

                          <div className="pl-5 overflow-hidden">
                            <div className="leading-[21px] md:w-52 whitespace-pre text-ellipsis overflow-hidden text-black-universal hover:underline">
                              {event.eventTitle}
                            </div>
                            <div className="leading-[20px] text-xs text-gray-universal-70 pt-[5px]">
                              {dateTimeString(event.dateFrom || '', event.dateTo || '', locale)}
                            </div>
                            {event.eventLocality?.title && (
                              <div className="leading-[20px] text-xs text-gray-universal-70 md:w-52 overflow-hidden whitespace-pre text-ellipsis">
                                &#9679; {event.eventLocality.title}
                              </div>
                            )}
                          </div>
                        </a>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-6">
                <Link href={eventsListingUrl || ''} passHref>
                  <a href={eventsListingUrl} className="text-sm cursor-pointer uppercase">
                    {t('moreEvents')} {'>'}
                  </a>
                </Link>
              </div>
            </div>
          )}
          <div className="pb-10 pt-10" id="sections">
            <div className="text-[24px]">{t('sections')}</div>
            <div className="pt-5">
              {localityDetails.localitySections?.map((section) => (
                <Accordion
                  className="pr-[24px]"
                  key={section?.localitySectionTitle}
                  type="divider"
                  size="small"
                  id={section?.localitySectionTitle || section?.id}
                  stateListener={listenAccordionState}
                  defaultState={openLocality === section?.localitySectionTitle}
                  label={section?.localitySectionTitle ?? ''}
                  content={createContent(section || { id: '' }, false, true)}
                  iconLeft={<SectionSvg />}
                />
              ))}
            </div>
          </div>
          <div id="where" className="mb-4">
            <div className="pb-6 text-md2">{t('localityWhereToFind')}</div>
            <div className="flex flex-col space-y-4 md:grid grid-cols-2 gap-x-5">
              <div className="w-full h-64 md:h-[415px]">
                <LocalityMap
                  localityName={localityDetails.localityTitle}
                  localityLatitude={localityDetails.localityLatitude || undefined}
                  localityLongitude={localityDetails.localityLongitude || undefined}
                  mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_KEY || ''}
                />
              </div>
              {mainSection && (
                <div className="">
                  <div className="pb-4">{t('address')}</div>
                  <div className="text-sm text-gray-500 pb">
                    {localityDetails.localityAddress?.title &&
                      localityDetails.localityAddress.title.split(', ').map((part) => (
                        <div key={part}>
                          {part}
                          <br />
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="sticky top-8 border border-gray-900 w-full h-fit p-6 lg:w-1/3">
          <div className="m-auto">
            <div className="pb-6">{t('contactUs')}</div>
            {localityDetails?.localitySections?.map((localityContact) => (
              <div className="py-3 flex flex-col border-t border-gray-300 pt-5 pb-5" key={localityContact?.id}>
                <span>{localityContact?.localitySectionTitle}</span>
                <a href={`tel:${localityContact?.localitySectionPhone}`} className="flex items-center space-x-4 py-2">
                  <span>
                    <Phone />
                  </span>
                  <span>{localityContact?.localitySectionPhone}</span>
                </a>
                <a
                  href={`mailto:${localityContact?.localitySectionEmail}`}
                  className="flex items-center space-x-4 py-2"
                >
                  <span>
                    <Mail />
                  </span>
                  <span className="truncate">{localityContact?.localitySectionEmail}</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
  )
}

export default LocalityDetails
