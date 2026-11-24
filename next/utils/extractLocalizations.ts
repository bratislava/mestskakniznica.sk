import { Maybe } from '@/services/graphql'

type LocalizationWithSlug = {
  locale?: Maybe<string>
  slug?: Maybe<string>
}

export const extractLocalizationsWithSlug = <T extends string>(
  type: T,
  entity: Maybe<{ localizations?: Maybe<Maybe<LocalizationWithSlug>[]> }> | undefined,
) => {
  return (
    entity?.localizations?.flatMap((localization) =>
      localization?.locale && localization.slug
        ? [{ type, locale: localization.locale, slug: localization.slug }]
        : [],
    ) ?? []
  )
}
