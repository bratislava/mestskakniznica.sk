import { ChevronLeftIcon } from '@assets/icons'
import Button from '@modules/common/Button'
import MLink from '@modules/common/MLink'
import Modal from '@modules/common/Modal'
import MobileLatestEvents from '@modules/navigation/MobileLatestEvents'
import { MenuSection } from '@modules/navigation/NavMenu'
import React from 'react'
import { useWindowSize } from 'usehooks-ts'

interface SubnavigationProps {
  isOpen: boolean
  menuSections: MenuSection[]
  onClose: () => void
}

const MobileSubnavigation = ({ isOpen, menuSections, onClose }: SubnavigationProps) => {
  const { height } = useWindowSize()

  return (
    // h-screen is not used because of problem on mobile screens
    // https://chanind.github.io/javascript/2019/09/28/avoid-100vh-on-mobile-web.html
    // TODO replace by Modal component
    <Modal isOpen={isOpen} onClose={onClose} noAnimation overlayClassName="!w-full">
      <div className="!w-full overflow-y-scroll bg-white" style={{ height }}>
        <div className="pb-12">
          <div className="flex h-[61px] items-center justify-between border-b border-border-dark">
            {/* TODO add aria-label */}
            <Button variant="unstyled" className="p-4" onPress={onClose}>
              <ChevronLeftIcon />
            </Button>
          </div>
          {menuSections.map((section, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index} className="p-4">
              {/* class pb-[10px] with py-1.5 on MLink makes 16px gap */}
              <div className="pb-[10px] text-lg">{section.label}</div>

              <div className="flex flex-col">
                {section.items.map((sectionItem, itemIndex) => {
                  if (sectionItem?.label === 'latestEvents') {
                    // eslint-disable-next-line react/no-array-index-key
                    return <MobileLatestEvents key={itemIndex} />
                  }

                  return (
                    <MLink
                      // eslint-disable-next-line react/no-array-index-key
                      key={itemIndex}
                      href={sectionItem.url}
                      variant="basic"
                      className="py-1.5 text-base text-foreground-body"
                    >
                      {sectionItem.label}
                    </MLink>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  )
}

export default MobileSubnavigation
