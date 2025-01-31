import { useTranslation } from 'next-i18next'

import { BranchMap } from '@/components/ui'
import { BranchEntityFragment } from '@/services/graphql'

type BranchDetailsWhereProps = {
  branch: BranchEntityFragment
}

const BranchDetailsWhere = ({ branch }: BranchDetailsWhereProps) => {
  const { t } = useTranslation('common')

  if (!branch?.attributes) {
    return null
  }

  const { title, latitude, longitude, address, publicTransportInfo, barrierFreeInfo } =
    branch.attributes

  return (
    <div id="where" className="py-10">
      <div className="pb-6 text-h3">{t('branchDetails.localityWhereToFind')}</div>
      <div className="flex grid-cols-2 flex-col gap-x-5 space-y-4 md:grid">
        <div className="h-64 w-full md:h-[415px]">
          <BranchMap
            branchName={title}
            branchLatitude={latitude ?? undefined}
            branchLongitude={longitude ?? undefined}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_KEY || ''}
          />
        </div>
        <div className="flex flex-col gap-4 whitespace-pre-wrap text-base text-foreground-body">
          {address && (
            <>
              <h3 className="text-h5">{t('branchDetails.box.address')}</h3>
              <div>{address}</div>
            </>
          )}
          {publicTransportInfo && (
            <>
              <h3 className="text-h5">{t('branchDetails.box.publicTransport')}</h3>
              <div>{publicTransportInfo}</div>
            </>
          )}
          {barrierFreeInfo && (
            <>
              <h3 className="text-h5">{t('branchDetails.box.barrierFreeTitle')}</h3>
              <div>{barrierFreeInfo}</div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default BranchDetailsWhere
