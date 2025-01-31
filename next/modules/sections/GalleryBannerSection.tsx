import React from 'react'

import { GallerySectionFragment } from '@/services/graphql'
import { isDefined } from '@/utils/isDefined'

import ImageGallery from '../common/ImageGallery/ImageGallery'

type GalleryBannerSectionProps = {
  section: GallerySectionFragment
}

const GalleryBannerSection = ({ section }: GalleryBannerSectionProps) => {
  return (
    <>
      {section && (
        <ImageGallery
          images={section.Gallery?.map((item) => item?.Photo?.data).filter(isDefined) ?? []}
          variant="below"
        />
      )}
    </>
  )
}

export default GalleryBannerSection
