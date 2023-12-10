import { DownloadIcon } from '@assets/icons'
import { SectionContainer } from '@bratislava/ui-city-library'
import Breadcrumbs from '@modules/breadcrumbs/Breadcrumbs'
import Button from '@modules/common/Button'
import FileExtBadge from '@modules/common/FileExtBadge'
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

const DocumentPage = ({ entity }: IProps) => {
  const { t, i18n } = useTranslation('common')
  const { breadcrumbs } = useNavikronos()
  const { getDownloadAriaLabel } = useDownloadAriaLabel()
  const { getDisclosureMetadata } = useDisclosureMetadata()

  if (!entity.attributes) {
    return null
  }

  const { title, file, description } = entity.attributes

  const firstItem = file?.data[0]

  if (!firstItem?.attributes) {
    return null
  }

  const fileExt = firstItem?.attributes?.ext?.toUpperCase().replace('.', '') ?? ''

  const isDisclosure = entity.__typename === 'DisclosureEntity'

  const dlData = isDisclosure
    ? getDisclosureMetadata(entity)
    : [
        {
          label: t('DocumentMetadata.category'),
          // eslint-disable-next-line unicorn/consistent-destructuring
          value: entity.attributes.documentCategory?.data?.attributes?.label,
        },
        {
          label: t('DocumentMetadata.addedAt'),
          // eslint-disable-next-line unicorn/consistent-destructuring
          value: <FormatDate value={entity.attributes.publishedAt} valueType="ISO" />,
        },
      ]

  return (
    <DefaultPageLayout title={title}>
      <SectionContainer>
        <Breadcrumbs crumbs={breadcrumbs} />

        <div className="mt-6 flex flex-col gap-x-8 border-b border-border-dark pb-10 lg:mt-16 lg:flex-row lg:pb-32">
          <FileExtBadge className="mb-8 h-16 w-16 self-center lg:self-auto" fileExt={fileExt} />

          <div className="w-full text-foreground-body">
            <div className="flex flex-col items-center border-b border-border-dark text-center lg:items-start lg:text-left">
              {/* Header */}
              <h1 className="text-h1 lg:mt-0">{title}</h1>

              {entity.attributes?.file?.data.map((item) => (
                <div key={item?.id}>
                  <div className="mt-2 flex items-center gap-x-3">
                    <span>{getFileSize(item?.attributes?.size, i18n.language)}</span>
                    <span>&bull;</span>
                    <span>{item?.attributes?.ext?.toUpperCase().replace('.', '') ?? ''}</span>
                    <span>&bull;</span>
                    <span>{item?.attributes?.name}</span>
                  </div>

                  <div className="my-6 flex w-full flex-col items-center gap-y-3 lg:mb-10 lg:flex-row lg:gap-y-0 lg:gap-x-4">
                    <Button
                      href={item?.attributes?.url || ''}
                      target="_blank"
                      rel="noreferrer"
                      mobileFullWidth
                      aria-label={`${t('open')} ${item?.attributes?.name}`}
                      // Change to 'ExternalLinkIcon' when download button is added
                      // startIcon={<ExternalLinkIcon />}
                      startIcon={<DownloadIcon />}
                    >
                      {/* Change to 'Open' when download button is added */}
                      {/* {t('open')} */}
                      {t('open')}
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
              ))}
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

export default DocumentPage
