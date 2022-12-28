import { useUIContext } from '@bratislava/common-frontend-ui-context'
import {
  ComponentLocalityPartsLocalitySection,
  ComponentSectionsLocalityDetails,
  EventCardEntityFragment,
} from '@bratislava/strapi-sdk-city-library'
import { CallToAction, LocalityMap } from '@bratislava/ui-city-library'
import Accordion from '@components/ui/Accordion/Accordion'
import { dateTimeString } from '@utils/utils'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import React, { useMemo, useState } from 'react'

import BusinessSvg from '../../assets/images/business.svg'
import ChevronRightSvg from '../../assets/images/chevron-right.svg'
import MailSvg from '../../assets/images/mail.svg'
import PhoneSvg from '../../assets/images/phone.svg'
import DateCardDisplay from '../Atoms/DateCardDispaly'
import { usePageWrapperContext } from '../layouts/PageWrapper'

export interface PageProps {
  localityDetails: ComponentSectionsLocalityDetails
  events: EventCardEntityFragment[] | undefined
  eventsListingUrl: string | undefined
}

const LocalityDetails = ({ localityDetails, events, eventsListingUrl }: PageProps) => {
  const { locale } = usePageWrapperContext()
  const { Markdown: UIMarkdown } = useUIContext()
  const { t } = useTranslation('common')

  const mainSection = useMemo(
    () => localityDetails?.localitySections?.find((section) => section?.isMainSection),
    [localityDetails?.localitySections]
  )

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
    section: ComponentLocalityPartsLocalitySection,
    onlyOpeningHours: boolean,
    showContactInfo: boolean
  ) => (
    <div className="h-full text-base">
      {showContactInfo && (
        <div className="mb-3">
          <div className="mb-2 flex items-center">
            <span className="mr-4 mb-[1px] inline-flex">
              <PhoneSvg />
            </span>
            <a href={`tel:${section.localitySectionPhone}`} className="hover:underline">
              {section.localitySectionPhone}
            </a>
          </div>
          <div className="mb-2 flex items-center">
            <span className="mr-4 mb-[1px] inline-flex">
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
    <a href={anchor} className="cursor-pointer whitespace-nowrap uppercase hover:underline">
      {text}
    </a>
  )

  return (
    <div className="flex flex-col gap-16 pt-12 lg:flex-row">
      <div className="w-full lg:w-2/3">
        <div className="border-b border-border-dark pb-10">
          <div className="py-[12px] text-[32px]">
            <div className="pb-8">
              <h1 className="leading-10 md:leading-6 lg:leading-6">
                {localityDetails.localityTitle}
              </h1>
              <div className="-mx-4 overflow-x-auto">
                <div className="flex gap-x-6 px-4 pt-9 text-sm uppercase">
                  {scrollButton('#description', t('description'))}
                  {(localityDetails.localityServices?.length || 0) > 0 &&
                    scrollButton('#services', t('services'))}
                  {(localityDetails.localitySections?.length || 0) > 0 &&
                    scrollButton('#sections', t('sections'))}
                  {scrollButton('#where', t('localityWhereToFind'))}
                </div>
              </div>
            </div>
          </div>
          {localityDetails.localityDescription && (
            <div id="description">
              <div className="text-[24px]">{t('description')}</div>
              <div className="pt-5 text-[16px] text-foreground-body">
                <UIMarkdown
                  content={localityDetails.localityDescription}
                  paragraphClassName="text-base"
                />
              </div>
            </div>
          )}
        </div>
        {(localityDetails.localityServices?.length || 0) > 0 && (
          <div className="border-b border-border-dark py-10" id="services">
            <div className="text-[24px]">{t('services')}</div>
            <div className="grid flex-wrap gap-4 pt-5 sm:grid-cols-2">
              {localityDetails.localityServices?.map((service) => (
                <CallToAction
                  title={service?.page?.data?.attributes?.title ?? ''}
                  href={service?.page?.data?.attributes?.slug ?? ''}
                  bottomText={t('more')}
                  className="flex h-[180px] pr-[24px]"
                  hasIcon={false}
                  uppercase={false}
                  customIcon={
                    <span className="ml-2 inline-flex">
                      <ChevronRightSvg />
                    </span>
                  }
                  key={service?.page?.data?.id ?? ''}
                />
              ))}
            </div>
          </div>
        )}
        {(events?.length || 0) > 0 && (
          <div className="hidden border-b border-border-dark py-12" id="events">
            <div className="text-h3">{t('events')}</div>
            <div className="grid grid-cols-1 md:grid-cols-2">
              {events?.map((event) => (
                <div className="h-23 w-full cursor-pointer" key={event.id}>
                  <div className="h-10 pt-4 text-foreground-body">
                    <Link href={event.attributes?.slug || ''} passHref>
                      <a href={event.attributes?.slug || ''} className="flex">
                        <div className="flex h-16 w-16 bg-promo-yellow">
                          <DateCardDisplay
                            dateFrom={event.attributes?.dateFrom || ''}
                            dateTo={event.attributes?.dateTo || ''}
                            textSize="text-[18px]"
                            wrapperClass="w-16"
                          />
                        </div>

                        <div className="overflow-hidden pl-5">
                          <div className="overflow-hidden text-ellipsis whitespace-pre text-foreground-heading hover:underline md:w-52">
                            {event.attributes?.title}
                          </div>
                          <div className="pt-[5px] text-sm text-foreground-body">
                            {dateTimeString(
                              event.attributes?.dateFrom || '',
                              event.attributes?.dateTo || '',
                              locale
                            )}
                          </div>
                          {event.attributes?.eventLocality?.data?.attributes?.title && (
                            <div className="overflow-hidden text-ellipsis whitespace-pre text-sm text-foreground-body md:w-52">
                              &#9679; {event.attributes?.eventLocality.data.attributes.title}
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
                <a href={eventsListingUrl} className="cursor-pointer text-base uppercase">
                  {t('moreEvents')} {'>'}
                </a>
              </Link>
            </div>
          </div>
        )}
        <div className="py-10" id="sections">
          <div className="text-[24px]">{t('sections')}</div>
          <div className="pt-5">
            {localityDetails.localitySections?.map((section) => (
              <Accordion
                key={section?.id}
                title={section?.localitySectionTitle}
                type="sublocation"
                iconLeft={<BusinessSvg />}
              >
                {createContent(section || { id: '' }, false, true)}
              </Accordion>
            ))}
          </div>
        </div>
        <div id="where" className="mb-4">
          <div className="pb-6 text-h3">{t('localityWhereToFind')}</div>
          <div className="flex grid-cols-2 flex-col gap-x-5 space-y-4 md:grid">
            <div className="h-64 w-full md:h-[415px]">
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
                <div className="pb text-base text-foreground-body">
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
      <div className="sticky top-8 h-fit w-full border border-border-dark p-6 lg:w-1/3">
        <div className="m-auto">
          <div className="pb-6">{t('contactUs')}</div>
          {localityDetails?.localitySections?.map((localityContact) => (
            <div
              className="flex flex-col border-t border-border-light py-5"
              key={localityContact?.id}
            >
              <span>{localityContact?.localitySectionTitle}</span>
              <a
                href={`tel:${localityContact?.localitySectionPhone}`}
                className="flex items-center space-x-4 py-2"
              >
                <span>
                  <PhoneSvg />
                </span>
                <span>{localityContact?.localitySectionPhone}</span>
              </a>
              <a
                href={`mailto:${localityContact?.localitySectionEmail}`}
                className="flex items-center space-x-4 py-2"
              >
                <span>
                  <MailSvg />
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
