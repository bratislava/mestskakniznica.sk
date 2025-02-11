import React from 'react'

import { MailIcon, PhoneIcon } from '@/assets/icons'
import BusinessSvg from '@/assets/images/business.svg'
import Accordion from '@/modules/common/Accordion'
import Button from '@/modules/common/Button'
import { BranchPlaceEntityFragment } from '@/services/graphql'

import BranchOpeningHours from './BranchOpeningHours'

type BranchContactUsOpeningHoursInfoProps = {
  branch: BranchPlaceEntityFragment
}

const BranchContactUsOpeningHoursInfo = ({ branch }: BranchContactUsOpeningHoursInfoProps) => {
  const { id } = branch ?? {}
  const { title, phone, email, openingHours } = branch.attributes ?? {}
  return phone || email || openingHours ? (
    <Accordion key={id} title={title} type="subbranch" iconLeft={<BusinessSvg />}>
      <div className="mb-3 p-1">
        {phone && (
          <Button
            variant="unstyled"
            className="mb-2 flex gap-3 hover:underline"
            href={`tel:${phone.replaceAll(/\s/g, '')}`}
            startIcon={<PhoneIcon className="shrink-0" />}
          >
            {phone}
          </Button>
        )}
        {email && (
          <Button
            variant="unstyled"
            className="mb-2 flex gap-3 hover:underline"
            href={`mailto:${email}`}
            startIcon={<MailIcon className="shrink-0" />}
          >
            {email}
          </Button>
        )}
      </div>

      {openingHours?.days && (
        <div className="py-2">
          <BranchOpeningHours days={openingHours?.days} />
        </div>
      )}
    </Accordion>
  ) : null
}

export default BranchContactUsOpeningHoursInfo
