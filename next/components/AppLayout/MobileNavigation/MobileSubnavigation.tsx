import { ComponentMenuSections, Maybe, MenuSectionFragment } from '@bratislava/strapi-sdk-city-library'
import Link from 'next/link'
import { useEffect } from 'react'

interface SubnavigationProps {
  menuSections: Maybe<ComponentMenuSections>[] | MenuSectionFragment[]
  onClose: () => void
}

function MobileSubnavigation({ menuSections, onClose }: SubnavigationProps) {
  return (
    <div className="m-auto inset-x-0 top-0 absolute bg-white z-40 h-screen overflow-y-scroll">
      <div className="text-default cursor-default">
        <div className="grid grid-cols-5 gap-4 border-b border-gray-900 pb-4">
          <div className="z-50 pr-8 pt-5 cursor-pointer pl-5" onClick={() => onClose()} aria-hidden="true">
            {'<'}
          </div>
        </div>
        {menuSections.map((mobilMenu) => (
            <div key={`mobil-menu-${mobilMenu?.sectionTitle}`} className="text-default pb-4 pl-4 pt-4 text-[20px]">
              <Link href={`/${mobilMenu?.sectionPage?.data?.attributes?.slug}`} passHref>
                <a href={`/${mobilMenu?.sectionPage?.data?.attributes?.slug}`}>{mobilMenu?.sectionTitle}</a>
              </Link>
              {mobilMenu?.sectionLinks?.map((mobilSubMenu) => (
                  <div key={mobilSubMenu?.sectionLinkPage?.data?.attributes?.slug} className="text-gray-universal-70 pt-3 text-[16px]">
                    <Link href={`/${mobilSubMenu?.sectionLinkPage?.data?.attributes?.slug}`} passHref>
                      <a>{mobilSubMenu?.sectionLinkPage?.data?.attributes?.title}</a>
                    </Link>
                  </div>
                ))}
            </div>
          ))}
      </div>
    </div>
  )
}

export default MobileSubnavigation
