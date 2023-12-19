import { UploadFile } from '@services/graphql'
import Image from 'next/image'
import { ComponentProps, useState } from 'react'

export type MImageImage = Pick<UploadFile, 'url' | 'alternativeText' | 'width' | 'height'>

type MImageProps = Omit<
  ComponentProps<typeof Image>,
  'src' | 'alt' | 'placeholder' | 'blurDataURL' | 'width' | 'height'
> & {
  image: MImageImage
  fallbackImage?: string
  fallbackAlt?: string
  disableBlurPlaceholder?: boolean
}

// TODO: Placeholder doesn't respect objectFit when used with layout="fill".
const MImage = ({ image, fallbackImage, fallbackAlt, ...rest }: MImageProps) => {
  const [imageSrc, setImageSrc] = useState(image?.url || '')

  return (
    <Image
      src={imageSrc}
      alt={image?.alternativeText || fallbackAlt || ''}
      // Next shows Image with src "..." and "layout='fill'" has unused properties assigned. Please remove "width" and "height".
      width={rest.fill ? undefined : image?.width ?? undefined}
      height={rest.fill ? undefined : image?.height ?? undefined}
      onError={() => {
        setImageSrc(fallbackImage || '')
      }}
      {...rest}
    />
  )
}

export default MImage
