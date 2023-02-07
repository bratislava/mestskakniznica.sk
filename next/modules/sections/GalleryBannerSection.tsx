import { UploadImageEntityFragment } from '@services/graphql'
import React from 'react'

import ImageGallery from '../common/ImageGallery/ImageGallery'

export interface PageProps {
  gallery?: UploadImageEntityFragment[]
}

const GalleryBannerSection = ({ gallery }: PageProps) => {
  return <>{gallery && <ImageGallery images={gallery} variant="below" />}</>
}

export default GalleryBannerSection
