import { BranchEntityFragment } from '@bratislava/strapi-sdk-city-library'
import { LocalityMap } from '@components/ui'
import { useTranslation } from 'next-i18next'

type LocalityDetailsWhereProps = {
  branch: BranchEntityFragment
}

const LocalityDetailsWhere = ({ branch }: LocalityDetailsWhereProps) => {
  const { t } = useTranslation('common')

  if (!branch?.attributes) {
    return null
  }

  const { title, latitude, longitude, address } = branch.attributes

  return (
    <div id="where" className="mt-10">
      <div className="pb-6 text-h3">{t('localityWhereToFind')}</div>
      <div className="flex grid-cols-2 flex-col gap-x-5 space-y-4 md:grid">
        <div className="h-64 w-full md:h-[415px]">
          <LocalityMap
            localityName={title}
            localityLatitude={latitude ?? undefined}
            localityLongitude={longitude ?? undefined}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_KEY || ''}
          />
        </div>
        <div>
          <div className="pb-4">{t('address')}</div>
          <div className="whitespace-pre-wrap text-base text-foreground-body">{address}</div>
        </div>
      </div>
    </div>
  )
}

export default LocalityDetailsWhere
