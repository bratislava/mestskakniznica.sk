import { GetServerSidePropsContext } from 'next'

import PageWrapper from '../../components/layouts/PageWrapper'
import FileDetailPage from '../../components/pages/fileDetailPage'
import { client } from '../../utils/gql'
import { ssrTranslations } from '../../utils/translations'
import { AsyncServerProps } from '../../utils/types'
import { arrayify } from '../../utils/utils'

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const locale = ctx.locale ?? 'sk'
  const slug = arrayify(ctx.query.slug)[0]

  if (!slug) return { notFound: true }

  const { basicDocumentBySlug } = await client.BasicDocumentBySlug({
    slug,
  })
  const { menus } = await client.Menus({
    locale,
  })
  const { footer } = await client.Footer({
    locale,
  })

  if (!basicDocumentBySlug) return { notFound: true }

  return {
    props: {
      slug,
      locale,
      menus,
      footer,
      basicDocument: basicDocumentBySlug,
      ...(await ssrTranslations(ctx, ['common', 'newsletter'])),
    },
  }
}

function Page({ basicDocument, locale, menus, footer, slug }: AsyncServerProps<typeof getServerSideProps>) {
  return (
    <PageWrapper locale={locale ?? 'sk'} slug={slug}>
      <FileDetailPage locale={locale} file={basicDocument} menus={menus} footer={footer} />
    </PageWrapper>
  )
}

export default Page
