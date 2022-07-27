import ChevronRight from '@assets/images/chevron-right.svg'
import SingleDot from '@assets/images/dot.svg'
import Download from '@assets/images/download.svg'
import ExternalLink from '@assets/images/external-link.svg'
import Home from '@assets/images/home.svg'
import { BasicDocumentEntity, FooterEntity, MenuEntity } from '@bratislava/strapi-sdk-city-library'
import { Button, FileIcon, Link, SectionContainer } from '@bratislava/ui-city-library'
import truncate from 'lodash/truncate'
import { useTranslation } from 'next-i18next'
import React from 'react'

import { formatDateToLocal } from '../../utils/utils'
import DefaultPageLayout from '../layouts/DefaultPageLayout'

interface IProps {
  file: BasicDocumentEntity
  locale?: string
  menus: MenuEntity[]
  footer: FooterEntity
}

interface FileMetadata {
  key: string
  content: React.ReactNode
}

const DESCRIPTION_LIMIT = 100

function CustomPageBreadcrumbs({ file }: IProps) {
  return (
    <div className="mt-4.5 flex items-center gap-x-4">
      <Link variant="plain" href="/">
        <Home className="cursor-pointer" />
      </Link>
      <ChevronRight className="ml-1" />

      <span className="text-xs">{file?.attributes?.title}</span>
    </div>
  )
}

function FileDetailPage({ file, locale = 'sk', menus, footer }: IProps) {
  const dateAddedString = formatDateToLocal(file?.attributes?.date_added, locale)
  const { t } = useTranslation('common')

  const [expandDescription, setExpandDescription] = React.useState(false)
  const description = file?.attributes?.description
  const showExpandButton = description ? description.length > DESCRIPTION_LIMIT : false

  const Metadata: FileMetadata[] = [
    {
      key: `${t('type')}:`,
      content: (
        <>
          {/* Mobile */}
          <Link
            href={`${t('documents_category_slug')}${
              file?.attributes?.file_category?.data?.attributes?.slug
            }`}
            variant="plain"
            uppercase={false}
            className="underline lg:hidden"
            size="default"
          >
            {file?.attributes?.file_category?.data?.attributes?.name}
          </Link>
          {/* Desktop */}
          <Link
            href={`${t('documents_category_slug')}${
              file?.attributes?.file_category?.data?.attributes?.slug
            }`}
            variant="plain"
            uppercase={false}
            className="hidden underline lg:block"
            size="large"
          >
            {file?.attributes?.file_category?.data?.attributes?.name}
          </Link>
        </>
      ),
    },
    { key: `${t('author')}:`, content: file?.attributes?.author },
    {
      key: `${t('createdAt')}:`,
      content: dateAddedString,
    },
    {
      key: `${t('link')}:`,
      content: file?.attributes?.link ? (
        <>
          {/* Mobile */}
          <Link
            href={file?.attributes?.link ?? '#'}
            uppercase={false}
            className="text-gray-universal-70 underline lg:hidden"
            variant="plain"
            size="default"
          >
            {file?.attributes?.link}
          </Link>
          {/* Desktop */}
          <Link
            href={file?.attributes?.link ?? '#'}
            uppercase={false}
            className="hidden text-gray-universal-70 underline lg:block"
            variant="plain"
            size="large"
          >
            {file?.attributes?.link}
          </Link>
        </>
      ) : null,
    },
  ]

  const transformedMetadata: Array<FileMetadata> =
    file && file?.attributes?.metadata && file?.attributes?.metadata[0]
      ? Object.entries(file?.attributes?.metadata[0])
          .filter(
            (entry) =>
              (entry[0] !== '__typename' && entry[0] !== 'id' && entry[0] !== 'attachment') ||
              entry[0] === 'attachment'
          )
          .map((entry) => {
            if (entry[0] !== '__typename' && entry[0] !== 'id' && entry[0] !== 'attachment') {
              return {
                key: `${t(entry[0])}:`,
                content: entry[1],
              }
            }
            return {
              key: 'Attachment',
              content: entry[1].name,
            }
          })
      : []

  const fullMetadata = Metadata?.concat(transformedMetadata)

  return (
    <DefaultPageLayout title={file?.attributes?.title} menus={menus} footer={footer}>
      <SectionContainer>
        <CustomPageBreadcrumbs file={file} menus={menus} footer={footer} />
        <div className="mt-6 flex gap-x-8 border-b border-gray-universal-100 pb-10 lg:mt-16 lg:pb-32">
          <FileIcon
            className="hidden lg:flex"
            type={file?.attributes?.attachment?.data?.attributes?.ext
              ?.toUpperCase()
              .replace('.', '')}
          />
          <div className="w-full">
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              {/* Header */}
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gray-universal-100 text-[12px] lg:hidden">
                {file?.attributes?.attachment?.data?.attributes?.ext
                  ?.toUpperCase()
                  .replace('.', '')}
              </span>
              <h1 className="mt-8 text-md2 lg:mt-0 lg:text-2xl">{file?.attributes?.title}</h1>
              <div className="mt-2 items-center text-sm text-gray-universal-70 lg:flex lg:gap-x-3">
                <p className="hidden lg:block">{file?.attributes?.author}</p>
                <SingleDot className="hidden lg:block" />
                <p>{`${t('added')} ${dateAddedString}`}</p>
              </div>
              {file?.attributes?.attachment && (
                <div className="mt-6 mb-6 flex w-full flex-col items-center gap-y-3 lg:mb-10 lg:flex-row lg:gap-y-0 lg:gap-x-4">
                  <a
                    className="w-full lg:w-auto"
                    href={file?.attributes?.attachment?.data?.attributes?.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button
                      className="w-full py-[9px] px-5"
                      aria-label={`${t('open')} ${file?.attributes?.title}`}
                      icon={<ExternalLink />}
                    >
                      {t('open')}
                    </Button>
                  </a>
                  <a
                    className="w-full lg:w-auto"
                    href={file?.attributes?.attachment?.data?.attributes?.url}
                    download={file?.attributes?.attachment?.data?.attributes?.name}
                  >
                    <Button
                      variant="secondary"
                      className="w-full py-[9px] px-5"
                      aria-label={`${t('download')} ${file?.attributes?.title}`}
                      icon={<Download />}
                    >
                      {t('download')}
                    </Button>
                  </a>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="space-y-4 border-t border-b border-gray-universal-100 py-6 lg:space-y-6 lg:py-10">
              <h3 className="text-default lg:text-md2">{t('description')}</h3>
              <p className="text-xs text-gray-universal-70 lg:text-sm">
                {truncate(description || undefined, {
                  length: expandDescription ? description?.length : DESCRIPTION_LIMIT,
                })}
              </p>

              {showExpandButton && (
                <Button
                  variant="plain-primary"
                  icon={<ChevronRight />}
                  iconPosition="right"
                  onClick={() => setExpandDescription((prev) => !prev)}
                >
                  {expandDescription ? t('showLess') : t('showMore')}
                </Button>
              )}
            </div>

            {/* Metadata */}
            <ul className="mt-6 space-y-3 text-xs text-gray-universal-70 lg:mt-10 lg:text-sm">
              {fullMetadata
                .filter((data) => data?.content)
                .map((data, i) => (
                  <li className="flex items-center gap-x-4 lg:gap-x-6" key={i}>
                    <span className="w-24 lg:w-28">{data && data.key}</span>
                    <span>{data && data.content}</span>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </SectionContainer>
    </DefaultPageLayout>
  )
}

export default FileDetailPage
