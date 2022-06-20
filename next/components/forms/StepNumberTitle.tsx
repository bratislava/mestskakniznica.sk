import CheckMark from '@assets/images/check-mark.svg'
import cx from 'classnames'
import React from 'react'
import { useTranslation } from 'next-i18next'

interface IProps {
  num: number
  title: string
  activeStep: number
  onClick: () => void
  className?: string
  children?: React.ReactNode
}

function StepNumberTitle({ num, title, activeStep, onClick, className, children }: IProps) {
  const active = activeStep === num
  const finished = activeStep > num
  const { t } = useTranslation(['homepage'])

  return (
    <div
      className={cx(
        'pt-6',
        {
          'pb-6': !finished && active,
          'border-b border-gray-universal-200': active || finished,
        },
        className
      )}
    >
      <button
        type="button"
        onClick={onClick}
        className={cx('flex items-center gap-x-6 cursor-pointer ', {
          'mb-6': active || finished,
        })}
        aria-label={`${active ? t('openAccordian') : t('closeAccordian')} ${title}`}
      >
        <span
          className={cx(
            'w-14 h-14 p-6 inline-flex items-center justify-center text-base rounded-full border border-gray-universal-100',
            {
              'bg-gray-universal-100 text-white': active || finished,
              'text-gray-universal-100': !active && !finished,
            }
          )}
        >
          {finished ? <CheckMark className="-m-6" /> : num}
        </span>
        <p className="text-gray-universal-100 text-default text-left">{title}</p>
      </button>
      {active && children}
    </div>
  )
}

export default StepNumberTitle
