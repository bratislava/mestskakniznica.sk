import { TableRowWithIdFragment } from '@services/graphql'
import cx from 'classnames'

import { TableRow } from '../TableRow/TableRow'

export type TableRowWithIdProp = Pick<
  TableRowWithIdFragment,
  'id' | 'value' | 'label' | 'valueAlign'
>

export interface TableProps {
  className?: string
  primaryTitle?: string
  secondaryTitle?: string
  rows?: TableRowWithIdProp[]
}

export const Table = ({ className, primaryTitle, secondaryTitle, rows }: TableProps) => {
  return (
    <div className={cx(className)}>
      {primaryTitle && <h3 className="mb-4 text-h5 lg:mb-6">{primaryTitle}</h3>}
      {secondaryTitle && <h6 className="mb-4 text-base">{secondaryTitle}</h6>}

      <table className={cx(className, 'w-full table-fixed border-collapse')}>
        <tbody>
          {rows?.map((row) => (
            <TableRow
              key={row.id}
              value={row?.value ?? ''}
              label={row?.label ?? ''}
              valueAlign={row?.valueAlign ?? 'start'}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
