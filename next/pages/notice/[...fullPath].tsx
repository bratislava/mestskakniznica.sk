import NoticePage from '@components/pages/NoticePage'
import { GeneralQuery, NoticeEntityFragment } from '@services/graphql'
import { generalFetcher } from '@services/graphql/fetchers/general.fetcher'
import { client } from '@services/graphql/gql'
import { GeneralContextProvider } from '@utils/generalContext'
import { isDefined } from '@utils/isDefined'
import { shouldSkipStaticPaths } from '@utils/utils'
import last from 'lodash/last'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import DefaultPageLayout from '../../components/layouts/DefaultPageLayout'
import PageWrapper from '../../components/layouts/PageWrapper'

interface NoticePageProps {
  slug: string
  notice: NoticeEntityFragment
  general: GeneralQuery
}

const Page = ({ notice, slug, general }: NoticePageProps) => {
  const { i18n } = useTranslation('common')

  if (!notice) {
    return null
  }

  return (
    <GeneralContextProvider general={general}>
      <PageWrapper
        locale={i18n.language}
        slug={slug ?? ''}
        localizations={notice.attributes?.localizations?.data
          .filter(isDefined)
          .map((localization) => ({
            locale: localization.attributes?.locale,
            slug: localization.attributes?.slug,
          }))}
      >
        <DefaultPageLayout title={notice?.attributes?.title} Seo={notice?.attributes?.seo}>
          <NoticePage notice={notice} />
        </DefaultPageLayout>
      </PageWrapper>
    </GeneralContextProvider>
  )
}

export const getStaticPaths: GetStaticPaths = async ({ locales = ['sk', 'en'] }) => {
  let paths: { params: { fullPath: string[]; locale: string } }[] = []
  if (shouldSkipStaticPaths()) return { paths, fallback: 'blocking' }

  const pathArraysForLocales = await Promise.all(
    locales.map((locale) => client.NoticesStaticPaths({ locale }))
  )

  const notices = pathArraysForLocales
    .flatMap(({ notices: noticesInner }) => noticesInner?.data || [])
    .filter(isDefined)

  if (notices) {
    paths = notices
      .filter(isDefined)
      .filter((notice) => notice?.attributes?.slug)
      .map((notice) => ({
        params: {
          fullPath: `${
            notice.attributes?.locale === 'sk' ? '/zazite/aktuality/' : '/experience/news/'
          }${notice.attributes?.slug!}`
            .split('/')
            .slice(1),
          locale: notice.attributes?.locale || '',
        },
      }))
  }
  // eslint-disable-next-line no-console
  console.log(`GENERATED STATIC PATHS FOR ${paths.length} NOTICES`)

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps<NoticePageProps> = async (ctx) => {
  const locale = ctx.locale ?? 'sk'
  const slug = last(ctx?.params?.fullPath)

  if (!slug) return { notFound: true } as const

  // eslint-disable-next-line no-console
  console.log(`Revalidating ${locale} notice ${slug} on ${ctx?.params?.fullPath}`)

  const [{ notices }, general] = await Promise.all([
    client.NoticeBySlug({ slug, locale }),
    generalFetcher(locale),
  ])
  const notice = notices?.data[0] ?? null

  const translations = (await serverSideTranslations(locale, [
    'common',
    'forms',
    'newsletter',
  ])) as any

  if (!notice) return { notFound: true }

  return {
    props: {
      slug,
      notice,
      general,
      ...translations,
    },
    revalidate: 10,
  }
}

export default Page
