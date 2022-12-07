import { ComponentLocalityPartsGalleryParts } from '@bratislava/strapi-sdk-city-library'
import { useTranslation } from 'next-i18next'
import React from 'react'

import GalleryModal from './GalleryModal'

export interface PageProps {
  gallery?: Array<ComponentLocalityPartsGalleryParts | null | undefined>
}
const GalleryBanner = ({ gallery }: PageProps) => {
  const [showModal, setShowModal] = React.useState(false)
  const closeModal = () => {
    setShowModal(false)
  }
  const { t } = useTranslation('homepage')

  return (
    <>
      <GalleryModal gallery={gallery || []} showModal={showModal} closeModal={closeModal} />
      {gallery && gallery.length > 0 && (
        <div className="flex flex-col items-center lg:flex-row">
          <div className="w-full lg:w-8/12">
            <img
              onClick={() => setShowModal(true)}
              className="h-auto w-full cursor-pointer object-cover lg:h-87"
              src={gallery[0]?.Photo?.data?.attributes?.url || ''}
              alt={gallery[0]?.Photo?.data?.attributes?.alternativeText || 'Gallery'}
              aria-hidden="true"
            />
          </div>
          <div className="flex h-full w-full flex-wrap lg:h-87 lg:w-4/12">
            <div className="w-1/2 lg:h-1/2">
              {gallery[1]?.Photo ? (
                <img
                  onClick={() => setShowModal(true)}
                  className="h-full w-full cursor-pointer object-cover py-2 pr-2 lg:pt-0 lg:pl-2 lg:pr-0"
                  src={gallery[1].Photo?.data?.attributes?.url}
                  alt={gallery[1].Photo?.data?.attributes?.alternativeText || 'Gallery'}
                  aria-hidden="true"
                />
              ) : (
                <div className="hidden h-full py-2 pr-2 lg:block lg:pt-0 lg:pl-2 lg:pr-0">
                  <div className="flex h-full items-center justify-center border-2 border-gray-900 text-center">
                    <div>
                      <p>{t('noImage')}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="w-1/2 lg:h-1/2">
              {gallery[2]?.Photo ? (
                <img
                  onClick={() => setShowModal(true)}
                  className="h-full w-full cursor-pointer object-cover py-2 lg:pt-0 lg:pl-2"
                  src={gallery[2].Photo?.data?.attributes?.url}
                  alt={gallery[2].Photo?.data?.attributes?.alternativeText || 'Gallery'}
                  aria-hidden="true"
                />
              ) : (
                <div className="hidden h-full py-2 lg:block lg:pt-0 lg:pl-2">
                  <div className="flex h-full items-center justify-center border-2 border-gray-900 text-center">
                    <div>
                      <p>{t('noImage')}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="w-1/2 lg:h-1/2">
              {gallery[3]?.Photo ? (
                <img
                  onClick={() => setShowModal(true)}
                  className="h-full w-full cursor-pointer object-cover pr-2 lg:pr-0 lg:pl-2"
                  src={gallery[3].Photo?.data?.attributes?.url}
                  alt={gallery[3].Photo?.data?.attributes?.alternativeText || 'Gallery'}
                  aria-hidden="true"
                />
              ) : (
                <div className="hidden h-full pr-2 lg:block lg:pr-0 lg:pl-2">
                  <div className="flex h-full items-center justify-center border-2 border-gray-900 text-center">
                    <div>
                      <p>{t('noImage')}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {gallery.length > 4 ? (
              <div className="w-1/2 lg:pl-2">
                <div
                  onClick={() => setShowModal(true)}
                  className="flex h-full cursor-pointer items-center justify-center border-2 border-gray-900 text-center"
                  aria-hidden="true"
                >
                  <div>{t('galleryMorePhotos')}</div>
                </div>
              </div>
            ) : (
              <div className="hidden w-1/2 lg:block lg:pl-2">
                <div className="flex h-full items-center justify-center border-2 border-gray-900 text-center">
                  <div>{t('noImage')}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default GalleryBanner
