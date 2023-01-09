import { NoticeEntityFragment } from '@bratislava/strapi-sdk-city-library'
import { Documents, PageTitle, RowFileProps, SectionContainer } from '@bratislava/ui-city-library'
import Breadcrumbs from '@components/Molecules/Breadcrumbs'
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
          { title: '', url: '/' },
          { title: 'Zažite', url: '/zazite' },
          { title: 'Aktuality', url: '/zazite/aktuality' },
          { title: notice.attributes?.title || '', url: notice.attributes?.slug || '' },
        ]
      : [
          { title: '', url: '/' },
          { title: 'Experience', url: '/experience' },
          { title: 'News', url: '/experience/news' },
          { title: notice.attributes?.title || '', url: notice.attributes?.slug || '' },
        ]

  const files = notice.attributes?.files?.files?.map((file) => {
    const fileAttributes = file?.attachment.data?.attributes

    return {
      url: fileAttributes?.url,
      content: {
        title: file?.name ?? fileAttributes?.name,
        fileType: fileAttributes?.ext?.slice(1).toUpperCase(),
      },
    } as { url?: string; content?: RowFileProps }
  })

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
      <SectionContainer>
        <Documents files={files} targetBlank />
      </SectionContainer>
    </>
  )
}

export default NoticePage
