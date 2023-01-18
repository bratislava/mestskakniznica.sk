import cx from 'classnames'
import React, { useRef } from 'react'

import SliderControl, { SliderVariant } from './SliderControl/SliderControl'

interface SectionPromosProps {
  listClassName?: string
  itemClassName?: string
  items: { element: React.ReactNode | null; key: string | undefined }[]
  shiftIndex?: number
  visibleItemsCount?: number
}

const Carousel = ({
  listClassName,
  itemClassName,
  items,
  shiftIndex = 1,
  visibleItemsCount = 3,
}: SectionPromosProps) => {
  const [currentItemIndex, setCurrentItemIndex] = React.useState(0)

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

  const sliderVariantHidden = (variant: SliderVariant) => {
    return (
      (variant === SliderVariant.LEFT && currentItemIndex === 0) ||
      (variant === SliderVariant.RIGHT && currentItemIndex >= items.length - visibleItemsCount)
    )
  }

  return (
    <div className="relative">
      <div className="hidden lg:block">
        {items.length >= visibleItemsCount && (
          <SliderControl
            variant={SliderVariant.LEFT}
            onPress={previousItem}
            hidden={sliderVariantHidden(SliderVariant.LEFT)}
          />
        )}
      </div>
      <ul
        className={cx(
          '-mx-4 flex snap-x snap-mandatory overflow-x-auto scrollbar-hide lg:mx-0',
          listClassName
        )}
        ref={scrollerRef}
      >
        {items?.map((item) => {
          return (
            <li
              key={item.key}
              className={cx(
                'flex-shrink-0 shrink-0 transform snap-center transition-all duration-200',
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
          <SliderControl
            variant={SliderVariant.RIGHT}
            onPress={nextItem}
            hidden={sliderVariantHidden(SliderVariant.RIGHT)}
          />
        )}
      </div>
    </div>
  )
}

export default Carousel
