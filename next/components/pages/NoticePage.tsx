import { Documents, PageTitle, SectionContainer } from '@bratislava/ui-city-library'
import Breadcrumbs from '@modules/breadcrumbs/Breadcrumbs'
import RichText from '@modules/formatting/RichText'
import { NoticeEntityFragment } from '@services/graphql'
import { useNavikronos } from '@utils/navikronos'
import * as React from 'react'

export interface NoticePageProps {
  notice: NoticeEntityFragment
}

const NoticePage = ({ notice }: NoticePageProps) => {
  const { getBreadcrumbs } = useNavikronos()
  const breadcrumbs = getBreadcrumbs(notice.attributes?.title)

  return (
    <>
      <SectionContainer>
        <Breadcrumbs crumbs={breadcrumbs} />
      </SectionContainer>
      <SectionContainer>
        <PageTitle title={notice?.attributes?.title ?? ''} />
        <div className="my-6">
          <RichText content={notice?.attributes?.body ?? ''} />
        </div>
      </SectionContainer>
      <SectionContainer>
        <Documents documents={notice.attributes?.documents?.documents?.data ?? []} />
      </SectionContainer>
    </>
  )
}

export default NoticePage
