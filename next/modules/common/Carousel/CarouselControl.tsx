import React from 'react'

import ChevronLeft from '@/assets/images/chevron-left.svg'
import ChevronRight from '@/assets/images/chevron-right.svg'
import CarouselControlButton from '@/modules/common/Carousel/CarouselControlButton'
import cn from '@/utils/cn'

export type CarouselControlDirection = 'left' | 'right'

interface CarouselControlProps {
  direction: CarouselControlDirection
  onPress: () => void
  hidden: boolean
}

const CarouselControl = ({ direction, onPress, hidden }: CarouselControlProps) => {
  return (
    <CarouselControlButton
      onPress={onPress}
      className={cn('absolute top-0 bottom-0 z-10 my-auto', {
        'left-0 -translate-x-1/2 transform': direction === 'left',
        'right-0 translate-x-1/2 transform': direction === 'right',
        hidden,
      })}
    >
      {direction === 'left' && <ChevronLeft />}
      {direction === 'right' && <ChevronRight />}
    </CarouselControlButton>
  )
}

export default CarouselControl
