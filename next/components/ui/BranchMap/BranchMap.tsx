import 'mapbox-gl/dist/mapbox-gl.css'

import { useEffect, useRef, useState } from 'react'
import Mapbox, { MapRef, Marker } from 'react-map-gl'

import MarkerIcon from '@/assets/images/marker.svg'

export interface BranchMapProps {
  branchName?: string | null
  branchLongitude?: number
  branchLatitude?: number
  mapboxAccessToken: string
}

export const BranchMap = ({
  branchName,
  branchLongitude,
  branchLatitude,
  mapboxAccessToken,
}: BranchMapProps) => {
  const [isBrowser, setBrowser] = useState(false)

  const mapRef = useRef<MapRef>(null)

  useEffect(() => {
    setBrowser(!!typeof window)
  }, [])

  return branchLongitude && branchLatitude ? (
    <div className="mb-4 size-full text-black lg:mb-8">
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
            mapRef.current?.getMap().jumpTo({
              center: [branchLongitude, branchLatitude],
            })
          }}
          cooperativeGestures
        >
          <Marker anchor="bottom" longitude={branchLongitude} latitude={branchLatitude}>
            <div className="group flex flex-col items-center">
              <MarkerIcon
                onClick={() => {
                  window.location.href = `https://www.google.com/maps/search/?api=1&query=${branchLatitude},${branchLongitude}`
                  // https: window.location.href = `https://www.google.com/maps/@${branchLatitude},${branchLongitude},16z`;
                }}
                width={48}
                height={48}
              />
              {branchName && (
                <div className="invisible absolute top-1/3 z-30 whitespace-nowrap rounded bg-promo-yellow px-2 group-hover:visible">
                  {branchName}
                </div>
              )}
            </div>
          </Marker>
        </Mapbox>
      )}
    </div>
  ) : null
}

export default BranchMap
