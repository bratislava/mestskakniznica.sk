import { NoticeEntityFragment } from '@bratislava/strapi-sdk-city-library'
import { PageTitle, SectionContainer } from '@bratislava/ui-city-library'
import Breadcrumbs from '@modules/breadcrumbs/Breadcrumbs'
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
        <PageTitle
          title={notice?.attributes?.title ?? ''}
          description={notice?.attributes?.body ?? ''}
        />
      </SectionContainer>
    </>
  )
}

export default NoticePage
