import ChevronLeft from '@assets/images/chevron-left.svg'
import ChevronRight from '@assets/images/chevron-right.svg'
import VerticalCardButton from '@components/HomePage/VerticalCardButton'
import cx from 'classnames'
import React from 'react'

export enum SliderVariant {
  LEFT,
  RIGHT,
}

interface SliderControlProps {
  variant: SliderVariant
  onPress: () => void
  hidden: boolean
}

const SliderControl = ({ variant, onPress, hidden }: SliderControlProps) => {
  return (
    <VerticalCardButton
      onPress={onPress}
      className={cx('absolute top-0 bottom-0 z-10 my-auto', {
        'left-0 -translate-x-1/2 transform': variant === SliderVariant.LEFT,
        'right-0 translate-x-1/2 transform': variant === SliderVariant.RIGHT,
        hidden,
      })}
    >
      {variant === SliderVariant.LEFT && <ChevronLeft className="w-2 cursor-pointer" />}
      {variant === SliderVariant.RIGHT && <ChevronRight />}
    </VerticalCardButton>
  )
}

export default SliderControl
