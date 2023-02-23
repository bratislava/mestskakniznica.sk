import BranchOpeningHours from '@components/Molecules/BranchDetails/ContactUsOpeningHours/BranchOpeningHours'
import { OpeningHoursSectionFragment } from '@services/graphql'
import { isDefined } from '@utils/isDefined'
import React from 'react'

const OpeningHoursSection = ({ title, branchList }: Omit<OpeningHoursSectionFragment, 'id'>) => {
  return (
    <div className="">
      {title && <h2 className="text-h3">{title}</h2>}
      {branchList?.data.filter(isDefined).map((branch) => {
        return (
          <div className="border-t border-border-dark py-6 first:pt-0 first-of-type:border-none lg:py-8">
            <h3 className="text-h4">{branch.attributes?.title}</h3>
            <div className="mt-4">
              <BranchOpeningHours days={branch.attributes?.openingHours?.days ?? []} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default OpeningHoursSection
