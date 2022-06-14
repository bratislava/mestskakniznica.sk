import React from 'react'
import Modal from 'react-modal'
import Close from '@assets/images/hamburger-close.svg'
import GalleryCarousel from './GalleryCarousel'
import { ComponentLocalityPartsGalleryParts } from '@bratislava/strapi-sdk-city-library'

const CUSTOM_STYLES = {
  content: {
    zIndex: '100',
    background: 'none',
    border: 'none',
    borderRadius: '0',
    padding: '0',
  },
}

export interface PageProps {
  showModal: boolean
  closeModal: () => void
  gallery: Array<ComponentLocalityPartsGalleryParts | null | undefined>
}

const GalleryModal = ({ showModal, closeModal, gallery }: PageProps) => {
  return (
    <Modal isOpen={showModal} onRequestClose={closeModal} style={CUSTOM_STYLES}>
      <div className="absolute top-4 right-4 flex w-full justify-end mb-[10px] cursor-pointer ">
        <Close onClick={closeModal} />
      </div>
      <div className="w-full h-full flex items-center">
        <GalleryCarousel gallery={gallery} />
      </div>
    </Modal>
  )
}

export default GalleryModal
