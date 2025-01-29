import cx from 'classnames'
import React, { ReactNode, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import CarouselControl, { CarouselControlDirection } from './CarouselControl'

interface SectionPromosProps {
  listClassName?: string
  itemClassName?: string
  className?: string
  items: { element: ReactNode; key: string | undefined }[]
  shiftIndex?: number
  visibleItemsCount?: number
  hideScrollbar?: boolean
}

const Carousel = ({
  listClassName,
  itemClassName,
  className,
  items,
  shiftIndex = 1,
  visibleItemsCount = 3,
  hideScrollbar = true,
}: SectionPromosProps) => {
  const [currentItemIndex, setCurrentItemIndex] = useState(0)

  const scrollerRef = useRef<HTMLUListElement>(null)

  const scrollToItem = (i: number, instant = false) => {
    setCurrentItemIndex(i)
    if (!scrollerRef.current) return
    const offset = (scrollerRef.current.scrollWidth / items.length) * i

    scrollerRef.current?.scroll({
      left: offset,
      behavior: instant ? 'auto' : 'smooth',
    })
  }

  const nextItem = () => {
    const nextIndex = currentItemIndex + shiftIndex
    const maxIndex = items.length - visibleItemsCount
    if (nextIndex >= maxIndex + shiftIndex) {
      // If on last page, go to 0
      // scrollToImage(0, true)
      return
    }
    if (nextIndex > Math.min(maxIndex - shiftIndex, maxIndex - visibleItemsCount)) {
      scrollToItem(nextIndex)
      return
    }

    scrollToItem(nextIndex)
  }

  const previousItem = () => {
    scrollToItem(currentItemIndex - shiftIndex)
  }

  const isControlHidden = (direction: CarouselControlDirection) => {
    return (
      (direction === 'left' && currentItemIndex === 0) ||
      (direction === 'right' && currentItemIndex >= items.length - visibleItemsCount)
    )
  }

  return (
    <div className={twMerge(cx('relative'), className)}>
      <div className="hidden lg:block">
        {items.length >= visibleItemsCount && (
          <CarouselControl
            direction="left"
            onPress={previousItem}
            hidden={isControlHidden('left')}
          />
        )}
      </div>
      <ul
        className={twMerge(
          cx('-mx-4 flex snap-x snap-mandatory overflow-x-auto overflow-y-clip lg:mx-0', {
            'scrollbar-hide': hideScrollbar,
          }),
          listClassName
        )}
        ref={scrollerRef}
      >
        {items?.map((item) => {
          return (
            <li
              key={item.key}
              className={twMerge(
                'shrink-0 transform snap-center transition-all duration-200',
                itemClassName
              )}
            >
              {item.element}
            </li>
          )
        })}
      </ul>
      <div className="hidden lg:block">
        {items.length >= visibleItemsCount && (
          <CarouselControl direction="right" onPress={nextItem} hidden={isControlHidden('right')} />
        )}
      </div>
    </div>
  )
}

export default Carousel
