import { ArrowLeftIcon, ArrowRightIcon } from '@assets/icons'
import MImage from '@components/Atoms/MImage'
// import SliderControl from '@components/Molecules/Carousel/SliderControl/SliderControl'
import Modal, { ModalProps } from '@components/Molecules/Modal'
import Slider from '@components/Molecules/Slider'
import Button from '@modules/common/Button'
import { UploadImageEntityFragment } from '@services/graphql'
import { useTranslation } from 'next-i18next'
import { useEffect, useRef } from 'react'

export type ImageLightBoxProps = {
  images: UploadImageEntityFragment[]
  initialImageIndex: number
} & Omit<ModalProps, 'children'>

const ImageLightBox = (props: ImageLightBoxProps) => {
  const { images, initialImageIndex, ...rest } = props

  const { isOpen } = rest

  const { t } = useTranslation('common')

  const sliderRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (isOpen) {
      sliderRef.current?.focus()
    }
  }, [isOpen])

  return (
    // TODO is this pointer-events-none/auto necessary
    <Modal overlayClassName="w-full h-screen pointer-events-none" {...rest}>
      <Slider
        ref={sliderRef}
        description={t('imageLightBoxDescription')}
        allowKeyboardNavigation={images.length > 1}
        initialPage={initialImageIndex}
        pages={images
          .filter((image) => image.attributes)
          .map(({ id, attributes }) => (
            <div
              key={id}
              className="container pointer-events-none m-auto flex h-full w-full max-w-6xl flex-col items-center justify-center md:px-[88px]"
            >
              <MImage
                draggable="false"
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion,@typescript-eslint/no-unnecessary-type-assertion
                image={attributes!}
                className="pointer-events-auto h-auto max-h-[86vh] w-full select-none object-contain"
                sizes="100vw"
              />
              {attributes?.caption !== attributes?.name && attributes?.caption && (
                <div className="mt-4 bg-white px-2.5 py-0.5">{attributes?.caption}</div>
              )}
            </div>
          ))}
        pagination={({ goToPrevious, goToNext }) => (
          <div className="container pointer-events-none absolute bottom-0 z-20 flex w-full max-w-6xl justify-between p-6 md:bottom-auto">
            {images.length > 1 && (
              <>
                <Button
                  variant="primary"
                  className="pointer-events-auto text-white"
                  aria-label={t('previousImage')}
                  onPress={goToPrevious}
                >
                  <ArrowLeftIcon />
                </Button>
                <Button
                  variant="primary"
                  className="pointer-events-auto"
                  aria-label={t('nextImage')}
                  onPress={goToNext}
                >
                  <ArrowRightIcon />
                </Button>
              </>
            )}
          </div>
        )}
      />
    </Modal>
  )
}

export default ImageLightBox
