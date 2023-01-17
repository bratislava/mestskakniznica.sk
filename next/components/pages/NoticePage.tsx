import { Documents, PageTitle, SectionContainer } from '@bratislava/ui-city-library'
import Breadcrumbs from '@modules/breadcrumbs/Breadcrumbs'
import RichText from '@modules/formatting/RichText'
import { NoticeEntityFragment } from '@services/graphql'
import { useTranslation } from 'next-i18next'
import * as React from 'react'

export interface NoticePageProps {
  notice: NoticeEntityFragment
}

const NoticePage = ({ notice }: NoticePageProps) => {
  const { t, i18n } = useTranslation('common')

  const breadCrumbs =
    i18n.language === 'sk'
      ? [
          { title: 'Zažite', url: '/zazite' },
          { title: 'Aktuality', url: '/zazite/aktuality' },
          { title: notice.attributes?.title || '', url: notice.attributes?.slug || '' },
        ]
      : [
          { title: 'Experience', url: '/experience' },
          { title: 'News', url: '/experience/news' },
          { title: notice.attributes?.title || '', url: notice.attributes?.slug || '' },
        ]

  const files = notice.attributes?.documents?.basicDocuments?.data?.map((document) => ({
    url: `${t('documents_slug')}${document?.attributes?.slug}`,
    content: {
      type: document?.attributes?.file_category?.data?.attributes?.name ?? '',
      title: document?.attributes?.title ?? '',
      dateAdded: document?.attributes?.date_added,
      fileType:
        document?.attributes?.attachment?.data?.attributes?.ext?.toUpperCase().replace('.', '') ??
        '',
    },
  }))

  return (
    <>
      <SectionContainer>
        <Breadcrumbs crumbs={breadCrumbs} />
      </SectionContainer>
      <SectionContainer>
        <PageTitle title={notice?.attributes?.title ?? ''} />
        <div className="my-6">
          <RichText content={notice?.attributes?.body ?? ''} />
        </div>
      </SectionContainer>
      <SectionContainer>
        <Documents files={files} targetBlank />
      </SectionContainer>
    </>
  )
}

export default NoticePage
