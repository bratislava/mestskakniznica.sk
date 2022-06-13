import React from 'react';
import Map from '../../assets/images/mapa.png';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { ILocality } from '../../utils/types';

interface LocalitiesProps {
  localities: ILocality[];
}

const Localities = ({ localities }: LocalitiesProps) => {
  const { t } = useTranslation(['homepage', 'common']);

  return (
    <div className="m-auto w-1180">
      <h2 className="text-lg pt-10 pb-10">{t('localitiesTitle')}</h2>

      <section className="pb-10 border border-gray-900">
        <img
          src={Map.src}
          alt="Mapa lokalit"
          height={Map.height}
          width={Map.width}
        />
        <div className="inline-flex w-1180 h-[376px]">
          {localities &&
            localities?.map((locality) => (
              <div key={locality.localityTitle}>
                <div className="w-[294.6px] h-[376px] p-6 border-r border-gray-900">
                  <div className="text-md2 hover:underline pb-7">
                    {locality.localityTitle}
                  </div>
                  {locality.localitySections?.map((section) => (
                    <div
                      key={section.localitySectionTitle}
                      className="pt-1 text-[16px] text-gray-universal-70"
                    >
                      {section.localitySectionTitle}
                    </div>
                  ))}
                  <p className="text-sm pt-8 text-gray-universal-70">
                    {t('localityOpeningText')}
                  </p>
                  <p className="text-[16px] text-gray-universal-70">
                    {locality.localityOpenFrom} - {locality.localityOpenTo}
                  </p>
                </div>
                <div className="text-sm hover:underline pl-6 border-r border-gray-900">
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
  );
};
export default Localities;
