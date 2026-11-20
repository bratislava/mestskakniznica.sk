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
