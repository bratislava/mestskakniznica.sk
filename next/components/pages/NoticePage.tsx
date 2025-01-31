import { NoticeEntityFragment } from '@services/graphql'
import * as React from 'react'

import { Documents, PageTitle, SectionContainer } from '@/components/ui'
import Breadcrumbs from '@/modules/breadcrumbs/Breadcrumbs'
import RichText from '@/modules/formatting/RichText'
import { useNavikronos } from '@/utils/navikronos'

export interface NoticePageProps {
  notice: NoticeEntityFragment
}

const NoticePage = ({ notice }: NoticePageProps) => {
  const { breadcrumbs } = useNavikronos()

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
        <Documents
          documents={[
            ...(notice.attributes?.documents?.documents?.data ?? []),
            ...(notice.attributes?.documents?.disclosures?.data ?? []),
          ]}
        />
      </SectionContainer>
    </>
  )
}

export default NoticePage
