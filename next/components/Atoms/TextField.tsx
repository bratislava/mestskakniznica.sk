import { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from 'react'

import FieldWrapper from '@/components/Molecules/FieldWrapper'
import cn from '@/utils/cn'

type AreaOrInputConditionalProps =
  // textarea props
  | (DetailedHTMLProps<InputHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> & {
      area: true
      rows?: number
    })
  // input props
  | (DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
      area?: never | undefined | false
      leftSlot?: ReactNode
      rightSlot?: ReactNode
    })

// common for textarea and input
type CommonProps = {
  error?: boolean
  id: string
  label?: string
  inputClassName?: string
  isLarge?: boolean
}

type TextFieldProps = CommonProps & AreaOrInputConditionalProps

const TextField = (props: TextFieldProps) => {
  // eslint-disable-next-line react/destructuring-assignment
  if (props.area) {
    const {
      id,
      area,
      rows = 6,
      label,
      className,
      inputClassName,
      disabled = false,
      error = false,
      required = false,
      isLarge = false,
      ...rest
    } = props

    return (
      <FieldWrapper
        id={id}
        label={label}
        className={className}
        disabled={disabled}
        error={error}
        required={required}
      >
        <textarea
          {...rest}
          rows={rows}
          disabled={disabled}
          required={required}
          className={cn(
            'min-h-10 w-full resize-y bg-transparent px-4 py-[6px] outline-none',
            inputClassName,
            {
              'text-foreground-disabled': disabled,
              'placeholder:text-foreground-placeholder': !inputClassName?.includes('placeholder:'),
              'h-16': isLarge,
            },
          )}
        />
      </FieldWrapper>
    )
  }

  const {
    id,
    area,
    leftSlot = null,
    rightSlot = null,
    label,
    className,
    disabled = false,
    inputClassName,
    error = false,
    required = false,
    isLarge = false,
    ...rest
  } = props

  return (
    <FieldWrapper
      id={id}
      label={label}
      hasLeftSlot={!!leftSlot}
      hasRightSlot={!!rightSlot}
      disabled={disabled}
      error={error}
      required={required}
      className={cn('ring-offset-2 transition focus-within:ring', className)}
    >
      {leftSlot && (
        <div className={cn('shrink-0 grow-0', { 'p-3': isLarge, 'p-2': !isLarge })}>{leftSlot}</div>
      )}
      <input
        {...rest}
        disabled={disabled}
        required={required}
        className={cn('w-full bg-transparent outline-none', inputClassName, {
          'text-foreground-disabled': disabled,
          'pl-4': !leftSlot,
          'pr-4': !rightSlot,
          'placeholder:text-foreground-placeholder': !inputClassName?.includes('placeholder:'),
          'h-16': isLarge,
          'h-10': !isLarge,
        })}
      />
      {rightSlot && <div className={cn('shrink-0 grow-0', { 'p-3': isLarge })}>{rightSlot}</div>}
    </FieldWrapper>
  )
}

export default TextField
