import BusinessSvg from '@assets/images/business.svg'
import MailSvg from '@assets/images/mail.svg'
import PhoneSvg from '@assets/images/phone.svg'
import Accordion from '@modules/common/Accordion'
import { BranchPlaceEntityFragment } from '@services/graphql'
import React from 'react'

import BranchOpeningHours from './BranchOpeningHours'

type BranchContactUsOpeningHoursInfoProps = {
  branch: BranchPlaceEntityFragment
}

const BranchContactUsOpeningHoursInfo = ({ branch }: BranchContactUsOpeningHoursInfoProps) => {
  const { id } = branch ?? {}
  const { title, phone, email, openingHours } = branch.attributes ?? {}
  return phone || email || openingHours ? (
    <Accordion key={id} title={title} type="subbranch" iconLeft={<BusinessSvg />}>
      <div className="mb-3">
        {/* TODO replace by PhoneButton */}
        {phone && (
          <div className="mb-2 flex items-center">
            <span className="mr-4 mb-[1px] inline-flex">
              <PhoneSvg />
            </span>
            {/* eslint-disable-next-line @typescript-eslint/restrict-template-expressions */}
            <a href={`tel:${phone}`} className="hover:underline">
              {phone}
            </a>
          </div>
        )}
        {/* TODO replace by MailButton */}
        {email && (
          <div className="mb-2 flex items-center">
            <span className="mr-4 mb-[1px] inline-flex">
              <MailSvg />
            </span>
            {/* eslint-disable-next-line @typescript-eslint/restrict-template-expressions */}
            <a href={`mailto:${email}`} className="hover:underline">
              {email}
            </a>
          </div>
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
