import Check from '@assets/images/check-done.svg'
import RegisterToLibrary from '@assets/images/register-to-library.svg'
import { ComponentHomepageRegistrationInfo } from '@bratislava/strapi-sdk-city-library'
import Button from '@modules/common/Button'
import { useTranslation } from 'next-i18next'
import React from 'react'

interface RegistrationInfoProps {
  registrationInfoSection: ComponentHomepageRegistrationInfo
}

const RegistrationInfo = ({ registrationInfoSection }: RegistrationInfoProps) => {
  const { t } = useTranslation('homepage')

  return (
    <section className="pb-12">
      <div className="flex w-full">
        <div className="flex w-full flex-col pt-12 md:flex-row md:space-x-8 md:px-8 lg:px-16">
          <div className="mx-auto w-full max-w-sm">
            <RegisterToLibrary />
          </div>
          <div className="w-full">
            <h2 className="text-center text-h3 md:text-left">{registrationInfoSection?.title}</h2>
            <div className="pt-6 text-base">{registrationInfoSection?.description}</div>

            <ul>
              {registrationInfoSection?.registrationBenefits?.map((benefit) => (
                <li className="pt-3 text-base" key={benefit?.id}>
                  <Check className="inline-flex scale-75 text-base md:scale-100" />{' '}
                  {benefit?.benefit}
                </li>
              ))}
            </ul>

            <div className="pt-8">
              <Button href={registrationInfoSection?.redirectTo?.data?.attributes?.slug ?? ''}>
                {t('registerToLibraryButton')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RegistrationInfo
