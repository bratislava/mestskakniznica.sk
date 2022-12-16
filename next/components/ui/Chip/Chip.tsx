import ClearCircle from '@assets/images/clear-circle.svg'
import cx from 'classnames'

export interface ChipProps {
  className?: string
  children?: React.ReactNode
  size: 'big' | 'medium' | 'small'
  onDelete?: () => void
}

export const Chip = ({ size, children, className, onDelete }: ChipProps) => {
  return (
    <div
      className={cx(
        'flex items-center justify-center gap-x-1.5 rounded-full border border-border-light',
        className,
        {
          'px-4 py-2': size === 'big',
          'px-3 py-1.5': size === 'medium',
          'px-2 py-1': size === 'small',
        }
      )}
    >
      <div
        className={cx({
          'text-[14px]': size === 'big',
          'text-[12px]': size !== 'big',
        })}
      >
        {children}
      </div>
      {!!onDelete && <ClearCircle onClick={onDelete} className="text-black/60 cursor-pointer" />}
    </div>
  )
}
