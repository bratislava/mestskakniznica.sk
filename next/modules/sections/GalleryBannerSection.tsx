import React from 'react'

import ImageGallery from '@/modules/common/ImageGallery/ImageGallery'
import { GallerySectionFragment } from '@/services/graphql'
import { isDefined } from '@/utils/isDefined'

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
