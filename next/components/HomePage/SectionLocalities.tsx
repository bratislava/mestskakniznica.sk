import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import React from 'react'

import Map from '../../assets/images/mapa.png'
import { ILocality } from '../../utils/types'

interface LocalitiesProps {
  localities: ILocality[]
}

const Localities = ({ localities }: LocalitiesProps) => {
  const { t } = useTranslation(['homepage', 'common'])

  return (
    <div className="m-auto w-1180">
      <h2 className="py-10 text-lg">{t('localitiesTitle')}</h2>

      <section className="border border-gray-900 pb-10">
        <img src={Map.src} alt="Mapa lokalit" height={Map.height} width={Map.width} />
        <div className="inline-flex h-[376px] w-1180">
          {localities &&
            localities?.map((locality) => (
              <div key={locality.localityTitle}>
                <div className="h-[376px] w-[294.6px] border-r border-gray-900 p-6">
                  <div className="pb-7 text-md2 hover:underline">{locality.localityTitle}</div>
                  {locality.localitySections?.map((section) => (
                    <div
                      key={section.localitySectionTitle}
                      className="pt-1 text-[16px] text-gray-universal-70"
                    >
                      {section.localitySectionTitle}
                    </div>
                  ))}
                  <p className="pt-8 text-sm text-gray-universal-70">{t('localityOpeningText')}</p>
                  <p className="text-[16px] text-gray-universal-70">
                    {locality.localityOpenFrom} - {locality.localityOpenTo}
                  </p>
                </div>
                <div className="border-r border-gray-900 pl-6 text-sm hover:underline">
                  <Link href={locality.localitySlug || ''} passHref>
                    <a className="uppercase" href={locality.localitySlug}>
                      <div className="relative">
                        {t('more', { ns: 'common' })} {'>'}
                      </div>
                    </a>
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  )
}
export default Localities
