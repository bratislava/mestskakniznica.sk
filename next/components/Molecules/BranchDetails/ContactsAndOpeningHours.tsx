import { useTranslation } from 'next-i18next'
import React from 'react'

import OpeningHoursChangeAlert from '@/components/Molecules/OpeningHoursChangeAlert'
import { BranchPlaceEntityFragment } from '@/services/graphql'

import BranchContactUsOpeningHoursInfo from './ContactUsOpeningHours/BranchContactUsOpeningHoursInfo'

type ContactsAndOpeningHoursProps = {
  branch: BranchPlaceEntityFragment
  branches?: BranchPlaceEntityFragment[]
}

const ContactsAndOpeningHours = ({ branch, branches }: ContactsAndOpeningHoursProps) => {
  const { t } = useTranslation('common')

  if (!branches?.length && !branch) {
    return null
  }

  return (
    <div className="flex flex-col gap-5 pt-10" id="sections">
      <div className="text-[24px]">{t('branchDetails.sections')}</div>
      <OpeningHoursChangeAlert />
      <div>
        <BranchContactUsOpeningHoursInfo branch={branch} />
        {branches &&
          branches.map((subBranch) => <BranchContactUsOpeningHoursInfo branch={subBranch} />)}
      </div>
    </div>
  )
}

export default ContactsAndOpeningHours
