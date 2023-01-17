import MailSvg from '@assets/images/mail.svg'
import PhoneSvg from '@assets/images/phone.svg'
import { BranchEntityFragment } from '@services/graphql'
import { useTranslation } from 'next-i18next'
import React from 'react'

type LocalityDetailsContactUsProps = {
  branch: BranchEntityFragment
}

const LocalityDetailsContactUs = ({ branch }: LocalityDetailsContactUsProps) => {
  const { t } = useTranslation('common')

  if (!branch?.attributes?.subBranches?.data.length) {
    return null
  }

  return (
    <div className="sticky top-8 mb-10 h-fit border border-border-dark p-6">
      <h5 className="pb-6 text-h5">{t('contactUs')}</h5>
      {branch?.attributes?.subBranches?.data.map((subBranch) => (
        <div
          className="flex flex-col border-t border-border-light py-6 last:pb-0"
          key={subBranch.id}
        >
          <div className="pb-4">{subBranch.attributes?.title}</div>
          {/* TODO replace by PhoneButton */}
          <div className="flex flex-col gap-3">
            {subBranch.attributes?.phone && (
              <a
                href={`tel:${subBranch.attributes?.phone}`}
                className="flex items-center space-x-4 hover:underline"
              >
                {/* TODO: Resize icon and text to sm. */}
                <span>
                  <PhoneSvg />
                </span>
                <span>{subBranch.attributes?.phone}</span>
              </a>
            )}
            {/* TODO replace by MailButton */}
            {subBranch.attributes?.email && (
              <a
                href={`mailto:${subBranch.attributes?.email}`}
                className="flex items-center space-x-4 hover:underline"
              >
                {/* TODO: Resize icon and text to sm. */}
                <span>
                  <MailSvg />
                </span>
                <span className="truncate">{subBranch.attributes?.email}</span>
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default LocalityDetailsContactUs
