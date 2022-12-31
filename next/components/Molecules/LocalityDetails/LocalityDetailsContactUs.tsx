import MailSvg from '@assets/images/mail.svg'
import PhoneSvg from '@assets/images/phone.svg'
import { ComponentSectionsLocalityDetails } from '@bratislava/strapi-sdk-city-library'
import { useTranslation } from 'next-i18next'
import React from 'react'

type LocalityDetailsContactUsProps = {
  localityDetails: ComponentSectionsLocalityDetails
}

const LocalityDetailsContactUs = ({ localityDetails }: LocalityDetailsContactUsProps) => {
  const { t } = useTranslation('common')

  return (
    <div className="sticky top-8 h-fit border border-border-dark p-6">
      <div className="pb-6">{t('contactUs')}</div>
      {localityDetails?.localitySections?.map((localityContact) => (
        <div className="flex flex-col border-t border-border-light py-3" key={localityContact?.id}>
          <span>{localityContact?.localitySectionTitle}</span>
          {/* TODO replace by PhoneButton */}
          <a
            href={`tel:${localityContact?.localitySectionPhone}`}
            className="flex items-center space-x-4 py-2"
          >
            <span>
              <PhoneSvg />
            </span>
            <span>{localityContact?.localitySectionPhone}</span>
          </a>
          {/* TODO replace by MailButton */}
          <a
            href={`mailto:${localityContact?.localitySectionEmail}`}
            className="flex items-center space-x-4 py-2"
          >
            <span>
              <MailSvg />
            </span>
            <span className="truncate">{localityContact?.localitySectionEmail}</span>
          </a>
        </div>
      ))}
    </div>
  )
}

export default LocalityDetailsContactUs
