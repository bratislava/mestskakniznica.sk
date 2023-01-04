import {
  ComponentMenuSections,
  Maybe,
  MenuSectionFragment,
} from '@bratislava/strapi-sdk-city-library'
import Link from 'next/link'

interface SubnavigationProps {
  menuSections: Maybe<ComponentMenuSections>[] | MenuSectionFragment[]
  onClose: () => void
}

const MobileSubnavigation = ({ menuSections, onClose }: SubnavigationProps) => {
  return (
    <div className="absolute inset-x-0 top-0 z-40 m-auto h-screen overflow-y-scroll bg-white">
      <div className="cursor-default text-h5">
        <div className="grid grid-cols-5 gap-4 border-b border-border-dark pb-4">
          <div
            className="z-50 cursor-pointer pr-8 pt-5 pl-5"
            onClick={() => onClose()}
            aria-hidden="true"
          >
            {'<'}
          </div>
        </div>
        {menuSections.map((mobilMenu, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index} className="py-4 pl-4 text-lg">
            {mobilMenu?.sectionPage?.data?.attributes?.slug && (
              <Link href={`/${mobilMenu?.sectionPage?.data?.attributes?.slug}`}>
                {mobilMenu?.sectionTitle}
              </Link>
            )}
            {mobilMenu?.sectionLinks?.map((mobilSubMenu) => (
              <div
                key={mobilSubMenu?.sectionLinkPage?.data?.attributes?.slug}
                className="pt-3 text-[16px] text-foreground-body"
              >
                {mobilSubMenu?.sectionLinkPage?.data?.attributes?.slug && (
                  <Link href={`/${mobilSubMenu?.sectionLinkPage?.data?.attributes?.slug}`}>
                    {mobilSubMenu?.sectionLinkPage?.data?.attributes?.title}
                  </Link>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default MobileSubnavigation
