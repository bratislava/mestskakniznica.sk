import { UploadFile } from '@services/graphql'
import Image from 'next/image'
import { ComponentProps } from 'react'

export type MImageImage = Pick<UploadFile, 'url' | 'alternativeText' | 'width' | 'height'>

type MImageProps = Omit<
  ComponentProps<typeof Image>,
  'src' | 'alt' | 'placeholder' | 'blurDataURL' | 'width' | 'height'
> & {
  image: MImageImage
  label?: string
  disableBlurPlaceholder?: boolean
}

// TODO: Placeholder doesn't respect objectFit when used with layout="fill".
const MImage = ({ image, label, ...rest }: MImageProps) => (
  <div>
    <Image
      src={image.url}
      alt={image.alternativeText ?? ''}
      // Next shows Image with src "..." and "layout='fill'" has unused properties assigned. Please remove "width" and "height".
      width={rest.fill ? undefined : image.width ?? undefined}
      height={rest.fill ? undefined : image.height ?? undefined}
      {...rest}
    />
    {label && <div className="absolute bottom-2 right-2 md:hidden">{label}</div>}
  </div>
)

export default MImage
