import 'mapbox-gl/dist/mapbox-gl.css'

import { useTranslation } from 'next-i18next'
import React, { useCallback, useEffect, useRef } from 'react'
import Mapbox, { MapRef, Marker } from 'react-map-gl'
import { useIsClient } from 'usehooks-ts'

import MarkerIcon from '@/assets/images/marker.svg'
import CardWrapper from '@/modules/cards-and-rows/CardWrapper'
import MLink from '@/modules/common/MLink'
import ShowMoreLink from '@/modules/common/ShowMoreLink'
import { BranchCardEntityFragment } from '@/services/graphql'
import cn from '@/utils/cn'
import { isDefined } from '@/utils/isDefined'
import { useNavikronos } from '@/utils/navikronos'

type MapSectionProps = {
  branches: BranchCardEntityFragment[]
  mapboxAccessToken: string
  title?: string | null | undefined
  altDesign?: boolean // alternative design
}

// Copied from https://github.com/bratislava/marianum/blob/master/next/components/sections/MapSection.tsx
// calculate bounding box for localities
const getBoundsForLocalities = (branches: BranchCardEntityFragment[]) => {
  const longitudes = branches.map((branch) => branch.attributes?.longitude).filter(isDefined) ?? []
  const latitudes = branches.map((branch) => branch.attributes?.latitude).filter(isDefined) ?? []

  return [
    [Math.min(...longitudes), Math.min(...latitudes)],
    [Math.max(...longitudes), Math.max(...latitudes)],
  ] as [[number, number], [number, number]]
}

const MapSection = ({ branches, mapboxAccessToken, title, altDesign = false }: MapSectionProps) => {
  const { t } = useTranslation()
  const { getPathForStrapiEntity } = useNavikronos()

  const isClient = useIsClient()

  const mapRef = useRef<MapRef>(null)
  const initialBounds = useRef(branches && getBoundsForLocalities(branches))

  const fitLocalities = useCallback(
    (duration = 0) => {
      try {
        // fitBounds fails when there is no branch, so we use try catch
        mapRef.current?.fitBounds(getBoundsForLocalities(branches), {
          padding: 48,
          offset: [0, 10],
          duration,
        })
      } catch {
        // When it fails, no one cares because there is no branch :)
      }
    },
    [branches],
  )

  useEffect(() => {
    fitLocalities(500)
  }, [fitLocalities, branches])

  return (
    <div>
      <h2
        className={cn('text-center text-h3 md:text-left', {
          'py-12': !altDesign,
          'py-6': altDesign,
        })}
      >
        {title || t('mapSection.localitiesTitle')}
      </h2>

      <div className={cn({ 'border-border-dark lg:border': !altDesign })}>
        <div className="mb-4 h-60 w-full text-black lg:mb-8">
          {isClient && (
            <Mapbox
              ref={mapRef}
              mapboxAccessToken={mapboxAccessToken}
              // eslint-disable-next-line react/style-prop-object,no-secrets/no-secrets
              mapStyle="mapbox://styles/bratislava01/ckzrbqd6300ps14p8gpyoq3wr"
              style={{
                height: '100%',
                width: '100%',
              }}
              initialViewState={{
                bounds: initialBounds.current,
                fitBoundsOptions: {
                  padding: 48,
                  offset: [0, 10],
                },
              }}
              cooperativeGestures
            >
              {branches
                .map((branch) => {
                  const { longitude, latitude, title: branchTitle } = branch.attributes ?? {}

                  if (!longitude || !latitude) {
                    return null
                  }

                  return (
                    <Marker
                      key={branch.id}
                      anchor="bottom"
                      longitude={longitude}
                      latitude={latitude}
                    >
                      <div className="group flex flex-col items-center">
                        <MarkerIcon width={48} height={48} />
                        {branchTitle ? (
                          <div className="invisible absolute top-1/3 z-30 whitespace-nowrap rounded bg-promo-peach px-2 group-hover:visible">
                            {branchTitle}
                          </div>
                        ) : null}
                      </div>
                    </Marker>
                  )
                })
                .filter(isDefined)}
            </Mapbox>
          )}
        </div>
        <div
          className={cn({
            '-mx-4 flex gap-4 overflow-x-auto px-4 pt-px lg:gap-0': !altDesign,
            'grid gap-4 md:grid-cols-2': altDesign,
          })}
        >
          {branches.map((branch, index) => {
            const { title: branchTitle, subBranches } = branch.attributes ?? {}
            const linkHref = getPathForStrapiEntity(branch) ?? '#'

            return (
              <CardWrapper
                key={branch.id}
                className={cn('relative ring-inset', {
                  'lg:border-l-0': index === 0 && !altDesign,
                  'w-70 flex-shrink-0 border border-border-dark lg:mb-6 lg:w-auto lg:flex-1 lg:border-b-0 lg:border-r-0 lg:border-t-0 lg:focus-within:border-transparent':
                    !altDesign,
                  'w-full border border-border-dark py-4': altDesign,
                })}
              >
                <div className="group/showMore flex size-full flex-col justify-between gap-8 p-6 lg:py-0">
                  <div>
                    <div className="text-h3">
                      <MLink href={linkHref} variant="basic" stretched>
                        {branchTitle}
                      </MLink>
                    </div>
                    <div className="mt-6 text-base">
                      {subBranches?.data.map((subBranch) => (
                        <div key={subBranch.id} className="text-foreground-body not-first:pt-1">
                          {subBranch.attributes?.title}
                        </div>
                      ))}
                    </div>
                    {/* {!hideOpeningHours && ( */}
                    {/*  <> */}
                    {/*    <p className="pt-8 text-base">{t('mapSection.localityOpeningText')}</p> */}
                    {/*    <p className="text-base"> */}
                    {/*      {localityOpenFrom} - {localityOpenTo} */}
                    {/*    </p> */}
                    {/*  </> */}
                    {/* )} */}
                  </div>
                  <ShowMoreLink href={linkHref} tabIndex={-1} parentGroup>
                    {t('mapSection.localityDetailText')}
                  </ShowMoreLink>
                </div>
              </CardWrapper>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default MapSection
