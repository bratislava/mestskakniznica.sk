import { BranchPlaceEntityFragment } from '@services/graphql'
import { useTranslation } from 'next-i18next'
import React from 'react'

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
    <div className="pt-10" id="sections">
      <div className="text-[24px]">{t('sections')}</div>
      <div className="pt-5">
        <BranchContactUsOpeningHoursInfo branch={branch} />
        {branches &&
          branches.map((subBranch) => <BranchContactUsOpeningHoursInfo branch={subBranch} />)}
      </div>
    </div>
  )
}

export default ContactsAndOpeningHours
