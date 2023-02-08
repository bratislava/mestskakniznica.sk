import { UploadFile } from '@services/graphql'
import { clouddebugger } from 'googleapis/build/src/apis/clouddebugger'
import Image from 'next/image'
import { ComponentProps } from 'react'

export type MImageImage = Pick<UploadFile, 'url' | 'alternativeText' | 'width' | 'height'>

type MImageProps = Omit<
  ComponentProps<typeof Image>,
  'src' | 'alt' | 'placeholder' | 'blurDataURL' | 'width' | 'height'
> & {
  image: MImageImage
  disableBlurPlaceholder?: boolean
}

// TODO: Placeholder doesn't respect objectFit when used with layout="fill".
const MImage = ({ image, ...rest }: MImageProps) => {
  console.log('rest.fill', rest.fill)
  console.log('image.width', image.width)
  return (
    <Image
      className="object-fill"
      fill={rest.fill}
      src={image.url}
      alt={image.alternativeText ?? ''}
      // Next shows Image with src "..." and "layout='fill'" has unused properties assigned. Please remove "width" and "height".
      // width={rest.fill ? undefined : image.width ?? undefined}
      // height={rest.fill ? undefined : image.height ?? undefined}
      {...rest}
    />
  )
}

export default MImage
