import { SearchBar } from '@bratislava/ui-city-library';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { ReactComponent as ClearCircle } from '../assets/images/clear-circle.svg';
import { ReactComponent as SearchIcon } from '../assets/images/search-404.svg';
import ErrorPage from '../components/pages/ErrorPage';
import PageWrapper from '../components/layouts/PageWrapper';
import { GetStaticProps } from 'next';
import { ssrTranslations } from '../utils/translations';

interface ICustomProps {
  locale: string;
}

const Custom404 = ({ locale }: ICustomProps) => {
  const { t } = useTranslation();

  const [searchedTerm, setSearchedTerm] = useState('');

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    //TODO: search redirect
  };
  const { asPath } = useRouter();

  return (
    <PageWrapper locale={locale ?? 'sk'} slug={'/404'}>
      <ErrorPage code={404}>
        <header className="text-xl mb-6">
          <h1>{t('pageNotFound')}</h1>
        </header>
        <p className="text-base">{t('pageNotFoundSorry')}</p>
        <p className="underline text-base pt-10">
          https://www.mestskakniznica.sk/{locale ?? 'sk'}
          {asPath}
        </p>
        <form onSubmit={onSubmit}>
          <SearchBar
            iconLeft={<SearchIcon onClick={onSubmit} />}
            iconRight={
              searchedTerm.length > 0 && (
                <ClearCircle onClick={() => setSearchedTerm('')} />
              )
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
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const locale = ctx.locale ?? 'sk';
  const pageTranslations = ['common'];

  return {
    props: {
      locale,
      ...(await ssrTranslations(ctx, pageTranslations)),
    },
  };
};

export default Custom404;
