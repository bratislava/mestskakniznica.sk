import 'mapbox-gl/dist/mapbox-gl.css'

import MarkerIcon from '@assets/images/marker.svg'
import { useEffect, useRef, useState } from 'react'
import Mapbox, { MapRef, Marker } from 'react-map-gl'

export interface LocalityMapProps {
  localityName?: string
  localityLongitude?: number
  localityLatitude?: number
  mapboxAccessToken: string
}

export function LocalityMap({
  localityName,
  localityLongitude,
  localityLatitude,
  mapboxAccessToken,
}: LocalityMapProps) {
  const [isBrowser, setBrowser] = useState(false)

  const mapRef = useRef<MapRef | any>()

  useEffect(() => {
    setBrowser(!!typeof window)
  }, [])

  return localityLongitude && localityLatitude ? (
    <div className="text-black mb-4 h-full w-full lg:mb-8">
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
            mapRef.current.getMap().jumpTo({
              center: [localityLongitude, localityLatitude],
            })
          }}
          cooperativeGestures
        >
          <Marker anchor="bottom" longitude={localityLongitude} latitude={localityLatitude}>
            <div className="group flex flex-col items-center">
              <MarkerIcon
                onClick={() => {
                  window.location.href = `https://www.google.com/maps/search/?api=1&query=${localityLatitude},${localityLongitude}`
                  // https: window.location.href = `https://www.google.com/maps/@${localityLatitude},${localityLongitude},16z`;
                }}
                width={48}
                height={48}
              />
              {localityName && (
                <div className="invisible absolute top-1/3 z-30 whitespace-nowrap rounded bg-primary px-2 group-hover:visible">
                  {localityName}
                </div>
              )}
            </div>
          </Marker>
        </Mapbox>
      )}
    </div>
  ) : null
}

export default LocalityMap
