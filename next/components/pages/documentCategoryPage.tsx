// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { DocumentCategoryFragment } from '@bratislava/strapi-sdk-city-library';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
  PageTitle,
  Pagination,
  RowFile,
  SearchBar,
  SectionContainer,
  Select,
} from '@bratislava/ui-city-library';
import NextLink from 'next/link';
import * as React from 'react';
import { ReactComponent as SearchIcon } from '../../assets/images/search.svg';
import { DocumentResponse, DOCUMENTS_LIMIT } from '../../pages/api/documents';
import { formatDateToLocal } from '../../utils/utils';
import Metadata from '../Molecules/Metadata';
import PageBreadcrumbs from '../Molecules/PageBreadcrumbs';
import { useTranslation } from 'next-i18next';

export interface PageProps {
  documentCategory: DocumentCategoryFragment;
  locale?: string;
}

export interface SortOption {
  key: 'asc' | 'desc';
  title: string;
}

const DocumentCategoryPage = ({
  documentCategory,
  locale = 'sk',
}: PageProps) => {
  const { t } = useTranslation('common');
  const [documentData, setDocumentData] = React.useState<DocumentResponse>({
    documents: [],
    fileCategories: [],
    count: 0,
  });
  const SORT_OPTIONS: SortOption[] = [
    { key: 'desc', title: t('sort_desc') },
    { key: 'asc', title: t('sort_asc') },
  ];

  const [offsetPage, setOffsetPage] = React.useState(1);
  const [sort, setSort] = React.useState(SORT_OPTIONS[0]);
  const [query, setQuery] = React.useState('');

  const noOfPages = Math.ceil(documentData.count / DOCUMENTS_LIMIT);

  const { id } = documentCategory;

  React.useEffect(() => {
    const fetchDocuments = async () => {
      const res = await fetch(
        `/api/documents?offset=${(offsetPage - 1) * DOCUMENTS_LIMIT}&sort=${
          sort.key
        }&categoryId=${id}&query=${query}`
      );
      const data: DocumentResponse = await res.json();

      setDocumentData(data);
    };

    fetchDocuments();
  }, [offsetPage, sort, id, query]);

  const handleChangeOffsetPage = (num: number) => {
    if (num > 0 && num <= noOfPages) setOffsetPage(num);
  };

  return (
    <>
      <SectionContainer>
        <PageBreadcrumbs
          page={documentCategory.page}
          documentCategory={documentCategory}
        />
        <PageTitle title={documentCategory.name ?? ''} hasDivider={false} />
        <SearchBar
          placeholder={t('whatAreYouLookingFor')}
          className="mt-6"
          inputClassName="py-5 text-sm w-full border-gray-universal-200"
          iconLeft={<SearchIcon />}
          value={query}
          onChange={(ev) => setQuery(ev.target.value)}
        />
        <div className="mt-16 pb-32 border-b border-gray-universal-100">
          <div className="flex items-center justify-end">
            <Select
              className="w-44"
              options={SORT_OPTIONS}
              value={sort}
              onChange={(s) => setSort(s)}
            />
          </div>

          {/* Documents */}
          {documentData.documents.map((document) => (
            <NextLink
              key={document.id}
              href={`/file/${document.slug}`}
              passHref
            >
              <a href={document.slug || ''}>
                <RowFile
                  className="cursor-pointer"
                  type={document.file_category?.name || ''}
                  title={document.title || ''}
                  metadata={<Metadata metadata={document.metadata} />}
                  dateAdded={`${t('added')} ${formatDateToLocal(
                    document.date_added,
                    locale
                  )}`}
                  fileType={document.attachment?.ext
                    ?.toUpperCase()
                    .replace('.', '')}
                />
              </a>
            </NextLink>
          ))}
          <div className="mt-6 flex justify-end">
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

export default DocumentCategoryPage;
