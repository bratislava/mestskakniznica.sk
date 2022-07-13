import Check from '@assets/images/check-done.svg'
import RegisterToLibrary from '@assets/images/register-to-library.svg'
import { ComponentHomepageRegistrationInfo } from '@bratislava/strapi-sdk-city-library'
import { Button } from '@bratislava/ui-city-library'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import React from 'react'

interface RegistrationInfoProps {
  registrationInfoSection: ComponentHomepageRegistrationInfo
}

function RegistrationInfo({ registrationInfoSection }: RegistrationInfoProps) {
  const { t } = useTranslation('homepage')

  return (
    <section className="pb-12">
      <div className="w-full flex">
        <div className="w-full md:px-8 lg:px-16 pt-12 flex flex-col md:flex-row md:space-x-8">
          <div className="w-full max-w-sm mx-auto">
            <RegisterToLibrary />
          </div>
          <div className="w-full">
            <h2 className="text-center md:text-left text-lg">{registrationInfoSection?.title}</h2>
            <div className="pt-6 text-sm">{registrationInfoSection?.description}</div>

            <ul>
              {registrationInfoSection?.registrationBenefits?.map((benefit) => (
                <li className="pt-3 text-sm" key={benefit?.id}>
                  <Check className="transform scale-75 md:scale-100 inline-flex text-sm" /> {benefit?.benefit}
                </li>
              ))}
            </ul>

            <div className="pt-8 curson-pointer">
              <div className="bg-gray-900 w-full md:w-fit py-2 px-4 text-white text-center text-sm">
                <Link href={registrationInfoSection?.redirectTo?.data?.attributes?.slug ?? '#'}>
                  <a
                    href={registrationInfoSection?.redirectTo?.data?.attributes?.slug ?? '#'}
                    className="uppercase"
                  >
                    {t('registerToLibraryButton')}
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RegistrationInfo
