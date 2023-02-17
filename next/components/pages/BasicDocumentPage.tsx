import { DownloadIcon } from '@assets/icons'
import { FileIcon, SectionContainer } from '@bratislava/ui-city-library'
import Breadcrumbs from '@modules/breadcrumbs/Breadcrumbs'
import Button from '@modules/common/Button'
import FormatDate from '@modules/formatting/FormatDate'
import { DisclosureEntityFragment, DocumentEntityFragment } from '@services/graphql'
import { useNavikronos } from '@utils/navikronos'
import { useDisclosureMetadata } from '@utils/useDisclosureMetadata'
import { useDownloadAriaLabel } from '@utils/useDownloadAriaLabel'
import { getFileSize } from '@utils/utils'
import { useTranslation } from 'next-i18next'
import React, { Fragment } from 'react'

import DefaultPageLayout from '../layouts/DefaultPageLayout'

interface IProps {
  entity: DocumentEntityFragment | DisclosureEntityFragment
}

const BasicDocumentPage = ({ entity }: IProps) => {
  const { t, i18n } = useTranslation('common')
  const { getBreadcrumbs } = useNavikronos()
  const { getDownloadAriaLabel } = useDownloadAriaLabel()
  const { getDisclosureMetadata } = useDisclosureMetadata()

  const breadcrumbs = getBreadcrumbs(entity.attributes?.title)

  if (!entity.attributes) {
    return null
  }

  const { title, file, addedAt, description } = entity.attributes

  if (!file.data?.attributes) {
    return null
  }

  const { size, ext, url } = file.data.attributes

  const isDisclosure = entity.__typename === 'DisclosureEntity'

  const fileSize = getFileSize(size, i18n.language)
  const fileExt = ext?.toUpperCase().replace('.', '')
  const dlData = isDisclosure
    ? getDisclosureMetadata(entity)
    : [
        {
          label: t('DocumentMetadata.category'),
          value: entity.attributes.documentCategory?.data?.attributes?.label,
        },
        {
          label: t('DocumentMetadata.addedAt'),
          value: <FormatDate value={addedAt} valueType="ISO" />,
        },
      ]

  return (
    <DefaultPageLayout title={title}>
      <SectionContainer>
        <Breadcrumbs crumbs={breadcrumbs} />

        <div className="mt-6 flex gap-x-8 border-b border-border-dark pb-10 lg:mt-16 lg:pb-32">
          <FileIcon className="hidden lg:flex" type={fileExt} />

          <div className="w-full text-foreground-body">
            <div className="flex flex-col items-center border-b border-border-dark text-center lg:items-start lg:text-left">
              {/* Header */}
              {/* TODO use FileIcon component with border */}
              <span className="mb-8 flex h-14 w-14 items-center justify-center rounded-full border border-border-dark text-[12px] text-foreground-dark lg:hidden">
                {fileExt}
              </span>

              <h1 className="text-h1 lg:mt-0">{title}</h1>

              <div className="mt-2 flex items-center gap-x-3">
                <span>{fileSize}</span>
                <span>&bull;</span>
                <span>{fileExt}</span>
              </div>

              <div className="my-6 flex w-full flex-col items-center gap-y-3 lg:mb-10 lg:flex-row lg:gap-y-0 lg:gap-x-4">
                <Button
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  mobileFullWidth
                  aria-label={`${t('open')} ${title}`}
                  // Change to 'ExternalLinkIcon' when download button is added
                  // startIcon={<ExternalLinkIcon />}
                  startIcon={<DownloadIcon />}
                >
                  {/* Change to 'Open' when download button is added */}
                  {/* {t('open')} */}
                  {t('download')}
                </Button>
                {/* TODO add direct download */}
                {/* <Button */}
                {/*  variant="secondary" */}
                {/*  mobileFullWidth */}
                {/*  href={url} */}
                {/*  // TODO add download title */}
                {/*  // download={file?.attributes?.attachment?.data?.attributes?.name} */}
                {/*  aria-label={getDownloadAriaLabel(file.data, title)} */}
                {/*  startIcon={<DownloadIcon />} */}
                {/* > */}
                {/*  {t('download')} */}
                {/* </Button> */}
              </div>
            </div>

            {/* Description */}
            {!isDisclosure && description ? (
              <div className="border-b border-border-dark py-6 lg:py-10">
                <h2 className="text-h3">{t('description')}</h2>
                <div className="mt-4 text-sm text-foreground-body lg:mt-6 lg:text-base">
                  {description}
                </div>
              </div>
            ) : null}

            {/* Metadata */}
            <dl className="mt-6 text-sm lg:mt-10 lg:text-base">
              {dlData.map((dItem) => (
                <Fragment key={dItem.label}>
                  <dt className="float-left clear-left w-40 after:content-[':'] not-first:mt-3 lg:w-48">
                    {dItem.label}
                  </dt>
                  <dd className="ml-40 not-first:mt-3 lg:ml-48">{dItem.value}</dd>
                </Fragment>
              ))}
            </dl>
          </div>
        </div>
      </SectionContainer>
    </DefaultPageLayout>
  )
}

export default BasicDocumentPage
