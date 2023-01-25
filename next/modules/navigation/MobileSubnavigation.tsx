import { ChevronLeftIcon } from '@assets/icons'
import Button from '@modules/common/Button'
import MLink from '@modules/common/MLink'
import { MenuSection } from '@modules/navigation/NavMenu'
import { useWindowSize } from 'usehooks-ts'

interface SubnavigationProps {
  menuSections: MenuSection[]
  onClose: () => void
}

const MobileSubnavigation = ({ menuSections, onClose }: SubnavigationProps) => {
  const { height } = useWindowSize()

  return (
    // h-screen is not used because of problem on mobile screens
    // https://chanind.github.io/javascript/2019/09/28/avoid-100vh-on-mobile-web.html
    // TODO replace by Modal component
    <div
      className="absolute inset-x-0 top-0 z-40 m-auto overflow-y-scroll bg-white"
      style={{ height }}
    >
      <div className="pb-12">
        <div className="flex items-center justify-between border-b border-border-dark">
          {/* TODO add aria-label */}
          <Button variant="unstyled" className="p-4" onPress={onClose}>
            <ChevronLeftIcon />
          </Button>
        </div>
        {menuSections.map((section, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index} className="py-4 pl-4">
            {/* class pb-[10px] with py-1.5 on MLink makes 16px gap */}
            <div className="pb-[10px] text-lg">{section.label}</div>

            <div className="flex flex-col">
              {section.items.map((sectionItem, itemIndex) => (
                <MLink
                  // eslint-disable-next-line react/no-array-index-key
                  key={itemIndex}
                  href={sectionItem.url}
                  variant="basic"
                  className="py-1.5 text-base text-foreground-body"
                >
                  {sectionItem.label}
                </MLink>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MobileSubnavigation
