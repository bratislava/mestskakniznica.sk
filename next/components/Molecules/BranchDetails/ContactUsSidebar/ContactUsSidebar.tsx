import { useTranslation } from 'next-i18next'
import React from 'react'

import { BranchEntityFragment } from '@/services/graphql'

import BranchContactUsInfo from './BranchContactUsInfo/BranchContactUsInfo'

type ContactUsSidebarProps = {
  branch: BranchEntityFragment
}

const ContactUsSidebar = ({ branch }: ContactUsSidebarProps) => {
  const { t } = useTranslation('common')

  if (!branch?.attributes?.subBranches?.data.length && !branch) {
    return null
  }

  return (
    <div className="sticky top-8 mb-10 h-fit border border-border-dark p-6">
      <h5 className="pb-6 text-h5">{t('branchDetails.contactUs')}</h5>
      <BranchContactUsInfo branch={branch} />
      {branch?.attributes?.subBranches?.data.map((subBranch) => (
        <BranchContactUsInfo branch={subBranch} />
      ))}
    </div>
  )
}

export default ContactUsSidebar
