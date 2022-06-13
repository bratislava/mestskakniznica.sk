import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import cx from 'classnames';
// import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import Mapbox, { MapRef, Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { ReactComponent as MarkerIcon } from '../../assets/images/marker.svg';
import { maxBy, minBy } from 'lodash';
import {
  ComponentAddressAddressInput,
  ComponentLocalityPartsLocalityOpeningHourInput,
} from '@bratislava/strapi-sdk-city-library';
import { useTranslation } from 'react-i18next';

export interface ILocality {
  localityTitle?: string;
  localitySections?: ComponentLocalityPartsLocalityOpeningHourInput[];
  localityAddress: ComponentAddressAddressInput;
  localitySlug?: string;
  localityOpenFrom: string;
  localityOpenTo: string;
  localityLongitude?: number;
  localityLatitude?: number;
  localityOpeningHours?: ILocalityOpeningHours[];
  isMainLocality?: boolean;
  isCurrentlyOpen?: boolean;
  hideOpeningHours?: boolean;
}

export interface ILocalityOpeningHours {
  localityOpenFrom?: string;
  localityOpenTo?: string;
  localityOpenDay?: number;
  localityIsOpenThisDay?: boolean;
  localityOpenDayText?: string;
}

export interface LocalitiesProps {
  localities: ILocality[];
  mapboxAccessToken: string | undefined | null;
  altDesign?: boolean; // alternative design
}

export function Localities({
  localities,
  mapboxAccessToken,
  altDesign = false,
}: LocalitiesProps) {
  const { t } = useTranslation('homepage');
  const [bounds, setBounds] =
    useState<[[number, number], [number, number]]>(null);
  const [isBrowser, setBrowser] = useState(false);

  const mapRef = useRef<MapRef>();

  useEffect(() => {
    setBounds([
      [
        minBy(localities, ({ localityLongitude }) => localityLongitude)
          ?.localityLongitude ?? 17.107748,
        minBy(localities, ({ localityLatitude }) => localityLatitude)
          ?.localityLatitude ?? 48.148598,
      ],
      [
        maxBy(localities, ({ localityLongitude }) => localityLongitude)
          ?.localityLongitude ?? 17.107748,
        maxBy(localities, ({ localityLatitude }) => localityLatitude)
          ?.localityLatitude ?? 48.148598,
      ],
    ] as [[number, number], [number, number]]);
  }, [localities]);

  useEffect(() => {
    setBrowser((process as any).browser);
  }, []);

  return localities.length ? (
    <section className="">
      <h2 className="text-lg text-center md:text-left py-12">
        {t('localitiesTitle')}
      </h2>

      <div className={cx({ 'lg:border border-gray-900': !altDesign })}>
        <div className="w-full h-60 mb-4 lg:mb-8 text-black">
          {isBrowser && (
            <Mapbox
              ref={mapRef}
              mapboxAccessToken={mapboxAccessToken}
              // eslint-disable-next-line react/style-prop-object
              mapStyle="mapbox://styles/bratislava01/ckzrbqd6300ps14p8gpyoq3wr"
              style={{
                height: '100%',
                width: '100%',
              }}
              onLoad={() => {
                mapRef.current.getMap().fitBounds(bounds, {
                  padding: {
                    top: 54,
                    right: 24,
                    bottom: 24,
                    left: 24,
                  },
                  duration: 0,
                });
              }}
              cooperativeGestures={true}
            >
              {localities
                .filter(
                  (locality) =>
                    locality.localityLatitude && locality.localityLongitude
                )
                .map(
                  (
                    { localityTitle, localityLatitude, localityLongitude },
                    index
                  ) => (
                    <Marker
                      key={index}
                      anchor="bottom"
                      longitude={localityLongitude}
                      latitude={localityLatitude}
                    >
                      <div className="group flex flex-col items-center">
                        <MarkerIcon
                          onClick={() => {
                            window.location.href = `https://www.google.com/maps/@${localityLatitude},${localityLongitude},16z`;
                          }}
                          width={48}
                          height={48}
                        />
                        {localityTitle && (
                          <div className="bg-primary rounded px-2 invisible group-hover:visible absolute z-30 top-1/3 whitespace-nowrap">
                            {localityTitle}
                          </div>
                        )}
                      </div>
                    </Marker>
                  )
                )}
            </Mapbox>
          )}
        </div>
        <div
          className={cx({
            '-mx-4 flex gap-4 lg:gap-0 overflow-x-auto px-4 pt-px': !altDesign,
            'grid gap-4 md:grid-cols-2': altDesign,
          })}
        >
          {localities.map(
            (
              {
                localityTitle,
                localityOpenFrom,
                localityOpenTo,
                localitySections,
                localitySlug,
                hideOpeningHours = true,
              },
              index
            ) => {
              return (
                <div
                  className={cx({
                    'lg:border-l-0': index === 0 && !altDesign,
                    'relative flex-shrink-0 w-70 lg:w-auto lg:flex-1 border border-gray-900 lg:border-r-0 lg:border-t-0 lg:border-b-0 lg:mb-8':
                      !altDesign,
                    'relative w-full border border-gray-900 py-4': altDesign,
                  })}
                  key={index}
                >
                  <Link href={localitySlug} passHref>
                    <a href={localitySlug}>
                      <div className="flex flex-col h-full gap-4 justify-between w-full p-6 lg:py-0">
                        <div>
                          <div className="text-md2">{localityTitle}</div>
                          <div className="pt-8 text-sm">
                            {localitySections?.map((section) => (
                              <div
                                key={section.localitySectionTitle}
                                className="pt-1 text-gray-universal-70"
                              >
                                {section.localitySectionTitle}
                              </div>
                            ))}
                          </div>
                          {!hideOpeningHours && (
                            <>
                              <p className="text-sm pt-8">
                                {t('localityOpeningText')}
                              </p>
                              <p className="text-sm">
                                {localityOpenFrom} - {localityOpenTo}
                              </p>
                            </>
                          )}
                        </div>
                        <div className="text-sm hover:underline">
                          <div className="relative uppercase">
                            {t('localityDetailText')} {'>'}
                          </div>
                        </div>
                      </div>
                    </a>
                  </Link>
                </div>
              );
            }
          )}
        </div>
      </div>
    </section>
  ) : null;
}

export default Localities;
