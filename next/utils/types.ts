import {
  CategoryEntity,
  ComponentAddressAddress,
  ComponentGuestsGuest,
  ComponentLocalityPartsLocalitySection,
  EventLocalityEntity,
  EventTagEntity,
  EventTagRelationResponseCollection,
  Maybe,
  Menu,
  UploadFile,
} from '@bratislava/strapi-sdk-city-library'

export type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T

// with these props. the page component is never rendered so they can be excluded from expected FE props
// void included for 401 basicAuth response
export type NextRedirectServerSideProps =
  | {
      redirect: {
        destination: string
        permanent: boolean
      }
    }
  | { notFound: boolean }
  | void

// tends to work better then GetServerSidePropsResult - gives you inferred props only for when the page component actually renders
// use as follows: AsyncServerProps<typeof getServerSideProps>
// getServerSideProps needs to be declared as async - which it tends to be, add a sync version if you need it
export type AsyncServerProps<T extends (...args: any) => Promise<NextRedirectServerSideProps | { props: any }>> =
  Exclude<Awaited<ReturnType<T>>, NextRedirectServerSideProps>['props']

export interface newBookOpac {
  title: string
  imgSrc: string
  authors: string[]
}

export interface IEvent {
  dateFrom?: string
  dateTo?: string
  date_added?: string
  eventTitle?: string
  eventDescription?: string
  guests?: ComponentGuestsGuest[]
  eventTags?: Maybe<EventTagRelationResponseCollection>
  listingImage?: UploadFile
  eventCustomType: string
  eventType?: {
    id: string
    title: string
  }
  eventLocality?: Maybe<EventLocalityEntity>
  slug?: string
  id?: string
  price?: number
  eventCategory?: Maybe<CategoryEntity>
}
export interface IPremises {
  address?: string
  url?: string
  title?: string
  image?: Image
}

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

export interface Image {
  alternativeText?: string
  url: string
  width?: number
  height?: number
  name: string
}

export interface IMenus {
  menus: Menu[]
}
