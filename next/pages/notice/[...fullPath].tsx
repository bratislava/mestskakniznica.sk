import { FooterEntity, MenuEntity, NoticeEntityFragment } from '@bratislava/strapi-sdk-city-library'
import NoticePage from '@components/pages/NoticePage'
import { client } from '@utils/gql'
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
  menus: MenuEntity[]
  footer: FooterEntity
}

const Page = ({ notice, slug, menus, footer }: NoticePageProps) => {
  const { i18n } = useTranslation('common')

  if (!menus || !notice) {
    return null
  }

  return (
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
      <DefaultPageLayout
        title={notice?.attributes?.title}
        menus={menus}
        footer={footer}
        Seo={notice?.attributes?.seo}
      >
        <NoticePage notice={notice} />
      </DefaultPageLayout>
    </PageWrapper>
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

  const { notices } = await client.NoticeBySlug({ slug, locale })
  const notice = notices?.data[0] ?? null
  const { menus } = await client.Menus({ locale })
  const { footer } = await client.Footer({ locale })
  const translations = (await serverSideTranslations(locale, [
    'common',
    'forms',
    'newsletter',
  ])) as any

  if (!notice && !menus) return { notFound: true }

  return {
    props: {
      slug,
      menus: menus?.data ?? [],
      footer: footer?.data,
      notice,
      ...translations,
    },
    revalidate: 10,
  }
}

export default Page
