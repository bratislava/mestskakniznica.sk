import React from 'react'

import { MailIcon, PhoneIcon } from '@/assets/icons'
import Button from '@/modules/common/Button'
import { BranchPlaceEntityFragment } from '@/services/graphql'

type BranchContactUsInfoProps = {
  branch: BranchPlaceEntityFragment
}

const BranchContactUsInfo = ({ branch }: BranchContactUsInfoProps) => {
  return branch?.email || branch?.phone ? (
    <div className="flex flex-col border-t border-border-light py-6 last:pb-0" key={branch.documentId}>
      <div className="pb-4">{branch?.title}</div>
      <div className="flex flex-col gap-3">
        {branch?.phone && (
          <Button
            variant="unstyled"
            className="mb-2 flex gap-3 hover:underline"
            // remove all whitespaces from phone number

            href={`tel:${branch?.phone.replaceAll(/\s/g, '')}`}
            startIcon={<PhoneIcon className="shrink-0" />}
          >
            {branch?.phone}
          </Button>
        )}

        {branch?.email && (
          <Button
            variant="unstyled"
            className="mb-2 flex gap-3 hover:underline"
            href={`mailto:${branch?.email}`}
            startIcon={<MailIcon className="shrink-0" />}
          >
            {branch?.email}
          </Button>
        )}
      </div>
    </div>
  ) : null
}

export default BranchContactUsInfo
