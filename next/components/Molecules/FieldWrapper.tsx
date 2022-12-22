import cx from 'classnames'
import { ReactNode } from 'react'

type FieldWrapperProps = {
  className?: string
  hasLeftSlot?: boolean
  hasRightSlot?: boolean
  disabled?: boolean
  error?: boolean
  children?: ReactNode
  id: string
  label?: string
  required?: boolean
}

const FieldWrapper = ({
  className,
  hasLeftSlot = false,
  hasRightSlot = false,
  children,
  disabled = false,
  error = false,
  label,
  id,
  required = false,
}: FieldWrapperProps) => {
  return (
    <div className="w-full">
      <div className="flex w-full gap-1 text-sm font-semibold">
        {label && (
          <label className="mb-1 block" htmlFor={id}>
            {label}
          </label>
        )}
        {required && <span className="text-error">*</span>}
      </div>

      <div
        className={cx('flex w-full items-center border bg-white', className, {
          'pointer-events-none cursor-not-allowed select-none': disabled,
          'border-border bg-border bg-opacity-25 text-foreground-disabled focus-within:border-border-dark hover:border-border-dark group-focus:border-border-dark':
            disabled,
          'border-error': error,
          'border-border focus-within:border-border-dark hover:border-border-dark group-focus:border-border-dark':
            !error && !disabled,
          'pl-1': hasLeftSlot,
          'pr-1': hasRightSlot,
        })}
      >
        {children}
      </div>
    </div>
  )
}

export default FieldWrapper
