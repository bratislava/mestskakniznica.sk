import ChevronLeft from '@assets/images/chevron-left.svg'
import ChevronRight from '@assets/images/chevron-right.svg'
import cx from 'classnames'
import React, { useRef } from 'react'

import { VerticalCardButton } from '../../HomePage/VerticalCardButton'

interface SectionPromosProps {
  listClassName?: string
  itemClassName?: string
  items: { element: JSX.Element | null; key: string | undefined }[]
  shiftIndex?: number
  visibleItems?: number
}

const Carousel = ({
  listClassName,
  itemClassName,
  items,
  shiftIndex = 1,
  visibleItems = 3,
}: SectionPromosProps) => {
  const [currentItem, setCurrentItem] = React.useState(0)

  const scrollerRef = useRef<HTMLUListElement>(null)

  const scrollToImage = (i: number, instant = false) => {
    setCurrentItem(i)
    if (!scrollerRef.current) return
    const offset = (scrollerRef.current.scrollWidth / items.length) * i

    scrollerRef.current?.scroll({
      left: offset,
      behavior: instant ? 'auto' : 'smooth',
    })
  }

  const nextImage = () => {
    const nextIdx = currentItem + shiftIndex
    const maxIdx = items.length - visibleItems
    if (nextIdx >= maxIdx + shiftIndex) {
      // If on last page, go to 0
      // scrollToImage(0, true)
      return
    }

    if (nextIdx > Math.min(maxIdx - shiftIndex, maxIdx - visibleItems)) {
      scrollToImage(nextIdx)
      return
    }

    scrollToImage(nextIdx)
  }

  const previousImage = () => {
    scrollToImage(currentItem - shiftIndex)
  }

  const sliderControl = (isLeft: boolean) =>
    items.length >= visibleItems ? (
      <VerticalCardButton
        onPress={isLeft ? previousImage : nextImage}
        size="large"
        className={cx('absolute top-0 bottom-0 z-10 my-auto', {
          'left-0 -translate-x-1/2 transform': isLeft,
          'right-0 translate-x-1/2 transform': !isLeft,
          hidden:
            (isLeft && currentItem === 0) ||
            (!isLeft && currentItem + shiftIndex >= items.length - visibleItems + shiftIndex),
          'ml-8': isLeft,
          'mr-8': !isLeft,
        })}
      >
        {isLeft ? <ChevronLeft className="w-2 cursor-pointer" /> : <ChevronRight />}
      </VerticalCardButton>
    ) : null

  return (
    <div className="relative">
      <div className="hidden md:block">{sliderControl(true)}</div>
      <ul
        className={cx(
          '-mx-4 flex snap-x snap-mandatory overflow-x-auto scrollbar-hide',
          listClassName
        )}
        ref={scrollerRef}
      >
        {items?.map((item, index) => {
          const isVisible = index >= currentItem && index < currentItem + visibleItems
          return (
            <li
              key={item.key}
              className={cx(
                'flex-shrink-0 shrink-0 transform snap-center transition-all duration-200',
                itemClassName,
                {
                  'scale-100 opacity-100': isVisible,
                }
              )}
            >
              {item.element}
            </li>
          )
        })}
      </ul>
      <div className="hidden md:block">{sliderControl(false)}</div>
    </div>
  )
}

export default Carousel
