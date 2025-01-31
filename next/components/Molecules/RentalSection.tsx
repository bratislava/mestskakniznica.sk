import { RentalSectionFragment } from '@services/graphql'
import React from 'react'

import { FlatText } from '@/components/ui'
import BranchCard from '@/modules/cards-and-rows/BranchCard'
import { isDefined } from '@/utils/isDefined'

type RentalSectionProps = {
  section: RentalSectionFragment
}

const RentalSection = ({ section }: RentalSectionProps) => {
  return (
    <div>
      {section.title && <h2 className="pb-6 text-h2">{section.title}</h2>}
      {section.text && <FlatText content={section.text} />}
      {section.branches?.length ? (
        <div className="grid gap-x-5 gap-y-8 py-9 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {section.branches?.filter(isDefined).map(({ branch, page }) => {
            const { title, address, slug, listingImage } = branch?.data?.attributes ?? {}

            return (
              <BranchCard
                address={address || ''}
                image={listingImage?.data}
                title={title || ''}
                pageId={page?.data?.id}
                key={slug}
              />
            )
          })}
        </div>
      ) : null}
    </div>
  )
}

export default RentalSection
