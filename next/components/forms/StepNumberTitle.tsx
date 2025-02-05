import cx from 'classnames'
import { useTranslation } from 'next-i18next'
import React, { ReactNode } from 'react'

import { CheckNoPaddingIcon } from '@/assets/icons'

interface IProps {
  num: number
  title: string
  activeStep: number
  onClick: () => void
  className?: string
  children?: ReactNode
}

const StepNumberTitle = ({ num, title, activeStep, onClick, className, children }: IProps) => {
  const active = activeStep === num
  const finished = activeStep > num
  const { t } = useTranslation()

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
      {/* TODO replace by Button */}
      <button
        type="button"
        onClick={onClick}
        className={cx('base-focus-ring flex cursor-pointer items-center gap-x-6', {
          'mb-6': active || finished,
        })}
        aria-label={`${
          active ? t('stepNumberTitle.openAccordion') : t('stepNumberTitle.closeAccordion')
        } ${title}`}
      >
        <span
          className={cx(
            'inline-flex h-14 w-14 items-center justify-center rounded-full border border-border-dark p-6 text-base',
            {
              'bg-button-dark text-white': active || finished,
              'text-foreground-heading': !active && !finished,
            }
          )}
        >
          {finished ? <CheckNoPaddingIcon className="-m-6" /> : num}
        </span>
        <p className="text-left text-h5 text-foreground-heading">{title}</p>
      </button>
      {active && children}
    </div>
  )
}

export default StepNumberTitle
