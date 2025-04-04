import { useTranslation } from 'next-i18next'
import { useEffect, useRef } from 'react'

import { ArrowLeftIcon, ArrowRightIcon } from '@/assets/icons'
import Button from '@/modules/common/Button'
import Slider from '@/modules/common/ImageGallery/Slider'
import StrapiImage from '@/modules/common/StrapiImage'
import Modal_deprecated, { ModalProps } from '@/modules/common/Modal_deprecated'
import { UploadImageEntityFragment } from '@/services/graphql'

export type ImageLightBoxProps = {
  images: UploadImageEntityFragment[]
  initialImageIndex: number
} & Omit<ModalProps, 'children'>

/**
 * Based on: https://github.com/bratislava/marianum.sk/blob/master/next/components/molecules/ImageLightBox.tsx
 */

const ImageLightBox = (props: ImageLightBoxProps) => {
  const { images, initialImageIndex, ...rest } = props

  const { isOpen } = rest

  const { t } = useTranslation()

  const sliderRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (isOpen) {
      sliderRef.current?.focus()
    }
  }, [isOpen])

  return (
    // TODO is this pointer-events-none/auto necessary
    <Modal_deprecated
      overlayClassName="w-full h-screen pointer-events-none"
      showCloseButton
      {...rest}
    >
      <Slider
        ref={sliderRef}
        // eslint-disable-next-line no-secrets/no-secrets
        description={t('imageGallery.imageLightBoxDescription')}
        allowKeyboardNavigation={images.length > 1}
        initialPage={initialImageIndex}
        pages={images
          .filter((image) => image.attributes)
          .map(({ id, attributes }) =>
            attributes ? (
              <div
                key={id}
                className="container pointer-events-none m-auto flex size-full max-w-6xl flex-col items-center justify-center md:px-[88px]"
              >
                <StrapiImage
                  image={attributes}
                  sizes="100vw"
                  draggable="false"
                  className="pointer-events-auto h-auto max-h-[86vh] w-full select-none object-contain"
                />
                {attributes.caption !== attributes.name && attributes.caption && (
                  <div className="mt-4 bg-white px-2.5 py-0.5">{attributes.caption}</div>
                )}
              </div>
            ) : null,
          )}
        pagination={({ goToPrevious, goToNext }) => (
          <div className="container pointer-events-none absolute bottom-0 z-20 flex w-full max-w-6xl justify-between p-6 md:bottom-auto">
            {images.length > 1 && (
              <>
                <Button
                  variant="primary"
                  className="pointer-events-auto text-white"
                  aria-label={t('imageGallery.previousImage')}
                  onPress={goToPrevious}
                >
                  <ArrowLeftIcon />
                </Button>
                <Button
                  variant="primary"
                  className="pointer-events-auto"
                  aria-label={t('imageGallery.nextImage')}
                  onPress={goToNext}
                >
                  <ArrowRightIcon />
                </Button>
              </>
            )}
          </div>
        )}
      />
    </Modal_deprecated>
  )
}

export default ImageLightBox
