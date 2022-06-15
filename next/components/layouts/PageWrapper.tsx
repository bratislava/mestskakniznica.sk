import orderBy from 'lodash/orderBy'
import { useTranslation } from 'next-i18next'
import { createContext, useContext, useMemo } from 'react'

interface PageLocalization {
  locale: string | null | undefined
  slug: string | null | undefined
}

interface IPageWrapperContext {
  locale?: string
  localizations: PageLocalization[]
}

const PageWrapperContext = createContext<IPageWrapperContext>({
  localizations: [],
})

interface IProps {
  children?: React.ReactNode
  locale?: string | undefined | null
  localizations?: Partial<PageLocalization>[] | undefined | null
  slug?: string
}

function PageWrapper({ children, locale, localizations = [], slug }: IProps) {
  const [_, { language }] = useTranslation()

  const pageLocalizations: PageLocalization[] = useMemo(() => {
    const base: PageLocalization[] = []

    if (locale && slug) {
      base.push({ locale, slug: localePath(locale, slug) })
    }

    localizations?.forEach((l) => {
      if (!l.locale || !l.slug) return
      base.push({
        locale: l.locale,
        slug: localePath(l.locale, l.slug),
      })
    })

    return orderBy(base, 'locale')
  }, [localizations, locale, slug])

  return (
    <PageWrapperContext.Provider value={{ locale: locale ?? language, localizations: pageLocalizations }}>
      {children}
    </PageWrapperContext.Provider>
  )
}

export const usePageWrapperContext = () => useContext(PageWrapperContext)

// Slug should not have leading '/'
const localePath = (locale: string, slug: string) => {
  // Special case for slovak homepage, so it is not empty string
  if (locale === 'sk' && (slug === '' || slug === '/')) return '/'
  const localePrefix = locale === 'sk' ? '' : `${locale}/`
  return `/${localePrefix}${slug}`
}

export const otherLocale = (locale: string, localizations: PageLocalization[]): { locale: string; path: string } => {
  const targetLocale = locale === 'en' ? 'sk' : 'en'
  const targetLocalization = localizations.find((l) => l.locale === targetLocale)

  if (targetLocalization) {
    return { locale: targetLocale, path: targetLocalization.slug || '' }
  } 
    return { locale: targetLocale, path: localePath(targetLocale, '') }
  
}

export default PageWrapper
