import { ComponentMenuSections, Maybe } from '@services/graphql'
import cx from 'classnames'
import { useMemo } from 'react'

import Column from './SubnavigationColumn'

interface SubnavigationProps {
  menuTotalColumns: number | undefined | null
  menuSections: Maybe<ComponentMenuSections>[]
}

const Subnavigation = ({ menuTotalColumns, menuSections }: SubnavigationProps) => {
  const columns = useMemo(() => {
    const columnsTmp = []
    const temp: ComponentMenuSections[] = []
    menuSections?.forEach((section) => {
      if (section && section.sectionColumnSpan) {
        columnsTmp.push({ sections: section })
      } else if (section) {
        temp.push(section)
      }
    })

    if (temp.length > 0) {
      columnsTmp.push({ sections: temp })
    }

    return columnsTmp
  }, [menuSections])

  return (
    <div
      className={cx(
        'm-auto grid w-full border border-border-light bg-white px-4 py-8 text-base font-light',
        {
          'grid-cols-3': menuTotalColumns === 3,
          'grid-cols-4 gap-x-10': menuTotalColumns === 4,
        }
      )}
    >
      {columns?.map((column, index) => {
        if (!Array.isArray(column.sections)) {
          return <Column section={column.sections} key={index} />
        }
        return (
          <div key={`merged-column-${index}`}>
            {column.sections?.map((section, index) => (
              <Column key={index} section={section} classNames={index !== 0 ? 'pt-8' : ''} />
            ))}
          </div>
        )
      })}
    </div>
  )
}

export default Subnavigation
