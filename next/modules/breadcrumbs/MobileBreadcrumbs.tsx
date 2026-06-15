import dropRight from 'lodash/dropRight'
import last from 'lodash/last'
import { useTranslation } from 'next-i18next/pages'
import { ReactNode } from 'react'

import { ChevronRightIcon, HomeIcon } from '@/assets/icons'
import BreadcrumbItem from '@/modules/breadcrumbs/BreadcrumbItem'
import { BreadcrumbsProps } from '@/modules/breadcrumbs/Breadcrumbs'
import Accordion from '@/modules/common/Accordion'

export const Ellipsis = () => <>…</>

const MobileBreadcrumbsAccordionButton = ({
  currentLabel,
  isNested,
}: {
  currentLabel?: string
  isNested: boolean
}) => {
  const accBtnFakeCrumbs: ReactNode[] = [
    <HomeIcon key="home-icon" />,
    <ChevronRightIcon key="chevron-right-icon" />,
    ...(isNested
      ? [<Ellipsis key="ellipsis" />, <ChevronRightIcon key="chevron-right-icon-2" />]
      : []),
    currentLabel,
  ]

  return (
    <div className="flex w-full grow items-center gap-x-1.5 overflow-hidden">
      {accBtnFakeCrumbs.map((crumb, index) => (
        // Works only if Accordion button has min-w-0
        // https://css-tricks.com/flexbox-truncated-text/#aa-the-solution-is-min-width-0-on-the-flex-child
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          className={index === accBtnFakeCrumbs.length - 1 ? 'truncate' : 'shrink-0'}
        >
          {crumb}
        </div>
      ))}
    </div>
  )
}

const MobileBreadcrumbs = ({ crumbs }: BreadcrumbsProps) => {
  const { t } = useTranslation()

  // Add homepage and safely remove current last item
  const mobileCrumbs = [{ title: t('common.homepage'), path: '/' }, ...dropRight(crumbs)]

  return (
    <nav className="text-sm">
      <Accordion
        type="breadcrumbs"
        title={
          <MobileBreadcrumbsAccordionButton
            currentLabel={last(crumbs)?.title}
            isNested={crumbs ? crumbs.length > 1 : false}
          />
        }
      >
        <ol className="flex flex-col">
          {mobileCrumbs?.map((crumb, index) => {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <BreadcrumbItem key={index} url={crumb.path} isMobile>
                {crumb.title}
              </BreadcrumbItem>
            )
          })}
        </ol>
      </Accordion>
    </nav>
  )
}

export default MobileBreadcrumbs
