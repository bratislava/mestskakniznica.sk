import EventRow from '@modules/common/EventRow'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { ComponentMenuSections } from '@services/graphql'
import { useGeneralContext } from '@utils/generalContext'
import { isDefined } from '@utils/isDefined'
import cx from 'classnames'
import Link from 'next/link'

interface ColumnProps {
  section: ComponentMenuSections
  classNames?: string
}

const Column = ({ section, classNames }: ColumnProps) => {
  const { upcomingEvents } = useGeneralContext()

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
          'grid-flow-col grid-rows-8 gap-x-10': isLengthy,
        })}
      >
        {section.sectionLinks?.map((sectionLink) => {
          if (sectionLink?.sectionLinkTitle === 'latestEvents') {
            if (upcomingEvents?.data && upcomingEvents?.data.length > 0) {
              return (
                <ul className="mt-5 grid grid-flow-col grid-rows-2 gap-x-5 gap-y-3">
                  {upcomingEvents.data
                    .map((event) => event.attributes)
                    .filter(isDefined)
                    .map((event) => {
                      return (
                        <NavigationMenu.Link tabIndex={-1}>
                          <EventRow event={event} />
                        </NavigationMenu.Link>
                      )
                    })}
                </ul>
              )
            }
          } else if (sectionLink?.sectionLinkPage)
            return (
              <NavigationMenu.Link
                className={cx('h-auto cursor-pointer pt-4 text-foreground-body', {
                  'h-[45px]': isLengthy,
                })}
                tabIndex={-1}
                key={sectionLink.sectionLinkPage?.data?.attributes?.slug}
              >
                <Link
                  href={`/${sectionLink.sectionLinkPage?.data?.attributes?.slug}`}
                  className="hover:underline"
                >
                  {sectionLink.sectionLinkPage?.data?.attributes?.title}
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
