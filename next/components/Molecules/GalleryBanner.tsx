import { UploadImageEntityFragment } from '@services/graphql'
import React from 'react'

import ImageGallery from './ImageGallery'

export interface PageProps {
  gallery?: UploadImageEntityFragment[]
}

const GalleryBanner = ({ gallery }: PageProps) => {
  return <>{gallery && <ImageGallery images={gallery} variant="below" />}</>
}

export default GalleryBanner
