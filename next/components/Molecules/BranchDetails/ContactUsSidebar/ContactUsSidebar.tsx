import { useTranslation } from 'next-i18next/pages'

import { BranchEntityFragment } from '@/services/graphql'
import { isDefined } from '@/utils/isDefined'

import BranchContactUsInfo from './BranchContactUsInfo/BranchContactUsInfo'

type ContactUsSidebarProps = {
  branch: BranchEntityFragment
}

const ContactUsSidebar = ({ branch }: ContactUsSidebarProps) => {
  const { t } = useTranslation()

  if (!branch?.subBranches.length && !branch) {
    return null
  }

  return (
    <div className="sticky top-8 mb-10 h-fit border border-border-dark p-6">
      <h5 className="pb-6 text-h5">{t('branchDetails.contactUs')}</h5>
      <BranchContactUsInfo branch={branch} />
      {branch?.subBranches.filter(isDefined).map((subBranch) => (
        <BranchContactUsInfo branch={subBranch} key={subBranch.documentId} />
      ))}
    </div>
  )
}

export default ContactUsSidebar
