import { PageFragment } from '@bratislava/strapi-sdk-city-library'
import {
  PageTitle,
  Pagination,
  SearchBar,
  SectionContainer,
  Select,
  Button,
 LoadingSpinner } from '@bratislava/ui-city-library';
import Link from 'next/link';
import * as React from 'react';
import { useTranslation } from 'next-i18next';
import CloseIcon from '@assets/images/close.svg'
import SearchIcon from '@assets/images/search.svg'
import ChevronRight from '@assets/images/chevron-right.svg'
import PageBreadcrumbs from "../Molecules/PageBreadcrumbs"

import cx from 'classnames';

export interface PageProps {
  page: PageFragment | undefined;
}

export interface MetaDataCategory {
  key: string;
  title: string;
}

const SearchPage = ({ page }: PageProps) => {
  const { t } = useTranslation('common');

  const resultsRef = React.useRef<HTMLDivElement>(null);

  const metaDataCategories: MetaDataCategory[] = [
    { key: 'Na Webe', title: 'Na Webe' },
    { key: 'Na Webe 1', title: 'Na Webe 1' },
  ];

  const [offsetPage, setOffsetPage] = React.useState(1);
  const [visibleQuery, setVisibleQuery] = React.useState('');
  const [categories, setCategories] = React.useState(metaDataCategories[0]);

  const pageData = [
    {
      page_title: 'Služby',
      page_category: 'Typ obsahu',
      page_url: `${process.env.ORIGIN_ROOT_URL}/sluzby`,
    },
    {
      page_title: 'Zažite',
      page_category: 'Typ obsahu',
      page_url: `${process.env.ORIGIN_ROOT_URL}/zazite`,
    },
    {
      page_title: 'Ako sa prihlásiť do knižnice',
      page_category: 'Typ obsahu',
      page_url: `${process.env.ORIGIN_ROOT_URL}/sluzby/citanie/ako-sa-prihlasit-do-kniznice`,
    },
    {
      page_title: 'Knižné boxy',
      page_category: 'Typ obsahu',
      page_url: `${process.env.ORIGIN_ROOT_URL}/sluzby/citanie/knizne-boxy`,
    },
    {
      page_title: 'Podujatia',
      page_category: 'Typ obsahu',
      page_url: `${process.env.ORIGIN_ROOT_URL}/zazite/podujatia`,
    },
    {
      page_title: 'Aktuality z knižnice',
      page_category: 'Typ obsahu',
      page_url: `${process.env.ORIGIN_ROOT_URL}/zazite/aktuality`,
    },
    {
      page_title: 'Študujte v knižnici',
      page_category: 'Typ obsahu',
      page_url: `${process.env.ORIGIN_ROOT_URL}/zazite/studujte-v-kniznici`,
    },
    {
      page_title: 'Navštívte',
      page_category: 'Typ obsahu',
      page_url: `${process.env.ORIGIN_ROOT_URL}/navstivte`,
    },
    {
      page_title: 'Naše lokality',
      page_category: 'Typ obsahu',
      page_url: `${process.env.ORIGIN_ROOT_URL}/navstivte/nase-lokality`,
    },
    {
      page_title: 'Klariská',
      page_category: 'Typ obsahu',
      page_url: `${process.env.ORIGIN_ROOT_URL}/navstivte/klariska`,
    },
    {
      page_title: 'Galéria Artotéka',
      page_category: 'Typ obsahu',
      page_url: `${process.env.ORIGIN_ROOT_URL}/navstivte/ostatne/galeria-artoteka`,
    },
    {
      page_title: 'Dokumenty a zverejňovanie informácií',
      page_category: 'Typ obsahu',
      page_url: `${process.env.ORIGIN_ROOT_URL}/o-nas/dokumenty-a-zverejnovanie-informacii`,
    },
  ];

  const noOfPages = Math.ceil(pageData.length / 2);

  const scrollToResults = React.useCallback(() => {
    resultsRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    });
  }, [resultsRef]);

  const handleChangeOffsetPage = (num: number) => {
    if (num > 0 && num <= noOfPages) setOffsetPage(num);
  };

  const handleSearch = React.useCallback(() => {
    scrollToResults();
  }, [scrollToResults]);

  const handleSearchReset = React.useCallback(() => {
    setVisibleQuery('');
  }, [setVisibleQuery]);

  const onSearchBarKeyPress = React.useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        handleSearch();
      }
    },
    [handleSearch]
  );

  const onSearchBarRightIconKeyPress = React.useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        handleSearchReset();
      }
    },
    [handleSearchReset]
  );

  return (
    <>
      <SectionContainer>
        <PageBreadcrumbs page={page} />
      </SectionContainer>
      <SectionContainer>
        <PageTitle
          title={page?.title ?? 'Výsledky vyhľadávania'}
          description={page?.description ?? ''}
          hasDivider={false}
        />
        <div className="mt-6 flex flex-col lg:flex-row gap-y-4 lg:gap-y-0">
          <Select
            className="lg:w-auto"
            selectClassName="lg:w-auto py-[9px] lg:py-5"
            options={metaDataCategories}
            value={categories}
            onChange={(s) => setCategories(s)}
          />
          <SearchBar
            placeholder={t('searchFor')}
            className="w-full"
            inputClassName="py-2 lg:py-5 text-sm w-full border-gray-universal-200"
            iconLeft={<SearchIcon />}
            iconRight={
              <div
                tabIndex={0}
                role="button"
                onKeyPress={onSearchBarRightIconKeyPress}
                onClick={handleSearchReset}
              >
                <CloseIcon />
              </div>
            }
            value={visibleQuery}
            onChange={(ev) => setVisibleQuery(ev.target.value)}
            onKeyPress={onSearchBarKeyPress}
          />

          <Button className="w-full lg:w-auto py-[9px] lg:py-4.25 lg:px-8 text-xs">
            Hľadať
          </Button>
        </div>
        <div className="mt-4 flex flex-wrap gap-x-3 gap-y-3">
          <span className="border-2 px-[16px] py-[8px] rounded-full text-[14px]">
            Stranka
          </span>
          <span className="border-2 px-[16px] py-[8px] rounded-full text-[14px]">
            Pracovisko
          </span>
          <span className="border-2 px-[16px] py-[8px] rounded-full text-[14px]">
            Podujatie
          </span>
          <span className="border-2 px-[16px] py-[8px] rounded-full text-[14px]">
            Aktualita
          </span>
          <span className="border-2 px-[16px] py-[8px] rounded-full text-[14px]">
            Zamestnanec
          </span>
          <span className="border-2 px-[16px] py-[8px] rounded-full text-[14px]">
            Dokument
          </span>
          <span className="border-2 px-[16px] py-[8px] rounded-full text-[14px]">
            Subor
          </span>
        </div>

        <p className="mt-5 text-[16px] text-gray-600">
          248 vysledkov vyhladavania
        </p>

        <div ref={resultsRef} className="mt-6 lg:mt-11 pb-10 lg:pb-32">
          {/* Documents */}
          {!pageData ? (
            <LoadingSpinner size="medium" className="mt-[30px]" />
          ) : (
            pageData.map((page, i) => (
              <Link key={i} href={page.page_url} passHref>
                <a>
                  <div
                    className={cx(
                      'group bg-white flex justify-between py-4 pr-2 items-center border-b border-gray-universal-100'
                    )}
                  >
                    <div className="flex items-center gap-x-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-x-4">
                          <h5 className="text-default">{page.page_title}</h5>
                          <span className="border-2 border-gray-universal-100 px-[8px] rounded-[4px] text-[12px]">
                            {page.page_category}
                          </span>
                        </div>
                        <div className="flex items-center gap-x-3 text-gray-universal-70 text-xs">
                          <span>{page.page_url}</span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight />
                  </div>
                </a>
              </Link>
            ))
          )}
          <div className="mt-6 flex justify-center lg:justify-end">
            <Pagination
              max={noOfPages}
              value={offsetPage}
              onChangeNumber={(num) => handleChangeOffsetPage(num)}
              previousButtonAriaLabel={t('previousPage')}
              nextButtonAriaLabel={t('nextPage')}
              currentInputAriaLabel={t('currentPage')}
            />
          </div>
        </div>
      </SectionContainer>
    </>
  );
};

export default SearchPage;
