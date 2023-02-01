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
  const { i18n } = useTranslation('common')

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
        <Documents
          documents={notice.attributes?.documents?.basicDocuments?.data ?? []}
          targetBlank
        />
      </SectionContainer>
    </>
  )
}

export default NoticePage
