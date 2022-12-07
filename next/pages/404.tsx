import ClearCircle from '@assets/images/clear-circle.svg'
import SearchIcon from '@assets/images/search-404.svg'
import { SearchBar } from '@bratislava/ui-city-library'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { FormEvent, useState } from 'react'

import PageWrapper from '../components/layouts/PageWrapper'
import ErrorPage from '../components/pages/ErrorPage'

interface ICustomProps {
  locale: string
}

const onSubmit = (e: FormEvent) => {
  e.preventDefault()
  // TODO: search redirect
}

const Custom404 = ({ locale }: ICustomProps) => {
  const { t } = useTranslation()

  const [searchedTerm, setSearchedTerm] = useState('')

  const { asPath } = useRouter()

  return (
    <PageWrapper locale={locale ?? 'sk'} slug="/404">
      <ErrorPage code={404}>
        <header className="mb-6 text-xl">
          <h1>{t('pageNotFound')}</h1>
        </header>
        <p className="text-base">{t('pageNotFoundSorry')}</p>
        <p className="pt-10 text-base underline">
          https://www.mestskakniznica.sk/{locale ?? 'sk'}
          {asPath}
        </p>
        <form onSubmit={onSubmit}>
          <SearchBar
            iconLeft={<SearchIcon onClick={onSubmit} />}
            iconRight={
              searchedTerm.length > 0 && <ClearCircle onClick={() => setSearchedTerm('')} />
            }
            placeholder={t('whatAreYouLookingFor')}
            className="pt-10"
            inputClassName="w-full h-14"
            onChange={(e) => setSearchedTerm(e.target.value)}
            value={searchedTerm}
          />
        </form>
      </ErrorPage>
    </PageWrapper>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const locale = ctx.locale ?? 'sk'

  const translations = await serverSideTranslations(locale, ['common'])

  return {
    props: {
      locale,
      ...translations,
    },
  }
}

export default Custom404
