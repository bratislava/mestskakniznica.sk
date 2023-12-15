import MailSvg from '@assets/images/mail.svg'
import PhoneSvg from '@assets/images/phone.svg'
import { BranchPlaceEntityFragment } from '@services/graphql'
import React from 'react'
import Button from '@modules/common/Button'
type BranchContactUsInfoProps = {
  branch: BranchPlaceEntityFragment
}

const BranchContactUsInfo = ({ branch }: BranchContactUsInfoProps) => {
  return branch.attributes?.email || branch.attributes?.phone ? (
    <div className="flex flex-col border-t border-border-light py-6 last:pb-0" key={branch.id}>
      <div className="pb-4">{branch.attributes?.title}</div>
      <div className="flex flex-col gap-3">
        {branch.attributes?.phone && (
          <Button
            variant="unstyled"
            className="mb-2 flex gap-4 hover:underline"
            href={`tel:${branch.attributes?.phone}`}
            startIcon={<PhoneSvg />}
          >
            {branch.attributes?.phone}
          </Button>
        )}

        {branch.attributes?.email && (
          <Button
            variant="unstyled"
            className="mb-2 flex gap-4 hover:underline"
            href={`mailto:${branch.attributes?.email}`}
            startIcon={<MailSvg className="min-h-[1.2em] min-w-[1.2em]" />}
          >
            {branch.attributes?.email}
          </Button>
        )}
      </div>
    </div>
  ) : null
}

export default BranchContactUsInfo
