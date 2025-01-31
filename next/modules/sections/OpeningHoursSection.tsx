import { OpeningHoursSectionFragment } from '@services/graphql'
import React from 'react'

import BranchOpeningHours from '@/components/Molecules/BranchDetails/ContactUsOpeningHours/BranchOpeningHours'
import OpeningHoursChangeAlert from '@/components/Molecules/OpeningHoursChangeAlert'
import { isDefined } from '@/utils/isDefined'

const OpeningHoursSection = ({ title, branchList }: Omit<OpeningHoursSectionFragment, 'id'>) => {
  const filteredBranches = branchList?.data.filter(isDefined) ?? []

  return (
    <div className="flex flex-col gap-8">
      {title && <h2 className="text-h3">{title}</h2>}
      <OpeningHoursChangeAlert />
      {filteredBranches.length > 0 ? (
        <div className="flex flex-col gap-6 lg:gap-8">
          {filteredBranches.map((branch, index) => {
            return (
              <>
                {index > 0 && <div className="border-t border-border-dark" aria-hidden />}
                <div className="flex flex-col gap-4">
                  <h3 className="text-h4">{branch.attributes?.title}</h3>
                  <BranchOpeningHours days={branch.attributes?.openingHours?.days ?? []} />
                </div>
              </>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}

export default OpeningHoursSection
