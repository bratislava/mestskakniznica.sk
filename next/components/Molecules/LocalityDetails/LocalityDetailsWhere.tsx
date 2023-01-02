import { ComponentSectionsLocalityDetails } from '@bratislava/strapi-sdk-city-library'
import { LocalityMap } from '@components/ui'
import { useTranslation } from 'next-i18next'
import React, { useMemo } from 'react'

type LocalityDetailsWhereProps = {
  localityDetails: ComponentSectionsLocalityDetails
}

const LocalityDetailsWhere = ({ localityDetails }: LocalityDetailsWhereProps) => {
  const { t } = useTranslation('common')

  const mainSection = useMemo(
    () => localityDetails?.localitySections?.find((section) => section?.isMainSection),
    [localityDetails?.localitySections]
  )

  return (
    <div id="where" className="mb-4">
      <div className="pb-6 text-h3">{t('localityWhereToFind')}</div>
      <div className="flex grid-cols-2 flex-col gap-x-5 space-y-4 md:grid">
        <div className="h-64 w-full md:h-[415px]">
          <LocalityMap
            localityName={localityDetails.localityTitle}
            localityLatitude={localityDetails.localityLatitude || undefined}
            localityLongitude={localityDetails.localityLongitude || undefined}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_KEY || ''}
          />
        </div>
        {mainSection && (
          <div>
            <div className="pb-4">{t('address')}</div>
            <div className="text-base text-foreground-body">
              {localityDetails.localityAddress?.title &&
                localityDetails.localityAddress.title.split(', ').map((part) => (
                  <div key={part}>
                    {part}
                    <br />
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default LocalityDetailsWhere
