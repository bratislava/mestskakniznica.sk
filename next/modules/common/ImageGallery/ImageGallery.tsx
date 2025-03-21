/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */

import { useTranslation } from 'next-i18next'
import { useCallback, useMemo, useState } from 'react'
import { useResizeDetector } from 'react-resize-detector'
import { useOverlayTriggerState } from 'react-stately'

import StrapiImage from '@/modules/common/StrapiImage'
import { UploadImageEntityFragment } from '@/services/graphql'
import cn from '@/utils/cn'
import { onEnterOrSpaceKeyDown } from '@/utils/onEnterOrSpaceKeyDown'

import ImageLightBox from './ImageLightBox'

export type ImageGalleryProps = {
  images: UploadImageEntityFragment[]
  variant?: 'below' | 'aside'
}

/**
 * Based on Marianum: https://github.com/bratislava/marianum.sk/blob/master/next/components/molecules/ImageGallery.tsx
 */

const ImageGallery = ({ images = [], variant = 'below' }: ImageGalleryProps) => {
  const { t } = useTranslation()

  const firstImage = useMemo(() => {
    return images[0] ?? undefined
  }, [images])

  const { ref: containerRef, width: containerWidth } = useResizeDetector()

  // number of columns (when 'below' layout is set) || 3 (when 'aside' layout is set)
  const thumbnailCount = useMemo(() => {
    if (variant === 'aside') {
      // variant 'aside' large
      return (containerWidth ?? 0) >= 560
        ? 3
        : // variant 'aside'small
          0
    }
    // variant 'below' large
    return (containerWidth ?? 0) > 1000
      ? 7
      : // variant 'below' middle
        (containerWidth ?? 0) > 800
        ? 5
        : // variant 'below' small
          3
  }, [containerWidth, variant])

  // number of not displayed images
  const moreImagesCount = useMemo(() => {
    return Math.max(images.length - 1 - thumbnailCount, 0)
  }, [images.length, thumbnailCount])

  const smallImages = useMemo(() => {
    return images.slice(1, thumbnailCount + 1)
  }, [images, thumbnailCount])

  const overlayState = useOverlayTriggerState({ defaultOpen: false })
  const [initialImageIndex, setInitialImageIndex] = useState(0)

  const openAtImageIndex = useCallback(
    (index: number) => {
      setInitialImageIndex(index)
      overlayState.open()
    },
    [overlayState],
  )

  return (
    <>
      <div className="relative flex w-full flex-col">
        <div
          ref={containerRef}
          role="button"
          tabIndex={0}
          aria-label={t('imageGallery.openImageGallery')}
          onKeyUp={onEnterOrSpaceKeyDown(() => openAtImageIndex(0))}
          className={cn('outline-primary base-focus-ring cursor-default', {
            'flex flex-col': variant === 'below',
            'grid grid-cols-[minmax(0,1fr)_auto]': variant === 'aside',
          })}
        >
          {/* first image */}
          {firstImage && (
            <div
              onClick={() => openAtImageIndex(0)}
              className={cn('relative w-full cursor-pointer', {
                // large 'below' layout
                'h-[500px]': thumbnailCount > 6 && variant === 'below',
                // small & middle 'below' layout
                'pt-[53%]': thumbnailCount <= 6 && variant === 'below',
                // large 'aside' layout
                'h-[360px]': thumbnailCount !== 0 && variant === 'aside',
                // small 'aside' layout
                'pt-[54%]': thumbnailCount === 0 && variant === 'aside',
              })}
            >
              {firstImage.attributes ? (
                <div>
                  <div className="absolute top-0 size-full shrink-0">
                    <StrapiImage image={firstImage.attributes} fill className="object-cover" />
                  </div>
                  <div className="absolute bottom-2 right-2 rounded bg-button-dark px-2 py-1 text-white md:hidden">
                    {`1/${images.length}`}
                  </div>
                </div>
              ) : null}
            </div>
          )}

          {/* row images */}
          {variant === 'below' && smallImages.length > 0 && (
            <div
              className="mt-2 grid gap-2"
              style={{ gridTemplateColumns: `repeat(${thumbnailCount + 1}, 1fr)` }}
            >
              {smallImages
                .filter((image) => image.attributes)
                .map((image, index) =>
                  image?.attributes ? (
                    <div
                      key={image.id}
                      onClick={() => openAtImageIndex(index + 1)}
                      className="relative size-full cursor-pointer pt-[100%]"
                    >
                      <div className="absolute top-0 size-full shrink-0">
                        <StrapiImage image={image.attributes} fill className="object-cover" />
                      </div>
                    </div>
                  ) : null,
                )}

              {/* more images button */}
              {moreImagesCount > 0 && (
                <div
                  onClick={() => openAtImageIndex(0)}
                  className="relative w-full cursor-pointer border-2 pt-[100%]"
                >
                  <div className="absolute top-0 flex size-full items-center justify-center bg-white p-2 text-center">
                    {t('imageGallery.morePhotos', { count: moreImagesCount })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* aside images */}
          {variant === 'aside' && smallImages.length > 0 && (
            <div
              className={cn('ml-4 hidden grid-flow-col grid-rows-2 gap-4', {
                'grid-cols-2 md:grid': images.length > 3,
                'md:grid': images.length > 1 && images.length <= 3,
                hidden: images.length === 1,
              })}
            >
              {smallImages
                .filter((image) => image.attributes)
                .map((image, index) =>
                  image?.attributes ? (
                    <div
                      key={image.id}
                      onClick={() => openAtImageIndex(index + 1)}
                      className="relative w-[168px] cursor-pointer pt-[168px]"
                    >
                      <div className="absolute top-0 size-full shrink-0">
                        <StrapiImage image={image.attributes} fill className="object-cover" />
                      </div>
                    </div>
                  ) : null,
                )}

              {/* more images button */}
              {moreImagesCount > 0 && (
                <div
                  onClick={() => openAtImageIndex(0)}
                  className="relative w-[168px] cursor-pointer border-2 pt-41.5"
                >
                  <div className="absolute top-0 flex size-full items-center justify-center bg-white p-8 text-center">
                    {t('imageGallery.morePhotos', { count: moreImagesCount })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <ImageLightBox
        onClose={() => overlayState.close()}
        isOpen={overlayState.isOpen}
        images={images}
        initialImageIndex={initialImageIndex}
        isDismissable
      />
    </>
  )
}

export default ImageGallery
