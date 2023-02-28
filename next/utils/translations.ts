import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import cfg from '../next.config'

interface IcachedSsrTranslations {
  [key: string]: any
}

const cachedSsrTranslations: IcachedSsrTranslations = {
  en: {},
  sk: {},
}

// cache more subsets using this if needed
const preCachedNamespaces = [
  ['common', 'forms', 'newsletter', 'homepage'],
  ['common', 'forms', 'newsletter'],
  ['common', 'newsletter'],
]

export const ssrTranslations = async (
  ctx: { locale?: string } | undefined,
  namespaces?: string[]
) => {
  const locale = ctx?.locale ?? 'sk'
  const namespaceString = (namespaces || []).join('-')
  const cachedValue = cachedSsrTranslations[locale][namespaceString]
  // TODO don't do this in development
  if (cachedValue) {
    // eslint-disable-next-line no-console
    console.log(`Loading translations under cache key: ${namespaceString}`)
    return cachedValue
  }
  const { i18n, localePath, reloadOnPrerender } = cfg(null, {
    defaultConfig: {},
  })
  const result = await serverSideTranslations(locale, namespaces, {
    i18n,
    localePath,
    reloadOnPrerender,
  })
  cachedSsrTranslations[locale][namespaceString] = result
  return result
}

// warm-up the translations cache
;(async () => {
  // eslint-disable-next-line no-console
  console.log('Warming up SSR translation cache')

  // TODO fix eslint
  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for (const locale in cachedSsrTranslations) {
    // eslint-disable-next-line no-await-in-loop
    await Promise.all(
      preCachedNamespaces.map((arr) => {
        // eslint-disable-next-line no-console
        console.log('Caching translations:', arr)
        return ssrTranslations({ locale }, arr)
      })
    )
  }
})().catch((error) => {
  // eslint-disable-next-line no-console
  console.log('Error caching translations - will fall back')
  // eslint-disable-next-line no-console
  console.log(error)
})
