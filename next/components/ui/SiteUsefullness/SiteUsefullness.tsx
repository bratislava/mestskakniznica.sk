import { PressEvent } from '@react-types/shared'
import { useState } from 'react'

import ThumbDown from '@/assets/images/thumb-down.svg'
import ThumbUp from '@/assets/images/thumb-up.svg'
import Button from '@/modules/common/Button'
import cn from '@/utils/cn'

export interface SiteUsefullnessProps {
  className?: string
  title: string
  thankYouMessage: string
  onButtonClick: (e: PressEvent) => void
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
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleClick = (e: PressEvent) => {
    setIsSubmitted(true)
    onButtonClick(e)
  }

  return (
    <div
      className={cn(
        'flex flex-col items-center gap-y-4 border border-border-dark p-6 lg:flex-row lg:gap-y-0',
        className,
        {
          'justify-between': !isSubmitted,
          'justify-center py-[33px]': isSubmitted,
        },
      )}
    >
      {isSubmitted ? (
        <p className="text-base text-foreground-heading">{thankYouMessage}</p>
      ) : (
        <>
          <p className="text-base text-foreground-heading">{title}</p>
          <div className="flex items-center gap-x-3">
            <Button
              variant="secondary"
              startIcon={<ThumbUp />}
              id="site-useful-yes"
              onPress={handleClick}
            >
              {firstOption}
            </Button>
            <Button
              variant="secondary"
              startIcon={<ThumbDown />}
              id="site-useful-no"
              onPress={handleClick}
            >
              {secondOption}
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
