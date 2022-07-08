import { ComponentMenuSections, Enum_Page_Layout, MenuSectionFragment } from '@bratislava/strapi-sdk-city-library'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { IEvent } from '@utils/types'
import cx from 'classnames'
import Link from 'next/link'

import { convertPageToEventDisplay, dateTimeString } from '../../../utils/utils'
import DateCardDisplay from '../../Atoms/DateCardDispaly'
import { usePageWrapperContext } from '../../layouts/PageWrapper'

interface ColumnProps {
  section: ComponentMenuSections
  latestEvents: IEvent[] | undefined
  classNames?: string
}

function Column({ section, latestEvents, classNames }: ColumnProps) {
  // TODO optionally load latestEvents here if needed
  const containsEvents = section?.sectionLinks?.some(
    (sectionLink) => sectionLink?.sectionLinkPage?.data?.attributes?.layout === Enum_Page_Layout.Event
  )
  const isLengthy = section?.sectionLinks ? section.sectionLinks.length >= 8 : false
  const { locale } = usePageWrapperContext()

  return (
    <div
      className={cx('w-full', classNames, {
        'col-span-1': section.sectionColumnSpan === 1,
        'col-span-2': section.sectionColumnSpan === 2,
      })}
    >
      {section.sectionTitle && section.sectionPage !== null && (
        <NavigationMenu.Link className="text-default hover:underline" tabIndex={-1}>
          <Link href={`/${section?.sectionPage?.data?.attributes?.slug}`}>{section.sectionTitle}</Link>
        </NavigationMenu.Link>
      )}

      <div
        className={cx('grid', {
          'grid-rows-8 gap-x-10 grid-flow-col': !containsEvents && isLengthy,
        })}
      >
        {section.sectionLinks?.map((sectionLink) => {
          if (sectionLink?.sectionLinkTitle === 'latestEvents') {
            if (latestEvents && latestEvents?.length > 0) {
              return (
                <div className="grid grid-rows-2 grid-flow-col">
                  {latestEvents.map((event: any) => (
                    <div key={event.slug}>
                      <div className="w-[380px] pt-5 pb-5 h-23 cursor-pointer">
                        <NavigationMenu.Link className="pt-4 h-10 text-gray-universal-70" tabIndex={-1}>
                          <Link href={`/${event.slug}`} passHref>
                            <a href={`/${event.slug}`} className="flex">
                              <div className="text-center flex w-20 h-16 bg-yellow-promo">
                                <DateCardDisplay
                                  dateFrom={event.dateFrom}
                                  dateTo={event.dateTo}
                                  textSize="text-[18px]"
                                />
                              </div>

                              <div className="pl-5 w-full">
                                <div className="leading-[19px] text-black-universal hover:underline">
                                  {event.eventTitle}
                                </div>
                                <div className="leading-[20px] text-xs text-gray-universal-70">
                                  {dateTimeString(event.dateFrom, event.dateTo, locale)}
                                </div>
                                {event.eventLocality?.title && (
                                  <div className="leading-[20px] text-xs text-gray-universal-70 max-w-[250px]">
                                    &#9679; {event.eventLocality.title}
                                  </div>
                                )}
                              </div>
                            </a>
                          </Link>
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
                className={cx('pt-4 cursor-pointer text-gray-universal-70 h-auto', {
                  'h-[45px]': !containsEvents && isLengthy,
                })}
                tabIndex={-1}
                key={sectionLink.sectionLinkPage?.data?.attributes?.slug}
              >
                <Link href={`/${sectionLink.sectionLinkPage?.data?.attributes?.slug}`} passHref>
                  <a href={`/${sectionLink.sectionLinkPage?.data?.attributes?.slug}`} className="hover:underline">
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
