import ChevronRightSvg from '@assets/images/chevron-right.svg'
import { ComponentSectionsLocalityDetails } from '@bratislava/strapi-sdk-city-library'
import { CallToAction } from '@components/ui'
import { useTranslation } from 'next-i18next'
import React from 'react'

type LocalityDetailsServicesProps = {
  localityDetails: ComponentSectionsLocalityDetails
}

const LocalityDetailsServices = ({ localityDetails }: LocalityDetailsServicesProps) => {
  const { t } = useTranslation('common')

  return (localityDetails.localityServices ?? []).length > 0 ? (
    <div className="border-b border-border-dark py-10" id="services">
      <div className="text-[24px]">{t('services')}</div>
      <div className="grid flex-wrap gap-4 pt-5 sm:grid-cols-2">
        {localityDetails.localityServices?.map((service) => (
          <CallToAction
            title={service?.page?.data?.attributes?.title ?? ''}
            href={service?.page?.data?.attributes?.slug ?? ''}
            bottomText={t('more')}
            className="flex h-[180px] pr-[24px]"
            hasIcon={false}
            uppercase={false}
            customIcon={
              <span className="ml-2 inline-flex">
                <ChevronRightSvg />
              </span>
            }
            key={service?.page?.data?.id ?? ''}
          />
        ))}
      </div>
    </div>
  ) : null
}

export default LocalityDetailsServices
