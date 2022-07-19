import 'swiper/css'
import 'swiper/css/navigation'

import { ComponentLocalityPartsGalleryParts } from '@bratislava/strapi-sdk-city-library'
import React from 'react'
import { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

interface PageProps {
  gallery: Array<ComponentLocalityPartsGalleryParts | null | undefined>
}

function GalleryCarousel({ gallery }: PageProps) {
  const prevRef = React.useRef(null)
  const nextRef = React.useRef(null)
  return (
    <div className="w-full max-w-6xl mx-auto bg-black">
      <Swiper navigation autoHeight modules={[Navigation]}>
        {gallery &&
          gallery.length > 0 &&
          gallery.map((galleryItem) => (
            <SwiperSlide key={galleryItem?.id} className="bg-black">
              <div className="relative">
                <img
                  src={galleryItem?.Photo?.data?.attributes?.url || ''}
                  className="w-full object-cover"
                  alt={galleryItem?.Photo?.data?.attributes?.alternativeText || `carousel-${galleryItem?.id}`}
                />
                <div className="absolute bottom-0 w-full text-center bg-gray-900 bg-opacity-50 text-white">
                  <p className="text-l py-2">{galleryItem?.Description} </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  )
}

export default GalleryCarousel
