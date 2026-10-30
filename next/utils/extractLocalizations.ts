import { Maybe } from '@/services/graphql'
import { hasAttributes } from '@/utils/isDefined'

type DeepMaybePartial<T> = Partial<{ [K in keyof T]: DeepMaybePartial<Maybe<T[K]>> }>

export const extractLocalizationsWithSlug = <T extends string>(
  type: T,
  entity: DeepMaybePartial<{
    attributes: {
      localizations: {
        data: {
          attributes: {
            locale: string
            slug: string
          }
        }[]
      }
    }
  }>,
) => {
  return (
    entity?.attributes?.localizations?.data
      ?.filter(hasAttributes)
      .filter((localePage) => localePage.attributes.locale && localePage.attributes.slug)
      .map((localePage) => ({
        type,
        locale: localePage.attributes.locale!,
        slug: localePage.attributes.slug!,
      })) ?? []
  )
}

export const extractPageLocalizations = (
  page: DeepMaybePartial<{
    attributes: {
      localizations: {
        data: {
          attributes: {
            locale: string
            newSlug: string
          }
        }[]
      }
    }
  }>,
) => {
  return (
    page?.attributes?.localizations?.data
      ?.filter(hasAttributes)
      .filter((localePage) => localePage.attributes.locale && localePage.attributes.newSlug)
      .map((localePage) => ({
        type: 'page' as const,
        locale: localePage.attributes.locale!,
        slug: localePage.attributes.newSlug!,
      })) ?? []
  )
}
