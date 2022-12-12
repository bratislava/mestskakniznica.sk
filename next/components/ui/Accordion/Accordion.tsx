import ChevronDown from '@assets/images/chevron-down.svg'
import ChevronUp from '@assets/images/chevron-up.svg'
import cx from 'classnames'
import { ReactNode, useEffect, useState } from 'react'

export interface AccordionProps {
  id?: string
  className?: string
  iconLeft?: ReactNode
  type: 'boxed' | 'divider' | 'sublocation'
  size: 'small' | 'big'
  label: string
  content: ReactNode | any
  stateListener?: (id: string, state: boolean) => unknown
  defaultState?: boolean
  ariaLabelPrefix?: string
  openIcon?: ReactNode
  closeIcon?: ReactNode
}

export const Accordion = ({
  id,
  className,
  label,
  type,
  size,
  content,
  iconLeft,
  stateListener,
  defaultState,
  ariaLabelPrefix,
  openIcon = <ChevronDown />,
  closeIcon = <ChevronUp />,
}: AccordionProps) => {
  const [isOpen, setOpen] = useState(false)

  useEffect(() => {
    if (defaultState !== null && defaultState !== undefined && defaultState !== isOpen) {
      setOpen(defaultState)
    }
  }, [defaultState, isOpen])

  const toggleState = () => {
    if (stateListener && id) {
      stateListener(id, !isOpen)
    } else {
      setOpen((prevVal) => !prevVal)
    }
  }

  return (
    <div
      className={cx('w-full overflow-hidden border-border-dark', className, {
        'overflow-visible': isOpen,
        border: type === 'boxed',
        'border-b': type !== 'boxed',
      })}
    >
      {/* TODO: Accessibility */}
      <button
        onClick={toggleState}
        className={cx('flex w-full cursor-pointer items-center justify-between text-left', {
          'py-5 px-6': size === 'big' && type === 'boxed',
          'py-4.5 px-4': size === 'small' && type === 'boxed',
          'py-6 pr-1.5': type !== 'boxed',
        })}
        aria-label={`${ariaLabelPrefix} ${label}`}
      >
        <div className="flex items-center gap-x-6">
          {iconLeft && (
            <span
              className={cx({
                'bg-[#FFEE33] p-4.5': type === 'sublocation',
              })}
            >
              {iconLeft}
            </span>
          )}
          <div
            className={cx('hover:underline', {
              'text-default': size === 'big',
              'text-base': size === 'small',
            })}
          >
            {label}
          </div>
        </div>
        {isOpen ? <span>{closeIcon}</span> : <span>{openIcon}</span>}
      </button>
      <div
        className={cx('text-base text-text-body', {
          'h-0': !isOpen,
          'mt-1 h-full': isOpen,
          'pb-10': isOpen && size === 'big',
          'pb-8': isOpen && size === 'small',
          'px-6': size === 'big' && type === 'boxed',
          'px-4': size === 'small' && type === 'boxed',
        })}
      >
        {content}
      </div>
    </div>
  )
}

export default Accordion
