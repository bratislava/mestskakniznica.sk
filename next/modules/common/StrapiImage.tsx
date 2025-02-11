import Image, { StaticImageData } from 'next/image'
import { ComponentProps } from 'react'

import DefaultPlaceholder from '@/assets/images/list-item-thumbnail.jpeg'
import { UploadFile } from '@/services/graphql'

export type StrapiUploadImage = Pick<UploadFile, 'url' | 'alternativeText' | 'width' | 'height'>

type StrapiImageProps = Omit<
  ComponentProps<typeof Image>,
  'src' | 'alt' | 'placeholder' | 'blurDataURL' | 'width' | 'height'
> & {
  image: StrapiUploadImage
  alt?: string | null
  disableBlurPlaceholder?: boolean
}

export const getImagePlaceholder = (placeholder?: StaticImageData | undefined) => {
  return {
    url: placeholder ? placeholder.src : DefaultPlaceholder.src,
    width: placeholder ? placeholder.width : DefaultPlaceholder.width,
    height: placeholder ? placeholder.height : DefaultPlaceholder.height,
    alternativeText: '',
  }
}

/**
 * Based on OLO: https://github.com/bratislava/olo.sk/blob/master/next/src/components/lib/Image/StrapiImage.tsx
 */

const StrapiImage = ({ image, alt, ...rest }: StrapiImageProps) => (
  <Image
    src={image.url}
    alt={alt ?? image.alternativeText ?? ''}
    // Next shows Image with src "..." and "layout='fill'" has unused properties assigned. Please remove "width" and "height".
    width={rest.fill ? undefined : (image.width ?? undefined)}
    height={rest.fill ? undefined : (image.height ?? undefined)}
    // Images don’t respect objectFit when used with `layout=fill`. To handle this, we wrap StrapiImage in a div with defined sizes.
    {...rest}
  />
)

export default StrapiImage
