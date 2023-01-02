import FormatEventDateRange from '@modules/common/FormatEventDateRange'
import MLink from '@modules/common/MLink'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import cx from 'classnames'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'

import { ComponentMenuSections, Enum_Page_Layout, EventCardEntityFragment } from '../../../graphql'
import EventDetailsDateBox from '../../Atoms/EventDetailsDateBox'

interface ColumnProps {
  section: ComponentMenuSections
  latestEvents?: EventCardEntityFragment[]
  classNames?: string
}

const Column = ({ section, latestEvents, classNames }: ColumnProps) => {
  const { t } = useTranslation('common')

  // TODO optionally load latestEvents here if needed
  const containsEvents = section?.sectionLinks?.some(
    (sectionLink) =>
      sectionLink?.sectionLinkPage?.data?.attributes?.layout === Enum_Page_Layout.Event
  )
  const isLengthy = section?.sectionLinks ? section.sectionLinks.length >= 8 : false

  return (
    <div
      className={cx('w-full', classNames, {
        'col-span-1': section.sectionColumnSpan === 1,
        'col-span-2': section.sectionColumnSpan === 2,
      })}
    >
      {section.sectionTitle && section.sectionPage !== null && (
        <NavigationMenu.Link className="text-lg hover:underline" tabIndex={-1}>
          <Link href={`/${section?.sectionPage?.data?.attributes?.slug}`}>
            {section.sectionTitle}
          </Link>
        </NavigationMenu.Link>
      )}

      <div
        className={cx('grid', {
          'grid-flow-col grid-rows-8 gap-x-10': !containsEvents && isLengthy,
        })}
      >
        {section.sectionLinks?.map((sectionLink) => {
          if (sectionLink?.sectionLinkTitle === 'latestEvents') {
            if (latestEvents && latestEvents?.length > 0) {
              return (
                <div className="grid grid-flow-col grid-rows-2">
                  {latestEvents.map((event) => (
                    <div key={event.attributes?.slug}>
                      <div className="h-23 w-[380px] cursor-pointer py-5">
                        <NavigationMenu.Link
                          className="h-10 pt-4 text-foreground-body"
                          tabIndex={-1}
                        >
                          <MLink
                            href={`${t('event_slug')}${event.attributes?.slug ?? ''}`}
                            className="flex"
                          >
                            <div className="flex h-16 w-20 bg-promo-yellow text-center">
                              <EventDetailsDateBox
                                dateFrom={event.attributes?.dateFrom || ''}
                                dateTo={event.attributes?.dateTo || ''}
                                textClassname="text-[18px]"
                              />
                            </div>

                            <div className="w-full pl-5">
                              <div className="text-foreground-heading hover:underline">
                                {event?.attributes?.title}
                              </div>
                              <div className="text-sm text-foreground-body">
                                <FormatEventDateRange
                                  dateFrom={event.attributes?.dateFrom}
                                  dateTo={event.attributes?.dateTo}
                                />
                              </div>
                              {event?.attributes?.eventLocality?.data?.attributes?.title && (
                                <div className="max-w-[250px] text-sm text-foreground-body">
                                  &#9679;{' '}
                                  {event?.attributes?.eventLocality?.data?.attributes?.title}
                                </div>
                              )}
                            </div>
                          </MLink>
                        </NavigationMenu.Link>
                      </div>
                    </div>
                  ))}
                </div>
              )
            }
          } else if (sectionLink?.sectionLinkPage)
            return (
              <NavigationMenu.Link
                className={cx('h-auto cursor-pointer pt-4 text-foreground-body', {
                  'h-[45px]': !containsEvents && isLengthy,
                })}
                tabIndex={-1}
                key={sectionLink.sectionLinkPage?.data?.attributes?.slug}
              >
                <Link href={`/${sectionLink.sectionLinkPage?.data?.attributes?.slug}`} passHref>
                  <a
                    href={`/${sectionLink.sectionLinkPage?.data?.attributes?.slug}`}
                    className="hover:underline"
                  >
                    {sectionLink.sectionLinkPage?.data?.attributes?.title}
                  </a>
                </Link>
              </NavigationMenu.Link>
            )
          else return null
        })}
      </div>
    </div>
  )
}

export default Column
