import { ComponentMenuSections, MenuSectionFragment } from '@bratislava/strapi-sdk-city-library'
import Link from 'next/link'

interface SubnavigationProps {
  menuSections: ComponentMenuSections[] | MenuSectionFragment[]
  onClose: () => void
}

function MobileSubnavigation({ menuSections, onClose }: SubnavigationProps) {
  return (
    <div className="absolute inset-x-0 top-0 z-40 m-auto h-screen overflow-y-scroll bg-white">
      <div className="cursor-default text-default">
        <div className="grid grid-cols-5 gap-4 border-b border-gray-900 pb-4">
          <div
            className="z-50 cursor-pointer pr-8 pt-5 pl-5"
            onClick={() => onClose()}
            aria-hidden="true"
          >
            {'<'}
          </div>
        </div>
        {menuSections.map((mobilMenu) => (
          <div
            key={`mobil-menu-${mobilMenu.sectionTitle}`}
            className="pb-4 pl-4 pt-4 text-default text-[20px]"
          >
            <Link href={`/${mobilMenu?.sectionPage?.slug}`} passHref>
              <a href={`/${mobilMenu?.sectionPage?.slug}`}>{mobilMenu.sectionTitle}</a>
            </Link>
            {mobilMenu.sectionLinks?.map((mobilSubMenu) => (
              <div
                key={mobilSubMenu?.sectionLinkPage?.slug}
                className="pt-3 text-[16px] text-gray-universal-70"
              >
                <Link href={`/${mobilSubMenu?.sectionLinkPage?.slug}`} passHref>
                  <a>{mobilSubMenu?.sectionLinkPage?.title}</a>
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
