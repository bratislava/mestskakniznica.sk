import { useTranslation } from 'next-i18next'
import React from 'react'

import PageCard from '@/modules/cards-and-rows/PageCard'
import { BranchEntityFragment } from '@/services/graphql'
import { isDefined } from '@/utils/isDefined'
import { useNavikronos } from '@/utils/navikronos'

type BranchDetailsServicesProps = {
  branch: BranchEntityFragment
}

const BranchDetailsServices = ({ branch }: BranchDetailsServicesProps) => {
  const { t } = useTranslation('common')
  const { getPathForStrapiEntity } = useNavikronos()

  if (!branch.attributes?.servicePages?.data.length) {
    return null
  }

  return (
    <div className="border-b border-border-dark py-10" id="services">
      <div className="text-[24px]">{t('branchDetails.services')}</div>
      <div className="grid flex-wrap gap-4 pt-5 sm:grid-cols-2">
        {branch.attributes.servicePages.data.filter(isDefined).map((service) => {
          if (!service.attributes) {
            return null
          }

          return (
            <PageCard
              key={service.id}
              title={service.attributes.title}
              href={getPathForStrapiEntity(service) ?? '#'}
              showMoreText={t('more')}
              className="h-[134px] pr-[24px]"
            />
          )
        })}
      </div>
    </div>
  )
}

export default BranchDetailsServices
