import ChevronRight from '@assets/images/chevron-right.svg'
import SingleDot from '@assets/images/dot.svg'
import Download from '@assets/images/download.svg'
import ExternalLink from '@assets/images/external-link.svg'
import Home from '@assets/images/home.svg'
import { BasicDocumentFragment, FooterQuery, MenusQuery } from '@bratislava/strapi-sdk-city-library'
import { Button, FileIcon, Link, SectionContainer } from '@bratislava/ui-city-library'
import truncate from 'lodash/truncate'
import { useTranslation } from 'next-i18next'
import React from 'react'

import { formatDateToLocal } from '../../utils/utils'
import DefaultPageLayout from '../layouts/DefaultPageLayout'

interface IProps {
  file: BasicDocumentFragment
  locale?: string
  menus: NonNullable<MenusQuery['menus']>
  footer: FooterQuery['footer']
}

interface FileMetadata {
  key: string
  content: React.ReactNode
}

const DESCRIPTION_LIMIT = 100

function CustomPageBreadcrumbs({ file }: IProps) {
  return <div className="flex items-center gap-x-4 mt-4.5">
    <Link variant="plain" href="/">
      <Home className="cursor-pointer" />
    </Link>
    <ChevronRight className="ml-1" />

    <span className="text-xs">{file.title}</span>
  </div>
}

function FileDetailPage({ file, locale = 'sk', menus, footer }: IProps) {
  const dateAddedString = formatDateToLocal(file.date_added, locale)
  const { t } = useTranslation('common')

  const [expandDescription, setExpandDescription] = React.useState(false)
  const {description} = file
  const showExpandButton = description ? description.length > DESCRIPTION_LIMIT : false

  const Metadata: FileMetadata[] = [
    {
      key: `${t('type')}:`,
      content: (
        <>
          {/* Mobile */}
          <Link
            href={`${t('documents_category_slug')}${file.file_category?.slug}`}
            variant="plain"
            uppercase={false}
            className="lg:hidden underline"
            size="default"
          >
            {file.file_category?.name}
          </Link>
          {/* Desktop */}
          <Link
            href={`${t('documents_category_slug')}${file.file_category?.slug}`}
            variant="plain"
            uppercase={false}
            className="hidden lg:block underline"
            size="large"
          >
            {file.file_category?.name}
          </Link>
        </>
      ),
    },
    { key: `${t('author')}:`, content: file.author },
    {
      key: `${t('createdAt')}:`,
      content: dateAddedString,
    },
    {
      key: `${t('link')}:`,
      content: file.link ? (
        <>
          {/* Mobile */}
          <Link
            href={file.link ?? '#'}
            uppercase={false}
            className="lg:hidden underline text-gray-universal-70"
            variant="plain"
            size="default"
          >
            {file.link}
          </Link>
          {/* Desktop */}
          <Link
            href={file.link ?? '#'}
            uppercase={false}
            className="hidden lg:block underline text-gray-universal-70"
            variant="plain"
            size="large"
          >
            {file.link}
          </Link>
        </>
      ) : null,
    },
  ]

  const transformedMetadata: Array<FileMetadata> =
    file && file.metadata && file.metadata[0]
      ? Object.entries(file.metadata[0])
          .filter(
            (entry) =>
              (entry[0] !== '__typename' && entry[0] !== 'id' && entry[0] !== 'attachment') || entry[0] === 'attachment'
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
    <DefaultPageLayout title={file.title} menus={menus} footer={footer}>
      <SectionContainer>
        <CustomPageBreadcrumbs file={file} menus={menus} footer={footer} />
        <div className="flex gap-x-8 mt-6 lg:mt-16 border-b border-gray-universal-100 pb-10 lg:pb-32">
          <FileIcon className="hidden lg:flex" type={file.attachment?.ext?.toUpperCase().replace('.', '')} />
          <div className="w-full">
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              {/* Header */}
              <span className="lg:hidden flex border border-gray-universal-100 rounded-full h-14 w-14 text-[12px] justify-center items-center">
                {file.attachment?.ext?.toUpperCase().replace('.', '')}
              </span>
              <h1 className="text-md2 mt-8 lg:mt-0 lg:text-2xl">{file.title}</h1>
              <div className="mt-2 lg:flex items-center lg:gap-x-3 text-gray-universal-70 text-sm">
                <p className="hidden lg:block">{file.author}</p>
                <SingleDot className="hidden lg:block" />
                <p>{`${t('added')} ${dateAddedString}`}</p>
              </div>
              {file.attachment && (
                <div className="flex w-full flex-col lg:flex-row gap-y-3 lg:gap-y-0 lg:gap-x-4 items-center mt-6 mb-6 lg:mb-10">
                  <a className="w-full lg:w-auto" href={file.attachment.url} target="_blank" rel="noreferrer">
                    <Button
                      className="py-[9px] px-5 w-full"
                      aria-label={`${t('open')} ${file.title}`}
                      icon={<ExternalLink />}
                    >
                      {t('open')}
                    </Button>
                  </a>
                  <a className="w-full lg:w-auto" href={file.attachment.url} download={file.attachment.name}>
                    <Button
                      variant="secondary"
                      className="py-[9px] px-5 w-full"
                      aria-label={`${t('download')} ${file.title}`}
                      icon={<Download />}
                    >
                      {t('download')}
                    </Button>
                  </a>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="space-y-4 lg:space-y-6 border-t border-b border-gray-universal-100 py-6 lg:py-10">
              <h3 className="text-default lg:text-md2">{t('description')}</h3>
              <p className="text-xs lg:text-sm text-gray-universal-70">
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
            <ul className="mt-6 lg:mt-10 space-y-3 text-gray-universal-70 text-xs lg:text-sm">
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
