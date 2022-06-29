import cx from 'classnames'

import { TableRow, TableRowProps } from '../TableRow/TableRow'

export interface TableProps {
  className?: string
  primaryTitle?: string
  secondaryTitle?: string
  rows?: (TableRowProps | undefined | null)[]
}

export function Table({ className, primaryTitle, secondaryTitle, rows }: TableProps) {
  return (
    <div className={cx(className)}>
      {primaryTitle && (
        <h3 className="text-default mb-4 lg:text-md2 lg:mb-6 text-universal-gray-100">{primaryTitle}</h3>
      )}
      {secondaryTitle && <h6 className="text-sm mb-4 text-universal-gray-100">{secondaryTitle}</h6>}

      <table className={cx(className, 'table-fixed w-full border-collapse')}>
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
