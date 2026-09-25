import { useTranslation } from 'next-i18next/pages'

import PageCard from '@/modules/cards-and-rows/PageCard'
import { BranchEntityFragment } from '@/services/graphql'
import { isDefined } from '@/utils/isDefined'
import { useNavikronos } from '@/utils/navikronos'

type BranchDetailsServicesProps = {
  branch: BranchEntityFragment
}

const BranchDetailsServices = ({ branch }: BranchDetailsServicesProps) => {
  const { t } = useTranslation()
  const { getPathForStrapiEntity } = useNavikronos()

  if (!branch?.servicePages.length) {
    return null
  }

  return (
    <div className="border-b border-border-dark py-10" id="services">
      <div className="text-[24px]">{t('branchDetails.services')}</div>
      <div className="grid flex-wrap gap-4 pt-5 sm:grid-cols-2">
        {branch.servicePages.filter(isDefined).map((service) => {
          if (!service) {
            return null
          }

          return (
            <PageCard
              key={service.documentId}
              title={service.title}
              href={getPathForStrapiEntity(service) ?? '#'}
              showMoreText={t('common.more')}
              className="h-[134px] pr-[24px]"
            />
          )
        })}
      </div>
    </div>
  )
}

export default BranchDetailsServices
