import { ComponentLocalityPartsGalleryParts } from '@bratislava/strapi-sdk-city-library'
import { useTranslation } from 'next-i18next'
import React from 'react'

import GalleryModal from './GalleryModal'

export interface PageProps {
  gallery?: Array<ComponentLocalityPartsGalleryParts | null | undefined>
}
function GalleryBanner({ gallery }: PageProps) {
  const [showModal, setShowModal] = React.useState(false)
  const closeModal = () => {
    setShowModal(false)
  }
  const { t } = useTranslation('homepage')

  return (
    <>
      <GalleryModal gallery={gallery || []} showModal={showModal} closeModal={closeModal} />
      {gallery && gallery.length > 0 && (
        <div className="flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-8/12">
            <img
              onClick={() => setShowModal(true)}
              className="w-full h-auto lg:h-87 object-cover cursor-pointer"
              src={gallery[0]?.Photo?.url || ''}
              alt={gallery[0]?.Photo?.alternativeText || 'Gallery'}
              aria-hidden="true"
            />
          </div>
          <div className="w-full lg:w-4/12 flex flex-wrap h-full lg:h-87">
            <div className="w-1/2 lg:h-1/2">
              {gallery[1]?.Photo ? (
                <img
                  onClick={() => setShowModal(true)}
                  className="w-full h-full pr-2 pt-2 lg:pt-0 lg:pl-2 lg:pr-0 pb-2 object-cover cursor-pointer"
                  src={gallery[1].Photo.url}
                  alt={gallery[1].Photo?.alternativeText || 'Gallery'}
                  aria-hidden="true"
                />
              ) : (
                <div className="hidden lg:block h-full pr-2 pt-2 lg:pt-0 lg:pl-2 lg:pr-0 pb-2">
                  <div className="border-2 border-gray-900 h-full flex justify-center items-center text-center">
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
                  className="w-full h-full pb-2 pt-2 lg:pt-0 lg:pl-2 object-cover cursor-pointer"
                  src={gallery[2].Photo.url}
                  alt={gallery[2].Photo?.alternativeText || 'Gallery'}
                  aria-hidden="true"
                />
              ) : (
                <div className="hidden lg:block h-full pb-2 pt-2 lg:pt-0 lg:pl-2">
                  <div className="border-2 border-gray-900 h-full flex justify-center items-center text-center">
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
                  className="w-full h-full pr-2 lg:pr-0 lg:pl-2 object-cover cursor-pointer"
                  src={gallery[3].Photo.url}
                  alt={gallery[3].Photo?.alternativeText || 'Gallery'}
                  aria-hidden="true"
                />
              ) : (
                <div className="hidden lg:block pr-2 lg:pr-0 lg:pl-2 h-full">
                  <div className="border-2 border-gray-900 h-full flex justify-center items-center text-center">
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
                  className="border-2 border-gray-900 h-full flex justify-center items-center text-center cursor-pointer"
                  aria-hidden="true"
                >
                  <div>{t('galleryMorePhotos')}</div>
                </div>
              </div>
            ) : (
              <div className="w-1/2 lg:pl-2 hidden lg:block">
                <div className="border-2 border-gray-900 h-full flex justify-center items-center text-center">
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
