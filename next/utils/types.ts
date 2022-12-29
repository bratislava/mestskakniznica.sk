import {
  ComponentAddressAddress,
  ComponentLocalityPartsLocalitySection,
} from '@bratislava/strapi-sdk-city-library'

export interface ILocality {
  localityTitle?: string
  localitySections?: ComponentLocalityPartsLocalitySection[]
  localityAddress: ComponentAddressAddress
  localitySlug?: string
  localityOpenFrom: string
  localityOpenTo: string
  localityLatitude?: number
  localityLongitude?: number
  localityOpeningHours?: ILocalityOpeningHours[]
  isMainLocality?: boolean
  isCurrentlyOpen?: boolean
}

interface ILocalityOpeningHours {
  localityOpenFrom?: string
  localityOpenTo?: string
}
