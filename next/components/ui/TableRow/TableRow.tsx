import cn from '@/utils/cn'

export interface TableRowProps {
  className?: string
  label?: string | undefined | null
  value?: string | undefined | null
  valueAlign?: string | undefined | null
}

export const TableRow = ({ className, label, value, valueAlign = 'start' }: TableRowProps) => {
  return (
    <tr
      className={cn(
        className,
        'flex w-full items-center space-x-6 border border-b-0 border-border-dark last:border-b',
        'px-3 py-[10px] lg:p-4',
        'text-sm text-foreground-body lg:text-base',
        { 'border-l-0 border-r-0': !label && !value },
      )}
    >
      <td className="w-1/2">{label ?? ''}</td>

      {valueAlign === 'start' && <td className="w-1/2">{value ?? ''}</td>}

      {valueAlign === 'center' && (
        <>
          <td className="w-1/6" />
          <td className="w-1/3">{value ?? ''}</td>
        </>
      )}
    </tr>
  )
}

export default TableRow
