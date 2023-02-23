import MailSvg from '@assets/images/mail.svg'
import PhoneSvg from '@assets/images/phone.svg'
import { BranchPlaceEntityFragment } from '@services/graphql'
import React from 'react'

type BranchContactUsInfoProps = {
  branch: BranchPlaceEntityFragment
}

const BranchContactUsInfo = ({ branch }: BranchContactUsInfoProps) => {
  return branch.attributes?.email || branch.attributes?.phone ? (
    <div className="flex flex-col border-t border-border-light py-6 last:pb-0" key={branch.id}>
      <div className="pb-4">{branch.attributes?.title}</div>
      {/* TODO replace by PhoneButton */}
      <div className="flex flex-col gap-3">
        {branch.attributes?.phone && (
          <a
            href={`tel:${branch.attributes?.phone}`}
            className="flex items-center space-x-4 hover:underline"
          >
            {/* TODO: Resize icon and text to sm. */}
            <span>
              <PhoneSvg />
            </span>
            <span>{branch.attributes?.phone}</span>
          </a>
        )}
        {/* TODO replace by MailButton */}
        {branch.attributes?.email && (
          <a
            href={`mailto:${branch.attributes?.email}`}
            className="flex items-center space-x-4 hover:underline"
          >
            {/* TODO: Resize icon and text to sm. */}
            <span>
              <MailSvg />
            </span>
            <span className="truncate">{branch.attributes?.email}</span>
          </a>
        )}
      </div>
    </div>
  ) : null
}

export default BranchContactUsInfo
