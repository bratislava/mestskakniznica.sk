import BusinessSvg from '@assets/images/business.svg'
import MailSvg from '@assets/images/mail.svg'
import PhoneSvg from '@assets/images/phone.svg'
import Accordion from '@modules/common/Accordion'
import { BranchPlaceEntityFragment } from '@services/graphql'
import React from 'react'
import Button from '@modules/common/Button'

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
            className="mb-2 flex gap-4 hover:underline"
            href={`tel:${phone}`}
            startIcon={<PhoneSvg />}
          >
            {phone}
          </Button>
        )}
        {email && (
          <Button
            variant="unstyled"
            className="mb-2 flex gap-4 hover:underline"
            href={`mailto:${email}`}
            startIcon={<MailSvg className="min-h-[1.3em] min-w-[1.3em]" />}
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
