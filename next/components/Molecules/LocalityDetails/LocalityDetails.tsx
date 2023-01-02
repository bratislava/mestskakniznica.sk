import MailSvg from '@assets/images/mail.svg'
import PhoneSvg from '@assets/images/phone.svg'
import SectionSvg from '@assets/images/section.svg'
import { useUIContext } from '@bratislava/common-frontend-ui-context'
import {
  ComponentLocalityPartsLocalitySection,
  ComponentSectionsLocalityDetails,
  EventCardEntityFragment,
} from '@bratislava/strapi-sdk-city-library'
import { Accordion } from '@bratislava/ui-city-library'
import LocalityDetailsContactUs from '@components/Molecules/LocalityDetails/LocalityDetailsContactUs'
import LocalityDetailsServices from '@components/Molecules/LocalityDetails/LocalityDetailsServices'
import LocalityDetailsWhere from '@components/Molecules/LocalityDetails/LocalityDetailsWhere'
import MLink from '@modules/common/MLink'
import { getBranchInfo } from '@utils/getBranchInfo'
import { dateTimeString } from '@utils/utils'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import DateCardDisplay from '../../Atoms/DateCardDispaly'
import { usePageWrapperContext } from '../../layouts/PageWrapper'

export interface PageProps {
  localityDetails: ComponentSectionsLocalityDetails
  events: EventCardEntityFragment[] | undefined
  eventsListingUrl: string | undefined
}

const LocalityDetails = ({ localityDetails, events, eventsListingUrl }: PageProps) => {
  const { locale } = usePageWrapperContext()
  const { Markdown: UIMarkdown } = useUIContext()
  const { t } = useTranslation('common')
  const [openLocality, setOpenLocality] = useState('')

  const listenAccordionState = (id: string, state: boolean) => {
    setOpenLocality(state ? id : '')
  }

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
    <div className="h-full">
      {showContactInfo && (
        <div className="mb-3">
          {/* TODO replace by PhoneButton */}
          <div className="mb-2 flex items-center">
            <span className="mr-4 mb-[1px] inline-flex">
              <PhoneSvg />
            </span>
            <a href={`tel:${section.localitySectionPhone}`} className="hover:underline">
              {section.localitySectionPhone}
            </a>
          </div>
          {/* TODO replace by MailButton */}
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
          locale === 'sk' ? 'Pondelok' : 'Monday',
          section.openingHoursMondayFrom,
          section.openingHoursMondayTo
        )}
      </div>
      <div className="pb-2">
        {dayString(
          locale === 'sk' ? 'Utorok' : 'Tuesday',
          section.openingHoursTuesdayFrom,
          section.openingHoursTuesdayTo
        )}
      </div>
      <div className="pb-2">
        {dayString(
          locale === 'sk' ? 'Streda' : 'Wednesday',
          section.openingHoursWednesdayFrom,
          section.openingHoursWednesdayTo
        )}
      </div>
      <div className="pb-2">
        {dayString(
          locale === 'sk' ? 'Štvrtok' : 'Thursday',
          section.openingHoursThursdayFrom,
          section.openingHoursThursdayTo
        )}
      </div>
      <div className="pb-2">
        {dayString(
          locale === 'sk' ? 'Piatok' : 'Friday',
          section.openingHoursFridayFrom,
          section.openingHoursFridayTo
        )}
      </div>
      <div className="pb-2">
        {dayString(
          locale === 'sk' ? 'Sobota' : 'Saturday',
          section.openingHoursSaturdayFrom,
          section.openingHoursSaturdayTo
        )}
      </div>
      <div className="pb-2">
        {dayString(
          locale === 'sk' ? 'Nedeľa' : 'Sunday',
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
    <MLink href={anchor} className="cursor-pointer whitespace-nowrap uppercase hover:underline">
      {text}
    </MLink>
  )

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0px,_1fr)_380px] lg:gap-30">
      <div>
        <div className="border-b border-border-dark pb-10">
          <div className="py-[12px] text-[32px]">
            <div className="pb-8">
              <h1 className="text-h1">{localityDetails.localityTitle}</h1>
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
          {/* TODO: Extract description */}
          {localityDetails.localityDescription && (
            <div id="description">
              <h3 className="text-h3">{t('description')}</h3>
              <div className="pt-5 text-[16px] text-foreground-body">
                <UIMarkdown
                  content={localityDetails.localityDescription}
                  paragraphClassName="text-base"
                />
              </div>
            </div>
          )}
        </div>
        <LocalityDetailsServices localityDetails={localityDetails} />
        {/* TODO: Extract events */}
        {(events?.length || 0) > 0 && (
          <div className="hidden border-b border-border-dark py-12" id="events">
            <div className="text-h3">{t('events')}</div>
            <div className="grid grid-cols-1 md:grid-cols-2">
              {events?.map((event) => {
                const eventBranch = getBranchInfo(event.attributes?.branch?.data)

                return (
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
                            {eventBranch?.title && (
                              <div className="overflow-hidden text-ellipsis whitespace-pre text-sm text-foreground-body md:w-52">
                                &#9679; {eventBranch.title}
                              </div>
                            )}
                          </div>
                        </a>
                      </Link>
                    </div>
                  </div>
                )
              })}
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
        {/* TODO: Extract sections */}
        <div className="py-10" id="sections">
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
          <LocalityDetailsWhere localityDetails={localityDetails} />
        </div>
      </div>
      <LocalityDetailsContactUs localityDetails={localityDetails} />
    </div>
  )
}

export default LocalityDetails
