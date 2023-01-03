import ChevronRightSvg from '@assets/images/chevron-right.svg'
import { BranchEntityFragment } from '@bratislava/strapi-sdk-city-library'
import { CallToAction } from '@components/ui'
import { isDefined } from '@utils/isDefined'
import { useTranslation } from 'next-i18next'
import React from 'react'

type LocalityDetailsServicesProps = {
  branch: BranchEntityFragment
}

const LocalityDetailsServices = ({ branch }: LocalityDetailsServicesProps) => {
  const { t } = useTranslation('common')

  if (!branch.attributes?.servicePages?.data.length) {
    return null
  }

  return (
    <div className="border-b border-border-dark py-10" id="services">
      <div className="text-[24px]">{t('services')}</div>
      <div className="grid flex-wrap gap-4 pt-5 sm:grid-cols-2">
        {branch.attributes.servicePages.data.filter(isDefined).map((service) => {
          if (!service.attributes) {
            return null
          }

          return (
            <CallToAction
              key={service.id}
              title={service.attributes.title}
              // TODO links should start with slash '/'
              href={`/${service.attributes.slug}`}
              bottomText={t('more')}
              className="h-[134px] pr-[24px]"
              hasIcon={false}
              uppercase={false}
              customIcon={
                <span className="ml-2 inline-flex">
                  <ChevronRightSvg />
                </span>
              }
            />
          )
        })}
      </div>
    </div>
  )
}

export default LocalityDetailsServices
