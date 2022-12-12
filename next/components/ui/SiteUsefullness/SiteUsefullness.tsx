import ThumbDown from '@assets/images/thumb-down.svg'
import ThumbUp from '@assets/images/thumb-up.svg'
import cx from 'classnames'
import React, { MouseEvent } from 'react'

import { Button } from '../Button/Button'

export interface SiteUsefullnessProps {
  className?: string
  title: string
  thankYouMessage: string
  onButtonClick: (e: React.MouseEvent) => void
  firstOption?: string
  secondOption?: string
}

export const SiteUsefullness = ({
                                  className,
                                  title,
                                  thankYouMessage,
                                  firstOption,
                                  secondOption,
                                  onButtonClick,
                                }: SiteUsefullnessProps) => {
  const [isSubmitted, setIsSubmitted] = React.useState(false)

  const handleClick = (e: MouseEvent) => {
    setIsSubmitted(true)
    onButtonClick(e)
  }

  return (
    <div
      className={cx(
        'flex flex-col items-center gap-y-4 border border-border-dark p-6 lg:flex-row lg:gap-y-0',
        className,
        {
          'justify-between': !isSubmitted,
          'justify-center py-[33px]': isSubmitted,
        }
      )}
    >
      {isSubmitted ? (
        <p className="text-base text-text-heading">{thankYouMessage}</p>
      ) : (
        <>
          <p className="text-base text-text-heading">{title}</p>
          <div className="flex items-center gap-x-3">
            <Button
              variant="secondary"
              className="py-[9px] px-5"
              icon={<ThumbUp/>}
              iconPosition="left"
              id="site-useful-yes"
              onClick={handleClick}
            >
              {firstOption}
            </Button>
            <Button
              variant="secondary"
              className="py-[9px] px-5"
              icon={<ThumbDown/>}
              iconPosition="left"
              id="site-useful-no"
              onClick={handleClick}
            >
              {secondOption}
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
