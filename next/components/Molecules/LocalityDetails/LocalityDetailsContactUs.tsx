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
      <h5 className="pb-6 text-h5">{t('contactUs')}</h5>
      {localityDetails?.localitySections?.map((localityContact) => (
        <div
          className="flex flex-col border-t border-border-light py-6 last:pb-0"
          key={localityContact?.id}
        >
          <div className="pb-4">{localityContact?.localitySectionTitle}</div>
          {/* TODO replace by PhoneButton */}
          <div className="flex flex-col gap-3">
            <a
              href={`tel:${localityContact?.localitySectionPhone}`}
              className="flex items-center space-x-4 hover:underline"
            >
              {/* TODO: Resize icon and text to sm. */}
              <span>
                <PhoneSvg />
              </span>
              <span>{localityContact?.localitySectionPhone}</span>
            </a>
            {/* TODO replace by MailButton */}
            <a
              href={`mailto:${localityContact?.localitySectionEmail}`}
              className="flex items-center space-x-4 hover:underline"
            >
              {/* TODO: Resize icon and text to sm. */}
              <span>
                <MailSvg />
              </span>
              <span className="truncate">{localityContact?.localitySectionEmail}</span>
            </a>
          </div>
        </div>
      ))}
    </div>
  )
}

export default LocalityDetailsContactUs
