import ChevronLeft from '@assets/images/chevron-left.svg'
import ChevronRight from '@assets/images/chevron-right.svg'
import VerticalCardButton from '@components/HomePage/VerticalCardButton'
import cx from 'classnames'
import React from 'react'

export type SliderDirection = 'left' | 'right'

interface SliderControlProps {
  direction: SliderDirection
  onPress: () => void
  hidden: boolean
}

const SliderControl = ({ direction, onPress, hidden }: SliderControlProps) => {
  return (
    <VerticalCardButton
      onPress={onPress}
      className={cx('absolute top-0 bottom-0 z-10 my-auto', {
        'left-0 -translate-x-1/2 transform': direction === 'left',
        'right-0 translate-x-1/2 transform': direction === 'right',
        hidden,
      })}
    >
      {direction === 'left' && <ChevronLeft />}
      {direction === 'right' && <ChevronRight />}
    </VerticalCardButton>
  )
}

export default SliderControl
