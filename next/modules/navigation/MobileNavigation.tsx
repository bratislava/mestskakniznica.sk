import { useTranslation } from 'next-i18next'

import { CloseIcon } from '@/assets/icons'
import Button from '@/modules/common/Button'
import MLink from '@/modules/common/MLink'
import Modal from '@/modules/common/Modal'
import MobileNavigationItem from '@/modules/navigation/MobileNavigationItem'
import { MenuItem } from '@/modules/navigation/NavMenu'
import { useGeneralContext } from '@/utils/generalContext'
import { useNavikronos } from '@/utils/navikronos'
import { useGetOtherLocale } from '@/utils/useGetOtherLocale'

interface MobileNavigationProps {
  isOpen: boolean
  onClose: () => void
  menus: MenuItem[]
}

export const MobileNavigation = ({ isOpen, onClose, menus }: MobileNavigationProps) => {
  const { t } = useTranslation()
  const { getPathForEntity } = useNavikronos()
  const { general } = useGeneralContext()
  const otherLocale = useGetOtherLocale()

  const moreLinks = [
    {
      label: t('navigation.openingHours'),
      url:
        getPathForEntity({
          type: 'page',
          id: general?.data?.attributes?.openingHoursPage?.data?.id,
        }) ?? '',
    },
    {
      label: t('navigation.onlineCatalog'),
      url: 'https://opac.mestskakniznica.sk/opac',
      target: '_blank',
    },
  ]

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      noAnimation
      // overlayClassName="!w-full fixed inset-x-0 top-0 z-30 m-auto h-screen border-border-dark bg-white"
    >
      <div className="fixed inset-x-0 top-0 z-30 m-auto h-screen border-border-dark bg-white">
        <div className="flex h-[61px] items-center justify-between border-b border-border-dark">
          <MLink href={otherLocale.path} locale={otherLocale.locale} className="p-4 text-h3">
            {otherLocale.locale.toUpperCase()}
          </MLink>

          {/* This div should match in size with burger menu button div */}
          <div className="flex w-[61px] items-center justify-center">
            <Button
              variant="unstyled"
              className="p-4"
              aria-label={t('navigation.aria.closeMobileNavMenu')}
              onPress={onClose}
            >
              <CloseIcon />
            </Button>
          </div>
        </div>

        {menus.map((menu, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <MobileNavigationItem menu={menu} key={index} />
        ))}

        {moreLinks.length > 0 ? (
          <div className="mt-8 flex flex-col px-4 text-h5 leading-[1.2]">
            {moreLinks.map((link, index) => (
              <MLink
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                href={link.url}
                target={link.target}
                className="border-b border-border-dark py-4"
              >
                {link.label}
              </MLink>
            ))}
          </div>
        ) : null}
      </div>
    </Modal>
  )
}
