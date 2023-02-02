/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */

import MImage from '@components/Atoms/MImage'
import { UploadImageEntityFragment } from '@services/graphql'
import { onEnterOrSpaceKeyDown } from '@utils/onEnterOrSpaceKeyDown'
import cx from 'classnames'
import { useTranslation } from 'next-i18next'
import { useCallback, useMemo, useState } from 'react'
import { useResizeDetector } from 'react-resize-detector'
import { useOverlayTriggerState } from 'react-stately'

import ImageLightBox from './ImageLightBox'

export type ImageGalleryProps = {
  images: UploadImageEntityFragment[]
  variant?: 'below' | 'aside'
}

const ImageGallery = ({ images = [], variant = 'below' }: ImageGalleryProps) => {
  const { t } = useTranslation('common')

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
    return Math.max(images.length - thumbnailCount, 0)
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
    [overlayState]
  )

  return (
    <>
      <div className="relative flex w-full flex-col">
        <div
          ref={containerRef}
          role="button"
          tabIndex={0}
          aria-label={t('openImageGallery')}
          onKeyUp={onEnterOrSpaceKeyDown(() => openAtImageIndex(0))}
          className={cx('outline-primary cursor-default outline-offset-2 focus:outline-4', {
            'flex flex-col ': variant === 'below',
            'grid grid-cols-[minmax(0,1fr)_auto]': variant === 'aside',
          })}
        >
          {/* first image */}
          {firstImage && (
            <div
              onClick={() => openAtImageIndex(0)}
              className={cx('relative w-full cursor-pointer', {
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
              {firstImage.attributes && (
                <MImage
                  image={firstImage.attributes}
                  fill
                  className="absolute top-0 object-cover"
                />
              )}
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
                .map((image, index) => (
                  <div
                    onClick={() => openAtImageIndex(index + 1)}
                    key={image.id}
                    className="relative h-[100%] w-full cursor-pointer"
                  >
                    <MImage
                      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                      image={image.attributes!}
                      fill
                      className="absolute top-0 object-cover"
                    />
                  </div>
                ))}

              {/* more images button */}
              {moreImagesCount > 0 && (
                <div
                  onClick={() => openAtImageIndex(0)}
                  className="relative w-full cursor-pointer border-2 pt-[100%]"
                >
                  <div className="absolute top-0 flex h-full w-full items-center justify-center bg-white p-2 text-center">
                    {t('galleryMorePhotos', { count: moreImagesCount })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* aside images */}
          {variant === 'aside' && smallImages.length > 0 && (
            <div
              className={cx('ml-6 hidden grid-flow-col grid-rows-2 gap-6', {
                'grid-cols-2 md:grid': images.length > 3,
                'md:grid': images.length > 1 && images.length <= 3,
                hidden: images.length === 1,
              })}
            >
              {smallImages
                .filter((image) => image.attributes)
                .map((image, index) => (
                  <div
                    onClick={() => openAtImageIndex(index + 1)}
                    key={image.id}
                    className="relative w-[168px] cursor-pointer pt-[168px]"
                  >
                    <MImage
                      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                      image={image.attributes!}
                      fill
                      className="absolute top-0 object-cover"
                    />
                  </div>
                ))}

              {/* more images button */}
              {moreImagesCount > 0 && (
                <div
                  onClick={() => openAtImageIndex(0)}
                  className="relative w-[168px] cursor-pointer pt-[166px]"
                >
                  <div className="absolute top-0 flex h-full w-full items-center justify-center bg-white p-8 text-center">
                    {t('galleryMorePhotos')}
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
