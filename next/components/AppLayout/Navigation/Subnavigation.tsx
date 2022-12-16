import cx from 'classnames'
import { useMemo } from 'react'

import { ComponentMenuSections, EventCardEntityFragment, Maybe } from '../../../graphql'
import Column from './SubnavigationColumn'

interface SubnavigationProps {
  menuTotalColumns: number | undefined | null
  menuSections: Maybe<ComponentMenuSections>[]
  latestEvents?: EventCardEntityFragment[]
}

const Subnavigation = ({ latestEvents, menuTotalColumns, menuSections }: SubnavigationProps) => {

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
        'border-border-light m-auto grid w-full border bg-white px-4 py-8 text-base font-light',
        {
          'grid-cols-3': menuTotalColumns === 3,
          'grid-cols-4 gap-x-10': menuTotalColumns === 4,
        }
      )}
    >
      {columns?.map((column, index) => {
        if (!Array.isArray(column.sections)) {
          return <Column latestEvents={latestEvents} section={column.sections} key={index}/>
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
