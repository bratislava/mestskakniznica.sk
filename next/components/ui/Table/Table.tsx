import cx from 'classnames'

import { TableRow, TableRowProps } from '../TableRow/TableRow'

export interface TableProps {
  className?: string
  primaryTitle?: string
  secondaryTitle?: string
  rows?: (TableRowProps | undefined | null)[]
}

export const Table = ({ className, primaryTitle, secondaryTitle, rows }: TableProps) => {
  return (
    <div className={cx(className)}>
      {primaryTitle && (
        <h3 className="mb-4 text-h5 lg:mb-6">
          {primaryTitle}
        </h3>
      )}
      {secondaryTitle && <h6 className="mb-4 text-base">{secondaryTitle}</h6>}

      <table className={cx(className, 'w-full table-fixed border-collapse')}>
        <tbody>
        {rows?.map((row, index) => (
          <TableRow
            key={index}
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
