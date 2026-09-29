import { Maybe } from '@/services/graphql'
import { isDefined } from '@/utils/isDefined'

type DeepMaybePartial<T> = Partial<{ [K in keyof T]: DeepMaybePartial<Maybe<T[K]>> }>

export const extractLocalizationsWithSlug = <T extends string>(
  type: T,
  entity: DeepMaybePartial<{
    localizations: {
      locale: string
      slug: string
    }[]
  }>,
) => {
  return (
    entity?.localizations
      ?.filter(isDefined)
      .filter((localePage) => localePage.locale && localePage.slug)
      .map((localePage) => ({
        type,
        locale: localePage.locale!,
        slug: localePage.slug!,
      })) ?? []
  )
}

export const extractLocalizationsWithDocumentId = <T extends string>(
  type: T,
  entity: DeepMaybePartial<{
    localizations: {
      documentId: string
      locale: string
    }[]
  }>,
) => {
  return (
    entity?.localizations
      ?.filter(isDefined)
      .filter((localePage) => localePage.locale && localePage.documentId)
      .map((localePage) => ({
        type,
        locale: localePage.locale!,
        // Navikronos identifies entry routes by `id`, which in Strapi 5 holds the `documentId`.
        id: localePage.documentId!,
      })) ?? []
  )
}
