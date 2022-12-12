import { AsyncServerProps } from '@utils/types'
import { isProductionDeployment } from '@utils/utils'
import { GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'


const Styleguide = ({ page }: AsyncServerProps<typeof getServerSideProps>) => {
  /**
   * Always create new component for adding showcase in StyleGuide
   * Path to StyleGuide showcase components should be ./next/components/styleguide/showcases
   * */
  return (
    <>
      <h1 className="text-h1">Heading 1</h1>
      <h2 className="text-h2">Heading 2</h2>
      <h3 className="text-h3">Heading 3</h3>
      <h4 className="text-h4">Heading 4</h4>
      <h5 className="text-h5">Heading 5</h5>
      <h6 className="text-h6">Heading 6</h6>
      <div className="text-xs">Text xs</div>
      <div className="text-sm">Text sm</div>
      <div className="text-base">Text base</div>
      <div className="text-lg">Text lg</div>
    </>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  if (isProductionDeployment()) return { notFound: true }

  const locale = ctx.locale ?? 'sk'

  return {
    props: {
      page: {
        locale: ctx.locale,
      },
      ...(await serverSideTranslations(locale)),
    },
  }
}

export default Styleguide
