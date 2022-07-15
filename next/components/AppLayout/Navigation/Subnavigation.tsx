import { ComponentMenuSections, EventCardFragment, Maybe } from '@bratislava/strapi-sdk-city-library'
import cx from 'classnames'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import Column from './SubnavigationColumn'

interface SubnavigationProps {
  menuSlug: string | undefined | null
  menuTotalColumns: number | undefined | null
  menuSections: Maybe<ComponentMenuSections>[]
  latestEvents?: EventCardFragment[]
}

function Subnavigation({ latestEvents, menuTotalColumns, menuSections }: SubnavigationProps) {
  const { t } = useTranslation('common')

  const columns = useMemo(() => {
    const columns = []
    const temp: ComponentMenuSections[] = []
    menuSections?.map((section) => {
      if (section && section.sectionColumnSpan) {
        columns.push({ sections: section })
      } else {
        section && temp.push(section)
      }
    })

    if (temp.length > 0) {
      columns.push({ sections: temp })
    }

    return columns
  }, [menuSections])

  return (
    <div
      className={cx(
        'm-auto grid w-full border border-gray-300 bg-white px-4 py-8 text-sm font-light',
        {
          'grid-cols-3': menuTotalColumns === 3,
          'grid-cols-4 gap-x-10': menuTotalColumns === 4,
        }
      )}
    >
      {columns?.map((column, index) => {
        if (!Array.isArray(column.sections)) {
          return <Column latestEvents={latestEvents} section={column.sections} key={index} />
        }
        return (
          <div key={`merged-column-${index}`}>
            {column.sections?.map((section, index) => (
              <Column
                latestEvents={latestEvents}
                key={index}
                section={section}
                classNames={index !== 0 ? 'pt-8' : ''}
              />
            ))}
          </div>
        )
      })}
    </div>
  )
}

export default Subnavigation
