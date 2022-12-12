import CheckMark from '@assets/images/check-mark.svg'
import cx from 'classnames'
import { useTranslation } from 'next-i18next'
import React from 'react'

interface IProps {
  num: number
  title: string
  activeStep: number
  onClick: () => void
  className?: string
  children?: React.ReactNode
}

const StepNumberTitle = ({ num, title, activeStep, onClick, className, children }: IProps) => {
  const active = activeStep === num
  const finished = activeStep > num
  const { t } = useTranslation(['homepage'])

  return (
    <div
      className={cx(
        'pt-6',
        {
          'pb-6': !finished && active,
          'border-b border-border-light': active || finished,
        },
        className
      )}
    >
      <button
        type="button"
        onClick={onClick}
        className={cx('flex cursor-pointer items-center gap-x-6 ', {
          'mb-6': active || finished,
        })}
        aria-label={`${active ? t('openAccordian') : t('closeAccordian')} ${title}`}
      >
        <span
          className={cx(
            'inline-flex h-14 w-14 items-center justify-center rounded-full border border-border-dark p-6 text-base',
            {
              'bg-button-dark text-white': active || finished,
              'text-text-heading': !active && !finished,
            }
          )}
        >
          {finished ? <CheckMark className="-m-6" /> : num}
        </span>
        <p className="text-left text-default text-text-heading">{title}</p>
      </button>
      {active && children}
    </div>
  )
}

export default StepNumberTitle
