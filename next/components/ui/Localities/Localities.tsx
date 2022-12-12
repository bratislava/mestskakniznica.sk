import 'mapbox-gl/dist/mapbox-gl.css'

import MarkerIcon from '@assets/images/marker.svg'
import {
  ComponentAddressAddress,
  ComponentLocalityPartsLocalitySection,
} from '@bratislava/strapi-sdk-city-library'
import cx from 'classnames'
import { maxBy, minBy } from 'lodash'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { useEffect, useRef, useState } from 'react'
import Mapbox, { MapRef, Marker } from 'react-map-gl'

export interface ILocality {
  localityTitle?: string
  localitySections?: ComponentLocalityPartsLocalitySection[]
  localityAddress: ComponentAddressAddress
  localitySlug?: string
  localityOpenFrom: string
  localityOpenTo: string
  localityLongitude?: number
  localityLatitude?: number
  localityOpeningHours?: ILocalityOpeningHours[]
  isMainLocality?: boolean
  isCurrentlyOpen?: boolean
  hideOpeningHours?: boolean
}

export interface ILocalityOpeningHours {
  localityOpenFrom?: string
  localityOpenTo?: string
  localityOpenDay?: number
  localityIsOpenThisDay?: boolean
  localityOpenDayText?: string
}

export interface LocalitiesProps {
  localities: ILocality[]
  mapboxAccessToken: string
  altDesign?: boolean // alternative design
}

export const Localities = ({
  localities,
  mapboxAccessToken,
  altDesign = false,
}: LocalitiesProps) => {
  const { t } = useTranslation('homepage')
  const [bounds, setBounds] = useState<[[number, number], [number, number]]>([
    [0, 0],
    [0, 0],
  ])
  const [isBrowser, setBrowser] = useState(false)

  const mapRef = useRef<MapRef>(null)

  useEffect(() => {
    setBounds([
      [
        minBy(localities, ({ localityLongitude }) => localityLongitude)?.localityLongitude ??
          17.107_748,
        minBy(localities, ({ localityLatitude }) => localityLatitude)?.localityLatitude ??
          48.148_598,
      ],
      [
        maxBy(localities, ({ localityLongitude }) => localityLongitude)?.localityLongitude ??
          17.107_748,
        maxBy(localities, ({ localityLatitude }) => localityLatitude)?.localityLatitude ??
          48.148_598,
      ],
    ] as [[number, number], [number, number]])
  }, [localities])

  useEffect(() => {
    setBrowser(!!typeof window)
  }, [])

  return localities.length > 0 ? (
    <section className="">
      <h2 className="py-12 text-center text-lg md:text-left">{t('localitiesTitle')}</h2>

      <div className={cx({ 'border-border-dark lg:border': !altDesign })}>
        <div className="mb-4 h-60 w-full text-black lg:mb-8">
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
                mapRef?.current?.getMap().fitBounds(bounds, {
                  padding: {
                    top: 54,
                    right: 24,
                    bottom: 24,
                    left: 24,
                  },
                  duration: 0,
                })
              }}
              cooperativeGestures
            >
              {localities
                .filter((locality) => locality.localityLatitude && locality.localityLongitude)
                .map(({ localityTitle, localityLatitude, localityLongitude }, index) => (
                  <Marker
                    key={index}
                    anchor="bottom"
                    longitude={localityLongitude}
                    latitude={localityLatitude}
                  >
                    <div className="group flex flex-col items-center">
                      <MarkerIcon
                        onClick={() => {
                          window.location.href = `https://www.google.com/maps/@${localityLatitude},${localityLongitude},16z`
                        }}
                        width={48}
                        height={48}
                      />
                      {localityTitle && (
                        <div className="bg-primary invisible absolute top-1/3 z-30 whitespace-nowrap rounded px-2 group-hover:visible">
                          {localityTitle}
                        </div>
                      )}
                    </div>
                  </Marker>
                ))}
            </Mapbox>
          )}
        </div>
        <div
          className={cx({
            '-mx-4 flex gap-4 overflow-x-auto px-4 pt-px lg:gap-0': !altDesign,
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
            ) => (
              <div
                className={cx({
                  'lg:border-l-0': index === 0 && !altDesign,
                  'relative w-70 flex-shrink-0 border border-border-dark lg:mb-8 lg:w-auto lg:flex-1 lg:border-r-0 lg:border-t-0 lg:border-b-0':
                    !altDesign,
                  'relative w-full border border-border-dark py-4': altDesign,
                })}
                key={index}
              >
                <Link href={localitySlug || ''} passHref>
                  <a href={localitySlug}>
                    <div className="flex h-full w-full flex-col justify-between gap-4 p-6 lg:py-0">
                      <div>
                        <div className="text-md2">{localityTitle}</div>
                        <div className="pt-8 text-sm">
                          {localitySections?.map((section) => (
                            <div key={section.localitySectionTitle} className="pt-1 text-text-body">
                              {section.localitySectionTitle}
                            </div>
                          ))}
                        </div>
                        {!hideOpeningHours && (
                          <>
                            <p className="pt-8 text-sm">{t('localityOpeningText')}</p>
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
            )
          )}
        </div>
      </div>
    </section>
  ) : null
}

export default Localities
