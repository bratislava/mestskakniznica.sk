import { hasAttributes } from '@utils/isDefined'
import { Maybe } from '@services/graphql'

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
  }>
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

export const extractLocalizationsWithId = <T extends string>(
  type: T,
  entity: DeepMaybePartial<{
    attributes: {
      localizations: {
        data: {
          id: string
          attributes: {
            locale: string
          }
        }[]
      }
    }
  }>
) => {
  return (
    entity?.attributes?.localizations?.data
      ?.filter(hasAttributes)
      .filter((localePage) => localePage.attributes.locale && localePage.id)
      .map((localePage) => ({
        type,
        locale: localePage.attributes.locale!,
        id: localePage.id!,
      })) ?? []
  )
}
